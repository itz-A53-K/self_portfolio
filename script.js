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
$(window).on('beforeunload', function () {
   $(window).scrollTop(0);
});

var i_spanPos;
$(document).ready(() => {


   i_spanPos = $("#part1 .i-span").position()
   var i_spanTop = i_spanPos.top - 25

   if ((window.matchMedia("(max-width: 575.99px)")).matches) {
      i_spanTop = i_spanPos.top - 14
   }
   gsap.set("#i-dot", {
      left: i_spanPos.left + "px",
      top: i_spanTop + "px",
   })

   cursorMoveAnimation()
   autoScroll()

   setTimeout(() => {
      initialAnimation()
   }, 1500);

   homeAnimation()
   populate_featuredProjects()
   projectsSecAnimation()
   quoteAnimation()
   footerAnimation()

   themeAnimation()

})

handleForm()








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

   var navlinks = document.querySelectorAll(".navLink")
   navlinks.forEach((link) => {
      crsrHov(link)


      var linkurlID = link.dataset.scrollto

      link.addEventListener("click", () => {
         var elem = document.querySelector(`#${linkurlID}`)

         if (linkurlID == "home") {
            gsap.to(window, { duration: 3, scrollTo: 0 });
         }
         else {
            gsap.to(window, { duration: 3, scrollTo: { y: elem, offsetY: 50 } });
         }

      })
   })
}


