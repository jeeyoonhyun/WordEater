//mobile/PC resolution (not for installation)

let video;
let particles = [];
let fontSans, fontPixel;



let handX, handY;
let handDistance;

//resolution related
let s = 1.5;
let cube;

//handpose
let handpose;
let predictions = [];
let r;
let threshold;

// text
let maxwords = 150;



// get NYT data

let key = config.TOKEN // Don't forget to revoke this after demo
const url = `https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=${key}`

async function fetchText() {
  let response = await fetch(url);
  let data = await response.json();
  for (i=0; i< 10; i++) {
    // console.log(data.results[i].abstract);
    wordString += data.results[i].abstract + ' '; 
  }
  wordlist = splitWords(wordString)
  console.log(wordString)
}


//Separate sentences into words

let wordString = ''; 
let wordlist = [];

const splitWords = (input) => {
  let wl = []
  let word_split = input.split(" ");
  for (let w in word_split) {
    let word = word_split[w];
    word = word.replace(/[-_?!.,:;\(\)]/g, '');
    word = word.toLowerCase();
    (word.length < 1) ? {} : wl.push(word); //update
  }
  console.log(wl);
  return wl;
}

let selectedWords = [];

// particles
class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
    constructor(){
      this.x = random(0,windowWidth);
      this.y = random(0,windowHeight);
      this.r = random(1, cube);
      this.xSpeed = random(-1,1);
      this.ySpeed = random(-1,1.5);
      this.word = random(wordlist); //assign a random word to the particle
    }
  
  // creation of a particle.
    createParticle() {
      stroke('black');
      push();
      translate(-this.x+windowWidth/2,this.y-windowHeight/2);
      if (dist(handX, handY, this.x, this.y) < threshold) {
        fill('black');
        stroke('white');
        rotateX(frameCount * 0.05);
        rotateY(frameCount * 0.05);
        box(this.r*1.5);
      } else {
        box(this.r);
      }
      pop();

      push();
      translate(-this.x+windowWidth/2,this.y-windowHeight/2);
      if (dist(handX, handY, this.x, this.y) < threshold) {
        textAlign(CENTER, CENTER);
        fill('black');
        textSize(cube/4 + this.r/2);
        textFont(fontSans);
        text(this.word,0,12);
      }
      pop();
    }
  
  // setting the particle in motion.
    moveParticle() {
      if(this.x <= 0 || this.x >= windowWidth) {
        this.xSpeed*=-1;
      } 
      if(this.y <= 0 || this.y >= windowHeight) {
        this.ySpeed*=-1;
      }
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;
    }
  }

// mesh annotations
// source: https://github.com/tensorflow/tfjs-models/blob/master/handpose/src/keypoints.ts
const mesh = {
  thumb: [1, 2, 3, 4],
  indexFinger: [5, 6, 7, 8],
  middleFinger: [9, 10, 11, 12],
  ringFinger: [13, 14, 15, 16],
  pinky: [17, 18, 19, 20],
  palmBase: [0]
};

const fetchStuff = () => { //put this in preload
  fetch(url)
  .then(response => {
      // handle the response
      console.log('fetched!')
      fetchText();
  })
  .catch(error => {
      // handle the error
      console.log('Something wrong happened!')
  });
}

function preload() {
  fontSans = loadFont('./OpenSans.ttf');
  fontPixel = loadFont('./Mister_Pixel_Regular.otf');
  fetchStuff();
}

function setup() { 
  //resolution related
  cube = windowWidth/50;
  r = windowWidth/120;
  threshold = windowWidth/5;
  frameRate(24);
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  handpose = ml5.handpose(video, modelReady);
  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", results => {
    predictions = results;
    if (predictions[0]) { //only works when hand is detected
      handDistance = dist(
          predictions[0].landmarks[4][0], predictions[0].landmarks[4][1], predictions[0].landmarks[4][2],
          predictions[0].landmarks[8][0], predictions[0].landmarks[8][1], predictions[0].landmarks[8][2]
      );
      handX = (predictions[0].boundingBox.bottomRight[0] + predictions[0].boundingBox.topLeft[0]) / 2;
      handY = (predictions[0].boundingBox.bottomRight[1] + predictions[0].boundingBox.topLeft[1]) / 2;
    }
  });

  // Hide the video element, and just show the canvas
  video.hide();


  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0,0);
  canvas.style('z-index','-1')
  

}

function modelReady() {
  console.log("Model ready!");

  for(let i = 0;i<windowWidth/20;i++){ //generate particles when model is ready
    particles.push(new Particle());
    console.log(`new particle created! word is:${particles[i].word}`)
  }
}

function draw() {
  // if (!handIsOpen) {
  //   console.log('hand is closed');
  // }
  //if word is too long, refresh
  if (selectedWords.join(' ').length > maxwords) {
    selectedWords = [];
  }

  blendMode(BLEND);
  background(255);

  //words
  push();
  fill('black');
  textFont(fontPixel);
  textSize(cube*2.4);
  text(selectedWords.join(' '),-windowWidth/2+windowWidth/32,-windowHeight/2+windowHeight/32, windowWidth-windowWidth/64,windowHeight-windowHeight/64);
  pop();

  // bounding box
  // push();
  // scale(-1, 1);
  // stroke(0)
  // noFill();
  // ellipse(handX-windowWidth/2, handY-windowHeight/2, 100);
  // if (predictions[0]) {
  //   rect(predictions[0].boundingBox.topLeft[0]-windowWidth/2,predictions[0].boundingBox.topLeft[1]-windowHeight/2,predictions[0].boundingBox.bottomRight[0]-predictions[0].boundingBox.topLeft[0], predictions[0].boundingBox.bottomRight[1]-predictions[0].boundingBox.topLeft[1]);
  // }
  // pop();

  //particle creation and deletion
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    if (dist(handX, handY, particles[i].x, particles[i].y) < 80 && !handIsOpen()) {
      selectedWords.push(particles[i].word);
      particles.splice(i,1)
    }
    try {
      particles[i].moveParticle();
    } catch {
      // console.log('moveParticle error');
    }
  }
  //  create new particles when there's few
  if (particles.length <10) {
      particles.push(new Particle());
  }

  // handpose
  push();
  translate(windowWidth/2, -windowHeight/2);
  scale(-1, 1); //flip webcam
  drawKeypoints();
  pop();
}
 
//draw handpose keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      push();
      stroke('rgb(150,150,150)');
      fill('rgb(220,220,220)');
      // if (j == 4 || j == 8) {
      //   fill('red');
      // }else {
      //   fill('black');
      // }
      rect(keypoint[0], keypoint[1], r, r);
      pop();
    }
  }
}

// calculate distance between points 13 and 14 (center of mouth)s
function handIsOpen() {
  if (handDistance > threshold) { // modify distance for testing
    return true;
  } else {
    return false;
  }
}
