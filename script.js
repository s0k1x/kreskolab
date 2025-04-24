// Variables Globales
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const heroSection = document.querySelector('.hero');
const heroVideo = document.querySelector('.hero-background video');
const contactForm = document.querySelector('.contact-form');
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
const checkboxes = document.querySelectorAll('.checkbox input');
const stats = document.querySelectorAll('.stat-item');
const serviceCards = document.querySelectorAll('.service-card');
const blogCards = document.querySelectorAll('.blog-card');
const testimonials = document.querySelectorAll('.testimonial-card');
const themeToggle = document.querySelector('.theme-toggle');
const roadmapItems = document.querySelectorAll('.roadmap-item');
const comparisonCards = document.querySelectorAll('.comparison-card');
const infographicItems = document.querySelectorAll('.infographic-item');
const preloader = document.querySelector('.preloader');

// Preloader
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
});

// Animaciones Mejoradas
function initializeAnimations() {
    // Animación de estadísticas con efecto de conteo
    animateStats();
    
    // Animación de tarjetas de servicio
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotate(1deg)';
            card.style.boxShadow = 'var(--shadow-xl)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotate(0)';
            card.style.boxShadow = 'var(--shadow-md)';
        });
    });
    
    // Animación de testimonios
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('mouseenter', () => {
            testimonial.style.transform = 'scale(1.02)';
            testimonial.style.boxShadow = 'var(--shadow-xl)';
        });
        
        testimonial.addEventListener('mouseleave', () => {
            testimonial.style.transform = 'scale(1)';
            testimonial.style.boxShadow = 'var(--shadow-md)';
        });
    });
}

// Video de Fondo en Hero
function initializeVideoBackground() {
    if (heroVideo) {
        heroVideo.playbackRate = 0.5;
        heroVideo.muted = true;
        heroVideo.play();
    }
}

// Efectos de Comparación
function initializeComparisonEffects() {
    comparisonCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = 'var(--shadow-xl)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--shadow-lg)';
        });
    });
}

// Animación del Roadmap
function initializeRoadmapAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1
    });

    roadmapItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.5s ease';
        observer.observe(item);
    });
}

// Animación de Infografía
function initializeInfographicAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, {
        threshold: 0.1
    });

    infographicItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.5s ease';
        observer.observe(item);
    });
}

// Modo Oscuro/Claro
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Menú Hamburguesa
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Efecto de Scroll en el Header
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Efecto Parallax
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                parallaxElements.forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    const yPos = -(window.pageYOffset * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Animación de Estadísticas
function animateStats() {
    stats.forEach(stat => {
        const number = stat.querySelector('h4');
        const target = parseInt(number.textContent);
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const step = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                number.textContent = target;
                clearInterval(timer);
            } else {
                number.textContent = Math.floor(current);
            }
        }, step);
    });
}

// Efectos de Scroll
function initializeScrollEffects() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// Animación de Tarjetas
blogCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = 'var(--shadow-lg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'var(--shadow-md)';
    });
});

// Efectos de Formulario
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-5px)';
        input.style.borderColor = 'var(--primary-color)';
        input.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateY(0)';
        if (!input.value) {
            input.style.borderColor = '#eee';
            input.style.boxShadow = 'none';
        }
    });
});

// Formulario de Contacto
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación de campos
        const name = document.querySelector('input[type="text"]');
        const email = document.querySelector('input[type="email"]');
        const phone = document.querySelector('input[type="tel"]');
        const service = document.querySelector('select');
        const message = document.querySelector('textarea');
        
        let isValid = true;
        
        // Validar nombre
        if (!name.value.trim()) {
            showError(name, 'Por favor ingresa tu nombre');
            isValid = false;
        } else {
            removeError(name);
        }
        
        // Validar email
        if (!email.value.trim()) {
            showError(email, 'Por favor ingresa tu email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Por favor ingresa un email válido');
            isValid = false;
        } else {
            removeError(email);
        }
        
        // Validar teléfono
        if (phone.value.trim() && !isValidPhone(phone.value)) {
            showError(phone, 'Por favor ingresa un número de teléfono válido');
            isValid = false;
        } else {
            removeError(phone);
        }
        
        // Validar servicio
        if (!service.value) {
            showError(service, 'Por favor selecciona un servicio');
            isValid = false;
        } else {
            removeError(service);
        }
        
        // Validar mensaje
        if (!message.value.trim()) {
            showError(message, 'Por favor ingresa tu mensaje');
            isValid = false;
        } else {
            removeError(message);
        }
        
        if (isValid) {
            // Mostrar mensaje de carga
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
            
            // Simular envío (reemplazar con tu lógica de envío real)
            setTimeout(() => {
                // Aquí iría tu lógica de envío real (AJAX, Fetch, etc.)
                
                // Mostrar mensaje de éxito
                showSuccessMessage('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                
                // Resetear formulario
                contactForm.reset();
                
                // Restaurar botón
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 1500);
        }
    });
}

// Funciones auxiliares
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    input.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        formGroup.removeChild(errorElement);
    }
    input.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^\+?[\d\s-]{10,}$/;
    return re.test(phone);
}

function showSuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>${message}</p>
    `;
    
    const contactSection = document.querySelector('.contact');
    contactSection.insertBefore(successMessage, contactSection.firstChild);
    
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Animaciones al hacer scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .section-title, .about-text');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after navigation
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Button Hover Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    initializeScrollEffects();
    initializeParallax();
    initializeVideoBackground();
    initializeAnimations();
    
    // Add reveal class to elements
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });
}); 