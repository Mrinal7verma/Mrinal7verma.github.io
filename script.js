// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Dynamic typing effect for hero subtitle
document.addEventListener("DOMContentLoaded", function () {
  const subtitle = document.querySelector(".hero-content p");
  if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = "";

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }

    setTimeout(typeWriter, 1500);
  }
});

// Parallax effect for background
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".bg-animation");
  if (parallax) {
    const speed = scrolled * 0.2;
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Add hover effects for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.01)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Skill tags hover animation
document.querySelectorAll(".skill-tag").forEach((tag, index) => {
  tag.style.animationDelay = `${index * 0.05}s`;
});

// Stats counter animation
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace("+", ""));
    let current = 0;
    const increment = target / 20;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + "+";
        clearInterval(timer);
      } else {
        counter.textContent = Math.ceil(current) + "+";
      }
    }, 100);
  });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector("#about");
if (aboutSection) {
  const aboutObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(animateCounters, 500);
          aboutObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  aboutObserver.observe(aboutSection);
}

// Add active navigation highlighting
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Mobile menu toggle (if needed for future mobile nav)
function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("mobile-active");
}

// Smooth reveal animations for timeline items
document.querySelectorAll(".experience-item").forEach((item, index) => {
  item.style.animationDelay = `${index * 0.2}s`;
});

// Add loading animation
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Contact form validation (if form is added later)
function validateContactForm(form) {
  const email = form.querySelector('input[type="email"]');
  const message = form.querySelector("textarea");

  if (email && !isValidEmail(email.value)) {
    showNotification("Please enter a valid email address", "error");
    return false;
  }

  if (message && message.value.trim().length < 10) {
    showNotification(
      "Please enter a message with at least 10 characters",
      "error"
    );
    return false;
  }

  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Add smooth transitions for all interactive elements
document.addEventListener("DOMContentLoaded", function () {
  // Add loading state
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);

  // Initialize all animations
  initializeAnimations();
});

function initializeAnimations() {
  // Stagger animation for skill tags
  const skillTags = document.querySelectorAll(".skill-tag");
  skillTags.forEach((tag, index) => {
    tag.style.opacity = "0";
    tag.style.transform = "translateY(20px)";
    setTimeout(() => {
      tag.style.transition = "all 0.3s ease";
      tag.style.opacity = "1";
      tag.style.transform = "translateY(0)";
    }, index * 50);
  });

  // Project cards entrance animation
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 200);
  });
}

// Performance optimization: Throttle scroll events
let ticking = false;

function updateOnScroll() {
  // Update navbar
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Update parallax
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".bg-animation");
  if (parallax) {
    const speed = scrolled * 0.2;
    parallax.style.transform = `translateY(${speed}px)`;
  }

  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
}

window.addEventListener("scroll", requestTick);

// Add keyboard navigation support
document.addEventListener("keydown", function (e) {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", function () {
  document.body.classList.remove("keyboard-navigation");
});

// Add focus management for better accessibility
const focusableElements =
  'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
  const focusable = element.querySelectorAll(focusableElements);
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];

  element.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }
  });
}
