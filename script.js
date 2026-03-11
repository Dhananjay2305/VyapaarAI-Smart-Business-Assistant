/* ==========================================
   VyapaarAI – JavaScript Interactivity
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Scroll Reveal Animation ----
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animations
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ---- Mobile Hamburger Menu ----
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animate hamburger to X
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ---- Smooth Scroll for Anchors ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                const navHeight = navbar.offsetHeight;
                const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Counter Animation ----
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(el) {
        const text = el.textContent;
        // Only animate if it's a plain number
        if (text.includes('Cr') || text.includes('₹') || text.includes('%')) {
            // Just add a pop-in animation
            el.style.animation = 'counterPop 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            return;
        }
    }

    // ---- Typing Effect for Hero Badge ----
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        heroBadge.style.opacity = '0';
        heroBadge.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            heroBadge.style.transition = 'all 0.6s ease';
            heroBadge.style.opacity = '1';
            heroBadge.style.transform = 'translateY(0)';
        }, 300);
    }

    // ---- Parallax on Hero Shapes ----
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        shapes.forEach((shape, i) => {
            const speed = (i + 1) * 8;
            shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // ---- Feature Card Tilt Effect ----
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ---- Pricing Card Hover Glow ----
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--glow-x', `${x}px`);
            card.style.setProperty('--glow-y', `${y}px`);
        });
    });

    // ---- Add CSS animation keyframes dynamically ----
    const style = document.createElement('style');
    style.textContent = `
        @keyframes counterPop {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // ---- Active nav link highlighting ----
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-link');
            }
        });
    });

    // ============ AUTHENTICATION & SHOP SELECTION FLOW ============
    const signInBtn = document.getElementById('signInBtn');
    const authModalOverlay = document.getElementById('authModalOverlay');
    const authCloseBtn = document.getElementById('authCloseBtn');
    const authForm = document.getElementById('authForm');

    const shopModalOverlay = document.getElementById('shopModalOverlay');
    const shopCards = document.querySelectorAll('.shop-card');

    const shopNameModalOverlay = document.getElementById('shopNameModalOverlay');
    const shopNameCloseBtn = document.getElementById('shopNameCloseBtn');
    const shopNameForm = document.getElementById('shopNameForm');

    const navActionsVisitor = document.getElementById('navActionsVisitor');
    const navActionsUser = document.getElementById('navActionsUser');
    const navUserName = document.getElementById('navUserName');
    const navUserIcon = document.getElementById('navUserIcon');
    const profileTrigger = document.getElementById('profileTrigger');
    const profileDropdown = document.getElementById('profileDropdown');
    const dropdownFullShopName = document.getElementById('dropdownFullShopName');
    const dropdownUserEmail = document.getElementById('dropdownUserEmail');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check for existing user to update navbar
    const vyapaarUserStr = localStorage.getItem('vyapaarUser');
    if (vyapaarUserStr && navActionsVisitor && navActionsUser) {
        try {
            const user = JSON.parse(vyapaarUserStr);
            navActionsVisitor.style.display = 'none';
            navActionsUser.style.display = 'block'; // Or flex depending on parent

            if (navUserName && user.name) {
                const firstName = user.name.split(' ')[0];
                navUserName.textContent = firstName;
                if (navUserIcon) navUserIcon.textContent = firstName.charAt(0).toUpperCase();
            }

            if (dropdownFullShopName) {
                dropdownFullShopName.textContent = user.shopName || user.shopType || "My Shop";
            }
            if (dropdownUserEmail) {
                dropdownUserEmail.textContent = user.email || "user@example.com";
            }
        } catch (e) {
            console.error("Error parsing user data", e);
        }
    }

    // Toggle Profile Dropdown
    if (profileTrigger && profileDropdown) {
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = profileDropdown.style.display === 'block';
            profileDropdown.style.display = isVisible ? 'none' : 'block';
        });

        document.addEventListener('click', () => {
            profileDropdown.style.display = 'none';
        });
    }

    // Handle Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('vyapaarUser');
            localStorage.removeItem('vyapaarShopType');
            localStorage.removeItem('vyapaarPendingUser');
            window.location.href = 'index.html';
        });
    }

    // Open Auth Modal
    if (signInBtn && authModalOverlay) {
        signInBtn.addEventListener('click', (e) => {
            e.preventDefault();
            authModalOverlay.classList.add('active');
        });
    }

    // Close Auth Modal
    if (authCloseBtn && authModalOverlay) {
        authCloseBtn.addEventListener('click', () => {
            authModalOverlay.classList.remove('active');
        });
    }

    // Handle Auth Form Submission
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const userName = document.getElementById('userName').value;
            const userPhone = document.getElementById('userPhone').value;
            const userEmail = document.getElementById('userEmail').value;

            // Save user data temporarily
            localStorage.setItem('vyapaarPendingUser', JSON.stringify({
                name: userName,
                phone: userPhone,
                email: userEmail
            }));

            // Close Auth Modal and Open Shop Modal
            authModalOverlay.classList.remove('active');
            shopModalOverlay.classList.add('active');
        });
    }

    // Handle Shop Selection
    if (shopCards) {
        shopCards.forEach(card => {
            card.addEventListener('click', () => {
                // Highlight selection securely (optional UI trick)
                shopCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');

                const selectedShop = card.getAttribute('data-shop');
                localStorage.setItem('vyapaarShopType', selectedShop);

                // Show Shop Name modal instead of processing registration
                shopModalOverlay.classList.remove('active');
                if (shopNameModalOverlay) {
                    shopNameModalOverlay.classList.add('active');
                    setTimeout(() => {
                        const input = document.getElementById('shopNameInput');
                        if (input) input.focus();
                    }, 100);
                }
            });
        });
    }

    // Close Shop Name Modal
    if (shopNameCloseBtn && shopNameModalOverlay) {
        shopNameCloseBtn.addEventListener('click', () => {
            shopNameModalOverlay.classList.remove('active');
        });
    }

    // Handle Shop Name Form Submission
    if (shopNameForm) {
        shopNameForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const shopName = document.getElementById('shopNameInput').value;
            const selectedShop = localStorage.getItem('vyapaarShopType');
            const pendingUserStr = localStorage.getItem('vyapaarPendingUser');

            if (pendingUserStr) {
                const pendingUser = JSON.parse(pendingUserStr);

                try {
                    const res = await fetch('http://localhost:5000/api/auth/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: pendingUser.name,
                            phone: pendingUser.phone,
                            email: pendingUser.email,
                            shopType: selectedShop,
                            shopName: shopName
                        })
                    });

                    const data = await res.json();

                    if (!res.ok) {
                        if (data.error && data.error.includes('exists')) {
                            // Try login if already exists
                            const loginRes = await fetch('http://localhost:5000/api/auth/login', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ phone: pendingUser.phone })
                            });
                            const loginData = await loginRes.json();
                            if (loginRes.ok) {
                                localStorage.setItem('vyapaarUser', JSON.stringify(loginData.user));
                            } else {
                                console.error('Login failed:', loginData.error);
                                localStorage.setItem('vyapaarUser', pendingUserStr); // fallback
                            }
                        } else {
                            console.error('Registration failed:', data.error);
                            localStorage.setItem('vyapaarUser', pendingUserStr); // fallback
                        }
                    } else {
                        localStorage.setItem('vyapaarUser', JSON.stringify(data.user));
                    }
                } catch (err) {
                    console.error('Backend connection failed, falling back to local mode:', err);
                    pendingUser.shopType = selectedShop;
                    pendingUser.shopName = shopName;
                    localStorage.setItem('vyapaarUser', JSON.stringify(pendingUser));
                }
            }

            // Add small delay, then redirect
            shopNameModalOverlay.classList.remove('active');
            setTimeout(() => {
                window.location.href = 'shop.html';
            }, 300);
        });
    }

});
