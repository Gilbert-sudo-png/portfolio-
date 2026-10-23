/* ===============================================
   WORLDKING PORTFOLIO - Enhanced JavaScript
   =============================================== */

// ── AOS (Animate on Scroll) Init ─────────────────
AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    offset: 80,
});

// ── Loading Screen ────────────────────────────────
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (!loadingScreen) return;

    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => loadingScreen.remove(), 500);
    }, 2000);
});

// ── Custom Cursor ────────────────────────────────
const cursor       = document.querySelector('.cursor');
const cursorFollow = document.querySelector('.cursor-follower');

if (cursor && cursorFollow) {
    let mouseX = 0, mouseY = 0;
    let followX = 0, followY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top  = mouseY - 10 + 'px';
    });

    // Smooth follower
    const animateCursor = () => {
        followX += (mouseX - followX) * 0.1;
        followY += (mouseY - followY) * 0.1;
        cursorFollow.style.left = followX - 20 + 'px';
        cursorFollow.style.top  = followY - 20 + 'px';
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Scale on interactive elements
    const interactive = document.querySelectorAll('a, button, .project-card, .card, .skill-category');
    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollow.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollow.classList.remove('hover');
        });
    });
}

// ── Sticky Header ────────────────────────────────
const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 80);
    });
}

// ── Mobile Sidebar ───────────────────────────────
const menuIcon  = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const sidebar   = document.querySelector('.sidebar');

if (menuIcon && sidebar) {
    menuIcon.addEventListener('click', () => {
        sidebar.classList.add('open-sidebar');
        document.body.style.overflow = 'hidden';
    });
}

if (closeIcon && sidebar) {
    closeIcon.addEventListener('click', () => {
        sidebar.classList.remove('open-sidebar');
        document.body.style.overflow = '';
    });
}

// Close sidebar when a link is clicked
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', () => {
        sidebar && sidebar.classList.remove('open-sidebar');
        document.body.style.overflow = '';
    });
});

// ── Scroll-to-Top Button ─────────────────────────
const scrollTopBtn = document.querySelector('.scroll-to-top');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('show', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Project Video Hover (play/pause) ─────────────
document.querySelectorAll('.project-vidbox').forEach(box => {
    const video     = box.querySelector('.project-video, video');
    const hoverSign = box.querySelector('.hover-sign');

    if (!video) return;

    box.addEventListener('mouseenter', () => {
        video.play();
        if (hoverSign) hoverSign.style.display = 'none';
    });

    box.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
        if (hoverSign) hoverSign.style.display = 'block';
    });
});

// ── Skill Progress Bars Animation ────────────────
const animateSkillBars = () => {
    document.querySelectorAll('.skill-progress[data-progress]').forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            bar.style.width = bar.dataset.progress + '%';
        }
    });
};

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load',   animateSkillBars);

// ── Project Filters ───────────────────────────────
const filterBtns    = document.querySelectorAll('.filter-btn');
const projectCards  = document.querySelectorAll('.projects-page .project-card');

if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const categories = card.dataset.category || '';
                const match = filter === 'all' || categories.includes(filter);

                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

                if (match) {
                    card.style.opacity   = '1';
                    card.style.transform = 'scale(1)';
                    card.style.display   = 'flex';
                } else {
                    card.style.opacity   = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        if (!card.style.opacity || card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 400);
                }
            });
        });
    });
}

// ── Contact Form Validation & Submit ─────────────
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    // Character counter for message textarea
    const messageArea  = document.getElementById('message');
    const charCountEl  = document.querySelector('.char-count');
    const MAX_CHARS    = 500;

    if (messageArea && charCountEl) {
        messageArea.addEventListener('input', () => {
            const len = messageArea.value.length;
            charCountEl.textContent = `${len} / ${MAX_CHARS}`;
            charCountEl.style.color = len > MAX_CHARS ? '#ff4444' : 'gray';
        });
    }

    // Real-time field validation
    contactForm.querySelectorAll('input[required], textarea[required]').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.closest('.form-group').classList.contains('error')) {
                validateField(field);
            }
        });
    });

    function validateField(field) {
        const group = field.closest('.form-group');
        const errEl = group.querySelector('.error-message');
        let   msg   = '';

        if (!field.value.trim()) {
            msg = 'This field is required.';
        } else if (field.type === 'email') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                msg = 'Please enter a valid email address.';
            }
        } else if (field.name === 'name' && field.value.trim().length < 2) {
            msg = 'Name must be at least 2 characters.';
        } else if (field.name === 'message') {
            if (field.value.trim().length < 10) msg = 'Message must be at least 10 characters.';
            if (field.value.length > MAX_CHARS)  msg = `Message cannot exceed ${MAX_CHARS} characters.`;
        }

        group.classList.toggle('error', !!msg);
        if (errEl) {
            errEl.textContent  = msg;
            errEl.style.display = msg ? 'block' : 'none';
        }
        return !msg;
    }

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fields   = contactForm.querySelectorAll('input[required], textarea[required]');
        const formStatus = contactForm.querySelector('.form-status');
        const submitBtn  = contactForm.querySelector('.btn-submit');

        let isValid = true;
        fields.forEach(f => { if (!validateField(f)) isValid = false; });

        if (!isValid) {
            showStatus(formStatus, 'error', '✗ Please fix the errors above and try again.');
            return;
        }

        // Loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        // Simulate async send (replace with fetch() to real backend or FormSubmit)
        await new Promise(r => setTimeout(r, 1800));

        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');

        showStatus(formStatus, 'success', '✓ Message sent! I\'ll get back to you within 24 hours.');
        contactForm.reset();
        if (charCountEl) charCountEl.textContent = `0 / ${MAX_CHARS}`;

        /* ---- Uncomment & configure to send real emails via FormSubmit ----
        try {
            const data = new FormData(contactForm);
            const res  = await fetch('https://formsubmit.co/your@email.com', {
                method: 'POST',
                body: data,
            });
            if (res.ok) {
                showStatus(formStatus, 'success', '✓ Message sent successfully!');
                contactForm.reset();
            } else {
                throw new Error('Server error');
            }
        } catch {
            showStatus(formStatus, 'error', '✗ Something went wrong. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
        ------------------------------------------------------------------- */
    });

    function showStatus(el, type, text) {
        if (!el) return;
        el.className   = `form-status ${type} show`;
        el.textContent = text;
        setTimeout(() => el.classList.remove('show'), 6000);
    }
}

// ── Active Nav Link Highlighting ─────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a, .sidebar a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href === currentPage) {
        link.classList.add('active');
    }
});

// ── autoBlur / autoDisplay / fadein-left observer ─
// Mark elements hidden first, then reveal on scroll.
const scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('is-hidden');
            entry.target.classList.add('in-view');
        } else {
            // Re-hide when scrolled out so animation replays on re-entry
            entry.target.classList.add('is-hidden');
            entry.target.classList.remove('in-view');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.autoBlur, .autoDisplay, .fadein-left').forEach(el => {
    el.classList.add('is-hidden');
    scrollRevealObserver.observe(el);
});

// ── Intersection Observer: Fade-in on scroll ─────
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.value-card, .skill-category, .location-badge').forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// ── Console Branding ──────────────────────────────
console.log('%c WORLDKING Portfolio ', 'background: linear-gradient(135deg, #0099ff, #7e42a7); color: white; font-size: 18px; padding: 10px 20px; border-radius: 8px; font-weight: bold;');
console.log('%c Built with HTML · CSS · JavaScript ', 'color: #72a1de; font-size: 13px;');
