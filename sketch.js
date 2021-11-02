let fe;
let fe_status;
let tm;
let tm_status;
let rightWristX;
let leftWristY;
let rightWristY;
let leftWristX;
let scoreLeftWrist;
let scoreRightWrist;
let song;

function preload() {
  fe = loadSound("assets/fur-elise.mp3");
  tm = loadSound("assets/turkish-march.mp3");
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.position(400, 200);

  video = createCapture(VIDEO);
  video.hide();

  posenet = ml5.poseNet(video, modelLoaded);
  posenet.on("pose", gotPoses);
}

function modelLoaded() {
  console.log("Posenet is initialized!");
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);

    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log(
      "Score Left Wrist: ",
      scoreLeftWrist,
      "Score Right Wrist: ",
      scoreRightWrist
    );

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("left Wrist X: " + leftWristX + ", y: " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("right Wrist X: " + rightWristX + ", y: " + rightWristY);
  }
}

function draw() {
  image(video, 0, 0, width / 2, height);
  translate(width, 0);
  scale(-1.0, 1.0);
  image(video, 0, 0, width, height);
  fill("#ff0000");
  stroke("#000000");
  fe_status = fe.isPlaying();
  if (scoreLeftWrist > 0.2) {
    console.log("Showing Left Wrist");
    circle(leftWristX, leftWristY, 20);
    tm.stop();
    if (fe_status == false) {
      fe.play();
      document.getElementById("song_name").innerHTML = "Now Playing: Fur elise";
    }
  }

  tm_status = tm.isPlaying();
  if (scoreRightWrist > 0.2) {
    console.log("Showing Right Wrist");
    circle(rightWristX, rightWristY, 20);
    fe.stop();
    if (tm_status == false) {
      tm.play();
      document.getElementById("song_name").innerHTML =
        "Now Playing: Turkish March";
    }
  }
}
