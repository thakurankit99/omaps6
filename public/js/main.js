(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-primary shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-primary shadow-sm').css('top', '-150px');
        }
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

})(jQuery);

function addNewIframe(sourceUrl) {
    const newIframe = document.createElement("iframe");
    newIframe.src = sourceUrl;
    newIframe.style.width = "calc(50% - 10px)";
    newIframe.style.height = "200px";
    const container = document.querySelector(".portfolio-item.google-map.rounded.shadow-dark");
    container.appendChild(newIframe);
}

// Fire alarm handling
const mapIframe = document.querySelector('.google-map iframe'); 
const fireAlertDiv = document.getElementById('fireAlert');

const defaultMapURL = "https://app.mappedin.com/map/67af9483845fda000bf299c3"; 
const exitPath1 = "https://app.mappedin.com/map/67af9483845fda000bf299c3?location=s_4a807c5e25da4122&floor=m_cdd612a0032a1f74";
const exitPath2 = "https://app.mappedin.com/map/67af9483845fda000bf299c3/directions?floor=m_cdd612a0032a1f74&location=s_3283c146d50c32f2&departure=s_304550fe8b33d93b";

let fireActive = false;

function updateFireAlert(isFireActive) {
    if (isFireActive) {
        fireAlertDiv.style.display = 'block';  
        mapIframe.src = exitPath1;

        setTimeout(() => {
            if (fireActive) {
                mapIframe.src = exitPath2;
            }
        }, 10000);
    } else {
        fireAlertDiv.style.display = 'none';
        mapIframe.src = defaultMapURL;
    }
}

function checkFireAlarm() {
    fetch('/alarm-status') 
      .then(response => response.json())
      .then(data => {
        if (data.fire !== fireActive) {
            fireActive = data.fire;
            updateFireAlert(fireActive);
        }
      })
      .catch(err => {
        console.error('Error fetching alarm status:', err);
      });
}

setInterval(checkFireAlarm, 5000);
document.addEventListener('DOMContentLoaded', checkFireAlarm);
