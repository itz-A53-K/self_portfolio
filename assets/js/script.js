(function () {
   const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
         smoothWheel: true,
         smoothTouch: true,
         wheelMultiplier: 0.3,
         touchMultiplier: 0.8,
         // easing: 'easeInOut',
      }
   });
})();


import * as siteData from './siteData.js'


$(window).resize(() => location.reload());


$(window).on('beforeunload', () => { });

$(document).ready(() => {

   //initialize loader
   gsap.timeline()
      .to("#loaderScreen h2", { y: "0%", opacity: 1, duration: 1 })
      .to("#loaderScreen >div", { opacity: 1, duration: 1 });


   setInterval(() => {
      //loading screen line animation
      gsap.timeline()
         .to("#loaderScreen .line", { height: "2rem", duration: 0.1, stagger: 0.1 })
         .to("#loaderScreen .line", { height: "1rem", duration: 0.1, stagger: 0.1 });
   }, 1000);

   setTimeout(() => {
      $(window).scrollTop(0);
      initalAnimation()
   }, 4000);

   set_i_dot()
   initializeAnimations()
   navMenuAnimation()

})

const initializeAnimations = () => {
   homeAnimation()
   populate_featuredProjects()
   fProjectsSecAnimation()
   quoteAnimation()
   footerAnimation()

   cursorAnimation()
   themeAnimation()
   autoScroll()
   handleForm()


   const btns_n_link = document.querySelectorAll(".btn, .link")
      .forEach((item) => {
         handleHoverEffect(item)
      })

}



function set_i_dot() {
   var i_spanPos = $("#home .i-span").position()
   var i_spanTop = i_spanPos.top - 25

   if ((window.matchMedia("(max-width: 575.99px)")).matches) {
      i_spanTop = i_spanPos.top - 15
   }
   gsap.set("#i-dot", {
      left: i_spanPos.left + "px",
      top: i_spanTop + "px",
   })
}


var navTL

function navMenuAnimation() {
   navTL = gsap.timeline({ paused: true })

   navTL
      .from("#nav .menu", { right: "-110%", duration: 0.5 })
      .from("#nav .menu i", { rotate: 180 }, "a")
      .from("#nav .navLinks li, #nav .menu i", {
         x: "150%",
         duration: 0.6,
         opacity: 0,
         stagger: 0.2
      }, "a");

   $("#nav .hamburger").click(() => navTL.play());
   $("#nav .menu i").click(() => navTL.reverse());
}

function cursorAnimation() {
   var crsr = document.querySelector("#cursor")
   var crsrBG = document.querySelector("#cursor-bg")

   document.addEventListener("mousemove", (dets) => {
      crsr.style.left = `${dets.x + 7}px`;
      crsr.style.top = `${dets.y - 5}px`;
      crsrBG.style.left = `${dets.x}px`;
      crsrBG.style.top = `${dets.y}px`;
   })
}

function handleHoverEffect(elem) {
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

   document.querySelectorAll(".navLink").forEach((link) => {
      handleHoverEffect(link)

      link.addEventListener("click", () => {
         const targetID = link.dataset.scrollto;
         const targetElem = document.querySelector(`#${targetID}`);
         const yOffset = targetID === "home" ? 0 : 50;

         navTL.reverse()

         gsap.to(window, { duration: 3, scrollTo: { y: targetElem, offsetY: yOffset } });
      })
   })
}

function initalAnimation() {

   var tl = gsap.timeline({
      onComplete: () => { $("#main").css("height", "auto").css("overflow", "auto") }
   })

   tl
      .to("#loaderScreen", { y: "-100%", opacity: 0, duration: .5 })
      .from("#home h1, #home h4", {
         x: -100,
         opacity: 0,
         letterSpacing: "1.5rem",
         fontSize: "2rem",
         stagger: .3,
         duration: 0.5
      })
      .from("#i-dot", { x: 100, width: 100, ease: 'power2.out', opacity: 0 }, "a")
      .from("#home .right", { scale: 0, opacity: 0 }, "a")
      .from("#home h2", { opacity: 0, letterSpacing: "1rem" }, "a")
      .from("#scroll", { y: 100, opacity: 0 }, "a")

   gsap.to("#scroll", { bottom: "8%", repeat: -1, duration: 1, yoyo: true })
}

function homeAnimation() {
   const tl = gsap.timeline({
      scrollTrigger: {
         trigger: "#homeSec",
         start: "top top",
         end: "bottom 0%",
         scrub: 2,
         pin: true,
      }
   })

   tl.to("#i-dot", {
      rotate: 180,
      left: ($(window).width() / 2) + "px",
      top: ($(window).height() / 2) + "px",
      scale: 2
   })

   if (window.innerHeight > window.innerWidth) {
      tl.to("#i-dot", { scale: 70, rotate: 360 + 90, duration: 1, backgroundColor: "#c3c1c1", })
   }
   else {
      tl.to("#i-dot", { scale: 62, rotate: 360, duration: 1, backgroundColor: "#c3c1c1", })
   }

   tl
      .from("#homeSec #about,#nav", { display: "none" }, "part2Elem")
      .from("#homeSec #about .cont1 .imgCont", { x: -100, opacity: 0 }, "part2Elem")
      .from("#homeSec #about .cont1 .right", { x: 100, opacity: 0 }, "part2Elem")
}

