var spaceImg, space
var rocketImg, rocket
var asteroidImg, asteroid, asteroidGroup
var powerupImg, powerup, powerupGroup
var gameState = "play"
var score = 0

function preload(){
    spaceImg = loadImage("1253115.jpeg")
    rocketImg = loadImage("cbd3ddad1e799558f8b3143da334766b-space-rocket-clipart.png")
    asteroidImg = loadImage("image_processing.png")
    powerupImg = loadImage("orb-png-11.png")
}

function setup() {
    createCanvas(600, 600);
    
    space = createSprite(300,300);
    space.addImage("space",spaceImg);
    space.velocityY = 1;
    
    asteroidGroup = new Group ()
    powerupGroup = new Group ()
  
    rocket = createSprite(300, 500, 50, 50)
    rocket.scale = 0.3
    rocket.addImage ("rocket", rocketImg)
}

function draw() {
    background("white")
    
    if (gameState === "play"){
        stroke("yellow")
        fill("yellow")
        textSize(30)
        text("Score: " + score, 50, 50)
        
        if(space.y > 400){
          space.y = 300
        }
    
        if (keyDown("LEFT_ARROW")){
          rocket.x = rocket.x - 3
        }
        if (keyDown("RIGHT_ARROW")){
          rocket.x = rocket.x + 3
        }

        if (frameCount%120 === 0){
            score = score+1
        }

        if (powerupGroup.isTouching(rocket)){
            space.velocityY = space.velocityY + 0.5
            asteroidGroup.velocityY = asteroidGroup.velocityY + 0.5
            powerupGroup.velocityY = powerupGroup.velocityY + 0.5
        }

        if (asteroidGroup.isTouching(rocket)){
          rocket.destroy ()
          gameState = "end"
        }

        spawnObjects()
      
        drawSprites()
      }

      if (gameState === "end"){
        stroke("yellow")
        fill("yellow")
        textSize(30)
        text("Game Over", 230, 250)
      }
    drawSprites()
}

function spawnObjects() {
    if (frameCount % 240 === 0){
        asteroid = createSprite(200, -50)
        asteroid.addImage ("asteroid", asteroidImg)
        asteroid.scale = 0.25

        asteroid.x = Math.round(random(50, 550))
        asteroid.velocityY = 1.5
  
        asteroid.lifetime = 800
        asteroidGroup.add (asteroid)
    }

    if (frameCount % 360 === 0){
      powerup = createSprite (200, 10)
      powerup.addImage ("powerup", powerupImg)
        powerup.scale = 0.25

      powerup.x = Math.round(random(50, 550))
      powerup.velocityY = 2

      powerup.lifetime = 800
      powerupGroup.add (powerup)
    }
  }