var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost=createSprite(200,200);
  ghost.addImage("ghost", ghostImg);
  ghost.scale=0.3;
  doorsGroup=createGroup();  
  climbersGroup=createGroup();
  invisibleBlocksGroup=createGroup();
}

function draw() {
  background(0);
  if (gameState=="play"){
    if(tower.y > 400){
      tower.y = 300
    }
    if (keyDown(LEFT_ARROW)){
      ghost.x=ghost.x-2;
    }
    if (keyDown(RIGHT_ARROW)){
      ghost.x=ghost.x+2;
    }
    if (keyDown(UP_ARROW)){
      ghost.velocityY=-10;
    }
    ghost.velocityY=ghost.velocityY+0.8;
spawnDoors();
drawSprites();
if(ghost.isTouching(climbersGroup)){
  ghost.velocityY=0;
}
if (ghost.y>600||ghost.isTouching(invisibleBlocksGroup)){
  gameState="over";
}
  }

  else if (gameState=="over"){
    textSize(40);
    fill ("yellow");
    stroke("red");
    strokeWeight(5)
    text("Game Over!!!", 190, 300);
  }
 
}

function spawnDoors(){
  if (frameCount%240===0){
    door=createSprite(200,-50);
    climber=createSprite(200,10);
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    door.x=Math.round(random(100,500));
    climber.x=door.x;
    invisibleBlock.x=door.x;
    invisibleBlock.debug=true;
    door.addImage("doorPic", doorImg);
    climber.addImage("climberPic", climberImg);
    door.velocityY=1;
    climber.velocityY=1;
    invisibleBlock.velocityY=1;
    door.depth=ghost.depth;
    ghost.depth+=1;
    climber.lifetime=800;
    door.lifetime=800;
    invisibleBlock.lifetime=800;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlocksGroup.add(invisibleBlock);
  }
}