function initialAnimation() {
   var tl = gsap.timeline({
      onComplete: () => {
         $("#main").css("height", "auto").css("overflow", "auto")
      }
   })

   tl.to("#coverBox", {
      y: "-100%",
      opacity: 0,
      duration: .5
   })

   tl.from("#part1 h1,#part1 h4", {
      x: -100,
      opacity: 0,
      letterSpacing: "1.5rem",
      fontSize: "2rem",
      stagger: .3,
      duration: 0.5
   })

   tl.from("#i-dot", {
      x: 100,
      width: 100,
      ease: 'power2.out',
      opacity: 0,
   }, "a")

   tl.from("#part1 .right", {
      scale: 0,
      opacity: 0,
   }, "a")

   tl.from("#part1 h2", {
      opacity: 0,
      letterSpacing: "1rem",
   })

   tl.from("#scroll", {
      y: 100,
      opacity: 0,
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
      left: ($(window).width() / 2) + "px",
      top: ($(window).height() / 2) + "px",
      scale: 2
   })


   if (window.innerHeight > window.innerWidth) {
      tl1.to("#i-dot", {
         scale: 70,
         rotate: 360 + 90,
         duration: 1,
         backgroundColor: "#c3c1c1",
      })

   }
   else {


      tl1.to("#i-dot", {
         scale: 62,
         rotate: 360,
         duration: 1,
         backgroundColor: "#c3c1c1",
      })

   }


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

function populate_featuredProjects() {
   var projData = [
      {
         "name": "FoodFest",
         "info": "An intuitive food ordering platform where users can conveniently log in and order their favorite fast foods. With a user-friendly interface, seamless navigation, and secure payment options, it offers a hassle-free experience for satisfying cravings with just a few clicks.",
         "skill": " PHP, MySQL, HTML, CSS, JS",
         "imgName": "foodFest.webp"
      },
      {
         "name": "ShoppingSite",
         "info": "A dynamic E-Commerce platform powered by Django. Crafted with precision and fueled by my expertise, this site delivers a seamless shopping experience from product browsing to secure checkout. The site include product recomendation, category wise browsing and many more.",
         "skill": "Django, SQLite, jQuery, HTML, CSS, JS",
         "imgName": "shoppingSite.webp"
      },
      {
         "name": "CodeDiscuss",
         "info": "An online forum tailored exclusively for coders and developers. Seamlessly designed for knowledge sharing and collaboration, users can login to engage in vibrant discussions, post queries, and provide expert solutions. There are different programming language based community in the forum.",
         "skill": "MySQL, PHP, Bootstrap, HTML, CSS, JS",
         "imgName": "codeDiscuss.webp"
      },
   ]

   var allCards = ""
   projData.forEach(elem => {
      allCards += `
         <div class="card">
            <div class="cardCont">
               <div class="imgCard">
                     <img src="./img/${elem.imgName}" alt="">
               </div>

               <div class="textCard">
                     <h1 class="heading">${elem.name}</h1>
                     <p class="intro">${elem.info}</p>
                     <p class="skill"><b>Skill Used:</b> ${elem.skill}.</p>
               </div>
               
            </div>
         </div>
      `
   });

   $("#projectsSec .cont").html(allCards)

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
         end: "bottom -100%",
         scrub: 1,
         pin: true,
      }
   })



   if ((window.matchMedia("(max-width: 575.99px)")).matches) {

      tl.to("#projectsSec #fProj", {
         left: "-8%",
         top: "7%",
         scale: 0.7,
         duration: 1,
      }, "aa")

   }
   else if ((window.matchMedia("(max-width: 767.98px)")).matches && (window.matchMedia("(min-width: 576px)")).matches) {

      tl.to("#projectsSec #fProj", {
         left: "-8%",
         top: "7.5%",
         scale: 0.6,
         duration: 1,
      }, "aa")

   }
   else {
      tl.to("#projectsSec #fProj", {
         left: "-6%",
         top: "5.5%",
         scale: 0.5,
         duration: 1,
      }, "aa")

   }




   tl.from("#projectsSec .cont .card", {
      x: "100%",
      duration: 1.2,
   }, "aa")



   tl.to("#projectsSec .cont .card", {
      x: xPercentCount(),
      ease: Power4,
      duration: 3
   })


   function xPercentCount() {
      var elem = document.querySelector("#projectsSec .cont")
      var xValue = `-${(elem.childElementCount) * 100 - 100}%  `
      return xValue


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


function populateF_Link() {

   var socials = [
      {
         "link": "https://www.linkedin.com/in/abinash-kalita",
         "class": "linkedin"
      },
      {
         "link": "mailto:abikalita34@gmail.com",
         "class": "envelope-fill"
      },
      {
         "link": "https://github.com/itz-A53-K",
         "class": "github"
      }
   ]

   var html = ""
   socials.forEach(element => {
      html += `<a href="${element.link}" target="_blank" rel="noopener noreferrer" class="">
         <i class="bi bi-${element.class}"></i>
      </a>`;


   });

   $("footer .socialLinks").html(html)
}


function footerAnimation() {

   populateF_Link()
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
         gsap.to($("#cursor, #cursor-bg"), {
            scale: 1,
            duration: 0.3
         })
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
   var alertSec = $("#alertSec")

   if (type == "success") {
      alertSec.addClass("success").removeClass("danger").html(`<p>${msg}</p>`)
   }
   else if (type == "danger") {
      alertSec.addClass("danger").removeClass("success").html(`<p>${msg}</p>`)

   }

   gsap.to(alertSec, {
      right: "1%",
      duration: 1,
      ease: Power3
   })
   var audio = new Audio('message sound.mp3');
   audio.play();


   setTimeout(() => {
      gsap.to(alertSec, {
         right: "-100%",
         duration: 1,
         ease: Power3
      })

      alertSec.removeClass("danger").removeClass("success").html("")

   }, 4000);
}




function handleForm() {

   var contForm = $("#contactForm")

   contForm.submit(function (e) {

      e.preventDefault();
      var formElems = $("#contactForm input, #contactForm textarea, #contactForm select");
      var frmBtn = $("#contactForm button")

      frmBtn.prop("disabled", true).html('Sending <i class="bi bi-arrow-clockwise"></i>');



      $.ajax({
         type: "POST",
         url: "./handleForm.php",
         data: {
            uName: formElems[0].value,
            uEmail: formElems[1].value,
            uPhone: formElems[2].value,
            type: formElems[3].value,
            msg: formElems[4].value,
         },
         success: function (data) {
            
            if (data.isSent == true) {
               showAlert("Message Sent Succcessfully !", "success")
               contForm.trigger("reset")
            }
            else {
               showAlert("Try Again! Some error occured.", "danger")

            }
            frmBtn.prop("disabled", false).html('Send <i class="bi bi-arrow-right"></i>');
         },
      })

   });
}


var btns_n_link = document.querySelectorAll(".btn, .link")

btns_n_link.forEach((item) => {
   crsrHov(item)
})






















