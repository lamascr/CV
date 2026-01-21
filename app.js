// ============================================
// INICIALIZACIÓN Y CONFIGURACIÓN GLOBAL
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    // Inicializar todas las funcionalidades
    initPreloader();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initScrollProgress();
    initDarkMode();
    initLanguageToggle();
    initParticleSystem();
    initContactForm();
    initTypingEffect();
    initProgressBars();
    initParallaxEffects();
    initScrollToTop();
    initToastNotifications();
    initCopyToClipboard();
    initKeyboardShortcuts();
    initPWAFeatures();
    initAccessibilityFeatures();
    initMagneticEffect();
    initSpotlight();
    initScrollSpy();

    // Configurar el tema inicial
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Configurar idioma inicial
    const savedLanguage = localStorage.getItem('language') || 'es';
    setLanguage(savedLanguage);

    // Configurar el scroll inicial
    updateScrollProgress();

    // Añadir clase de loaded al body
    document.body.classList.add('loaded');
}

// ============================================
// PRELOADER PREMIUM TÉCNICO
// ============================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const loadingSteps = [
        { text: 'SISTEMA: ON', progress: 5 },
        { text: 'CARGANDO MÓDULOS...', progress: 15 },
        { text: 'SYNC: GEOMETRÍA CAD', progress: 25 },
        { text: 'ANALIZANDO ESTRUCTURAS...', progress: 40 },
        { text: 'ESTABLECIENDO PROTOCOLOS...', progress: 55 },
        { text: 'OPTIMIZANDO RENDIMIENTO...', progress: 70 },
        { text: 'GENERANDO EXPERIENCIA...', progress: 85 },
        { text: 'SISTEMA LISTO', progress: 100 }
    ];

    let currentStep = 0;
    const statusText = document.querySelector('.loading-status');
    const progressBar = document.querySelector('.loading-progress');

    const updateStep = () => {
        if (currentStep >= loadingSteps.length) {
            finishLoading();
            return;
        }

        const step = loadingSteps[currentStep];

        // Efecto glitch en el texto durante el cambio
        if (statusText) {
            statusText.classList.add('glitch-text');
            setTimeout(() => {
                statusText.textContent = step.text;
                statusText.classList.remove('glitch-text');
            }, 150);
        }

        if (progressBar) {
            progressBar.style.width = step.progress + '%';
        }

        currentStep++;

        // Tiempos variables para más realismo
        const nextDelay = Math.random() * 400 + 300;
        setTimeout(updateStep, nextDelay);
    };

    const finishLoading = () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('page-loaded');
                initEntranceAnimations();
            }, 800);
        }, 600);
    };

    // Iniciar secuencia
    setTimeout(updateStep, 500);
}

// ============================================
// ANIMACIONES DE ENTRADA
// ============================================
function initEntranceAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animated');
        }, index * 100);
    });
}

// ============================================
// NAVEGACIÓN MÓVIL
// ============================================
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');

            // Animar el icono del menú
            const icon = this.querySelector('svg');
            if (navLinks.classList.contains('active')) {
                icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
            } else {
                icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
            }
        });

        // Cerrar el menú al hacer clic en un enlace
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function () {
                navLinks.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('svg');
                icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
            });
        });
    }
}

// ============================================
// SCROLL SUAVE
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// INTERSECTION OBSERVER PARA ANIMACIONES
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si es un contenedor con hijos para animar de forma escalonada
                if (entry.target.classList.contains('experience-timeline') ||
                    entry.target.classList.contains('education-grid') ||
                    entry.target.classList.contains('skills-grid') ||
                    entry.target.classList.contains('projects-grid') ||
                    entry.target.classList.contains('about-stats')) {

                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animated');
                        }, index * 100);
                    });
                } else {
                    entry.target.classList.add('animated');
                }

                // Animaciones específicas
                if (entry.target.classList.contains('skill-progress')) {
                    animateSkillBar(entry.target);
                }

                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observar elementos animables
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .experience-timeline, .education-grid, .projects-grid, .about-stats');
    animatedElements.forEach(el => observer.observe(el));
}

