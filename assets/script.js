/* ============================================================
   MEDY'S CATERING – GLOBAL SCRIPTS
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- SCROLL TO TOP BUTTON ----
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'mc-scroll-top';
  scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- NAVBAR SHRINK ON SCROLL ----
  const navbar = document.querySelector('.mc-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.style.padding = '0.4rem 0';
        navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.35)';
      } else {
        navbar.style.padding = '0.75rem 0';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.25)';
      }
    });
  }

  // ---- INTERSECTION OBSERVER FOR CARD ANIMATIONS ----
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.mc-service-card, .mc-testimonial-card, .mc-team-card, .mc-value-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // ---- BOOKING FORM SUBMISSION (Front-End Validation) ----
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // ===== DATABASE NOTE =====
      // TODO: Replace this section with an actual POST request to your backend endpoint.
      // Example using Fetch API:
      //
      // const formData = new FormData(bookingForm);
      // fetch('/api/bookings', {
      //   method: 'POST',
      //   body: JSON.stringify(Object.fromEntries(formData)),
      //   headers: { 'Content-Type': 'application/json' }
      // })
      // .then(res => res.json())
      // .then(data => { /* handle success */ })
      // .catch(err => { /* handle error */ });
      // =========================

      const successAlert = document.getElementById('bookingSuccess');
      if (successAlert) {
        successAlert.classList.remove('d-none');
        bookingForm.reset();
        successAlert.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ---- CONTACT FORM SUBMISSION ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // ===== DATABASE NOTE =====
      // TODO: Replace this with a POST to your backend contact handler.
      // =========================

      const successAlert = document.getElementById('contactSuccess');
      if (successAlert) {
        successAlert.classList.remove('d-none');
        contactForm.reset();
        successAlert.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ---- GALLERY FILTER (Gallery Page) ----
  const filterBtns = document.querySelectorAll('.mc-filter-btn');
  const galleryItems = document.querySelectorAll('.mc-gallery-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active', 'mc-btn-primary'));
        filterBtns.forEach(b => b.classList.add('mc-btn-outline-red'));
        btn.classList.add('active', 'mc-btn-primary');
        btn.classList.remove('mc-btn-outline-red');

        const filter = btn.dataset.filter;
        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- STATS COUNTER ANIMATION ----
  const counters = document.querySelectorAll('.mc-stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.innerText.replace(/\D/g, ''), 10);
        const suffix = el.innerText.replace(/[0-9]/g, '');
        let count = 0;
        const increment = Math.ceil(target / 40);
        const interval = setInterval(() => {
          count = Math.min(count + increment, target);
          el.innerText = count + suffix;
          if (count >= target) clearInterval(interval);
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
});
