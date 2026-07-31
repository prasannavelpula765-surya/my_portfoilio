document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     1. MOBILE NAVIGATION MENU TOGGLE
     ========================================================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Toggle menu icon between bars and times (close)
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when clicking a link (mobile UX)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  /* ==========================================================
     2. DARK / LIGHT MODE TOGGLE
     ========================================================== */
  const themeToggle = document.getElementById('theme-toggle');

  if (themeToggle) {
    // Check local storage or default to Dark mode
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light') {
      document.body.classList.add('light-mode');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');

      // Update button icon
      themeToggle.innerHTML = isLight 
        ? '<i class="fas fa-moon"></i>' 
        : '<i class="fas fa-sun"></i>';

      // Save user choice
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  /* ==========================================================
     3. TYPING EFFECT
     ========================================================== */
  const typingText = [
    "Web Developer",
    "Data Analyst",
    "Python Developer",
    "Frontend Developer",
    "Machine Learning Enthusiast"
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const typingElement = document.querySelector('.typing');
    if (!typingElement) return;

    const currentString = typingText[textIndex];

    if (!isDeleting) {
      typingElement.textContent = currentString.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentString.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500); // Pause before deleting
        return;
      }
    } else {
      typingElement.textContent = currentString.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingText.length;
        setTimeout(typeEffect, 500); // Pause before typing next word
        return;
      }
    }

    const speed = isDeleting ? 60 : 120;
    setTimeout(typeEffect, speed);
  }

  typeEffect();

  /* ==========================================================
     4. SCROLL TO TOP BUTTON
     ========================================================== */
  const scrollBtn = document.getElementById('scrollTop');

  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollBtn.style.display = 'flex';
      } else {
        scrollBtn.style.display = 'none';
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================
     5. CONTACT FORM (FORM SPREE + WHATSAPP REDIRECT)
     ========================================================== */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('user_name');
      const emailInput = document.getElementById('user_email');
      const phoneInput = document.getElementById('user_number');
      const messageInput = document.getElementById('message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !phone || !message) {
        alert("Please fill in all required fields (Name, Phone, and Message).");
        return;
      }

      // Build WhatsApp message text
      let waText = `Hi Surya,\n\nYou have received a new message from your portfolio:\n\n`;
      waText += `*Name:* ${name}\n`;
      waText += `*Phone:* ${phone}\n`;
      if (email) waText += `*Email:* ${email}\n`;
      waText += `\n*Message:* ${message}`;

      const targetPhoneNumber = "918106413016";
      const waUrl = `https://wa.me/${targetPhoneNumber}?text=${encodeURIComponent(waText)}`;

      // Attempt Formspree submission if configured
      if (contactForm.action && contactForm.action.includes("formspree.io") && !contactForm.action.includes("YOUR_FORMSPREE_CODE")) {
        fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        }).catch(err => console.log("Formspree submission skipped/failed: ", err));
      }

      // Open WhatsApp
      window.open(waUrl, '_blank');
      contactForm.reset();
    });
  }

});