(function () {
   const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
         smoothWheel: true,
         smoothTouch: true,
         wheelMultiplier: 0.25,
         touchMultiplier: 0.4,
         easing: 'easeInOut',

      }
   });
})();



$(window).resize(function () {

});

var i_spanPos
$(document).ready(() => {

   i_spanPos = $("#part1 .i-span").position()

   // $("#i-dot").css("left", i_spanPos.left + "px").css("top", i_spanPos.top - 25 + "px")

   gsap.set("#i-dot", {
      left: i_spanPos.left + "px",
      top: i_spanPos.top - 25 + "px",
   })

   cursorMoveAnimation()
   autoScroll()
   initialAnimation()
   homeAnimation()
   projectsSecAnimation()
   quoteAnimation()
   themeAnimation()
   handleForm()

})









function cursorMoveAnimation() {
   var crsr = document.querySelector("#cursor")
   var crsrBG = document.querySelector("#cursor-bg")

   document.addEventListener("mousemove", function (dets) {
      crsr.style.left = dets.x + 10 + "px"
      crsr.style.top = dets.y - 5 + "px"
      crsrBG.style.left = dets.x + "px"
      crsrBG.style.top = dets.y + "px"
   })

}


function crsrHov(elem) {
   var crsr = document.querySelector("#cursor")
   var crsrBG = document.querySelector("#cursor-bg")

   elem.addEventListener("mouseenter", () => {
      crsrBG.style.scale = 0
      crsr.style.scale = 1.5
      crsr.style.border = "1px solid white"
      crsr.style.boxShadow = "none"
   })
   elem.addEventListener("mouseleave", () => {
      crsrBG.style.scale = 1
      crsr.style.scale = 1
      crsr.style.border = "none"
      crsr.style.boxShadow = "inset 0 0 20px 10px rgb(255, 255, 255)"
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

   function iDot_left_top(val) {

      if (val == "top") {
         return $(window).height() / 2 - i_spanPos.top - 25
      }
      if (val == "left") {
         return $(window).width() / 2
      }

   }


   tl1.to("#i-dot", {
      rotate: 180,
      left: iDot_left_top("left") + "px",
      top: iDot_left_top("top") + "px",
      scale: 2
   })

   tl1.to("#i-dot", {
      scale: 62,
      rotate: 360,
      duration: 1,
      backgroundColor: "#c3c1c1",
   })

   tl1.from("#homeSec #about,#nav", {
      display: "none",
   }, "part2Elem")


   tl1.from("#homeSec #about .cont1 .imgCont", {
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
      left: "-6%",
      top: "5.5%",
      scale: 0.5,
      duration: 1,
   }, "aa")


   tl.from("#projectsSec .cont", {
      x: "210vw",
      duration: 1.2,
   }, "aa")



   tl.to("#projectsSec .cont", {
      x: xPercentCount(),
      duration: 3,
      ease: Power4,
   })


   function xPercentCount(elem) {
      elem = document.querySelector("#projectsSec .cont")
      console.log();
      return `-${(elem.childElementCount - 2) * 100}vw`


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




function handleForm() {

   $("#contactForm").submit(function (e) {

      // e.preventDefault();
      var formElems = $("#contactForm input, #contactForm textarea");


      $.ajax({
         type: "POST",
         url: "handleForm.php",
         data: {
            "uName": formElems[0].value,
            "uEmail": formElems[1].value,
            "uPhone": formElems[2].value,
            "msg": formElems[3].value,

         },
         success: function (data) {
            console.log('Submission was successful.');
            console.log(data);
         },
         error: function (data) {
            console.log('An error occurred.');
            console.log(data);
         },
      });
   });
}




var btns = document.querySelectorAll(".btn")

btns.forEach((btn) => {
   crsrHov(btn)
})




















