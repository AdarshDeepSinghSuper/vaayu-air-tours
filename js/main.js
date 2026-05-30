// Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe sections for scroll animations
    document.querySelectorAll('.destinations-section, .safety-section, .experience-section').forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(50px)';
      section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      observer.observe(section);
    });

    // Slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
          slide.classList.add('active');
        }
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }

    if (totalSlides > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(nextSlide, 5000);
}

    document.querySelectorAll('img').forEach((img) => {
  img.loading = img.loading || 'lazy';
  img.decoding = img.decoding || 'async';
  img.addEventListener('error', () => {
    img.classList.add('image-load-failed');
    img.setAttribute('alt', img.getAttribute('alt') || 'Image unavailable');
  }, { once: true });
});

const modal = document.getElementById('bookingModal');
    const closeModalBtn = document.getElementById('closeModal');
    const bookButtons = document.querySelectorAll('.btn-book, .btn-primary, .nav-cta, #heroBookBtn, #navBookBtn');
    const exploreBtn = document.getElementById('exploreBtn');
    const destinationSelect = document.getElementById('destination');

    if (modal && destinationSelect) {
  bookButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const destination = btn.getAttribute('data-destination');
      if (destination) {
        destinationSelect.value = destination;
      }
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });
}

if (closeModalBtn && modal) closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });

    if (modal) modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
});

    if (exploreBtn) exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
    });

    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const destination = document.getElementById('destination').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;

      const confirmationMessage = document.createElement('div');
      confirmationMessage.className = 'confirmation-dialog';

      confirmationMessage.innerHTML = `
        <h3>Booking Request Received</h3>
        <p class="confirmation-summary"></p>
        <p class="confirmation-note"></p>
        <button id="closeConfirmation">Close</button>
      `;

      confirmationMessage.querySelector('.confirmation-summary').textContent = `Thank you, ${name}. Your ${destination} flight request for ${date} at ${time} has been received.`;
      confirmationMessage.querySelector('.confirmation-note').textContent = `Our concierge team will contact you at ${phone} shortly.`;

      document.body.appendChild(confirmationMessage);

      document.getElementById('closeConfirmation').addEventListener('click', () => {
        confirmationMessage.remove();
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        bookingForm.reset();
      });
    });
