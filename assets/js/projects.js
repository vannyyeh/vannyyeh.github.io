// Detect scroll to animate the overlay
window.addEventListener('scroll', function() {
    var overlay = document.querySelector('.overlay');
    var scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      overlay.style.opacity = 1;
    } else {
      overlay.style.opacity = 0;
    }
  });

document.addEventListener("DOMContentLoaded", function() {
    const slideInImages = document.querySelectorAll('.slide-in-img');

    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function checkSlide() {
        slideInImages.forEach(slideInImage => {
            const slideInAt = (window.scrollY + window.innerHeight) - slideInImage.clientHeight / 2;
            const imageBottom = slideInImage.offsetTop + slideInImage.clientHeight;
            const isHalfShown = slideInAt > slideInImage.offsetTop;
            const isNotScrolledPast = window.scrollY < imageBottom;

            if (isHalfShown && isNotScrolledPast) {
                slideInImage.style.opacity = 1;
                slideInImage.style.transform = 'translateY(0)';
            } else {
                slideInImage.style.opacity = 0;
                slideInImage.style.transform = 'translateY(50px)';
            }
        });
    }

    window.addEventListener('scroll', debounce(checkSlide));
});


document.addEventListener("DOMContentLoaded", function() {
  var header = document.getElementById("header");

  window.addEventListener("scroll", function() {
    if (window.scrollY > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});


document.addEventListener("DOMContentLoaded", function() {
  var topLink = document.getElementById("top-link");

  topLink.addEventListener("click", function(event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
