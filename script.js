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
            const form = e.target;
            const btn = form.querySelector('.form-submit');
            const formData = new FormData(form);

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    btn.innerHTML = '<i class="fas fa-check-circle"></i> Appointment Requested!';
                    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    form.reset();
                } else {
                    return response.json().then(data => {
                        throw new Error((data.error && data.error.length) ? data.error.join(', ') : 'Submission failed.');
                    });
                }
            }).catch(() => {
                btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Submission failed';
                btn.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
            }).finally(() => {
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-calendar-check"></i> Confirm Appointment';
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // Department Modal Data
        const departmentData = {
            cardiology: {
                title: 'Cardiology',
                image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
                description: 'Our Cardiology department is dedicated to the diagnosis and treatment of heart and cardiovascular diseases. We offer cutting-edge technology and compassionate care for patients of all ages.',
                features: [
                    { title: 'Heart Disease Treatment', desc: 'Advanced therapies for coronary artery disease' },
                    { title: 'Arrhythmia Management', desc: 'Treatment for irregular heartbeat conditions' },
                    { title: 'Heart Failure Care', desc: 'Comprehensive management and support' },
                    { title: 'Prevention Programs', desc: 'Lifestyle and risk factor management' },
                    { title: 'Cardiac Imaging', desc: 'Echocardiography and stress testing' },
                    { title: '24/7 Monitoring', desc: 'Continuous cardiac care and support' }
                ]
            },
            neurology: {
                title: 'Neurology',
                image: 'https://images.unsplash.com/photo-1576091160888-112c84624f6f?w=600&h=400&fit=crop',
                description: 'Our Neurology department specializes in the diagnosis and treatment of nervous system disorders. We provide expert care using the latest neurological techniques and therapies.',
                features: [
                    { title: 'Stroke Treatment', desc: 'Emergency and preventive stroke care' },
                    { title: 'Epilepsy Management', desc: 'Advanced seizure disorder treatment' },
                    { title: 'Parkinson\'s Care', desc: 'Specialized movement disorder services' },
                    { title: 'Headache Clinic', desc: 'Migraine and chronic pain management' },
                    { title: 'Neuro Diagnostics', desc: 'EEG, EMG, and nerve testing' },
                    { title: 'Rehabilitation', desc: 'Recovery and therapy programs' }
                ]
            },
            orthopedics: {
                title: 'Orthopedics',
                image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
                description: 'Our Orthopedic department provides comprehensive care for musculoskeletal conditions. From joint replacement to sports injuries, we help you return to an active lifestyle.',
                features: [
                    { title: 'Joint Replacement', desc: 'Hip, knee, and shoulder replacement' },
                    { title: 'Sports Medicine', desc: 'Injury prevention and treatment' },
                    { title: 'Arthroscopy', desc: 'Minimally invasive joint surgery' },
                    { title: 'Bone Fracture Care', desc: 'Acute and complex fracture treatment' },
                    { title: 'Physical Therapy', desc: 'Rehabilitation and recovery programs' },
                    { title: 'Spine Surgery', desc: 'Specialized spinal procedures' }
                ]
            },
            pediatrics: {
                title: 'Pediatrics',
                image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop',
                description: 'Our Pediatric department provides compassionate, child-centered healthcare. We create a warm, welcoming environment where children feel comfortable and parents feel confident.',
                features: [
                    { title: 'Wellness Visits', desc: 'Regular checkups and immunizations' },
                    { title: 'Growth Monitoring', desc: 'Development and milestone tracking' },
                    { title: 'Acute Illness Care', desc: 'Same-day sick visits and support' },
                    { title: 'Chronic Disease', desc: 'Long-term management and support' },
                    { title: 'Developmental Screening', desc: 'Early detection and intervention' },
                    { title: 'Family Education', desc: 'Parenting guidance and resources' }
                ]
            },
            dental: {
                title: 'Dental Care',
                image: 'https://images.unsplash.com/photo-1606811841689-23db76ff14ee?w=600&h=400&fit=crop',
                description: 'Our Dental Care department offers comprehensive oral health services in a comfortable, state-of-the-art facility. From preventive care to cosmetic procedures, we provide the complete smile solution.',
                features: [
                    { title: 'Preventive Care', desc: 'Cleanings, X-rays, and screenings' },
                    { title: 'Restorative Dentistry', desc: 'Fillings, crowns, and bridges' },
                    { title: 'Cosmetic Procedures', desc: 'Whitening and smile makeovers' },
                    { title: 'Oral Surgery', desc: 'Extractions and implant placement' },
                    { title: 'Orthodontics', desc: 'Teeth straightening and alignment' },
                    { title: 'Emergency Dental', desc: 'Urgent pain relief and treatment' }
                ]
            }
        };

        // Privacy Policy Content
        const privacyPolicyContent = `
            <h3>Privacy Policy</h3>
            <p>Welcome to MediCare Plus. We are committed to protecting your privacy and ensuring you have a positive experience on our website and in our facility.</p>
            
            <h3>Information We Collect</h3>
            <p>We collect information that you provide directly to us, such as when you:</p>
            <ul>
                <li>Create an account or register on our website</li>
                <li>Book an appointment</li>
                <li>Submit a contact form or inquiry</li>
                <li>Visit our physical facility</li>
                <li>Receive medical services from us</li>
            </ul>
            
            <h3>Types of Information</h3>
            <p>The information we collect may include:</p>
            <ul>
                <li>Personal identification information (name, email, phone number)</li>
                <li>Health information and medical history</li>
                <li>Insurance information</li>
                <li>Payment and billing information</li>
                <li>Demographic information</li>
            </ul>
            
            <h3>How We Use Your Information</h3>
            <p>We use the information we collect to:</p>
            <ul>
                <li>Provide and improve our medical services</li>
                <li>Process appointments and medical treatments</li>
                <li>Send appointment reminders and health information</li>
                <li>Handle billing and payment processing</li>
                <li>Communicate with you about your healthcare needs</li>
                <li>Comply with legal and regulatory requirements</li>
            </ul>
            
            <h3>Data Protection</h3>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All patient information is stored securely and accessed only by authorized personnel.</p>
            
            <h3>Your Rights</h3>
            <p>You have the right to:</p>
            <ul>
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your information</li>
                <li>Withdraw consent for data processing</li>
                <li>Lodge a complaint with our privacy team</li>
            </ul>
            
            <h3>Contact Us</h3>
            <p>If you have any questions about this Privacy Policy or our privacy practices, please contact us at <strong>privacy@medicareplus.com</strong> or call <strong>+234 801 234 5678</strong>.</p>
        `;

        // Terms of Service Content
        const termsOfServiceContent = `
            <h3>Terms of Service</h3>
            <p>Welcome to MediCare Plus. These Terms of Service govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms.</p>
            
            <h3>1. Service Description</h3>
            <p>MediCare Plus provides comprehensive healthcare services including medical consultations, diagnostic services, treatment facilities, and telemedicine appointments. Our services are provided by qualified medical professionals in our licensed facilities.</p>
            
            <h3>2. User Responsibilities</h3>
            <p>You agree to:</p>
            <ul>
                <li>Provide accurate and complete information when booking appointments</li>
                <li>Disclose all relevant medical history and current medications</li>
                <li>Respect the time and expertise of our medical staff</li>
                <li>Follow all medical advice and treatment recommendations</li>
                <li>Comply with facility rules and regulations</li>
                <li>Respect the privacy and dignity of other patients</li>
            </ul>
            
            <h3>3. Appointment Policy</h3>
            <p>Appointments should be canceled or rescheduled at least 24 hours in advance. Cancellations made within 24 hours may incur a cancellation fee. No-shows will be charged according to our fee schedule.</p>
            
            <h3>4. Medical Disclaimer</h3>
            <p>While we strive to provide quality healthcare, we do not guarantee specific medical outcomes. Medical treatment involves inherent risks. You acknowledge that you are seeking medical services at your own risk and assume full responsibility for any medical decisions made.</p>
            
            <h3>5. Payment Terms</h3>
            <p>Payment for services is due at the time of service unless prior arrangements have been made. We accept cash, credit cards, and insurance coverage. You are responsible for any insurance copays or deductibles.</p>
            
            <h3>6. Intellectual Property</h3>
            <p>All content on our website, including text, images, videos, and logos, is owned by or licensed to MediCare Plus and is protected by copyright law. Unauthorized reproduction or distribution is strictly prohibited.</p>
            
            <h3>7. Limitation of Liability</h3>
            <p>MediCare Plus shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services or website.</p>
            
            <h3>8. Modifications to Terms</h3>
            <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services constitutes acceptance of modified terms.</p>
            
            <h3>9. Governing Law</h3>
            <p>These Terms of Service are governed by the laws of Nigeria and are subject to the jurisdiction of Nigerian courts.</p>
            
            <h3>10. Contact Information</h3>
            <p>For questions about these Terms of Service, please contact us at <strong>legal@medicareplus.com</strong> or call <strong>+234 801 234 5678</strong>.</p>
        `;

        // Modal Functions
        function openDepartmentModal(dept) {
            const modal = document.getElementById('departmentModal');
            const data = departmentData[dept];
            
            if (!data) return;
            
            document.getElementById('deptTitle').textContent = data.title;
            document.getElementById('deptImage').src = data.image;
            document.getElementById('deptDescription').textContent = data.description;
            
            const featuresContainer = document.getElementById('deptFeatures');
            featuresContainer.innerHTML = '';
            
            data.features.forEach(feature => {
                const featureDiv = document.createElement('div');
                featureDiv.className = 'dept-feature';
                featureDiv.innerHTML = `<strong>${feature.title}</strong><span>${feature.desc}</span>`;
                featuresContainer.appendChild(featureDiv);
            });
            
            modal.classList.add('active');
        }

        function openPolicyModal(policyType) {
            const modal = document.getElementById('policyModal');
            const titleElement = document.getElementById('policyTitle');
            const contentElement = document.getElementById('policyContent');
            
            if (policyType === 'privacy') {
                titleElement.textContent = 'Privacy Policy';
                contentElement.innerHTML = privacyPolicyContent;
            } else if (policyType === 'terms') {
                titleElement.textContent = 'Terms of Service';
                contentElement.innerHTML = termsOfServiceContent;
            }
            
            modal.classList.add('active');
        }

        function closeModal(modal) {
            modal.classList.remove('active');
        }

        // Modal Event Listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Department Links
            const deptLinks = document.querySelectorAll('.dept-link');
            deptLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const dept = link.getAttribute('data-dept');
                    openDepartmentModal(dept);
                });
            });

            // Policy Links
            const policyLinks = document.querySelectorAll('.policy-link');
            policyLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const policyType = link.getAttribute('data-policy');
                    openPolicyModal(policyType);
                });
            });

            // Close Modal when clicking the X button
            const closeButtons = document.querySelectorAll('.modal-close');
            closeButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const modal = btn.closest('.modal');
                    closeModal(modal);
                });
            });

            // Close Modal when clicking outside of it
            window.addEventListener('click', (e) => {
                const modals = document.querySelectorAll('.modal');
                modals.forEach(modal => {
                    if (e.target === modal) {
                        closeModal(modal);
                    }
                });
            });

            // Close Modal on Escape key
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const modals = document.querySelectorAll('.modal');
                    modals.forEach(modal => {
                        closeModal(modal);
                    });
                }
            });

            document.querySelectorAll('.service-link').forEach(function(link) {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    const card = link.closest('.service-card');
                    if (!card) return;
                    const moreText = card.querySelector('.more-text');
                    if (!moreText) return;
                    const expanded = card.classList.toggle('expanded');
                    moreText.style.display = expanded ? 'inline' : 'none';
                    const icon = link.querySelector('i');
                    if (icon) {
                        icon.classList.toggle('fa-arrow-right', !expanded);
                        icon.classList.toggle('fa-arrow-left', expanded);
                    }
                    const textNode = Array.from(link.childNodes).find(function(node) {
                        return node.nodeType === Node.TEXT_NODE;
                    });
                    if (textNode) {
                        textNode.textContent = expanded ? 'Show less ' : 'Learn more ';
                    }
                });
            });

            var navbar = document.querySelector('.navbar');
            var mobileToggle = document.querySelector('.mobile-toggle');
            var navLinks = document.querySelectorAll('.nav-links a');

            if (mobileToggle && navbar) {
                mobileToggle.addEventListener('click', function() {
                    navbar.classList.toggle('nav-open');
                });
            }

            navLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    if (navbar.classList.contains('nav-open')) {
                        navbar.classList.remove('nav-open');
                    }
                });
            });
        });