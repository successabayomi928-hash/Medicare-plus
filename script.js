 // Navbar scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });

        // Scroll reveal
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
        revealElements.forEach(el => revealObserver.observe(el));

        // Form submission
        document.getElementById('appointmentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('.form-submit');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check-circle"></i> Appointment Requested!';
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                e.target.reset();
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-calendar-check"></i> Confirm Appointment';
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });