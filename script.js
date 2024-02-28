var locoScroll;
var crsr= document.querySelector("#cursor")
var crsrBG= document.querySelector("#cursor-bg")



function init() {
   gsap.registerPlugin(ScrollTrigger);

   locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
      multiplier: 0.2,
   });
   locoScroll.on("scroll", ScrollTrigger.update);

   ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
         return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
         return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
   });

   ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

   ScrollTrigger.refresh();

}

init()


document.addEventListener("mousemove", function(dets){
   crsr.style.left= dets.x+12 + "px"
   crsr.style.top= dets.y-5 + "px"
   crsrBG.style.left= dets.x + "px"
   crsrBG.style.top= dets.y + "px"
})

function crsrHov(elem){
    elem.addEventListener("mouseenter", ()=>{
      crsrBG.style.scale = 0
      crsr.style.scale = 2
      crsr.style.border = "1px solid white"
      crsr.style.backgroundColor = "transparent"
   })
   elem.addEventListener("mouseleave", ()=>{
      crsrBG.style.scale = 1
      crsr.style.scale = 1
      crsr.style.border = "none"
      crsr.style.backgroundColor = "rgb(255, 255, 255)"
   })
}

var btns=document.querySelectorAll(".btn")
var navlinks=document.querySelectorAll("#nav .navLinks .listItem")
btns.forEach((btn)=>{
   crsrHov(btn)
})
navlinks.forEach((link)=>{
   crsrHov(link)

   console.log('djhsfjsdhf');
   
   var linkurlID=link.dataset.hrefsecId
   var inner1stElem= link.dataset.inner1stClass
   
   link.addEventListener("click",()=>{
      if(inner1stElem ==""){
         var elem = document.querySelector(`#${linkurlID}`)
      }
      else{
         var elem = document.querySelector(`#${linkurlID} .${inner1stElem}`)
      }
      locoScroll.scrollTo(elem);
   })
})


gsap.from("#part1 h1,#part1 h4,#part1 h2",{
   x: -100,
   opacity:0,
   letterSpacing: "1.5rem",
   fontSize: "2rem",
   stagger: .3,
   delay:.3,
   duration:.5,
})

gsap.from("#i-dot",{
   x: 100,
   width: 100,
   ease: 'power2.out',
   opacity:0,
   delay:1,
   duration:.7,
})

gsap.from("#part1 .right",{
   scale:0,
   opacity:0,
   stagger: .5,
   delay:1.3,
   duration:.5,
})

gsap.from("#scroll",{
   y: 100,
   opacity:0,
   delay:1.5,
   duration:.3,
})




gsap.to("#scroll",{
   bottom: "8%",
   repeat: -1,
   duration: 1,
   yoyo: true,
})




var tl1 = gsap.timeline({
   scrollTrigger: {
      trigger: "#homeSec",
      scroller: "#main",
      start: "top 0",
      end: "bottom 0",
      scrub: 2,
      pin: true,
      onUpdate: function(elem){
         if(elem.progress > 0.6){
            document.querySelector("#about").style.display= "flex"
         }
         else{
            document.querySelector("#about").style.display= "none"
         }
      }
   }
})


tl1.to("#i-dot", {
   rotate: 180,
   left: "50%",
   top: "50%",
   scale:3
})

tl1.to("#i-dot", {
   scale: 60,
   rotate: 360,
   backgroundColor: "#c3c1c1",
})

tl1.from("#homeSec #about,#nav", {
   display:"none",
   opacity: 0,
   duration: .5,
},"part2Elem")


tl1.from("#homeSec #about .cont1 img", {
   x: -100,
   opacity: 0,
   duration: .5,
},"part2Elem")

tl1.from("#homeSec #about .cont1 .right", {
   x: 100,
   opacity: 0,
   duration: .5,
},"part2Elem")






function excNavHeight() {
   var wHeight=window.innerHeight -(window.innerHeight-70)
   return wHeight
}


