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