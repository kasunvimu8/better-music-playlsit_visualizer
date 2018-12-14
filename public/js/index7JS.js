var canvas,playButton,forwardButton,backwardButton,input,pieces,radius,fft;

var colorPalette = ["#000", "rgba(22, 59, 72, 0.5)", "#00a6e0", "#002a38"];

var volumeHistory = [];

var number=1;
var val = 0.5;

var song,play;
var w;

/*function preload(){
	song = loadSound("test.mp3");
}*/



//initialize the page
function setup() {

    canvas = createCanvas(windowWidth/2,windowHeight/2);
    canvas.mousePressed(tooglePlay);
    canvas.parent('pattern1');


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

    fft = new p5.FFT();

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

    translate(windowWidth/ 4, windowHeight/ 4);

    noFill();

    var spectrum = fft.analyze();

    var bass = fft.getEnergy("bass");
    var treble = fft.getEnergy("treble");
    var mid = fft.getEnergy("mid");

    var mapMid = map(mid, 0, 255, -radius, radius);
    var scaleMid = map(mid, 0, 255, 1, 1.5);

    var mapTreble = map(treble, 0, 255, -radius, radius);
    var scaleTreble = map(treble, 0, 255, 1, 1.5);

    var mapbass = map(bass, 0, 255, -100, 800);
    var scalebass = map(bass, 0, 255, 0, 0.8);

    mapMouseX = map(width/2/2, 0, width/2, 4, 10);
    mapMouseY = map(height/2/2, 0, height/2, windowHeight/2 / 4, windowHeight/2);

    pieces = mapMouseX;
    radius = mapMouseY;

    

    strokeWeight(1);

    for (i = 0; i < pieces; i += 0.5) {

        rotate(TWO_PI / pieces);


        /*----------  BASS  ----------*/
        push();
        strokeWeight(5);
        stroke(colorPalette[1]);
        scale(scalebass);
        rotate(frameCount * -0.5);
        line(mapbass, radius / 2, radius, radius);
        line(-mapbass, -radius / 2, radius, radius);
        pop();



        /*----------  MID  ----------*/
        push();
        strokeWeight(0.5);
        stroke(colorPalette[2]);
        scale(scaleMid);
        line(mapMid, radius / 2, radius, radius);
        line(-mapMid, -radius / 2, radius, radius);
        pop();


        /*----------  TREMBLE  ----------*/
        push();
        stroke(colorPalette[3]);
        scale(scaleTreble);
        line(mapTreble, radius / 2, radius, radius);
        line(-mapTreble, -radius / 2, radius, radius);
        pop();

    }


    /*volumeHistory.push(amp.getLevel());
    stroke(0);
    fill(255);
    beginShape();
    for(var i = 0; i < volumeHistory.length; i++){
        var mappedValue = map(volumeHistory[i],0,1,height/2,0);
        vertex(i,mappedValue);
    }
    endShape();

    if(volumeHistory.length > width){
        volumeHistory.splice(0,1);
    }*/

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