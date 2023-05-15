song1 = "passion.mp3";
song2 = "lofi.mp3";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song1 = loadSound("passion.mp3");
    song2 = loadSound("lofi.mp3");
}

function setup() {
    canvas = createCanvas(400,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    song2.play();
}

function draw() {
    image(video, 0, 0, 600, 500);

	fill("#FF0000");
	stroke("#FF0000");

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
		InNumberleftWristY = Number(leftWristY); 
		remove_decimals = floor(InNumberleftWristY);
		volume = remove_decimals/500;
		document.getElementById("volume").innerHTML = "Volume = " + volume;		
		song.setVolume(volume);	
	}
}

function stop() {
    song1.stop();
    song2.stop();
}

function play() {
    song.play();
	song.setVolume(1);
	song.rate(1);
}
//It will play the first song.When wrist is raised,it will play 'song2'//

function modelLoaded() {
    console.log('pose net is initialized');
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.X;
        leftWristY = results[0].pose.leftWrist.Y;
        console.log("left wrist x = " + leftWristX + "left wrist y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.X;
        rightWristY = results[0].pose.rightWrist.Y;
        console.log("right wrist x = " + rightWristX + "right wrist y = " + rightWristY);
    }
}
