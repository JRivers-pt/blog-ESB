import './style.css';
import divisionsData from './data/divisions.json';

document.addEventListener('DOMContentLoaded', () => {
  /* =========================================
     Dynamic Divisions Rendering
  ========================================= */
  const divisoesContainer = document.getElementById('divisoes-container');
  if (divisoesContainer) {
    let html = '';
    divisionsData.forEach((divisao, index) => {
      const isReverse = index % 2 !== 0 ? 'divisao-article--reverse' : '';
      
      const textSide = `
        <div class="divisao-text-side">
          <span class="tag ${divisao.tag}">${divisao.title}</span>
          <h3>${divisao.subtitle}</h3>
          <p>${divisao.description}</p>
          <ul class="spec-list">
            ${divisao.specs.map(s => `
              <li>
                <span class="spec-value">${s.value}</span>
                <span class="spec-label">${s.label}</span>
              </li>
            `).join('')}
          </ul>
          <p class="design-note">💡 <em>${divisao.note}</em></p>
        </div>
      `;

      const imageSide = `
        <div class="divisao-image-side">
          <div class="divisao-img-stack">
            <img src="${divisao.images.main}" alt="${divisao.title}" class="divisao-img-main" loading="lazy" />
            <img src="${divisao.images.detail}" alt="Detalhe ${divisao.title}" class="divisao-img-secondary" loading="lazy" />
          </div>
        </div>
      `;

      html += `
        <article class="divisao-article ${isReverse}" id="${divisao.id}" data-reveal>
          ${index % 2 === 0 ? imageSide + textSide : textSide + imageSide}
        </article>
      `;
    });
    divisoesContainer.innerHTML = html;
  }

  /* =========================================
     Scroll Animations (Reveal)
  ========================================= */
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  };
  
  const revealOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };
  
  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
  
  // Trigger immediately for elements already in view
  setTimeout(() => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('revealed');
      }
    });
  }, 100);

  /* =========================================
     Sticky Navbar
  ========================================= */
  const navbar = document.getElementById('navbar');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state

  /* =========================================
     Mobile Navigation Toggle
  ========================================= */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  
  navToggle.addEventListener('click', () => {
    const isExpanded = navLinks.style.display === 'flex';
    
    if (isExpanded) {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      navLinks.style.padding = '1rem 0';
      navLinks.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
      navLinks.style.alignItems = 'center';
    }
  });

  // Close mobile menu when clicking a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
      }
    });
  });

  // Handle window resize to reset mobile menu styles
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'row';
      navLinks.style.position = 'static';
      navLinks.style.backgroundColor = 'transparent';
      navLinks.style.padding = '0';
      navLinks.style.boxShadow = 'none';
    } else {
      navLinks.style.display = 'none';
    }
  });
});
