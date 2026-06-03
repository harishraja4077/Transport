document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // STICKY HEADER & ACTIVE LINKS
  // ==========================================
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    // Sticky Class Toggle
    if (window.scrollY > 100) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
    
    // Highlight Active Link in Navbar
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // MOBILE NAVIGATION TOGGLE
  // ==========================================
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  mobileNavToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const icon = mobileNavToggle.querySelector('i');
    if (navMenu.classList.contains('open')) {
      icon.classList.replace('fa-bars', 'fa-times');
    } else {
      icon.classList.replace('fa-times', 'fa-bars');
    }
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const icon = mobileNavToggle.querySelector('i');
      icon.classList.replace('fa-times', 'fa-bars');
    });
  });

  // ==========================================
  // SHIPMENT TRACKER SYSTEM
  // ==========================================
  const trackerDatabase = {
    'ANV-1029-SHIP': {
      status: 'In Transit',
      origin: 'Port of Shanghai, CN',
      destination: 'Port of Los Angeles, US',
      steps: [
        { title: 'Picked Up & Cargo Inspected', time: 'June 01, 2026 - 09:30 AM', desc: 'Package collected from shipper facility. Security clearance completed.', completed: true },
        { title: 'Arrived at Shanghai Port Terminal', time: 'June 02, 2026 - 02:15 PM', desc: 'Container loaded onto vessel MSC Hamburg. Manifest finalized.', completed: true },
        { title: 'Vessel Departed (In Transit)', time: 'June 03, 2026 - 08:00 AM', desc: 'Vessel is currently sailing in East China Sea. Estimated port arrival: June 12.', active: true },
        { title: 'Customs Clearance in Progress', time: 'Pending', desc: 'Documentation review by US Customs and Border Protection.', completed: false },
        { title: 'Delivered to Final Destination', time: 'Pending', desc: 'Last mile freight delivery to Los Angeles Warehouse.', completed: false }
      ]
    },
    'ANV-4040-TRK': {
      status: 'Out for Delivery',
      origin: 'Dallas Distribution Hub, US',
      destination: 'Austin Commercial Plaza, US',
      steps: [
        { title: 'Shipped from Origin Terminal', time: 'June 02, 2026 - 06:00 AM', desc: 'Dispatched via Long-haul trucking fleet.', completed: true },
        { title: 'Received at Local Sort Center', time: 'June 03, 2026 - 01:20 AM', desc: 'Sorted and allocated to regional courier driver.', completed: true },
        { title: 'Out for Delivery', time: 'June 03, 2026 - 08:45 AM', desc: 'On courier vehicle with driver John Doe. Estimated delivery by 5 PM.', active: true },
        { title: 'Delivered', time: 'Pending', desc: 'Signature confirmation required upon handover.', completed: false }
      ]
    },
    'ANV-8080-DLV': {
      status: 'Delivered',
      origin: 'Munich Warehouse, DE',
      destination: 'Paris Business District, FR',
      steps: [
        { title: 'Package Received & Labelled', time: 'May 28, 2026 - 11:00 AM', desc: 'Express courier shipment processed.', completed: true },
        { title: 'Air Transit Completed', time: 'May 29, 2026 - 04:00 PM', desc: 'Arrived at Charles de Gaulle Airport, France.', completed: true },
        { title: 'Sorted & Dispatched to Depot', time: 'May 30, 2026 - 09:10 AM', desc: 'Package scanned at local Paris sorting facility.', completed: true },
        { title: 'Delivered & Signed', time: 'May 30, 2026 - 03:45 PM', desc: 'Delivered to main office. Signed by Receptionist (M. Dubois).', completed: true }
      ]
    }
  };

  const trackingInputHero = document.getElementById('tracking-input-hero');
  const trackingFormHero = document.getElementById('tracking-form-hero');
  
  const trackingInputHub = document.getElementById('tracking-input-hub');
  const trackingFormHub = document.getElementById('tracking-form-hub');
  
  const trackingResultContainer = document.getElementById('tracking-results-box');
  const trackerNumberDisplay = document.getElementById('tracker-number');
  const trackerStatusDisplay = document.getElementById('tracker-status');
  const timelineContainer = document.getElementById('timeline-steps');

  function renderTrackerResult(code) {
    const cleanCode = code.trim().toUpperCase();
    let data = trackerDatabase[cleanCode];

    // If code doesn't exist, generate a simulated cargo shipment response
    if (!data) {
      if (cleanCode.length < 5) {
        showToast('Please enter a valid tracking code.', 'error');
        return false;
      }
      data = {
        status: 'In Transit',
        origin: 'Global Shipping Hub',
        destination: 'Receiving Center',
        steps: [
          { title: 'Shipping Label Created', time: 'June 02, 2026 - 10:00 AM', desc: 'Order details sent to carrier.', completed: true },
          { title: 'Picked Up by Courier', time: 'June 03, 2026 - 09:00 AM', desc: 'Cargo received and currently in transit.', active: true },
          { title: 'Delivered to Destination', time: 'Pending', desc: 'Delivery schedule will update shortly.', completed: false }
        ]
      };
    }

    // Set Text Displays
    trackerNumberDisplay.textContent = cleanCode;
    trackerStatusDisplay.textContent = data.status;
    
    // Change badge color depending on status
    if (data.status === 'Delivered') {
      trackerStatusDisplay.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
      trackerStatusDisplay.style.color = '#28a745';
    } else if (data.status === 'Out for Delivery') {
      trackerStatusDisplay.style.backgroundColor = 'rgba(255, 179, 0, 0.1)';
      trackerStatusDisplay.style.color = '#e0a800';
    } else {
      trackerStatusDisplay.style.backgroundColor = 'rgba(255, 94, 20, 0.1)';
      trackerStatusDisplay.style.color = 'var(--accent)';
    }

    // Clear and build timeline steps
    timelineContainer.innerHTML = '';
    data.steps.forEach(step => {
      const stepEl = document.createElement('div');
      stepEl.className = 'timeline-step';
      if (step.completed) stepEl.classList.add('completed');
      if (step.active) stepEl.classList.add('active');

      stepEl.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-info">
          <h4 class="timeline-title">${step.title}</h4>
          <span class="timeline-time">${step.time}</span>
          <p class="timeline-desc">${step.desc}</p>
        </div>
      `;
      timelineContainer.appendChild(stepEl);
    });

    // Make visible and scroll to
    trackingResultContainer.style.display = 'block';
    const trackerSection = document.getElementById('tracker-section');
    if (trackerSection) {
      trackerSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    showToast(`Found shipment record: ${cleanCode}`, 'success');
    return true;
  }

  // Bind forms
  if (trackingFormHero) {
    trackingFormHero.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = trackingInputHero.value;
      if (renderTrackerResult(code)) {
        trackingInputHub.value = code; // sync input with the other input box
      }
    });
  }

  if (trackingFormHub) {
    trackingFormHub.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = trackingInputHub.value;
      renderTrackerResult(code);
    });
  }

  // ==========================================
  // DYNAMIC FREIGHT QUOTE CALCULATOR
  // ==========================================
  const calcForm = document.getElementById('freight-calc-form');
  const quotePriceDisplay = document.getElementById('quote-price');

  if (calcForm) {
    // Recalculate on any input change
    const inputs = calcForm.querySelectorAll('input, select');
    inputs.forEach(input => {
      input.addEventListener('input', calculateQuote);
      input.addEventListener('change', calculateQuote);
    });

    function calculateQuote() {
      const distance = parseFloat(document.getElementById('calc-distance').value) || 0;
      const weight = parseFloat(document.getElementById('calc-weight').value) || 0;
      const transportType = document.getElementById('calc-transport').value;
      const serviceSpeed = document.getElementById('calc-service').value;

      if (distance <= 0 || weight <= 0) {
        quotePriceDisplay.textContent = '$0.00';
        return;
      }

      // Base Rates
      let baseRate = 15.00;
      let costPerKm = 0.12;
      let costPerKg = 0.85;

      // Transport Multipliers
      let transportMultiplier = 1.0;
      if (transportType === 'air') transportMultiplier = 1.6;
      if (transportType === 'ocean') transportMultiplier = 0.6;
      if (transportType === 'rail') transportMultiplier = 0.8;

      // Service Speed Flat Addition
      let speedAddition = 0;
      if (serviceSpeed === 'express') speedAddition = 30.00;
      if (serviceSpeed === 'overnight') speedAddition = 75.00;

      // Pricing Algorithm
      let totalCost = baseRate + (distance * costPerKm) + (weight * costPerKg);
      totalCost = (totalCost * transportMultiplier) + speedAddition;

      // Rounded formatting
      quotePriceDisplay.textContent = '$' + totalCost.toFixed(2);
    }

    // Form submit simulation
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const price = quotePriceDisplay.textContent;
      if (price === '$0.00') {
        showToast('Please fill out the distance and weight fields.', 'error');
        return;
      }
      showToast(`Quote requested successfully for ${price}! Our agent will contact you shortly.`, 'success');
      calcForm.reset();
      quotePriceDisplay.textContent = '$0.00';
    });
  }

  // ==========================================
  // SERVICES TAB FILTERING
  // ==========================================
  const serviceTabBtns = document.querySelectorAll('.services-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      serviceTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter Cards
      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });

  // ==========================================
  // STATS NUMBER ANIMATION ON SCROLL
  // ==========================================
  const statsSection = document.querySelector('.stats-section');
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateNumbers() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
        }
      }, stepTime);
    });
  }

  // Skills progress bar animation
  const aboutSection = document.getElementById('about');
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  let skillsAnimated = false;

  function animateSkills() {
    skillBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percentage');
      bar.style.width = percentage;
    });
  }

  // Scroll Trigger
  window.addEventListener('scroll', () => {
    if (statsSection) {
      const statsTop = statsSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (statsTop < windowHeight - 100 && !animated) {
        animateNumbers();
        animated = true;
      }
    }

    if (aboutSection) {
      const aboutTop = aboutSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (aboutTop < windowHeight - 150 && !skillsAnimated) {
        animateSkills();
        skillsAnimated = true;
      }
    }
  });

  // ==========================================
  // TESTIMONIALS SLIDER
  // ==========================================
  const testimonialTrack = document.getElementById('testimonial-track');
  const testimonialSlides = document.querySelectorAll('.testimonial-card');
  const dotsContainer = document.getElementById('slider-dots');
  
  if (testimonialTrack && testimonialSlides.length > 0) {
    let currentIndex = 0;
    
    // Create navigation dots
    testimonialSlides.forEach((slide, idx) => {
      const dot = document.createElement('button');
      dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    function goToSlide(index) {
      currentIndex = index;
      testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    // Auto-sliding every 5 seconds
    let autoSlideInterval = setInterval(nextSlide, 6000);

    function nextSlide() {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= testimonialSlides.length) {
        nextIndex = 0;
      }
      goToSlide(nextIndex);
    }

    // Pause auto slide on mouse hover
    const sliderContainer = document.querySelector('.testimonials-slider-container');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
      });
      sliderContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 6000);
      });
    }
  }

  // ==========================================
  // NEWSLETTER & FOOTER SUBMIT
  // ==========================================
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput.value.trim() === '') {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      showToast('Thank you for subscribing to our newsletter!', 'success');
      newsletterForm.reset();
    });
  }

  // General contact mock submits
  const quoteHeaderBtn = document.getElementById('quote-header-btn');
  if (quoteHeaderBtn) {
    quoteHeaderBtn.addEventListener('click', (e) => {
      const calculatorSection = document.getElementById('tracker-section');
      if (calculatorSection) {
        calculatorSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ==========================================
  // TOAST ALERT SYSTEM FUNCTION
  // ==========================================
  function showToast(message, type = 'success') {
    // Create toast container if not exists
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    toast.innerHTML = `
      <i class="fas ${icon} toast-icon"></i>
      <span class="toast-message">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger transition Reflow
    toast.offsetHeight;
    
    toast.classList.add('show');

    // Remove toast after 4.5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 4500);
  }
});