function assign_zIndex(elemList){
   elemList.forEach(function (elem,index){
      var zIndex= imgCard.length -index
      elem.style.zIndex = zIndex 
   });
}


function assignLeftValue(elemList, start, difference) {
   imgCard.forEach(function (elem, index) {
      if (index <= 3) {     
         elem.style.left = start-difference*index +"%"  
      }
      else {
         elem.style.left = start+"%"      
      }
   });   
}


var  imgCard= document.querySelectorAll("#projectsSec .cont1 .imgCard")
var  textCard= document.querySelectorAll("#projectsSec .cont2 .textCard")
assign_zIndex(imgCard)
assign_zIndex(textCard)
assignLeftValue(imgCard, 15, 3)







gsap.to("body, #about,#nav",{
   backgroundColor: "black",
   color: "crimson",
   scrollTrigger:{
      trigger:"#projectsSec",
      scroller: "#main",
      start: "top 30%",
      end: "top 30%",
      scrub:2,
   }
})


gsap.from("#projectsSec #fProj h1",{
   fontSize: "10rem",
   letterSpacing: "5rem",
   opacity: 0,
   duration:2,
   scrollTrigger: {
      trigger: "#projectsSec",
      scroller: "#main",
      start: `top 90%`,
      end: "top 15%",
      scrub: 2,
   }
   
})



var tl2 = gsap.timeline({
   scrollTrigger: {
      trigger: "#projectsSec",
      scroller: "#main",
      start: `top 0`,
      end: "bottom 0",
      scrub: 2,
      pin: true,
   }
})



tl2.from("#projectsSec .cont1 .imgCard",{
   left: "-100%",
   duration:2,
   stagger: .2,   
},"ghd")



tl2.to("#projectsSec .cont1 .imgCard",{
   left: "20%",
   top:"18%",
   scale: 1.3,
   delay: 1.5,
   rotate: 80,
   duration: 3,
},"itemMove")

tl2.from("#projectsSec .cont2",{
   opacity:0,
   y: "100%",
   delay: 1.5,
   duration: 3,
},"itemMove")

tl2.to("#projectsSec #fProj",{
   left: "-4%",
   top: "7%",
   scale: 0.6,
   delay: 1.5,
   duration: 3,
},"itemMove")



tl2.to("#projectsSec .cont1 .imgCard",{
   delay:1,
   y: "-150%",
   duration: 5,
   stagger: 5,
},"slideCardAnim")

tl2.to("#projectsSec .cont2 .textCard",{
   delay:1,
   y: "-250%",
   duration: 5,
   stagger: 5,
},"slideCardAnim")



tl2.to("#projectsSec #fProj,#projectsSec #fProj h1",{
   top: "95%",
   left:"20%",
   fontSize: "10rem",
   // letterSpacing: "5rem",
   opacity:0,
   duration:2,
})
   




var tl3= gsap.timeline({
    scrollTrigger:{
      trigger:"#quoteSec",
      scroller:"#main",
      start:"top 40%",
      end: "top 40%",
      scrub: 3,
      pin: true,
      onUpdate: (inst)=>{
         
         if (inst.progress > 0.8) {
            gsap.to("#nav,body",{
               backgroundColor:"#c3c1c1",
               color: "black",
               duration: 2
            })
         }
         else {
            gsap.to("#nav,body",{
               backgroundColor: "black",
               color: "crimson",
               duration: 2
            })
         }
      }
   }
})


var tl4= gsap.timeline({
   scrollTrigger:{
      trigger: "#quoteSec",
      scroller: "#main",
      start: "top 70%",
      end: "top 00%",
      scrub:  3,
   }
})
tl4.from("#quoteSec .quote i:nth-child(1)",{
   x: "-100px",
   y: "-100px",
   opacity: 0,
},"colonAnim")

tl4.from("#quoteSec .quote i:nth-child(3)",{
   x: "100px",
   y: "100px",
   opacity: 0,
},"colonAnim")

 













