/* ===================================================================
   PORTFOLIO JAVASCRIPT (script.js)
   Theme: Awwwards-Style Minimalist White Portfolio
   Author: Rimsha Kanwal
   
   CLASS / STUDENT FRIENDLY CODE:
   - Written in 100% plain Vanilla JavaScript (no complex external libraries).
   - Designed to be clear, educational, and easy to explain during presentations.
   =================================================================== */

// Wait for the HTML document to fully load before running our scripts
document.addEventListener("DOMContentLoaded", function () {

  /* ==========================================================
     1. NAVBAR BACKGROUND ON SCROLL
     Adds subtle elevation to the header as the visitor scrolls down
     ========================================================== */
  const header = document.getElementById("header");

  window.addEventListener("scroll", function () {
    // When scrolled down more than 40px, add the "scrolled" CSS class
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });


  /* ==========================================================
     2. AWWWARDS LEFT-TO-RIGHT DRAWER NAVIGATION
     Opens and closes the sleek slide-out drawer on mobile
     ========================================================== */
  const mobileToggle = document.getElementById("mobileToggle");
  const navDrawer = document.getElementById("navDrawer");
  const drawerClose = document.getElementById("drawerClose");
  const drawerOverlay = document.getElementById("drawerOverlay");
  const drawerLinks = document.querySelectorAll(".drawer-link");
  const desktopNavLinks = document.querySelectorAll(".nav-menu .nav-link");

  function openDrawer() {
    navDrawer.classList.add("open");
    drawerOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  function closeDrawer() {
    navDrawer.classList.remove("open");
    drawerOverlay.classList.remove("active");
    document.body.style.overflow = ""; // Restore background scroll
  }

  if (mobileToggle) mobileToggle.addEventListener("click", openDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

  // Close drawer and navigate when any drawer link is clicked
  drawerLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeDrawer();
    });
  });


  /* ==========================================================
     3. MINOR SCROLL REVEAL ANIMATION (Intersection Observer)
     Smoothly fades in elements when they enter the user's screen
     ========================================================== */
  const revealElements = document.querySelectorAll(".reveal-up");

  // Check if browser supports IntersectionObserver
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Add CSS class that triggers the subtle upward fade animation
            entry.target.classList.add("is-revealed");
            // Stop observing once it has animated in
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -40px 0px"
      }
    );

    // Attach observer to each element marked with .reveal-up
    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers: show elements immediately
    revealElements.forEach(function (el) {
      el.classList.add("is-revealed");
    });
  }


  /* ==========================================================
     4. ACTIVE NAVIGATION LINK ON SCROLL
     Highlights which section is currently on screen in the navbar
     ========================================================== */
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", function () {
    let currentActiveId = "";

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentActiveId = section.getAttribute("id");
      }
    });

    // Update active state on desktop navbar links
    desktopNavLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentActiveId) {
        link.classList.add("active");
      }
    });

    // Update active state on mobile drawer links
    drawerLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentActiveId) {
        link.classList.add("active");
      }
    });
  });


  /* ==========================================================
     5. CONTACT FORM SUBMISSION & VALIDATION
     Validates user inputs and displays clean feedback without page reload
     ========================================================== */
  const contactForm = document.getElementById("contactForm");
  const feedbackBox = document.getElementById("formFeedback");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop default browser page reload

    const name = document.getElementById("userName").value.trim();
    const phone = document.getElementById("userPhone").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const message = document.getElementById("userMessage").value.trim();

    // Check if any field is empty
    if (!name || !phone || !email || !message) {
      feedbackBox.textContent = "Please fill in all fields before submitting.";
      feedbackBox.className = "form-feedback error";
      return;
    }

    // Success response
    feedbackBox.textContent = "Thank you, " + name + "! Your inquiry has been sent.";
    feedbackBox.className = "form-feedback success";

    // Reset the form fields
    contactForm.reset();

    // Fade out feedback message after 5 seconds
    setTimeout(function () {
      feedbackBox.textContent = "";
      feedbackBox.className = "form-feedback";
    }, 5000);
  });

});
