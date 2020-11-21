const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var ground1, ground2;

var boxes = [];
var backgroundImg;
var score = 0;
var chances = 0;


function preload() {
  getBackgroundImg();
}

function setup() {
  createCanvas(800,400);
  // createSprite(400, 200, 50, 50);

  engine = Engine.create();
	world = engine.world;

  ground1 = new Ground(350, 350, 200, 15);
  ground2 = new Ground(650, 200, 160, 15);

  //boxes on ground1
  createBox(270, 332, 9, "lightBlue");
  createBox(290, 312, 7, "pink");
  createBox(310, 292, 5, "lightGreen");
  createBox(330, 272, 3, "purple");
  createBox(350, 252, 1, "lightGrey");
  
  
  //boxes on ground2
  createBox(590, 182, 7, "lightBlue");
  createBox(610, 162, 5, "pink");
  createBox(630, 142, 3, "lightGreen");
  createBox(650, 122, 1, "purple");

  hexagon = new Polygon(50, 270, 40, 40);
  sling = new SlingShot(hexagon.body,{x:70, y: 270})



  Engine.run(engine);
}

function draw() {
  if(backgroundImg) {
    background(backgroundImg);
    Engine.update(engine);

    strokeWeight(3);
    stroke("white");
    textSize(18);
    text("score :" + score, 50, 50);

    strokeWeight(3);
    stroke("white"); 
    textSize(18);
    text("/41", 125, 50);

    strokeWeight(3);
    stroke("white");
    textSize(18);
    text("no of chances :" + chances, 600, 50);

    // stroke("white");
    // textSize(18);
    // text("Press Space To Get Another Chance", 500, 320);

    ground1.display();
    ground2.display();
    hexagon.display();
    sling.display();

    for(i = 0; i < boxes.length; i++){
      boxes[i].display();
    }

    // console.log(boxes);
    // console.log(i);
    for(i = 0; i < boxes.length; i++) {
      boxes[i].score();
    }
    
    if(sling.isHexagonAttached() == false) {
      stroke("white");
      textSize(18);
      text("Press Space To Get Another Chance", 500, 320);
    }
  }
  drawSprites();
}

function createBox(x, y, count, color) {
  var posX = x;
  for(i = 0; i < count; i++) {
    boxes.push(new Box(posX, y, 20, 20, color));
    posX = posX + 20;
  }
}

function mouseDragged() {
  //console.log(`x: ${mouseX}, y: ${mouseY}`)
  Matter.Body.setPosition(hexagon.body,{x: mouseX, y: mouseY});
}

function mouseReleased() {
	//console.log("mouse released")
  sling.fly();
}

function keyPressed() {
  if(keyCode == 32) {
      sling.attach(hexagon.body);
      Matter.Body.setPosition(hexagon.body, {x: 50 , y: 270});
      chances = chances + 1;
  }
}



async function getBackgroundImg() {
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responsejson = await response.json();
  var datetime = responsejson.datetime;
  var hour = datetime.slice(11, 13);
  if(hour >= 06 && hour <= 19) {
    bg = "sprites/day.png"; 
  } else {
    bg = "sprites/night.png";
  }
  backgroundImg = loadImage(bg);
}