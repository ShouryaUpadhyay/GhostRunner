var PLAY=1;
var END=0;
var gameState=PLAY

var block,blockGroup;

var ghost,door,climber,Background;
var ghostImage,doorImage,climberImage,backgroundImage;
var climberGroup,doorGroup;
function preload(){
  
  ghostImage=loadImage("ghost-standing.png")
  doorImage=loadImage("door.png")
  climberImage=loadImage("climber.png")
  backgroundImage= loadImage("tower.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  Background=createSprite(windowWidth/2,windowHeight/2);
  Background.addImage("background",backgroundImage)
  Background.velocityY=1;
  
  ghost= createSprite(200,200,20,20);
  ghost.addImage("Ghost",ghostImage);
  ghost.scale=0.5;
  
    
  
  doorGroup= new Group();
  climberGroup=new Group();
  blockGroup= new Group();
}

function draw(){
  background("black");
  
  if(gameState===PLAY){
      
      spawnDoors();
    
  if(Background.y>windowHeight){
     Background.y=windowHeight/2;
     }
     
  if(keyDown("space")){
     ghost.velocityY=-10;
     }
     
  if(keyDown("LEFT_ARROW")){
  ghost.x=ghost.x-10;
     }
      
  if(keyDown("RIGHT_ARROW")){
  ghost.x=ghost.x+10;
     }
    
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
     }
    
 if(blockGroup.isTouching(ghost) || ghost.y>600){
   gameState=END;
   ghost.destroy();
   }
    
    ghost.velocityY= ghost.velocityY+0.5;     
      
  drawSprites();  
    
     }
 
  
  if(gameState===END){
    
    fill("lightBlue");
    stroke("black")
       textSize(24);
    text("Game Over",windowWidth/2,windowHeight/2);
  
     }
  
}

function spawnDoors(){
  
  if(frameCount%240===0){
  door= createSprite(200,-50,10,10);
  door.addImage("door",doorImage)
  door.velocityY=1;
  
   door.x= Math.round(random(120,400))
    
  climber=createSprite(200,10,10,10)  
  climber.addImage("climber",climberImage);
  climber.velocityY=1;
  climber.x=door.x;
  
  block= createSprite(200,15,10,10);
    block.velocityY=1;
    block.x=door.x;
    
    door.depth=ghost.depth;
//depth=ghost.depth;
    ghost.depth= ghost.depth+1;

    block.visible=false; 
                      
  climberGroup.add(climber);
  doorGroup.add(door);
  blockGroup.add(block);
    
    block.lifeTime=600;
     door.lifeTime=600;
    climber.lifeTime=600;
  }
  
  
}


