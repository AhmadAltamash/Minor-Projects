function smoothscroll(){
    gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,

  tablet: { smooth: true },

  smartphone: { smooth: true }
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
});
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();
}

function menuBar(){
  let nav = document.querySelector(".menu2")
  let close = document.querySelector(".close")
  var tl = gsap.timeline();
  tl.to(".nav-content",{
    opacity:1,
    duration:0.1,
    y:0,
  },"aajao")
  tl.to(".nav-content .elem",{
    display:"block",
    duration:0.1,
    y:0,
    stagger:0.2,
  },"aajao")
  tl.pause()
  nav.addEventListener("click",()=>{
    nav.style.display = "none";
    close.style.display = "block";
    tl.play();
  })
  close.addEventListener("click",()=>{
    nav.style.display = "";
    close.style.display = "none"
    tl.reverse()
  })
}

function rotate(){
  let items = document.querySelectorAll(".content")
  items.forEach(item =>{
    item.addEventListener('mousemove', (dets) =>{

      let positionPx = dets.x - item.getBoundingClientRect().left
      let positionX = (positionPx / item.offsetWidth) * 100;

      let positionPy = dets.y - item.getBoundingClientRect().top;
      let positionY = (positionPy / item.offsetHeight) * 100;

      item.style.setProperty('--rX', (0.5)*(50 - positionY) + 'deg')
      item.style.setProperty('--rY', (0.5)*(50 - positionX) + 'deg')
    })

    item.addEventListener("mouseout", ()=>{
      item.style.setProperty('--rX', '0deg')
      item.style.setProperty('--rY', '0deg')
    })
  })
}

function firstPage(){
  gsap.from("nav img",{
    opacity:0,
    duration:1,
    y:80,
    ease:Expo.easeInOut
  })
  gsap.from("nav span",{
    opacity:0,
    duration:1,
    y:80,
    ease:Expo.easeInOut
  })
  var tl = gsap.timeline()
  tl.from("#first-project .wrap",{
    opacity:0,
    duration:1,
    ease:Expo.easeInOut,
  },"eksath")
  tl.from("#first-project .about",{
    opacity:0,
    duration:1,
    ease:Expo.easeInOut,
  },"eksath")
  tl.from("#second-project .wrap",{
    opacity:0,
    duration:1,
    ease:Expo.easeInOut,
  },"eksath")
  tl.from("#second-project .about",{
    opacity:0,
    duration:1,
    ease:Expo.easeInOut,
  },"eksath")
  // var tl2 = gsap.timeline({
  //   scrollTrigger:{
  //       trigger:"#page2",
  //       scroller:"body",
  //       markers:true,
  //       start:"15% 50%",
  //       end:"20% 10%",
  //       scrub:3,
  //   },
  // })
  // tl2.from("#page2 #third-project .wrap",{
  //   opacity:0,
  //   duration:1,
  //   ease:Expo.easeInOut,
  // })
}

function sideBar(){
    var tl = gsap.timeline()
    var menu = document.querySelector("nav span .menu")
    var close = document.querySelector(".sidebar i")
    tl.to(".sidebar",{
      right:0,
      duration:0.5,
    })
    tl.from(".sidebar span",{
      opacity:0,
      x:100,
      stagger:0.2,
    })
    tl.from(".sidebar i",{
      opacity:0,
    })
    tl.pause();
    menu.addEventListener("click",()=>{
      menu.style.display = "none"
      tl.play()
    })
    close.addEventListener("click",()=>{
      menu.style.display = "block"
      tl.reverse()
    })
}

function buttonRipple(){
    const elem = document.querySelector(".elem")
      elem.addEventListener("mouseover",function(event){
        console.log(event)
        const x = (event.pageX - elem.offsetLeft);
        const y = (event.pageY - elem.offsetTop);

        elem.style.setProperty("--Xpos", x + "px" / 150 * 100)
        elem.style.setProperty("--Ypos", y + "px" / 45 * 100)
      })
}

sideBar()
firstPage()
rotate()
smoothscroll()
menuBar()
