song = "";
song1 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
  song1 = loadSound("music.mp3");
  song2 = loadSound("music2.mp3");
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotePoses);
}

function modelLoaded() {
  console.log("poseNet Is Initialized");
}

function draw() {
  image(video, 0, 0, 600, 500);

  fill("#FF0000");
  stroke("#FF0000");

  if (pontuacaoPulsoDireito > 0.2) {
    const x = poses[0].pose.keypoints[9].position.x;
    const y = poses[0].pose.keypoints[9].position.y;

    // Desenhe um círculo nas coordenadas x e y do pulso direito
    ellipse(x, y, 50, 50);

    // Pare a reprodução da musica1
    musica1.stop();

    // Adicione a condição para verificar se a musica2 está parada
    if (!musica2EstaTocando) {
      // Toque a musica2
      musica2.play();

      // Atualize a tag de cabeçalho com o nome da musica2
      document.getElementById("song").innerText = "Nome da Musica 2";
    }
  } else {
    // Se a pontuação do pulso direito for menor ou igual a 0.2, pare a reprodução da musica2
    if (musica2EstaTocando) {
      musica2.stop();
    }

    // Toque a musica1 se não estiver tocando
    if (!musica1.isPlaying()) {
      musica1.play();

      // Atualize a tag de cabeçalho com o nome da musica1
      document.getElementById("song").innerText = "Nome da Musica 1";
    }
  }
}

function play() {
  song.play();
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist =" + scoreLeftWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX =" + leftWristX + "leftWristY =" + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX =" + rightWristX + "rightWristY =" + rightWristY);
  }
}
