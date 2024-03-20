(function () {
   const locomotiveScroll = new LocomotiveScroll();
})();



var crsr = document.querySelector("#cursor")
var crsrBG = document.querySelector("#cursor-bg")



function cursorMoveAnimation() {
   document.addEventListener("mousemove", function (dets) {
      crsr.style.left = dets.x + 12 + "px"
      crsr.style.top = dets.y - 5 + "px"
      crsrBG.style.left = dets.x + "px"
      crsrBG.style.top = dets.y + "px"
   })

}


function crsrHov(elem) {
   elem.addEventListener("mouseenter", () => {
      crsrBG.style.scale = 0
      crsr.style.scale = 2
      crsr.style.border = "1px solid white"
      crsr.style.backgroundColor = "transparent"
   })
   elem.addEventListener("mouseleave", () => {
      crsrBG.style.scale = 1
      crsr.style.scale = 1
      crsr.style.border = "none"
      crsr.style.backgroundColor = "rgb(255, 255, 255)"
   })
}


function autoScroll() {
   
   var navlinks = document.querySelectorAll("#nav .navLinks .listItem")
   navlinks.forEach((link) => {
      crsrHov(link)


      var linkurlID = link.dataset.scrollto

      link.addEventListener("click", () => {
         var elem = document.querySelector(`#${linkurlID}`)

         if (linkurlID == "home") {
            console.log('fgio');

            gsap.to(window, { duration: 3, scrollTo: 0 });
         }
         else {
            gsap.to(window, { duration: 3, scrollTo: { y: elem, offsetY: 50 } });
         }

      })
   })
}


function initialAnimation() {
   gsap.from("#part1 h1,#part1 h4,#part1 h2", {
      x: -100,
      opacity: 0,
      letterSpacing: "1.5rem",
      fontSize: "2rem",
      stagger: .3,
      delay: .3,
      duration: .5,
   })

   gsap.from("#i-dot", {
      x: 100,
      width: 100,
      ease: 'power2.out',
      opacity: 0,
      delay: 1,
      duration: .7,
   })

   gsap.from("#part1 .right", {
      scale: 0,
      opacity: 0,
      stagger: .5,
      delay: 1.3,
      duration: .5,
   })

   gsap.from("#scroll", {
      y: 100,
      opacity: 0,
      delay: 1.5,
      duration: .3,
   })



   gsap.to("#scroll", {
      bottom: "8%",
      repeat: -1,
      duration: 1,
      yoyo: true,
   })


}


function homeAnimation() {
   var tl1 = gsap.timeline({
      scrollTrigger: {
         trigger: "#homeSec",
         start: "top top",
         end: "bottom 0%",
         scrub: 2,
         pin: true,
      }
   })


   tl1.to("#i-dot", {
      rotate: 180,
      left: "50%",
      top: "50%",
      scale: 2
   })

   tl1.to("#i-dot", {
      scale: 60,
      rotate: 360,
      backgroundColor: "#c3c1c1",
   })

   tl1.from("#homeSec #about,#nav", {
      display: "none",
      opacity: 0,
      // delay: 1,
   }, "part2Elem")


   tl1.from("#homeSec #about .cont1 img", {
      x: -100,
      opacity: 0,
      // delay: 1,
   }, "part2Elem")

   tl1.from("#homeSec #about .cont1 .right", {
      x: 100,
      opacity: 0,
      // delay: 1,
   }, "part2Elem")


}


function projectsSecAnimation() {

   gsap.from("#projectsSec #fProj h1", {
      fontSize: "10rem",
      letterSpacing: "5rem",
      opacity: 0,
      duration: 2,
      scrollTrigger: {
         trigger: "#projectsSec",
         start: `top 90%`,
         end: "top 15%",
         scrub: 2,
      }

   })



   var tl = gsap.timeline({

      scrollTrigger: {
         trigger: "#projectsSec ",
         start: `top top`,
         end: "bottom 0%",
         scrub: 2,
         pin: true,
      }
   })


   tl.to("#projectsSec #fProj", {
      left: "-4%",
      top: "7%",
      scale: 0.6,
      duration: .2,
   }, "aa")


   tl.from("#projectsSec .cont", {
      x: "100%",
      duration: .2,
   }, "aa")



   tl.to("#projectsSec .cont", {
      x: xPercentCount(),
      ease: Power4,
   })


   function xPercentCount(elem) {
      elem = document.querySelector("#projectsSec .cont")
      console.log();
      return `-${(elem.childElementCount - 1) * 100}%`


   }
}


function quoteAnimation() {

   var tl = gsap.timeline({
      scrollTrigger: {
         trigger: "#quoteSec",
         start: "top 70%",
         end: "top 00%",
         scrub: 3,
      }
   })


   tl.from("#quoteSec .quote i:nth-child(1)", {
      x: "-100px",
      y: "-100px",
      opacity: 0,
   }, "colonAnim")


   tl.from("#quoteSec .quote i:nth-child(3)", {
      x: "100px",
      y: "100px",
      opacity: 0,
   }, "colonAnim")

}


function themeAnimation() {

   document.querySelectorAll(".cCngSec").forEach(function (el) {

      var el2 = el
      if (el.parentElement.classList.contains("pin-spacer") == true) {
         el2 = el.parentElement
      };


      ScrollTrigger.create({
         trigger: el2,
         start: "top 50%",
         end: "bottom 50%",
         scrub: 2,

         onEnter: function () {
            document.body.setAttribute("theme", el.dataset.theme)
         },
         onEnterBack: function () {
            document.body.setAttribute("theme", el.dataset.theme)
         }
      })
   })

}




var btns = document.querySelectorAll(".btn")

btns.forEach((btn) => {
   crsrHov(btn)
})



cursorMoveAnimation()
autoScroll()
initialAnimation()
homeAnimation()
projectsSecAnimation()
quoteAnimation();
themeAnimation()
