function animateSkillBar(bar) {
    const level = bar.getAttribute('data-level') || 0;
    const skillItem = bar.closest('.skill-item');
    const levelDisplay = skillItem ? skillItem.querySelector('.skill-level') : null;

    setTimeout(() => {
        bar.style.width = level + '%';

        // Animar el número si existe
        if (levelDisplay) {
            let current = 0;
            const step = level / 30;
            const timer = setInterval(() => {
                current += step;
                if (current >= level) {
                    levelDisplay.textContent = level + '%';
                    clearInterval(timer);
                } else {
                    levelDisplay.textContent = Math.floor(current) + '%';
                }
            }, 30);
        }
    }, 200);
}

function animateCounter(element) {
    const target = parseInt(element.textContent);
    const increment = target / 50;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 30);
}

// ============================================
// DARK MODE
// ============================================
function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Animar el toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    }
}

// ============================================
// TOGGLE DE IDIOMAS
// ============================================
function initLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);

    // Actualizar botones
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Actualizar contenido
    updatePageContent(lang);

    // Animar el cambio
    const languageToggle = document.querySelector('.language-toggle');
    if (languageToggle) {
        languageToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            languageToggle.style.transform = 'scale(1)';
        }, 150);
    }
}

function updatePageContent(lang) {
    const translations = getTranslations();
    const elements = document.querySelectorAll('[data-translate]');

    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

function getTranslations() {
    return {
        es: {
            // Navegación
            'nav-home': 'Inicio',
            'nav-about': 'Acerca',
            'nav-experience': 'Experiencia',
            'nav-education': 'Educación',
            'nav-skills': 'Habilidades',
            'nav-projects': 'Proyectos',
            'nav-contact': 'Contacto',

            // Hero Section
            'hero-greeting': 'Hola, soy',
            'hero-name': 'Carlos Lamas',
            'hero-title': 'Ingeniero Mecánico',
            'hero-subtitle': 'Especialista en CAD, Mantenimiento y Energía',
            'hero-description': 'Ingeniero Mecánico especializado en diseño CAD, análisis estructural y control de calidad. Experto en gestión de proyectos de energía renovable y mantenimiento para maximizar la fiabilidad de activos industriales.',
            'hero-cta-primary': 'Ver Mi Experiencia',
            'hero-cta-secondary': 'Descargar CV',

            // About
            'about-title': 'Acerca de Mí',
            'about-subtitle': 'Conoce más sobre mi trayectoria profesional',
            'about-intro-title': 'Ingeniero Mecánico Especialista en Calidad y Mantenimiento',
            'about-text-1': 'Como ingeniero mecánico especializado en diseño CAD, análisis estructural y control de calidad, me enfoco en maximizar la fiabilidad y seguridad de activos industriales mediante la ingeniería de mantenimiento y gestión operativa.',
            'about-text-2': 'He desarrollado mi carrera en sectores clave como la educación superior y la industria de válvulas, especializándome en la gestión de proyectos de energía renovable y sistemas mecánicos complejos bajo normas ISO 9001.',
            'about-stat-1-number': '5+',
            'about-stat-1-label': 'Años de Experiencia',
            'about-stat-2-number': '10+',
            'about-stat-2-label': 'Proyectos Completados',
            'about-stat-3-number': '3',
            'about-stat-3-label': 'Idiomas',
            'about-stat-4-number': '15+',
            'about-stat-4-label': 'Habilidades Técnicas',

            // Experience
            'experience-title': 'Experiencia Profesional',
            'experience-subtitle': 'Mi trayectoria profesional y logros',
            'experience-1-date': 'Enero 2022 - Presente',
            'experience-1-title': 'Ingeniero de Calidad',
            'experience-1-company': 'Borja Valves',
            'experience-1-description': 'Gestión de operaciones diarias y supervisión de equipos. Control de inventarios, pedidos y reportes. Cumplimiento de protocolos de calidad/seguridad e implementación de sistemas ISO 9001.',
            'experience-2-date': 'Enero 2023 - Septiembre 2024',
            'experience-2-title': 'Profesor de Ingeniería',
            'experience-2-company': 'Universidad Oscar Lucero',
            'experience-2-description': 'Impartición de clases en tecnología energética y sistemas renovables. Diseño mecánico avanzado con herramientas CAD/FEA y gestión académica departamental.',

            // Education
            'education-title': 'Educación',
            'education-subtitle': 'Mi formación académica y certificaciones',
            'education-1-year': 'Jul 2025 - Presente',
            'education-1-degree': 'Máster Universitario en Ingeniería del Mantenimiento',
            'education-1-institution': 'Universidad Politécnica de Valencia (UPV)',
            'education-1-description': 'Competencias en gestión de fiabilidad (RAMS), mantenimiento predictivo y basado en condición, gestión económica y diseños de estrategias.',
            'education-2-year': 'Sep 2016 - Dic 2022',
            'education-2-degree': 'Ingeniero Mecánico',
            'education-2-institution': 'Universidad Oscar Lucero, Holguín, Cuba',
            'education-2-description': 'Formación integral en diseño mecánico (CAD), análisis estructural, termodinámica, mecánica de fluidos, control de calidad y manufactura.',

            // Skills
            'skills-title': 'Habilidades Técnicas',
            'skills-subtitle': 'Competencias y especialidades profesionales',
            'skills-1-title': 'Software CAD',
            'skills-1-skill-1': 'SolidWorks - Avanzado',
            'skills-1-skill-2': 'Autodesk Inventor - Avanzado',
            'skills-1-skill-3': 'AutoCAD - Intermedio',
            'skills-2-title': 'Análisis y Simulación',
            'skills-2-skill-1': 'Análisis Estructural',
            'skills-2-skill-2': 'Simulación y Modelado',
            'skills-2-skill-3': 'Análisis por Elementos Finitos (FEA)',
            'skills-3-title': 'Mantenimiento y Energía',
            'skills-3-skill-1': 'Mantenimiento Industrial',
            'skills-3-skill-2': 'Sistemas de Energía Renovable',
            'skills-3-skill-3': 'Termodinámica y Mecánica de Fluidos',
            'skills-4-title': 'Gestión y Control',
            'skills-4-skill-1': 'ISO 9001 y Calidad',
            'skills-4-skill-2': 'Control de Procesos',
            'skills-4-skill-3': 'Gestión Operativa',

            // Certifications
            'certs-title': 'Cursos y Certificaciones',
            'certs-subtitle': 'Formación complementaria y técnica',
            'cert-1-name': 'Mantenimiento de Centros de Procesos de Datos (CPD)',
            'cert-1-description': 'Infraestructura eléctrica (SAI/UPS), climatización de precisión, normativa F-Gas y protocolos de alta disponibilidad (Tiers).',

            // Contact
            'contact-title': 'Contacto',
            'contact-subtitle': '¿Tienes un proyecto en mente? Hablemos',
            'contact-name': 'Nombre',
            'contact-email': 'Correo Electrónico',
            'contact-subject': 'Asunto',
            'contact-message': 'Mensaje',
            'contact-send': 'Enviar Mensaje',
            'contact-info-1-title': 'Email',
            'contact-info-1-text': 'lamascpo@gmail.com',
            'contact-info-2-title': 'Ubicación',
            'contact-info-2-text': 'Dos de Mayo, 46920 Mislata (Valencia, España)',
            'contact-info-3-title': 'LinkedIn',
            'contact-info-3-text': 'Carlos Lamas',
            'contact-info-4-title': 'Teléfono',
            'contact-info-4-text': '+34 672 867 117',

            // Footer
            'footer-text': 'Gracias por visitar mi portafolio. Siempre estoy interesado en nuevas oportunidades y proyectos emocionantes.',
            'footer-copyright': '© 2025 Carlos Lamas. Todos los derechos reservados.'
        },
        en: {
            // Navigation
            'nav-home': 'Home',
            'nav-about': 'About',
            'nav-experience': 'Experience',
            'nav-education': 'Education',
            'nav-skills': 'Skills',
            'nav-projects': 'Projects',
            'nav-contact': 'Contact',

            // Hero Section
            'hero-greeting': 'Hello, I\'m',
            'hero-name': 'Carlos Lamas',
            'hero-title': 'Mechanical Engineer',
            'hero-subtitle': 'CAD, Maintenance & Energy Specialist',
            'hero-description': 'Mechanical Engineer specialized in CAD design, structural analysis, and quality control. Expert in renewable energy project management and maintenance to maximize industrial asset reliability.',
            'hero-cta-primary': 'View My Experience',
            'hero-cta-secondary': 'Download CV',

            // About
            'about-title': 'About Me',
            'about-subtitle': 'Learn more about my professional background',
            'about-intro-title': 'Mechanical Engineer Specialist in Quality and Maintenance',
            'about-text-1': 'As a mechanical engineer specializing in CAD design, structural analysis, and quality control, I focus on maximizing the reliability and safety of industrial assets through maintenance engineering and operational management.',
            'about-text-2': 'I have developed my career in key sectors such as higher education and the valve industry, specializing in the management of renewable energy projects and complex mechanical systems under ISO 9001 standards.',
            'about-stat-1-number': '5+',
            'about-stat-1-label': 'Years of Experience',
            'about-stat-2-number': '10+',
            'about-stat-2-label': 'Completed Projects',
            'about-stat-3-number': '3',
            'about-stat-3-label': 'Languages',
            'about-stat-4-number': '15+',
            'about-stat-4-label': 'Technical Skills',

            // Experience
            'experience-title': 'Professional Experience',
            'experience-subtitle': 'My professional career and achievements',
            'experience-1-date': 'January 2022 - Present',
            'experience-1-title': 'Quality Engineer',
            'experience-1-company': 'Borja Valves',
            'experience-1-description': 'Management of daily operations and team supervision. Inventory control, orders, and reports. Compliance with quality/safety protocols and implementation of ISO 9001 systems.',
            'experience-2-date': 'January 2023 - September 2024',
            'experience-2-title': 'Engineering Professor',
            'experience-2-company': 'Oscar Lucero University',
            'experience-2-description': 'Teaching classes in energy technology and renewable systems. Advanced mechanical design with CAD/FEA tools and departmental academic management.',

            // Education
            'education-title': 'Education',
            'education-subtitle': 'My academic training and certifications',
            'education-1-year': 'Jul 2025 - Present',
            'education-1-degree': 'Master\'s Degree in Maintenance Engineering',
            'education-1-institution': 'Polytechnic University of Valencia (UPV)',
            'education-1-description': 'Competencies in reliability management (RAMS), predictive and condition-based maintenance, economic management, and strategy design.',
            'education-2-year': 'Sep 2016 - Dec 2022',
            'education-2-degree': 'Mechanical Engineer',
            'education-2-institution': 'Oscar Lucero University, Holguín, Cuba',
            'education-2-description': 'Comprehensive training in mechanical design (CAD), structural analysis, thermodynamics, fluid mechanics, quality control, and manufacturing.',

            // Skills
            'skills-title': 'Technical Skills',
            'skills-subtitle': 'Competencies and professional specialties',
            'skills-1-title': 'CAD Software',
            'skills-1-skill-1': 'SolidWorks - Advanced',
            'skills-1-skill-2': 'Autodesk Inventor - Advanced',
            'skills-1-skill-3': 'AutoCAD - Intermediate',
            'skills-2-title': 'Analysis & Simulation',
            'skills-2-skill-1': 'Structural Analysis',
            'skills-2-skill-2': 'Simulation & Modeling',
            'skills-2-skill-3': 'Finite Element Analysis (FEA)',
            'skills-3-title': 'Maintenance & Energy',
            'skills-3-skill-1': 'Industrial Maintenance',
            'skills-3-skill-2': 'Renewable Energy Systems',
            'skills-3-skill-3': 'Thermodynamics & Fluid Mechanics',
            'skills-4-title': 'Management & Control',
            'skills-4-skill-1': 'ISO 9001 & Quality',
            'skills-4-skill-2': 'Process Control',
            'skills-4-skill-3': 'Operational Management',

            // Certifications
            'certs-title': 'Courses & Certifications',
            'certs-subtitle': 'Technical and complementary training',
            'cert-1-name': 'Data Center Maintenance (CPD)',
            'cert-1-description': 'Electrical infrastructure (UPS), precision cooling, F-Gas regulations, and high availability protocols (Tiers).',

            // Contact
            'contact-title': 'Contact',
            'contact-subtitle': 'Have a project in mind? Let\'s talk',
            'contact-name': 'Name',
            'contact-email': 'Email',
            'contact-subject': 'Subject',
            'contact-message': 'Message',
            'contact-send': 'Send Message',
            'contact-info-1-title': 'Email',
            'contact-info-1-text': 'lamascpo@gmail.com',
            'contact-info-2-title': 'Location',
            'contact-info-2-text': 'Dos de Mayo, 46920 Mislata (Valencia, Spain)',
            'contact-info-3-title': 'LinkedIn',
            'contact-info-3-text': 'Carlos Lamas',
            'contact-info-4-title': 'Phone',
            'contact-info-4-text': '+34 672 867 117',

            // Footer
            'footer-text': 'Thank you for visiting my portfolio. I am always interested in new opportunities and exciting projects.',
            'footer-copyright': '© 2025 Carlos Lamas. All rights reserved.'
        }
    };
}

// ============================================
// EFECTO DE MÁQUINA DE ESCRIBIR
// ============================================
function initTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;

    const texts = [
        '🔧 Ingeniero Mecánico multidisciplinar',
        '📐 Especialista en CAD y Simulación',
        '⚙️ Experto en Mantenimiento Industrial',
        '💡 Apasionado por la Innovación',
        '🌍 Profesional Internacional'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
}

// ============================================
// BARRAS DE PROGRESO DE HABILIDADES
// ============================================
function initProgressBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level') || 80;
        bar.style.width = '0%';
    });
}

