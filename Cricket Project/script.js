function getTime() {
  let h1 = document.querySelector("#time");
  setInterval(() => {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();

    h1.innerText = h + ":" + m + ":" + s;
  }, 1000);
}
getTime();

let w = document.querySelector("#win")
let l = document.querySelector("#loss") 
let t = document.querySelector("#tie")

function CPU() {
  let rndm = Math.random() * 3;

  if (rndm > 0 && rndm <= 1) { cpuchoice = "Bat"; }
  else if
    (rndm > 1 && rndm <= 2) { cpuchoice = "Ball"; }
  else 
  {
     cpuchoice = "Stump"; 
    }

  return cpuchoice
}

let score;
let b1 = document.querySelector("#b1")
let b2 = document.querySelector("#b2")
let b3 = document.querySelector("#b3")
let scoreStr = localStorage.getItem('score')
resetScore(scoreStr)

function resetScore(scoreStr){
  score = JSON.parse(scoreStr) || {
  win : 0,
  loss : 0,
  tie : 0,
}
updateScore()
}
function updateScore() {
  w.innerText = `Win: ${score.win}`;
  l.innerText = `Loss: ${score.loss}`;
  t.innerText = `Tie: ${score.tie}`;
}
b1.addEventListener("click", function(){
  userchoice = "Bat"
  startMatch()
  // localStorage.setItem('score',JSON.stringify(score))
  // updateScore()
})
b2.addEventListener("click", function(){
  userchoice = "Ball"
  startMatch()
  // localStorage.setItem('score',JSON.stringify(score))
  // updateScore()
})
b3.addEventListener("click", function(){
  userchoice = "Stump"
  startMatch()
  // localStorage.setItem('score',JSON.stringify(score))
  // updateScore()
})

function startMatch() {

  let cpuchoice = CPU();

  if(userchoice === "Bat" && cpuchoice === "Bat")
  {
    t.innerText = `Tie: ${score.tie+=1}`
    stm.innerHTML = `${p} chose Bat and Cpu Chose Bat`
  }
  else if(userchoice === "Ball" && cpuchoice === "Ball")
    {
      t.innerText = `Tie: ${score.tie+=1}`
      stm.innerHTML = `${p} chose Ball and Cpu Chose Ball`
    }
    else if(userchoice === "Stump" && cpuchoice === "Stump")
    {
        t.innerText = `Tie: ${score.tie+=1}`
        stm.innerHTML = `${p} chose Stump and Cpu Chose Stum`
    }
  else if(userchoice === "Bat" && cpuchoice === "Ball")
  {
    w.innerText = `Win: ${score.win+=1}`
    stm.innerHTML = `${p} chose Bat and Cpu Chose Ball`  
  }
  else if(userchoice === "Ball" && cpuchoice === "Bat")
  {
    l.innerText = `Loss: ${score.loss+=1}`
    stm.innerHTML = `${p} chose ball and Cpu Chose bat`
  } 
  else if(userchoice === "Bat" && cpuchoice === "Stump")
  {
    l.innerText = `Loss: ${score.loss+=1}`
    stm.innerHTML = `${p} chose Bat and Cpu Chose stump`
  }
  else if(userchoice === "Stump" && cpuchoice === "Bat")
  {
    w.innerText = `Win: ${score.win+=1}`
    stm.innerHTML = `${p} chose Stump and Cpu Chose Bat`
  }
  else if(userchoice === "Ball" && cpuchoice === "Stump")
  {
    w.innerText = `Win: ${score.win+=1}`
    stm.innerHTML = `${p} chose Ball and Cpu Chose Stump`
  }
  else
  {
    l.innerText = `Loss: ${score.loss+=1}`
    stm.innerHTML = `${p} chose Stump and Cpu Chose Ball
                       ${p} Lost`
  }
  localStorage.setItem('score',JSON.stringify(score))
  updateScore()
}

let clr = document.querySelector("#clear")

clr.addEventListener("click", function cler() {
    
    resetScore(null)
    updateScore()
    localStorage.clear();
});

let stm = document.querySelector("#state")


let h = document.querySelector("#naam1")
h.addEventListener("keydown", function(event){
  if(event.key === "Enter") 
  {
      p = h.value
      h.outerHTML = `Welcome ${p}`
      localStorage.setItem('name', p)
  }
}) 

let storedName = localStorage.getItem('name');
if (storedName) {
  p = storedName;
  h.outerHTML = `Welcome ${p}`;
}

