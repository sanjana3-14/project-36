var ball, ballPosition, database, position;

function preload(){
    backgroundImg = loadImage("images/img/bg.png")
    balloonImg = loadImage("images/img/hb.png")
}

function setup(){
    createCanvas(displayWidth,displayHeight);
    database = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.addImage(balloonImg)

    ballPosition = database.ref('ball/position');
    ballPosition.on("value", readPosition, showError)
    
}

function draw(){
    background(backgroundImg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("ball/position").set({
        'x':position.x + x ,
        "y":position.y + y 
    })
}

function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("there is error in reading")
}