// ============================================
// EFECTOS DE PARALAJE
// ============================================
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');

        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}


// ============================================
// SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    const progressBarFill = document.querySelector('.scroll-progress-bar');
    const scrollProgress = document.querySelector('.scroll-progress');

    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if (progressBarFill) {
            progressBarFill.style.width = scrollPercent + '%';
        }

        if (scrollProgress) {
            if (scrollTop > 100) {
                scrollProgress.classList.add('visible');
            } else {
                scrollProgress.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress();
}

function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);

    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

// ============================================
// SISTEMA DE PARTÍCULAS MEJORADO
// ============================================
function initParticleSystem() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: 0, y: 0 };
    let isActive = true;

    // Redimensionar canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Clase Partícula mejorada
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.6 + 0.2;
            this.baseOpacity = this.opacity;
            this.color = this.getRandomColor();
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulsePhase = Math.random() * Math.PI * 2;
        }

        getRandomColor() {
            const colors = [
                'rgba(0, 87, 183,',  // primary-500
                'rgba(59, 130, 246,', // primary-500 dark
                'rgba(0, 168, 232,',  // accent
                'rgba(16, 185, 129,', // success
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Efecto de pulsación
            this.pulsePhase += this.pulseSpeed;
            this.opacity = this.baseOpacity + Math.sin(this.pulsePhase) * 0.3;

            // Rebotar en los bordes con elasticidad
            if (this.x < 0 || this.x > canvas.width) {
                this.vx *= -0.8;
                this.x = Math.max(0, Math.min(canvas.width, this.x));
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.vy *= -0.8;
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }
        }

        draw() {
            // Partícula principal
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.opacity + ')';
            ctx.fill();

            // Glow effect
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color + (this.opacity * 0.3) + ')';
            ctx.fill();
        }

        connect(other) {
            const dx = this.x - other.x;
            const dy = this.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const opacity = (120 - distance) / 120;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = this.color + (opacity * 0.4) + ')';
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }

        interactWithMouse() {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 100;

            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const angle = Math.atan2(dy, dx);

                this.vx += Math.cos(angle) * force * 0.05;
                this.vy += Math.sin(angle) * force * 0.05;

                // Efecto de repulsión cuando se acerca mucho
                if (distance < 30) {
                    this.vx -= Math.cos(angle) * force * 0.1;
                    this.vy -= Math.sin(angle) * force * 0.1;
                }
            }
        }
    }

    // Crear partículas
    function createParticles() {
        const particleCount = Math.min(80, Math.floor(canvas.width * canvas.height / 8000));
        particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Animación optimizada
    let lastTime = 0;
    function animate(currentTime) {
        if (!isActive) return;

        const deltaTime = currentTime - lastTime;
        if (deltaTime < 16) { // ~60fps
            requestAnimationFrame(animate);
            return;
        }
        lastTime = currentTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Actualizar y dibujar partículas
        particles.forEach(particle => {
            particle.interactWithMouse();
            particle.update();
            particle.draw();
        });

        // Dibujar conexiones
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                particles[i].connect(particles[j]);
            }
        }

        requestAnimationFrame(animate);
    }

    // Eventos
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    // Pausar/partículas cuando la página no está visible
    document.addEventListener('visibilitychange', () => {
        isActive = !document.hidden;
        if (isActive) {
            requestAnimationFrame(animate);
        }
    });

    // Inicializar
    resizeCanvas();
    createParticles();
    requestAnimationFrame(animate);
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function initToastNotifications() {
    window.showToast = function (message, type = 'info', duration = 5000) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        toast.innerHTML = `
            <div class="toast-header">
                <div class="toast-title">
                    <i class="toast-icon ${icons[type]}"></i>
                    <span>${type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </div>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="toast-message">${message}</div>
            <div class="toast-progress"></div>
        `;

        container.appendChild(toast);

        // Mostrar toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Auto remover
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, duration);

        return toast;
    };
}

