var rodSpeed = 0;
var rod1 = $(".rod1");
var rod2 = $(".rod2");
var ball = $(".ball");
var ballMovingX = ball.position().left;
var ballMovingY = ball.position().top;
var ballSpeedX = 5;
var ballSpeedY = 2;
var x;
var maxScore = 0;
var achievedScore = 0;
var player = "Rod1";
// console.log("Hi");

$(document).on("keydown", function (e) {
  // console.log(e.key);
  let distance = $(window).width() - rod1.width();
  // console.log(distance);
  if (e.key == "d" && rodSpeed < distance) {
    rodSpeed += 30;
    rod1.css("transform", `translateX(${rodSpeed}px)`);
    rod2.css("transform",`translateX(${rodSpeed}px)`);
  }else if(e.key == 'a' && rodSpeed > 0){
      rodSpeed -= 30;
      rod1.css("transform",`translateX(${rodSpeed}px)`);
      rod2.css("transform",`translateX(${rodSpeed}px)`);
  }else if(e.key == "Enter"){
      start();
  }  
});    

function start(){
    x = setInterval(function(){
        let ballY = $(window).height()-ball.height()-rod1.height()-rod2.height();
        let ballX = $(window).width()-ball.width();
    
        if(ballMovingY > ballY){
            if(gameOverCheck()== "false"){
                return;
            }
            player = "Rod 2";
            achievedScore += 100;
            ballSpeedY = -ballSpeedY;
        }
        if(ballMovingX > ballX){
            ballSpeedX = -ballSpeedX;
        }
        if(ballMovingX < 0){
            ballSpeedX = -ballSpeedX;
        }
        if(ballMovingY < 0){
            if(gameOverCheck() == "false"){
                return;
            }
            achievedScore += 100;
            player = "Rod 1";
            ballSpeedY = -ballSpeedY;
        }
    
        ballMovingX += ballSpeedX;
        ballMovingY += ballSpeedY;
    
        ball.css("transform",`translate(${ballMovingX}px,${ballMovingY}px)`);},10);
    
}

function gameOverCheck(){
    if(ball.position().left < rod1.position().left ||ball.position().left > rod1.position().left + rod1.width()){
        clearInterval(x);
        if(achievedScore > maxScore){
            maxScore = achievedScore;
        }
        alert(`Score of this round is : ${achievedScore} \nMaximum Score : ${maxScore}`);
        achievedScore = 0;
        ball.position().left = 50 + 'vw';
        ball.position().top = 50 + 'vh';
        return false;   
    }
    return true;
    
}