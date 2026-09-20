
document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Toggle ---
  const menuButton = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-item');

  menuButton.addEventListener('click', () => {
    if (mobileMenu.style.display === 'block') {
      mobileMenu.style.display = 'none';
    } else {
      mobileMenu.style.display = 'block';
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.style.display = 'none';
    });
  });


  // --- Intersection Observer for Scroll Animations ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Define CSS for animations (setting initial hidden state)
  const style = document.createElement('style');
  style.textContent = `
                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                }
                .is-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `;
  document.head.appendChild(style);
  const container = document.querySelector('.projects-container');


  // Reveal Animation
  const expItems = document.querySelectorAll(".exp-item");

  const revealExp = () => {
    expItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        item.classList.add("show");
      }
    });
  };

  window.addEventListener("scroll", revealExp);
  window.addEventListener("load", revealExp);


  // Timeline Line Grow Animation
  const timeline = document.querySelector(".exp-timeline::before");

  // project section
  const projects = [
    {
      title: "Digital Hotel  System",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNtxerlMH-TYbUEc5xXVRT92Ggn1RzQyd8cw&s",
      stack: ["React", "Node", "MongoDB"],
      github: "#"
    },
    {
      title: "Aara E-Commerce",
      img: "https://cdn.shopify.com/s/files/1/0070/7032/articles/Header_7512ee53-c680-44d7-abc2-21ef61095558.png?v=1764713881",
      stack: ["React", "REST API", "MongoDB"],
      github: "#"
    },
    {
      title: "TaskFlow Tracker",
      img: "https://picsum.photos/seed/tasks/600/400",
      stack: ["React", "Express", "Tailwind"],
      github: "#"
    }
  ];

  projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
    <div class="card-inner">
      <div class="card-image"><img src="${p.img}" /></div>
      <div class="card-content">
        <h3>${p.title}</h3>
        <p>Professional full-stack modern UI project.</p>
      </div>
      <div class="badges">${p.stack.map(s => `<span>${s}</span>`).join("")}</div>
      <a href="${p.github}" class="github-btn" target="_blank">View on GitHub</a>
    </div>
  `;

    // TRUE 3D TILT HANDLER
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 28;
      const rotateX = -((y / rect.height) - 0.5) * 28;

      card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.07)
    `;
      card.style.boxShadow = `
      0 0 30px cyan,
      0 0 60px rgba(0,255,255,0.6)
    `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0) scale(1)";
      card.style.boxShadow = "0 0 20px rgba(0,255,255,0.15)";
    });

    container.appendChild(card);
  });


  // Select all elements to animate
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });

  const eduCards = document.querySelectorAll(".edu-pro-card");

  const eduObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("edu-show");
      }
    });
  });

  eduCards.forEach(card => eduObserver.observe(card));


  // FORM SUBMIT MESSAGE
  function handleFormSubmit(e) {
    e.preventDefault();
    document.getElementById("form-message").innerText = "Message Sent Successfully!";
  }

  // SCROLL REVEAL 3D
  const floatCards = document.querySelectorAll(".bp-float");

  function revealCards() {
    floatCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.style.opacity = 1;
        card.style.transform = "translateY(0) rotateX(0deg)";
      }
    });
  }

  window.addEventListener("scroll", revealCards);
  revealCards();


});