// ============================================
// COPY TO CLIPBOARD
// ============================================
function initCopyToClipboard() {
    // Definir función global para llamadas inline como la del HTML
    window.copyToClipboard = async function (text) {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            if (window.showToast) {
                window.showToast('Copiado al portapapeles', 'success');
            }
            return true;
        } catch (err) {
            console.error('Error al copiar: ', err);
            if (window.showToast) {
                window.showToast('Error al copiar al portapapeles', 'error');
            }
            return false;
        }
    };

    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            try {
                await navigator.clipboard.writeText(textToCopy);

                // Mostrar feedback visual
                btn.classList.add('micro-bounce');
                const originalIcon = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i>';
                btn.style.color = 'var(--success)';

                setTimeout(() => {
                    btn.classList.remove('micro-bounce');
                    btn.innerHTML = originalIcon;
                    btn.style.color = '';
                }, 1000);

                if (window.showToast) {
                    window.showToast('Copiado al portapapeles', 'success');
                }
            } catch (err) {
                console.error('Error al copiar: ', err);
                if (window.showToast) {
                    window.showToast('Error al copiar al portapapeles', 'error');
                }
            }
        });
    });
}

// ============================================
// FORMULARIO DE CONTACTO AVANZADO
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Validar formulario
        if (!validateForm(form)) {
            if (window.showToast) {
                window.showToast('Por favor, completa todos los campos correctamente', 'error');
            }
            return;
        }

        // Mostrar estado de carga
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Enviar datos
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                if (window.showToast) {
                    window.showToast('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
                }
                form.reset();
                clearErrors(form);
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    const errorMsg = data["errors"].map(error => error["message"]).join(", ");
                    throw new Error(errorMsg);
                } else {
                    throw new Error('Error al enviar el formulario');
                }
            }

        } catch (error) {
            console.error('Error al enviar formulario:', error);
            if (window.showToast) {
                window.showToast('Error al enviar el mensaje. Inténtalo de nuevo.', 'error');
            }
        } finally {
            // Restaurar botón
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldGroup = field.closest('.form-group');

    // Limpiar errores previos
    clearFieldError(field);

    let isValid = true;
    let errorMessage = '';

    // Validaciones específicas
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'Este campo es obligatorio';
        isValid = false;
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Por favor, introduce un email válido';
            isValid = false;
        }
    } else if (field.type === 'text' && value.length < 2) {
        errorMessage = 'El nombre debe tener al menos 2 caracteres';
        isValid = false;
    } else if (field.tagName === 'TEXTAREA' && value.length < 10) {
        errorMessage = 'El mensaje debe tener al menos 10 caracteres';
        isValid = false;
    }

    if (!isValid) {
        showFieldError(fieldGroup, errorMessage);
    }

    return isValid;
}
// ============================================
// EFECTO MAGNÉTICO (PREMIUM UI)
// ============================================
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn, .nav-link, .social-link, .lang-btn, .theme-toggle');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', function (e) {
            const pos = this.getBoundingClientRect();
            const x = e.clientX - pos.left - pos.width / 2;
            const y = e.clientY - pos.top - pos.height / 2;

            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        el.addEventListener('mouseleave', function (e) {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// EFECTO SPOTLIGHT DINÁMICO
// ============================================
function initSpotlight() {
    window.addEventListener('mousemove', e => {
        document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
}

// ============================================
// SCROLL SPY (NAVEGACIÓN ACTIVA)
// ============================================
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

function showFieldError(fieldGroup, message) {
    fieldGroup.classList.add('error');
    const errorElement = fieldGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearFieldError(field) {
    const fieldGroup = field.closest('.form-group');
    fieldGroup.classList.remove('error');
    const errorElement = fieldGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function clearErrors(form) {
    const errorGroups = form.querySelectorAll('.form-group.error');
    errorGroups.forEach(group => {
        group.classList.remove('error');
        const errorElement = group.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
}

// La función anterior simulateFormSubmission ha sido reemplazada por lógica fetch real en initContactForm.

// ============================================
// SCROLL TO TOP
// ============================================
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;

    function toggleScrollButton() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', toggleScrollButton);
    toggleScrollButton();
}

// ============================================
// PWA FEATURES
// ============================================
function initPWAFeatures() {
    // Install prompt
    let deferredPrompt;
    const installButton = document.getElementById('installApp');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        if (installButton) {
            installButton.style.display = 'block';
            installButton.addEventListener('click', () => {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    }
                    deferredPrompt = null;
                    installButton.style.display = 'none';
                });
            });
        }
    });

    // Share API
    const shareButton = document.getElementById('shareProfile');
    if (shareButton) {
        shareButton.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Carlos Lamas - Ingeniero Mecánico',
                        text: 'Echa un vistazo al portafolio de Carlos Lamas',
                        url: window.location.href
                    });
                } catch (err) {
                    console.log('Error sharing:', err);
                }
            } else {
                // Fallback: copiar URL
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    if (window.showToast) {
                        window.showToast('URL copiada al portapapeles', 'success');
                    }
                } catch (err) {
                    console.log('Error copying URL:', err);
                }
            }
        });
    }
}

