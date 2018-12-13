var canvas,playButton,forwardButton,backwardButton,input,amp;
var volumeHistory = [];

var number=1;
var val = 0.5;

var song,play;

/*function preload(){
	song = loadSound("test.mp3");
}*/



//initialize the page
function setup() {
	canvas = createCanvas(windowWidth,windowHeight);
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
		background(255);
		volumeHistory.push(amp.getLevel());
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

