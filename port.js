// ===== Initialisation au Chargement ===== 
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio chargé avec succès!');
    initNavigation();
    initScrollAnimations();
    initFormHandler();
    initParallax();
    initNavLinkActive();
});

// ===== Navigation Fluide ===== 
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Fermer le menu si mobile
                const navMenu = document.querySelector('.nav-menu');
                navMenu.style.display = 'none';
                
                // Scroll fluide
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Réouvrir le menu
                setTimeout(() => {
                    navMenu.style.display = '';
                }, 500);
            }
        });
    });
}

// ===== Animations au Scroll ===== 
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll(
        '.skill-category, .project-card, .skill-item, .timeline-item, .contact-item'
    );
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(element);
    });
}

// ===== Gestion du Formulaire de Contact ===== 
function initFormHandler() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        // Validation
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
                input.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            } else {
                input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                input.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
        });

        if (!isValid) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        // Validation email
        const emailInput = form.querySelector('input[type="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert('Veuillez entrer une adresse email valide');
            return;
        }

        // Envoyer le formulaire
        submitForm(form);
    });

    // Focus effects
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('focus', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        });
        
        field.addEventListener('blur', function() {
            if (this.value.trim()) {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
        });
    });
}

// ===== Soumettre le Formulaire ===== 
function submitForm(form) {
    const button = form.querySelector('button');
    const originalText = button.textContent;
    const originalColor = button.style.backgroundColor;
    
    button.textContent = '⏳ Envoi en cours...';
    button.disabled = true;
    button.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    
    // Simuler l'envoi (remplacer par une vraie API si nécessaire)
    setTimeout(() => {
        button.textContent = '✓ Message reçu!';
        button.style.backgroundColor = '#10b981';
        
        // Réinitialiser le formulaire
        form.reset();
        
        // Rétablir le bouton
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.backgroundColor = originalColor;
        }, 3000);
    }, 1500);
}

// ===== Effet Parallaxe ===== 
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition < window.innerHeight) {
            hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
        }
    });
}

// ===== Highlight du Lien de Navigation Actif ===== 
function initNavLinkActive() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
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
}

// ===== Fonction Utile: Copier Email ===== 
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Afficher une notification
        showNotification('Email copié au presse-papiers!');
    }).catch(err => {
        console.error('Erreur:', err);
    });
}

// ===== Afficher une Notification ===== 
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        z-index: 9999;
        animation: slideIn 0.4s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s ease-out';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// ===== Animations CSS pour les Notifications ===== 
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .nav-link.active {
        color: #6366f1;
        font-weight: 600;
    }

    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ===== Interaction Smooth au Click ===== 
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.href.includes('#')) {
        e.target.style.opacity = '0.7';
        setTimeout(() => {
            e.target.style.opacity = '1';
        }, 200);
    }
});