// ============================================
// ACCESSIBILITY FEATURES
// ============================================
function initAccessibilityFeatures() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-500);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Announce page changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);

    window.announceToScreenReader = function (message) {
        announcer.textContent = message;
    };
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Solo activar si no estamos en un input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.contentEditable === 'true') {
            return;
        }

        switch (true) {
            case (e.ctrlKey || e.metaKey) && e.key === 'd':
                e.preventDefault();
                toggleTheme();
                if (window.announceToScreenReader) {
                    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                    window.announceToScreenReader(isDark ? 'Modo claro activado' : 'Modo oscuro activado');
                }
                break;

            case (e.ctrlKey || e.metaKey) && e.key === 'l':
                e.preventDefault();
                const currentLang = localStorage.getItem('language') || 'es';
                const newLang = currentLang === 'es' ? 'en' : 'es';
                setLanguage(newLang);
                if (window.announceToScreenReader) {
                    window.announceToScreenReader(newLang === 'es' ? 'Idioma cambiado a español' : 'Language changed to English');
                }
                break;

            case e.key === 'Escape':
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const mobileToggle = document.querySelector('.mobile-menu-toggle');
                    if (mobileToggle) {
                        mobileToggle.focus();
                    }
                }
                break;

            case e.key === 'Home':
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;

            case e.key === 'End':
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                break;

            case (e.ctrlKey || e.metaKey) && e.key === 's':
                e.preventDefault();
                window.print();
                break;
        }
    });
}

// ============================================
/* NOTAS PARA EL DESARROLLO:

Este archivo JavaScript incluye funcionalidades avanzadas:

1. PRELOADER: Pantalla de carga animada con progreso
2. SCROLL PROGRESS: Barra de progreso al hacer scroll
3. PARTICLES: Sistema de partículas interactivo con mouse
4. TOAST NOTIFICATIONS: Notificaciones de estado
5. COPY TO CLIPBOARD: Funcionalidad de copiar
6. FORM VALIDATION: Validación avanzada de formularios
7. PWA FEATURES: Características de Progressive Web App
8. ACCESSIBILITY: Mejoras de accesibilidad
9. KEYBOARD SHORTCUTS: Atajos de teclado
10. SCROLL TO TOP: Botón de scroll al inicio

Para usar la funcionalidad de partículas en producción:
- Reemplaza el canvas con una implementación más robusta
- Considera usar una librería como particles.js para mejor rendimiento
- Optimiza el número de partículas según el dispositivo

Para el formulario de contacto:
- Integra con un servicio real (EmailJS, Formspree, etc.)
- Implementa validación del lado del servidor
- Añade spam protection (reCAPTCHA)

Para PWA:
- Crea un service worker real
- Implementa cache strategies
- Añade offline functionality
*/