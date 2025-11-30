// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Search Functionality
const searchBox = document.getElementById('searchBox');
const problemCards = document.querySelectorAll('.problem-card');
const topicSections = document.querySelectorAll('.topic-section');

searchBox.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    problemCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const section = card.closest('.topic-section');
        
        if (text.includes(searchTerm)) {
            card.style.display = 'block';
            section.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Hide sections with no visible cards
    topicSections.forEach(section => {
        const visibleCards = section.querySelectorAll('.problem-card[style="display: block;"]');
        if (visibleCards.length === 0 && searchTerm !== '') {
            section.style.display = 'none';
        } else {
            section.style.display = 'block';
        }
    });
});

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.topic-list a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Highlight active link
            navLinks.forEach(l => l.style.background = '');
            link.style.background = 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))';
            link.style.color = 'white';
        }
    });
});

// Highlight current section in sidebar on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    topicSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.background = '';
        link.style.color = '';
        
        if (link.getAttribute('href') === `#${current}`) {
            link.style.background = 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))';
            link.style.color = 'white';
        }
    });
});

// Copy code functionality
document.querySelectorAll('pre code').forEach(block => {
    const pre = block.parentElement;
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.textContent = '📋 Copy';
    button.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: var(--accent-primary);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.85rem;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    pre.style.position = 'relative';
    pre.appendChild(button);
    
    pre.addEventListener('mouseenter', () => {
        button.style.opacity = '1';
    });
    
    pre.addEventListener('mouseleave', () => {
        button.style.opacity = '0';
    });
    
    button.addEventListener('click', () => {
        const code = block.textContent;
        navigator.clipboard.writeText(code).then(() => {
            button.textContent = '✅ Copied!';
            setTimeout(() => {
                button.textContent = '📋 Copy';
            }, 2000);
        });
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

problemCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Mobile menu toggle (for responsive design)
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const menuBtn = document.createElement('button');
        menuBtn.innerHTML = '☰';
        menuBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            color: white;
            border: none;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: var(--shadow-hover);
            z-index: 1001;
        `;
        
        document.body.appendChild(menuBtn);
        
        menuBtn.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            const currentTransform = sidebar.style.transform;
            
            if (currentTransform === 'translateX(0px)') {
                sidebar.style.transform = 'translateX(-100%)';
            } else {
                sidebar.style.transform = 'translateX(0px)';
            }
        });
    }
};

createMobileMenu();
window.addEventListener('resize', createMobileMenu);

console.log('🚀 C Programming Practice Hub loaded successfully!');
