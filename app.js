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
    initAboutCarousel();

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
            'nav-home': 'Inicio', 'nav-about': 'Acerca', 'nav-experience': 'Experiencia', 'nav-education': 'Educación', 'nav-skills': 'Habilidades', 'nav-linkedin': 'Actividad', 'nav-projects': 'Proyectos', 'nav-contact': 'Contacto',
            'hero-greeting': 'Hola, soy', 'hero-name': 'Carlos Lamas', 'hero-title': 'Ingeniero Mecánico', 'hero-subtitle': 'Especialista en Mantenimiento y RAMS',
            'hero-description': 'Ingeniero Mecánico especializado en fiabilidad, disponibilidad y mantenibilidad de activos (RAMS). Experiencia en mantenimiento industrial, diseño CAD 3D, análisis estructural y gestión de proyectos, enfocado en mejora continua.',
            'hero-cta-primary': 'Ver Mi Experiencia', 'hero-cta-secondary': 'Descargar CV',
            'about-title': 'Acerca de Mí', 'about-subtitle': 'Conoce más sobre mi trayectoria profesional',
            'about-intro-title': 'Ingeniero Mecánico Especialista en Mantenimiento y RAMS',
            'about-text-1': 'Ingeniero Mecánico especializado en fiabilidad, disponibilidad y mantenibilidad de activos (RAMS). Experiencia en mantenimiento industrial, diseño CAD 3D, análisis estructural y gestión de proyectos, con enfoque en mantenimiento preventivo, predictivo y correctivo, diagnóstico de averías y mejora continua.',
            'about-text-2': 'Me caracterizo por mantener una formación continua, actualizando mis conocimientos para adaptarme a nuevas tecnologías y retos del sector. Perfil versátil y adaptable, destacando por mi capacidad analítica, orientación a resultados y habilidades de comunicación técnica.',
            'about-stat-1-number': '3+', 'about-stat-1-label': 'Años de Experiencia',
            'about-stat-2-number': '10+', 'about-stat-2-label': 'Proyectos Completados',
            'about-stat-3-number': '2', 'about-stat-3-label': 'Idiomas',
            'about-stat-4-number': '15+', 'about-stat-4-label': 'Habilidades Técnicas',
            'experience-title': 'Experiencia Profesional', 'experience-subtitle': 'Mi trayectoria profesional y logros',
            'experience-1-date': '03/2025 - Presente', 'experience-1-title': 'Ingeniero Técnico', 'experience-1-company': 'Bombas Borja – Paterna',
            'experience-1-description': 'Ejecución de mantenimiento preventivo, diagnóstico y resolución de averías en sistemas mecánicos y eléctricos. Implementación de plan de mantenimiento basado en condición (vibraciones, termografía) reduciendo paradas no programadas.',
            'experience-2-date': '10/2023 - 02/2025', 'experience-2-title': 'Técnico de Mantenimiento', 'experience-2-company': 'Logifruit – Ribarroja',
            'experience-2-description': 'Mantenimiento preventivo y correctivo de lavado industrial. Diagnóstico en motores, sensores y sistemas de control. Elaboración de procedimientos estandarizados y participación en el análisis de causa raíz.',
            'experience-3-date': '12/2022 - 09/2023', 'experience-3-title': 'Ingeniero de Proyectos/Docente', 'experience-3-company': 'Emp. Héroes 26 de Julio & Univ. Holguín',
            'experience-3-description': 'Diseño asistido por ordenador (CAD) de componentes mecánicos y análisis estructural (FEA). Impartición de formación en mecánica y resistencia de materiales.',
            'education-title': 'Educación', 'education-subtitle': 'Mi formación académica y certificaciones',
            'education-1-year': '09/2025 - Presente', 'education-1-degree': 'Máster Universitario en Ingeniería del Mantenimiento', 'education-1-institution': 'Universidad Politécnica de Valencia (UPV)',
            'education-1-description': 'Gestión de fiabilidad (RAMS), mantenimiento predictivo, diagnóstico de fallos, TPM, RCM y uso avanzado de GMAO.',
            'education-2-year': '09/2017 - 07/2022', 'education-2-degree': 'Ingeniería Mecánica', 'education-2-institution': 'Universidad Oscar Lucero - Cuba',
            'education-2-description': 'Diseño mecánico (CAD/FEA), termodinámica, mecánica de fluidos, materiales y fundamentos de automatización.',
            'skills-title': 'Habilidades Técnicas', 'skills-subtitle': 'Competencias y especialidades profesionales',
            'skills-1-title': 'Software CAD / CAE', 'skills-1-skill-1': 'SolidWorks e Inventor - Avanzado', 'skills-1-skill-2': 'Análisis FEA - Avanzado', 'skills-1-skill-3': 'AutoCAD - Intermedio',
            'skills-2-title': 'Mantenimiento', 'skills-2-skill-1': 'Mantenimiento Predictivo', 'skills-2-skill-2': 'Diagnóstico de averías', 'skills-2-skill-3': 'GMAO & Activos',
            'skills-3-title': 'Ingeniería & Gestión', 'skills-3-skill-1': 'Termodinámica y Fluidos', 'skills-3-skill-2': 'Automatización Inic.', 'skills-3-skill-3': 'ISO 9001, TPM, RCM',
            'skills-4-title': 'Datos & Desarrollo', 'skills-4-skill-1': 'Power BI, Tableau', 'skills-4-skill-2': 'Python & SQL', 'skills-4-skill-3': 'HTML5 & CSS3',
            'certs-title': 'Cursos y Certificaciones', 'certs-subtitle': 'Formación complementaria y técnica',
            'cert-1-name': 'Mantenimiento de CPD', 'cert-1-description': 'Sistemas SAI/UPS, grupos electrógenos y alta disponibilidad.', 'cert-1-org': 'Agosto 2025 - Fundae',
            'cert-2-name': 'Certificación de inglés B2', 'cert-2-description': 'EF SET', 'cert-2-org': '09/2024',
            'cert-3-name': 'Data Visualization', 'cert-3-description': 'freeCodeCamp', 'cert-3-org': '07/2024',
            'cert-4-name': 'Diseño e Impresión 3D', 'cert-4-description': 'Centro de Desarrollo Bilib', 'cert-4-org': '07/2024',
            'cert-5-name': 'Legacy JavaScript Algo.', 'cert-5-description': 'freeCodeCamp', 'cert-5-org': '06/2024',
            'cert-6-name': 'Responsive Web Design', 'cert-6-description': 'freeCodeCamp', 'cert-6-org': '05/2024',
            'cert-7-name': 'Fundamentos IA Generativa', 'cert-7-description': 'Microsoft', 'cert-7-org': '01/2024',
            'cert-8-name': 'Gestión de proyect.: Equipos', 'cert-8-description': 'LinkedIn', 'cert-8-org': '01/2024',
            'linkedin-title': 'Publicaciones Recientes', 'linkedin-subtitle': 'Mi actividad y conocimientos compartidos en LinkedIn',
            'contact-title': 'Contacto', 'contact-subtitle': '¿Tienes un proyecto en mente? Hablemos', 'contact-name': 'Nombre', 'contact-email': 'Correo', 'contact-subject': 'Asunto', 'contact-message': 'Mensaje', 'contact-send': 'Enviar',
            'contact-info-1-title': 'Email', 'contact-info-1-text': 'lamascpo@gmail.com', 'contact-info-2-title': 'Ubicación', 'contact-info-2-text': '46920 Mislata (Valencia)', 'contact-info-3-title': 'LinkedIn', 'contact-info-3-text': 'Carlos Lamas', 'contact-info-4-title': 'Teléfono', 'contact-info-4-text': '+34 672 867 117',
            'footer-text': 'Gracias por visitar mi portafolio. Siempre dispuesto a nuevos retos.', 'footer-copyright': '© 2026 Carlos Lamas. Todos los derechos reservados.'
        },
        en: {
            'nav-home': 'Home', 'nav-about': 'About', 'nav-experience': 'Experience', 'nav-education': 'Education', 'nav-skills': 'Skills', 'nav-linkedin': 'Activity', 'nav-projects': 'Projects', 'nav-contact': 'Contact',
            'hero-greeting': 'Hello, I\'m', 'hero-name': 'Carlos Lamas', 'hero-title': 'Mechanical Engineer', 'hero-subtitle': 'Maintenance & RAMS Specialist',
            'hero-description': 'Mechanical Engineer specialized in asset reliability, availability, and maintainability (RAMS). Experience in industrial maintenance, 3D CAD design, structural analysis, and project management.',
            'hero-cta-primary': 'View My Experience', 'hero-cta-secondary': 'Download CV',
            'about-title': 'About Me', 'about-subtitle': 'Learn more about my professional background',
            'about-intro-title': 'Mechanical Engineer Specialist in Maintenance and RAMS',
            'about-text-1': 'Mechanical Engineer specialized in asset reliability, availability, and maintainability (RAMS). Experience in industrial maintenance, 3D CAD design, structural analysis, and project management, focusing on preventive, predictive, and corrective maintenance, troubleshooting, and continuous improvement.',
            'about-text-2': 'I am characterized by maintaining continuous training, updating my knowledge to adapt to new technologies and industry challenges. Versatile and adaptable profile, highlighted by an analytical capacity, results orientation, and technical communication skills.',
            'about-stat-1-number': '3+', 'about-stat-1-label': 'Years of Experience',
            'about-stat-2-number': '10+', 'about-stat-2-label': 'Completed Projects',
            'about-stat-3-number': '2', 'about-stat-3-label': 'Languages',
            'about-stat-4-number': '15+', 'about-stat-4-label': 'Technical Skills',
            'experience-title': 'Professional Experience', 'experience-subtitle': 'My professional career and achievements',
            'experience-1-date': '03/2025 - Present', 'experience-1-title': 'Technical Engineer', 'experience-1-company': 'Bombas Borja – Paterna',
            'experience-1-description': 'Execution of preventive maintenance, troubleshooting, and repair of mechanical and electrical systems. Implementation of condition-based maintenance plans (vibrations, thermography) reducing unplanned downtime.',
            'experience-2-date': '10/2023 - 02/2025', 'experience-2-title': 'Maintenance Worker', 'experience-2-company': 'Logifruit – Ribarroja',
            'experience-2-description': 'Preventive and corrective maintenance of industrial washing. Diagnostics in motors, sensors, and control systems. Development of standardized procedures and root cause analysis participation.',
            'experience-3-date': '12/2022 - 09/2023', 'experience-3-title': 'Project Engineer/Professor', 'experience-3-company': 'Hero. del 26 de Julio Mech. Ent. & Univ. Holguín',
            'experience-3-description': 'CAD design of mechanical components and structural analysis (FEA). Delivered training in mechanics and strength of materials.',
            'education-title': 'Education', 'education-subtitle': 'My academic training and certifications',
            'education-1-year': '09/2025 - Present', 'education-1-degree': 'Master\'s Degree in Maintenance Engineering', 'education-1-institution': 'Polytechnic University of Valencia (UPV)',
            'education-1-description': 'Reliability management (RAMS), predictive maintenance, fault diagnosis, TPM, RCM, and advanced CMMS use.',
            'education-2-year': '09/2017 - 07/2022', 'education-2-degree': 'Mechanical Engineer', 'education-2-institution': 'Oscar Lucero University - Cuba',
            'education-2-description': 'Mechanical design (CAD/FEA), thermodynamics, fluid mechanics, materials, and automation fundamentals.',
            'skills-title': 'Technical Skills', 'skills-subtitle': 'Competencies and professional specialties',
            'skills-1-title': 'CAD / CAE Software', 'skills-1-skill-1': 'SolidWorks & Inventor - Advanced', 'skills-1-skill-2': 'FEA Analysis - Advanced', 'skills-1-skill-3': 'AutoCAD - Intermediate',
            'skills-2-title': 'Maintenance', 'skills-2-skill-1': 'Predictive Maintenance', 'skills-2-skill-2': 'Troubleshooting', 'skills-2-skill-3': 'CMMS & Assets',
            'skills-3-title': 'Engineering & Mgmt', 'skills-3-skill-1': 'Thermodynamics & Fluids', 'skills-3-skill-2': 'Automation Basics', 'skills-3-skill-3': 'ISO 9001, TPM, RCM',
            'skills-4-title': 'Data & Web', 'skills-4-skill-1': 'Power BI, Tableau', 'skills-4-skill-2': 'Python & SQL', 'skills-4-skill-3': 'HTML5 & CSS3',
            'certs-title': 'Courses & Certifications', 'certs-subtitle': 'Complementary and technical training',
            'cert-1-name': 'Data Center Maintenance (CPD)', 'cert-1-description': 'UPS systems, generators, and high availability.', 'cert-1-org': 'August 2025 - Fundae',
            'cert-2-name': 'B2 English Certification', 'cert-2-description': 'EF SET', 'cert-2-org': '09/2024',
            'cert-3-name': 'Data Visualization', 'cert-3-description': 'freeCodeCamp', 'cert-3-org': '07/2024',
            'cert-4-name': '3D Model Design & Printing', 'cert-4-description': 'Centro de Desarrollo Bilib', 'cert-4-org': '07/2024',
            'cert-5-name': 'Legacy JavaScript Algo.', 'cert-5-description': 'freeCodeCamp', 'cert-5-org': '06/2024',
            'cert-6-name': 'Responsive Web Design', 'cert-6-description': 'freeCodeCamp', 'cert-6-org': '05/2024',
            'cert-7-name': 'Generative AI Basics', 'cert-7-description': 'Microsoft', 'cert-7-org': '01/2024',
            'cert-8-name': 'Project Mgmt: Teams', 'cert-8-description': 'LinkedIn', 'cert-8-org': '01/2024',
            'linkedin-title': 'Recent Publications', 'linkedin-subtitle': 'My activity and shared knowledge on LinkedIn',
            'contact-title': 'Contact', 'contact-subtitle': 'Have a project in mind? Let\'s talk', 'contact-name': 'Name', 'contact-email': 'Email', 'contact-subject': 'Subject', 'contact-message': 'Message', 'contact-send': 'Send Message',
            'contact-info-1-title': 'Email', 'contact-info-1-text': 'lamascpo@gmail.com', 'contact-info-2-title': 'Location', 'contact-info-2-text': '46920 Mislata (Valencia, Spain)', 'contact-info-3-title': 'LinkedIn', 'contact-info-3-text': 'Carlos Lamas', 'contact-info-4-title': 'Phone', 'contact-info-4-text': '+34 672 867 117',
            'footer-text': 'Thank you for visiting my portfolio. I am always open to new challenges.', 'footer-copyright': '© 2026 Carlos Lamas. All rights reserved.'
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
// CARRUSEL DE LA SECCIÓN ABOUT
// ============================================
function initAboutCarousel() {
    const carousel = document.querySelector('.about-carousel');
    if (!carousel) return;

    const container = carousel.querySelector('.carousel-container');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-control.prev');
    const nextBtn = carousel.querySelector('.carousel-control.next');
    const indicators = carousel.querySelectorAll('.indicator');

    let currentIndex = 0;
    let autoplayInterval;

    function updateCarousel() {
        // Mover contenedor
        container.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Actualizar estados activos
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
    }

    // Eventos de controles
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoplay();
        });
    }

    // Eventos de indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            startAutoplay();
        });
    });

    // Pausar al pasar el ratón
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Soporte para gestos táctiles
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + threshold) {
            prevSlide();
        }
    }

    // Inicializar
    updateCarousel();
    startAutoplay();
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