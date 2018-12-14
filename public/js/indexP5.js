var canvas,playButton,forwardButton,backwardButton,patternButton,input,pieces,radius,fft,analyzer,mapMouseX,mapMouseXbass,mapMouseY;
var colorPalette = ["#000", "rgba(22, 59, 72, 0.5)", "#00a6e0", "#002a38"];

var volumeHistory = [];

var number=1;
var val = 0.5;

var song,play;

var w;
var pattern=1;
/*function preload(){
    song = loadSound("test.mp3");
}*/



//initialize the page
function setup() {
    
    canvas = createCanvas(windowWidth/2,windowHeight/2);
    canvas.mousePressed(tooglePlay);
    canvas.parent('p5');


    input = createFileInput(uploaded);
    input.position(windowWidth/2-80,windowHeight/2-20);

    backwardButton = createButton('<<');
    backwardButton.position(input.width+windowWidth/2,windowHeight/2-20);
    backwardButton.mousePressed(backwardSong);

    playButton = createButton('Play..');
    playButton.style('width','50')
    playButton.position(backwardButton.width+backwardButton.x,windowHeight/2-20);
    playButton.mousePressed(tooglePlay);

    forwardButton = createButton('>>');
    forwardButton.position(playButton.width+playButton.x,windowHeight/2-20);
    forwardButton.mousePressed(forwardSong);

    patternButton = createSelect();
    patternButton.option('Pattern1');
    patternButton.option('Pattern2');
    patternButton.option('Pattern3');
    patternButton.option('Pattern4');
    patternButton.option('Pattern5');
    patternButton.position(windowWidth-patternButton.width-100,windowHeight/2-20);
    patternButton.changed(changePattern);

    input.addClass("input");
    backwardButton.addClass("back-btn");
    playButton.addClass("play-btn");
    forwardButton.addClass("for-btn");
    patternButton.addClass("change-btn");

    if(pattern == 3 || pattern == 4 || pattern == 5){
        
        colorMode(HSB);
        fft = new p5.FFT(0,16);
        w = width/16;
    }
    else{
        fft = new p5.FFT();
        analyzer = new p5.Amplitude();
    }
    //playing sound in preload method
    //song.play();

    //loading sound in callback method

}

function changePattern() {
    
    var valu = patternButton.value();
    //pattern++;
    //setup();
    if (valu=='Pattern1'){
        pattern = 1;
    }
    else if (valu=='Pattern2'){
        pattern =2;
    }
    else if (valu=='Pattern3'){
        pattern =3;
    }
    else if (valu=='Pattern4'){
        pattern =4;
    }
    else{
        pattern =5;
    }
    setup();
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
    if (pattern==1) {
        pattern1();
    }
    else if(pattern==2){
        pattern2();
    } 
    else if(pattern==3){
        pattern3();
    } 
    else if(pattern==4){
        pattern4();
    } 
    else {
        pattern5();
    }
    

}

function pattern1(){
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

}

function pattern2(){
    background(colorPalette[0]);

    translate(windowWidth/ 4, windowHeight/ 4);
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

function pattern3(){ //round equalizer
    clear();
    background(0);
    noStroke();
    var spectrum = fft.analyze();
    for(var itr = 0;itr<spectrum.length;itr++){

        var amp = spectrum[itr];
        var y = map(amp,0,255,0,height);
        noStroke();
        fill(itr*4,255,255);
        arc(width/2, height/2, y, y, 0,((2*spectrum.length-1)*PI/(spectrum.length))*itr/spectrum.length, PIE);

    }
}

function pattern4(){ //equalizer
    clear();background(0);
		noStroke();
		var spectrum = fft.analyze();
		for(var itr = 0;itr<spectrum.length;itr++){
			//var x = map(itr,0,spectrum.length,0,width);
			var amp = spectrum[itr];
			var y = map(amp,0,255,0,height/2);
			fill(itr*4,255,255);
			rect(itr*w,height*0.75-y,w,y);
		}
}

function pattern5(){
    clear();
    background(0);
    noStroke();
    var spectrum = fft.analyze();
    fill(255);
    ellipse(width/2, height/2, width/2, width/2);
    fill(0);
    ellipse(1*width/3, 1*height/3, width/8, width/8);
    ellipse(2*width/3, 1*height/3, width/8, width/8);
    arc(width/2, 2*height/3, width/8, width/8, 0,PI, PIE);

    for(var itr = 0;itr<spectrum.length;itr++){

        var amp = spectrum[itr];
        var y = map(amp,0,255,0,height/8);


        fill(itr*4,255,255);
        ellipse(1*width/3, 1*height/3, y, y);
        ellipse(2*width/3, 1*height/3, y, y);

    }
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
