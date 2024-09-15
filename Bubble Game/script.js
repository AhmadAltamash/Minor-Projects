function bubbleGenerate(){
    var clutter = "";

    for(var i = 0; i<=151; i++){
        var random = Math.floor(Math.random()*10);
        clutter += `<div class="bubble">${random}</div>`;
    }
    document.querySelector(".panel-bottom").innerHTML = clutter;
}

var random;
function hitGenerate(){

    random = Math.floor(Math.random()*10);
    document.querySelector("#hit").innerHTML = random;
}

function timer() {
    var countDown = 60;
    var countDown2 = 5;
    
    var timeInterval = setInterval(function () {
        if (countDown > 0) {
            countDown--;
            document.querySelector("#timer").innerHTML = countDown;
        } else {
            clearInterval(timeInterval);
            
            var timeInterval2 = setInterval(function () {
                if (countDown2 > 0) {
                    document.querySelector(".panel-bottom").innerHTML = `
                    <h1>Game Over</h1>
                    <h2>Final Score: ${fscore.innerHTML}</h2>
                    <h4>The Game is Restarting in ${countDown2}</h4>`;
                    countDown2--;
                } else {
                    clearInterval(timeInterval2);
                    window.location.reload();
                }
            }, 1000);
        }
    }, 1000);
}


var score = 0;
var fscore = document.querySelector("#score")
function scoreIncrement(){
    score += 10;
    fscore.innerHTML = score
}

function play(){
    document.querySelector(".panel-bottom").addEventListener("click",function(dets){
        var bubbleNum = Number(dets.target.textContent);
        if(random === bubbleNum){
            bubbleGenerate();
            scoreIncrement();
            hitGenerate();
        }
        else{
            let jitter = document.querySelectorAll(".bubble");
            jitter.forEach(item => {
                item.classList.toggle("bubbleJitter");
            });
        }
    })
}



play()
hitGenerate()
timer()
bubbleGenerate();
