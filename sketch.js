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

// https://editor.p5js.org/jeeyoonhyun/sketches/NW40RMjGO
//Separate sentences into words

// get NYT data

let word_split = [];
let word_count = {};
let wordlist;

// const url = "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=oDa9c8tlWmnZ9SOkMm0F9W4Ekpiv0B0O";

let wordString = ''; 

function splitWords(lines) {
  word_split = wordString.split(" ");
  for (let w in word_split) {
    let word = word_split[w];
    word = word.replace(/[-_?!.,:;\(\)]/g, '');
    word = word.toLowerCase();
    if (word.length < 1) word_split.splice(w,1);
    else word_split[w] = word; //update
  }
  wordlist = [...word_split]
  console.log(wordlist);
}

async function fetchText() {
  let response = await fetch(url);
  let data = await response.json();
  for (i=0; i< 10; i++) {
    // console.log(data.results[i].abstract);
    wordString += data.results[i].abstract + ' '; 
  }
  splitWords(wordString)
  console.log(wordString)
  // wordString += data.results[0].abstract;
  // splitWords(wordString)
}


    
// let wordlist = ["federal", "health", "officials", "warned", "impatient", "governors", "on", "friday", "against", "relaxing", "pandemic", "control", "measures", "saying", "that", "a", "recent", "steep", "drop", "in", "coronavirus", "cases", "and", "deaths", "in", "the", "united", "states", "may", "be", "leveling", "off", "at", "a", "very", "high", "number", "—", "a", "shift", "that", "the", "director", "of", "the", "centers", "for", "disease", "control", "and", "prevention", "said", "“must", "be", "taken", "extremely", "seriously”", "the", "pleas", "from", "the", "director", "dr", "rochelle", "walensky", "and", "dr", "anthony", "s", "fauci", "president", "biden’s", "chief", "medical", "adviser", "for", "the", "virus", "came", "as", "the", "biden", "administration", "scrambled", "to", "stay", "ahead", "of", "a", "possible", "fourth", "surge", "of", "infections", "and", "the", "spread", "of", "worrisome", "variants", "which", "officials", "say", "account", "for", "a", "rising", "percentage", "of", "cases", "in", "the", "country", "those", "calls", "punctuated", "a", "fastpaced", "day", "of", "pandemicrelated", "developments", "around", "the", "country", "mr", "biden", "flew", "to", "houston", "to", "showcase", "the", "government’s", "latest", "mass", "vaccination", "site", "the", "food", "and", "drug", "administration", "neared", "emergency", "authorization", "of", "a", "third", "coronavirus", "vaccine", "this", "one", "from", "johnson", "&", "johnson", "and", "the", "white", "house", "enlisted", "business", "groups", "to", "help", "vaccinate", "their", "employees", "and", "reach", "americans", "resisting", "vaccinations", "behind", "it", "all", "were", "ominous", "signs", "after", "weeks", "of", "positive", "developments", "“things", "are", "tenuous”", "dr", "walensky", "said", "at", "a", "white", "house", "briefing", "on", "the", "pandemic", "“now", "is", "not", "the", "time", "to", "relax", "restrictions”", "according", "to", "a", "new", "york", "times", "database", "virus", "cases", "across", "the", "united", "states", "appear", "to", "be", "leveling", "off", "from", "the", "steep", "decline", "that", "began", "in", "january", "with", "figures", "comparable", "with", "those", "reported", "in", "late", "october", "the", "sevenday", "average", "of", "new", "cases", "was", "69450", "as", "of", "thursday", "cases", "have", "slightly", "increased", "week", "over", "week", "in", "recent", "days", "though", "severe", "weather", "limited", "testing", "and", "reporting", "in", "texas", "and", "other", "states", "the", "previous", "week", "and", "not", "all", "states", "reported", "complete", "data", "on", "the", "presidents’", "day", "holiday", "still", "the", "overall", "numbers", "remain", "horrific", "more", "than", "half", "a", "million", "americans", "are", "now", "dead", "of", "covid19", "and", "as", "of", "friday", "more", "than", "28", "million", "have", "been", "infected", "yet", "governors", "were", "chafing", "against", "coronavirusrelated", "restrictions", "and", "itching", "to", "take", "steps", "to", "restore", "a", "sense", "of", "normalcy", "in", "a", "sign", "that", "the", "partisan", "divide", "over", "the", "pandemic", "has", "not", "yet", "abated", "republicans", "seemed", "more", "eager", "to", "roll", "back", "virus", "control", "measures", "than", "democrats", "though", "in", "new", "york", "gov", "andrew", "m", "cuomo", "a", "democrat", "has", "also", "been", "easing", "restrictions", "on", "a", "variety", "of", "activities", "“there’s", "nothing", "partisan", "about", "this", "virus”", "president", "biden", "said", "speaking", "at", "a", "mass", "vaccination", "site", "in", "houston", "with", "texas’", "republican", "governor", "greg", "abbott", "and", "one", "of", "its", "republican", "senators", "john", "cornyn", "yet", "in", "texas", "mr", "abbott", "is", "considering", "lifting", "a", "statewide", "mask", "mandate", "in", "place", "since", "july", "in", "south", "carolina", "which", "has", "been", "struggling", "with", "some", "of", "the", "highest", "infection", "rates", "in", "the", "country", "gov", "henry", "mcmaster", "a", "republican", "announced", "that", "on", "monday", "restaurants", "would", "once", "again", "be", "able", "to", "serve", "alcohol", "past", "11", "pm", "and", "that", "residents", "no", "longer", "needed", "to", "get", "approval", "from", "the", "state", "to", "hold", "events", "with", "250", "people", "or", "more", "the", "move", "lifts", "orders", "imposed", "by", "the", "state", "last", "year", "in", "mississippi", "gov", "tate", "reeves", "said", "thursday", "that", "he", "was", "also", "considering", "pulling", "back", "some", "restrictions", "particularly", "mask", "mandates", "for", "people", "who", "have", "been", "fully", "vaccinated", "both", "are", "republicans", "and", "in", "florida", "republicans", "who", "gathered", "for", "the", "first", "full", "day", "of", "the", "conservative", "political", "action", "committee’s", "annual", "conference", "in", "orlando", "mocked", "coronavirus", "restrictions", "the", "hosting", "hotel", "required", "attendees", "to", "wear", "masks", "indoors", "but", "the", "conference", "had", "been", "underway", "less", "than", "two", "hours", "on", "friday", "before", "the", "requirement", "caused", "a", "scene", "shortly", "after", "josh", "mandel", "an", "ohio", "republican", "closed", "his", "speech", "with", "chants", "of", "“freedom”", "two", "conference", "officials", "walked", "quietly", "onstage", "to", "pause", "the", "event", "pleading", "with", "the", "audience", "to", "wear", "their", "masks", "the", "audience", "erupted", "in", "boos", "and", "jeers", "senator", "ted", "cruz", "republican", "of", "texas", "then", "made", "fun", "of", "pandemic", "rules", "like", "wearing", "masks", "in", "restaurants", "here", "in", "washington", "biden", "administration", "officials", "pleaded", "with", "americans", "to", "be", "patient", "dr", "fauci", "echoed", "dr", "walensky’s", "warnings", "that", "more", "rollbacks", "at", "state", "or", "local", "levels", "would", "be", "unwise", "noting", "that", "with", "coronavirus", "cases", "still", "hovering", "at", "around", "70000", "per", "day", "the", "country", "remains", "in", "a", "“very", "precarious", "position”", "“we", "don’t", "want", "to", "be", "people", "always", "looking", "at", "the", "dark", "side", "of", "things", "but", "you", "want", "to", "be", "realistic”", "he", "said", "“so", "we", "have", "to", "carefully", "look", "at", "what", "happens", "over", "the", "next", "week", "or", "so", "with", "those", "numbers", "before", "you", "start", "making", "the", "understandable", "need", "to", "relax", "on", "certain", "restrictions”", "while", "coronavirus", "deaths", "tend", "to", "fluctuate", "more", "than", "cases", "and", "hospital", "admissions", "dr", "walensky", "said", "the", "most", "recent", "sevenday", "average", "was", "slightly", "higher", "than", "the", "average", "earlier", "in", "the", "week", "the", "sevenday", "average", "of", "newly", "reported", "deaths", "was", "2165", "as", "of", "thursday", "“we", "at", "cdc", "consider", "this", "a", "very", "concerning", "shift", "in", "the", "trajectory”", "she", "said", "adding", "“i", "want", "to", "be", "clear", "cases", "hospital", "admissions", "and", "deaths", "—", "all", "remain", "very", "high", "and", "the", "recent", "shift", "in", "the", "pandemic", "must", "be", "taken", "extremely", "seriously”", "dr", "walensky", "said", "some", "of", "the", "rise", "may", "be", "attributable", "to", "new", "variants", "of", "the", "coronavirus", "that", "spread", "more", "efficiently", "and", "quickly", "the", "socalled", "b117", "variant", "which", "first", "emerged", "in", "britain", "now", "accounts", "for", "approximately", "10", "percent", "of", "all", "cases", "in", "the", "united", "states", "up", "from", "1", "percent", "to", "4", "percent", "a", "few", "weeks", "ago", "she", "said", "the", "united", "states’", "ability", "to", "track", "variants", "is", "much", "less", "robust", "than", "britain’s", "even", "so", "data", "gathered", "by", "the", "cdc", "shows", "the", "number", "of", "cases", "with", "the", "variant", "in", "the", "country", "has", "risen", "from", "76", "in", "12", "states", "as", "of", "jan", "13", "to", "more", "than", "2100", "in", "45", "states", "as", "of", "thursday", "but", "the", "actual", "infections", "may", "be", "much", "higher", "because", "of", "inadequate", "surveillance", "efforts", "“i", "know", "people", "are", "tired", "they", "want", "to", "get", "back", "to", "life", "to", "normal”", "dr", "walensky", "said", "“but", "we’re", "not", "there", "yet”", "dr", "walensky’s", "strong", "and", "vocal", "warnings", "made", "clear", "that", "in", "the", "biden", "administration", "unlike", "the", "trump", "administration", "the", "cdc", "director", "was", "being", "given", "a", "powerful", "voice", "under", "president", "donald", "j", "trump", "the", "agency", "was", "all", "but", "silenced", "after", "one", "of", "its", "top", "officials", "dr", "nancy", "messonnier", "told", "reporters", "almost", "exactly", "a", "year", "ago", "that", "the", "coronavirus", "would", "cause", "severe", "disruptions", "to", "american", "life", "at", "the", "same", "time", "administration", "officials", "tried", "to", "spotlight", "their", "efforts", "to", "guide", "the", "nation", "out", "of", "the", "pandemic", "including", "ramping", "up", "the", "national", "coronavirus", "vaccination", "campaign", "acquiring", "new", "therapeutics", "and", "drawing", "the", "private", "sector", "into", "the", "fight", "in", "houston", "mr", "biden", "echoed", "the", "warnings", "coming", "from", "his", "team", "“cases", "and", "hospitalizations", "could", "go", "back", "up", "as", "new", "variants", "emerge”", "he", "said", "“and", "it’s", "not", "the", "time", "to", "relax”", "about", "an", "hour", "before", "mr", "biden", "was", "to", "speak", "in", "houston", "a", "panel", "of", "expert", "advisers", "to", "the", "food", "and", "drug", "administration", "voted", "unanimously", "to", "give", "the", "green", "light", "to", "johnson", "&", "johnson’s", "covid19", "vaccine", "clearing", "the", "last", "hurdle", "before", "a", "formal", "emergency", "authorization", "expected", "on", "saturday", "the", "vaccine", "will", "join", "two", "others", "one", "by", "moderna", "and", "the", "other", "by", "pfizerbiontech", "that", "are", "authorized", "for", "use", "in", "the", "united", "states", "but", "unlike", "the", "first", "two", "johnson", "&", "johnson’s", "vaccine", "takes", "only", "one", "dose", "and", "has", "fewer", "shipping", "and", "handling", "difficulties", "earlier", "on", "friday", "the", "biden", "administration", "announced", "it", "has", "purchased", "100000", "doses", "of", "a", "recently", "authorized", "covid19", "treatment", "from", "eli", "lilly", "increasing", "the", "supply", "of", "such", "drugs", "for", "patients", "who", "are", "at", "high", "risk", "of", "becoming", "seriously", "ill", "but", "are", "not", "yet", "hospitalized", "the", "treatment", "is", "a", "cocktail", "of", "monoclonal", "antibodies", "the", "government", "will", "pay", "$210", "million", "for", "an", "initial", "tranche", "of", "100000", "doses", "which", "the", "company", "will", "ship", "by", "the", "end", "of", "march", "the", "administration", "has", "an", "option", "to", "buy", "an", "additional", "11", "million", "more", "doses", "through", "november", "if", "necessary", "mr", "biden", "has", "often", "compared", "the", "fight", "against", "the", "coronavirus", "to", "wartime", "mobilization", "but", "with", "the", "exception", "of", "pharmaceutical", "companies", "the", "private", "sector", "has", "done", "relatively", "little", "in", "the", "effort", "it", "has", "not", "made", "a", "major", "push", "to", "persuade", "americans", "to", "remain", "socially", "distant", "wear", "masks", "or", "get", "vaccinated", "as", "soon", "as", "possible", "the", "administration", "said", "friday", "that", "it", "was", "trying", "to", "change", "that", "by", "joining", "with", "business", "lobbying", "groups", "including", "the", "us", "chamber", "of", "commerce", "national", "association", "of", "manufacturers", "and", "the", "business", "roundtable", "to", "encourage", "companies", "to", "support", "workers", "in", "getting", "vaccinated", "by", "offering", "paid", "time", "off", "or", "benefits", "“there", "is", "a", "light", "at", "the", "end", "of", "the", "tunnel”", "neil", "bradley", "the", "chief", "policy", "officer", "for", "the", "us", "chamber", "of", "commerce", "said", "in", "an", "interview", "“we", "have", "to", "get", "to", "that", "light", "as", "quickly", "as", "possible", "and", "employers", "can", "be", "a", "huge", "asset", "in", "getting", "us", "there”", "andy", "slavitt", "a", "senior", "health", "adviser", "for", "the", "biden", "administration", "said", "it", "was", "issuing", "a", "“call", "to", "action”", "to", "corporate", "america", "to", "urge", "businesses", "to", "make", "“unique", "commitments", "that", "bring", "their", "unique", "skills", "and", "resources”", "to", "fighting", "the", "pandemic", "he", "ticked", "off", "a", "range", "of", "ways", "that", "the", "private", "sector", "has", "already", "become", "engaged", "ford", "and", "the", "gap", "intend", "to", "donate", "more", "than", "100", "million", "masks", "for", "free", "distribution", "uber", "and", "lyft", "are", "teaming", "up", "with", "pharmacies", "to", "offer", "free", "or", "discounted", "rides", "to", "vaccination", "sties", "best", "buy", "dollar", "general", "and", "target", "will", "give", "workers", "paid", "time", "off", "to", "get", "a", "shot", "mr", "slavitt", "said", "the", "initiatives", "would", "be", "coordinated", "by", "the", "companies", "themselves", "and", "the", "administration", "did", "not", "have", "a", "formal", "role", "all", "three", "of", "the", "administration", "officials", "—", "mr", "slavitt", "dr", "fauci", "and", "dr", "walensky", "—", "made", "clear", "that", "vaccination", "and", "doubling", "down", "on", "public", "health", "measures", "that", "stem", "the", "spread", "of", "the", "virus", "like", "wearing", "masks", "and", "social", "distancing", "were", "the", "only", "path", "out", "of", "the", "pandemic", "“we", "may", "be", "done", "with", "the", "virus”", "dr", "walensky", "said", "“but", "clearly", "the", "virus", "is", "not", "done", "with", "us”"]


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

function preload() {
  fontSans = loadFont('./OpenSans.ttf');
  fontPixel = loadFont('./Mister_Pixel_Regular.otf');
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
  
  for(let i = 0;i<windowWidth/20;i++){
    particles.push(new Particle());
  }
}

function modelReady() {
  console.log("Model ready!");
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