function populate_featuredProjects() {
   var allCards = ""
   siteData.fProjects_data.forEach(elem => {
      allCards += `
         <div class="card">
            <div class="cardCont">
               <div class="imgCard">
                     <img src="assets/img/${elem.imgName}" alt="">
               </div>

               <div class="textCard">
                     <h1 class="heading">${elem.name}</h1>
                     <p class="intro">${elem.info}</p>
                     <p class="skill"><b>Skill Used:</b> ${elem.skill}.</p>
                     <div> 
                        ${elem.github ? `<a href="${elem.github}" target="_blank" type="github">GitHub Repo</a>` : ''}
                        ${elem.live ? `<a href="${elem.live}" target="_blank" type="live">View</a>` : ''}
                     </div>
               </div>
               
            </div>
         </div>
      `
   });

   $("#fProjectsSec .cont").html(allCards)
}

function fProjectsSecAnimation() {

   gsap.from("#fProjectsSec #fProj h1", {
      fontSize: "10rem",
      letterSpacing: "5rem",
      opacity: 0,
      duration: 2,
      scrollTrigger: {
         trigger: "#fProjectsSec",
         start: `top 90%`,
         end: "top 15%",
         scrub: 2,
      }

   })



   var tl = gsap.timeline({
      scrollTrigger: {
         trigger: "#fProjectsSec ",
         start: `top top`,
         end: "bottom -100%",
         scrub: 1,
         pin: true,
      }
   })

   if ((window.matchMedia("(max-width: 575.99px)")).matches) {
      tl.to("#fProjectsSec #fProj", { left: "-8%", top: "7%", scale: 0.7, duration: 1 }, "aa")
   }
   else if ((window.matchMedia("(max-width: 768px)")).matches && (window.matchMedia("(min-width: 576px)")).matches) {
      tl.to("#fProjectsSec #fProj", { left: "-8%", top: "7%", scale: 0.6, duration: 1 }, "aa")
   }
   else {
      tl.to("#fProjectsSec #fProj", { left: "-6%", top: "5.5%", scale: 0.5, duration: 1 }, "aa")
   }


   tl.from("#fProjectsSec .cont .card", { x: "100%", duration: 1.2 }, "aa")
   tl.to("#fProjectsSec .cont .card", { x: calculateXPercent(), ease: Power4, duration: 3 })


   function calculateXPercent() {
      var elem = document.querySelector("#fProjectsSec .cont")
      var xValue = `-${(elem.childElementCount) * 100 - 100}%  `
      return xValue
   }
}

function quoteAnimation() {

   gsap.timeline({
      scrollTrigger: { trigger: "#quoteSec", start: "top 70%", end: "top 00%", scrub: 3 }
   })
      .from("#quoteSec .quote i:nth-child(1)", { x: "-100px", y: "-100px", opacity: 0 }, "colonAnim")
      .from("#quoteSec .quote i:nth-child(3)", { x: "100px", y: "100px", opacity: 0 }, "colonAnim")
}

function footerAnimation() {

   var html = ""
   siteData.socials.forEach(element => {
      html += `<a href="${element.link}" target="_blank" rel="noopener noreferrer" class="">
         <i class="bi bi-${element.class}"></i>
      </a>`;
   });

   $("footer .socialLinks").html(html)


   $("footer .fBottom").hover(
      function () {
         gsap.to($("#cursor, #cursor-bg"), {
            scale: 0,
            duration: 0.1,
            onComplete: () => {
               $("footer .fBottom, footer .fBottom *").css("cursor", "default")
            }
         })
      },
      function () {
         gsap.to($("#cursor, #cursor-bg"), { scale: 1, duration: 0.3 })
      }
   )
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

function showAlert(msg, type) {
   const alertSec = $("#alertSec")

   if (type == "success") {
      alertSec.addClass("success").removeClass("danger").html(`<p>${msg}</p>`)
   }
   else if (type == "danger") {
      alertSec.addClass("danger").removeClass("success").html(`<p>${msg}</p>`)

   }

   gsap.to(alertSec, { right: "1%", duration: 1, ease: Power3 })

   const audio = new Audio('assets/message sound.mp3');
   audio.play();


   setTimeout(() => {
      gsap.to(alertSec, { right: "-100%", duration: 1, ease: Power3 })

      alertSec.removeClass("danger").removeClass("success").html("")

   }, 4000);
}

function handleForm() {

   const contForm = $("#contactForm")

   contForm.submit(function (e) {

      e.preventDefault();

      const formData = $(this).serializeArray();
      const frmBtn = $("#contactForm button")

      frmBtn.prop("disabled", true).html('Sending <i class="bi bi-arrow-clockwise"></i>');

      $.ajax({
         type: "POST",
         url: "./send_email.php",
         data: formData,
         success: function (data) {

            if (data.isSent == true) {
               showAlert(data.msg, "success")
               contForm.trigger("reset")
            }
            else {
               showAlert(data.msg, "danger")
            }
            frmBtn.prop("disabled", false).html('Send <i class="bi bi-arrow-right"></i>');
         },
         error: function (err, data) {
            showAlert(data.msg, "danger")
            frmBtn.prop("disabled", false).html('Send <i class="bi bi-arrow-right"></i>');

            // console.log(err, data.debugMsg);
         }
      })

   });
}



