var canvas,playButton,forwardButton,backwardButton,input,amp;

var number=1;
var val = 0.5;

var song,colorP5;
var colorChange = true;

/*function preload(){
	song = loadSound("test.mp3");
}*/



//initialize the page
function setup() {
	canvas = createCanvas(windowWidth,windowHeight);
	canvas.parent('p5Div');
	canvas.mousePressed(tooglePlay);

	input = createFileInput(uploaded);
	input.position(0,windowHeight-100);

	backwardButton = createButton('<<');
	backwardButton.position(input.width,windowHeight-100);
	backwardButton.mousePressed(backwardSong);

	playButton = createButton('Play');
	playButton.style('width','50')
	playButton.position(backwardButton.width+backwardButton.x,windowHeight-100);
	playButton.mousePressed(tooglePlay);

	forwardButton = createButton('>>');
	forwardButton.position(playButton.width+playButton.x,windowHeight-100);
	forwardButton.mousePressed(forwardSong);

	amp = new p5.Amplitude();

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
	clear();
	/*if(colorChange){
		colorP5 = random(255);
		background(colorP5);
	}*/

	var vol = amp.getLevel();

	//fill(random(255),random(255),random(255));
	noStroke();
	fill(255,0,random(255));
	ellipse(width/2,height/2,vol*width/val,vol*width/val);

	//fill(random(255),random(255),random(255));
	noStroke();
	fill(255,0,random(255));
	ellipse(width/2,height/2,0.5*vol*width/val,0.5*vol*width/val);

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
