var canvas,playButton,forwardButton,backwardButton,input,pieces,radius,fft,analyzer,mapMouseX,mapMouseXbass,mapMouseY;
var colorPalette = ["#000", "rgba(22, 59, 72, 0.5)", "#00a6e0", "#002a38"];

var number=1;
var val = 0.5;

var song,play;

/*function preload(){
	song = loadSound("test.mp3");
}*/



//initialize the page
function setup() {

    canvas = createCanvas(windowWidth/2,windowHeight/2);
    canvas.mousePressed(tooglePlay);
    canvas.parent('pattern2');


    input = createFileInput(uploaded);
    input.position(windowWidth/2,windowHeight/2-100);
    //colorMode(HSB);

    backwardButton = createButton('<<');
    backwardButton.position(input.width+windowWidth/2,windowHeight/2-100);
    backwardButton.mousePressed(backwardSong);

    playButton = createButton('Play');
    playButton.style('width','50')
    playButton.position(backwardButton.width+backwardButton.x,windowHeight/2-100);
    playButton.mousePressed(tooglePlay);

    forwardButton = createButton('>>');
    forwardButton.position(playButton.width+playButton.x,windowHeight/2-100);
    forwardButton.mousePressed(forwardSong);

    input.addClass("input");
    backwardButton.addClass("back-btn");
    playButton.addClass("play-btn");
    forwardButton.addClass("for-btn");

    fft = new p5.FFT();
    analyzer = new p5.Amplitude();
    //playing sound in preload method
    //song.play();

    //loading sound in callback method

}
function backwardSong(){
    song.jump(song.currentTime()-5);
}
function forwardSong(){
    song.jump(song.currentTime()+5);
}

function uploaded(file){
    if(song!=null){
        song.stop();
    }
    song = loadSound(file,doneLoading);
    song.setVolume(val);
}

function doneLoading(){

    tooglePlay();
}

//calls infinitely
function draw(){
    
    background(colorPalette[0]);

    translate(windowWidth/2 / 2, windowHeight/2 / 2);

    var spectrum = fft.analyze();

    var bass = fft.getEnergy(100, 150);
    var treble = fft.getEnergy(150, 250);
    var mid = fft.getEnergy("mid");

    var mapMid = map(mid, 0, 255, -100, 200);
    var scaleMid = map(mid, 0, 255, 1, 1.5);

    var mapTreble = map(treble, 0, 255, 200, 350);
    var scaleTreble = map(treble, 0, 255, 0, 1);

    var mapbass = map(bass, 0, 255, 50, 200);
    var scalebass = map(bass, 0, 255, 0.05, 1.2);

    var val = analyzer.getLevel();
    mapMouseX = map(val, 0, width/2, 1, 50);
    mapMouseXbass = map(val, 0, width/2, 1, 5);
    mapMouseY = map(val, 0, height/2, 2, 6);

    pieces = 20;
    radius = 100;

    for (i = 0; i < pieces; i += 0.1) {

        rotate(TWO_PI / (pieces / 2));

        noFill();

        /*----------  BASS  ----------*/
        push();
        stroke(colorPalette[1]);
        rotate(frameCount * 0.002);
        strokeWeight(0.5);
        polygon(mapbass + i, mapbass - i, mapMouseXbass * i, 3);
        pop();


        /*----------  MID  ----------*/
        push();
        stroke(colorPalette[2]);
        strokeWeight(0.2);
        polygon(mapMid + i / 2, mapMid - i * 2, mapMouseX * i, 7);
        pop();


        /*----------  TREMBLE  ----------*/
        push();
        stroke(colorPalette[3]);
        strokeWeight(0.6);
        scale(val * 0.0005);
        rotate((val * 0.002));
        polygon(mapTreble + i / 2, mapTreble - i / 2, mapMouseY * i / 2, 3);
        pop();

    }

}

function graph(){

}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        if(val!=1)val = val+0.1;
        song.setVolume(val);
    } else if (keyCode === DOWN_ARROW) {
        if(val!=0)val = val-0.1;
        song.setVolume(val);
    }
}

function tooglePlay(){
    if(song.isPlaying()){
        song.pause();
        playButton.html('Play');
        colorChange = false;
    }
    else{
        song.play();
        playButton.html('Pause');
        colorChange = true;
    }
}

function polygon(x, y, radius, npoints) {
    var angle = TWO_PI / npoints;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = x + cos(a) * radius;
        var sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}