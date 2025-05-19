const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            });
        });
        
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.skill-card, .project-card, .section-title').forEach(element => {
            element.classList.remove('fade-in');
            observer.observe(element);
        });
        
        // Contact Form Submission
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real project, you would send this data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message (in a real project, you would check for actual success)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
        
        // Dark Mode Toggle
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Typing Animation for Hero Section
        const typingText = document.querySelector('.hero h1');
        const originalText = typingText.innerHTML;
        typingText.innerHTML = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                typingText.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
        
        // Project Filter Functionality
        // You can add this if you want to filter projects by technology/category
        
        // Dynamic Skills Progress Bars (Optional)
        function createSkillBars() {
            const skillLevels = {
                'HTML/CSS': 90,
                'JavaScript': 85,
                'React': 80,
                'Node.js': 75,
                'Python': 70,
                'UI/UX Design': 65
            };
            
            const skillsContainer = document.querySelector('.skills-container');
            
            // Create a new section for skill bars
            const skillBarsSection = document.createElement('div');
            skillBarsSection.className = 'skill-bars';
            skillBarsSection.style.marginTop = '3rem';
            
            // Add skill bars for each skill
            for (const skill in skillLevels) {
                const skillBar = document.createElement('div');
                skillBar.className = 'skill-bar';
                skillBar.style.marginBottom = '1.5rem';
                
                const skillInfo = document.createElement('div');
                skillInfo.className = 'skill-info';
                skillInfo.style.display = 'flex';
                skillInfo.style.justifyContent = 'space-between';
                skillInfo.style.marginBottom = '0.5rem';
                
                const skillName = document.createElement('span');
                skillName.textContent = skill;
                skillName.style.fontWeight = '500';
                
                const skillPercentage = document.createElement('span');
                skillPercentage.textContent = skillLevels[skill] + '%';
                
                const progressBarOuter = document.createElement('div');
                progressBarOuter.className = 'progress-bar-outer';
                progressBarOuter.style.height = '10px';
                progressBarOuter.style.backgroundColor = '#e2e8f0';
                progressBarOuter.style.borderRadius = '5px';
                progressBarOuter.style.overflow = 'hidden';
                
                const progressBarInner = document.createElement('div');
                progressBarInner.className = 'progress-bar-inner';
                progressBarInner.style.height = '100%';
                progressBarInner.style.width = '0%';
                progressBarInner.style.backgroundColor = '#4299e1';
                progressBarInner.style.borderRadius = '5px';
                progressBarInner.style.transition = 'width 1s ease-in-out';
                
                // Append elements
                skillInfo.appendChild(skillName);
                skillInfo.appendChild(skillPercentage);
                progressBarOuter.appendChild(progressBarInner);
                skillBar.appendChild(skillInfo);
                skillBar.appendChild(progressBarOuter);
                skillBarsSection.appendChild(skillBar);
            }
            
            // Add the skill bars to the skills container
            skillsContainer.appendChild(skillBarsSection);
            
            // Animation for skill bars when they come into view
            const skillBarsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const skillBars = entry.target.querySelectorAll('.progress-bar-inner');
                        skillBars.forEach((bar, index) => {
                            const skill = Object.keys(skillLevels)[index];
                            setTimeout(() => {
                                bar.style.width = skillLevels[skill] + '%';
                            }, index * 100);
                        });
                        skillBarsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            skillBarsObserver.observe(skillBarsSection);
        }
        
        // Call the function to create skill bars (uncomment to use)
        // createSkillBars();
        
        // Projects Counter
        function animateProjectCounters() {
            const stats = [
                { element: 'projectsCompleted', target: 50 },
                { element: 'happyClients', target: 30 },
                { element: 'hoursWorked', target: 2500 },
                { element: 'awardsWon', target: 10 }
            ];
            
            // Create stats section if it doesn't exist
            let statsSection = document.querySelector('.stats-section');
            
            if (!statsSection) {
                statsSection = document.createElement('div');
                statsSection.className = 'stats-section';
                statsSection.style.backgroundColor = '#4299e1';
                statsSection.style.padding = '4rem 5%';
                statsSection.style.color = 'white';
                statsSection.style.textAlign = 'center';
                statsSection.style.marginTop = '3rem';
                
                const statsContainer = document.createElement('div');
                statsContainer.className = 'stats-container';
                statsContainer.style.display = 'flex';
                statsContainer.style.flexWrap = 'wrap';
                statsContainer.style.justifyContent = 'space-around';
                statsContainer.style.maxWidth = '1200px';
                statsContainer.style.margin = '0 auto';
                
                stats.forEach(stat => {
                    const statBox = document.createElement('div');
                    statBox.className = 'stat-box';
                    statBox.style.flex = '1';
                    statBox.style.minWidth = '200px';
                    statBox.style.margin = '1rem';
                    
                    const statNumber = document.createElement('div');
                    statNumber.id = stat.element;
                    statNumber.className = 'stat-number';
                    statNumber.textContent = '0';
                    statNumber.style.fontSize = '3rem';
                    statNumber.style.fontWeight = 'bold';
                    statNumber.style.marginBottom = '0.5rem';
                    
                    const statTitle = document.createElement('div');
                    statTitle.className = 'stat-title';
                    statTitle.style.fontSize = '1.25rem';
                    
                    switch (stat.element) {
                        case 'projectsCompleted':
                            statTitle.textContent = 'Projects Completed';
                            break;
                        case 'happyClients':
                            statTitle.textContent = 'Happy Clients';
                            break;
                        case 'hoursWorked':
                            statTitle.textContent = 'Hours Worked';
                            break;
                        case 'awardsWon':
                            statTitle.textContent = 'Awards Won';
                            break;
                    }
                    
                    statBox.appendChild(statNumber);
                    statBox.appendChild(statTitle);
                    statsContainer.appendChild(statBox);
                });
                
                statsSection.appendChild(statsContainer);
                
                // Insert stats section before contact section
                const contactSection = document.getElementById('contact');
                contactSection.parentNode.insertBefore(statsSection, contactSection);
            }
            
            // Animate counters when section is in view
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        stats.forEach(stat => {
                            animateCounter(stat.element, stat.target);
                        });
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            statsObserver.observe(statsSection);
        }
        
        function animateCounter(elementId, target) {
            const element = document.getElementById(elementId);
            const duration = 2000; // ms
            const stepTime = 50; // ms
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current > target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, stepTime);
        }
        
        // Uncomment to add stats section
        // animateProjectCounters();
        
        // Dynamic portfolio filtering system
        function setupPortfolioFilters() {
            const categories = ['All', 'Web', 'Mobile', 'Design'];
            const projectsContainer = document.querySelector('.projects-container');
            
            // Create filter buttons
            const filterContainer = document.createElement('div');
            filterContainer.className = 'filter-container';
            filterContainer.style.display = 'flex';
            filterContainer.style.justifyContent = 'center';
            filterContainer.style.marginBottom = '2rem';
            filterContainer.style.gap = '1rem';
            filterContainer.style.flexWrap = 'wrap';
            
            categories.forEach(category => {
                const filterButton = document.createElement('button');
                filterButton.className = 'filter-button';
                filterButton.textContent = category;
                filterButton.dataset.category = category.toLowerCase();
                filterButton.style.padding = '0.5rem 1rem';
                filterButton.style.border = 'none';
                filterButton.style.borderRadius = '5px';
                filterButton.style.backgroundColor = category === 'All' ? '#4299e1' : '#e2e8f0';
                filterButton.style.color = category === 'All' ? 'white' : '#4a5568';
                filterButton.style.fontWeight = '500';
                filterButton.style.cursor = 'pointer';
                filterButton.style.transition = 'all 0.3s';
                
                filterButton.addEventListener('mouseover', function() {
                    if (this.dataset.active !== 'true') {
                        this.style.backgroundColor = '#cbd5e0';
                    }
                });
                
                filterButton.addEventListener('mouseout', function() {
                    if (this.dataset.active !== 'true') {
                        this.style.backgroundColor = '#e2e8f0';
                    }
                });
                
                filterButton.addEventListener('click', function() {
                    // Update active state of buttons
                    document.querySelectorAll('.filter-button').forEach(btn => {
                        btn.style.backgroundColor = '#e2e8f0';
                        btn.style.color = '#4a5568';
                        btn.dataset.active = 'false';
                    });
                    
                    this.style.backgroundColor = '#4299e1';
                    this.style.color = 'white';
                    this.dataset.active = 'true';
                    
                    // Filter projects
                    filterProjects(this.dataset.category);
                });
                
                if (category === 'All') {
                    filterButton.dataset.active = 'true';
                }
                
                filterContainer.appendChild(filterButton);
            });
            
            // Insert filter container before projects grid
            const projectsGrid = document.querySelector('.projects-grid');
            projectsContainer.insertBefore(filterContainer, projectsGrid);
            
            // Add data-category attribute to project cards for filtering
            const projectCards = document.querySelectorAll('.project-card');
            const categories_lower = ['web', 'mobile', 'design'];
            
            projectCards.forEach(card => {
                // Randomly assign categories for demonstration
                const randomCategory = categories_lower[Math.floor(Math.random() * categories_lower.length)];
                card.dataset.category = randomCategory;
            });
            
            function filterProjects(category) {
                const projectCards = document.querySelectorAll('.project-card');
                
                projectCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        }
        
        // Uncomment to add portfolio filtering
        // setupPortfolioFilters();
        
        // Testimonials carousel (Optional)
        function createTestimonialsSection() {
            const testimonials = [
                {
                    name: 'John Doe',
                    position: 'CEO, TechCorp',
                    text: 'Working with this developer was an amazing experience. The attention to detail and commitment to quality really set them apart from others in the field.',
                    image: '/api/placeholder/60/60'
                },
                {
                    name: 'Jane Smith',
                    position: 'Marketing Director, CreativeAgency',
                    text: 'The website created for our company exceeded all expectations. It\'s not only beautiful but also highly functional and easy to navigate.',
                    image: '/api/placeholder/60/60'
                },
                {
                    name: 'Michael Johnson',
                    position: 'Founder, StartupX',
                    text: 'I\'ve worked with many developers over the years, but this one stands out for their technical expertise, creative problem-solving, and excellent communication.',
                    image: '/api/placeholder/60/60'
                }
            ];
            
            // Create testimonials section
            const testimonialsSection = document.createElement('section');
            testimonialsSection.id = 'testimonials';
            testimonialsSection.style.padding = '6rem 5%';
            testimonialsSection.style.backgroundColor = '#f8f9fa';
            
            const testimonialsContainer = document.createElement('div');
            testimonialsContainer.className = 'testimonials-container';
            testimonialsContainer.style.maxWidth = '1200px';
            testimonialsContainer.style.margin = '0 auto';
            testimonialsContainer.style.textAlign = 'center';
            
            const sectionTitle = document.createElement('h2');
            sectionTitle.className = 'section-title';
            sectionTitle.textContent = 'Client Testimonials';
            sectionTitle.style.textAlign = 'center';
            sectionTitle.style.marginBottom = '3rem';
            sectionTitle.style.position = 'relative';
            sectionTitle.style.paddingBottom = '10px';
            
            const titleAfter = document.createElement('span');
            titleAfter.style.content = '';
            titleAfter.style.position = 'absolute';
            titleAfter.style.bottom = '0';
            titleAfter.style.left = '50%';
            titleAfter.style.transform = 'translateX(-50%)';
            titleAfter.style.width = '50px';
            titleAfter.style.height = '3px';
            titleAfter.style.backgroundColor = '#4299e1';
            sectionTitle.appendChild(titleAfter);
            
            const testimonialsSlider = document.createElement('div');
            testimonialsSlider.className = 'testimonials-slider';
            testimonialsSlider.style.position = 'relative';
            testimonialsSlider.style.overflow = 'hidden';
            
            const testimonialsTrack = document.createElement('div');
            testimonialsTrack.className = 'testimonials-track';
            testimonialsTrack.style.display = 'flex';
            testimonialsTrack.style.transition = 'transform 0.5s ease';
            
            testimonials.forEach((testimonial, index) => {
                const testimonialCard = document.createElement('div');
                testimonialCard.className = 'testimonial-card';
                testimonialCard.style.flex = '0 0 100%';
                testimonialCard.style.padding = '2rem';
                testimonialCard.style.backgroundColor = 'white';
                testimonialCard.style.borderRadius = '8px';
                testimonialCard.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
                testimonialCard.style.margin = '0 10px';
                testimonialCard.style.display = 'flex';
                testimonialCard.style.flexDirection = 'column';
                testimonialCard.style.alignItems = 'center';
                testimonialCard.style.textAlign = 'center';
                
                const testimonialText = document.createElement('p');
                testimonialText.className = 'testimonial-text';
                testimonialText.textContent = testimonial.text;
                testimonialText.style.marginBottom = '1.5rem';
                testimonialText.style.fontStyle = 'italic';
                testimonialText.style.lineHeight = '1.8';
                
                const clientInfo = document.createElement('div');
                clientInfo.className = 'client-info';
                clientInfo.style.display = 'flex';
                clientInfo.style.flexDirection = 'column';
                clientInfo.style.alignItems = 'center';
                
                const clientImage = document.createElement('img');
                clientImage.src = testimonial.image;
                clientImage.alt = testimonial.name;
                clientImage.style.width = '60px';
                clientImage.style.height = '60px';
                clientImage.style.borderRadius = '50%';
                clientImage.style.marginBottom = '1rem';
                
                const clientName = document.createElement('h4');
                clientName.className = 'client-name';
                clientName.textContent = testimonial.name;
                clientName.style.marginBottom = '0.25rem';
                clientName.style.fontWeight = '600';
                
                const clientPosition = document.createElement('p');
                clientPosition.className = 'client-position';
                clientPosition.textContent = testimonial.position;
                clientPosition.style.fontSize = '0.875rem';
                clientPosition.style.color = '#718096';
                
                clientInfo.appendChild(clientImage);
                clientInfo.appendChild(clientName);
                clientInfo.appendChild(clientPosition);
                
                testimonialCard.appendChild(testimonialText);
                testimonialCard.appendChild(clientInfo);
                
                testimonialsTrack.appendChild(testimonialCard);
            });
            
            const prevButton = document.createElement('button');
            prevButton.className = 'testimonial-nav prev';
            prevButton.innerHTML = '&lt;';
            prevButton.style.position = 'absolute';
            prevButton.style.top = '50%';
            prevButton.style.left = '10px';
            prevButton.style.transform = 'translateY(-50%)';
            prevButton.style.width = '40px';
            prevButton.style.height = '40px';
            prevButton.style.borderRadius = '50%';
            prevButton.style.backgroundColor = 'white';
            prevButton.style.border = 'none';
            prevButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            prevButton.style.cursor = 'pointer';
            prevButton.style.zIndex = '10';
            
            const nextButton = document.createElement('button');
            nextButton.className = 'testimonial-nav next';
            nextButton.innerHTML = '&gt;';
            nextButton.style.position = 'absolute';
            nextButton.style.top = '50%';
            nextButton.style.right = '10px';
            nextButton.style.transform = 'translateY(-50%)';
            nextButton.style.width = '40px';
            nextButton.style.height = '40px';
            nextButton.style.borderRadius = '50%';
            nextButton.style.backgroundColor = 'white';
            nextButton.style.border = 'none';
            nextButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            nextButton.style.cursor = 'pointer';
            nextButton.style.zIndex = '10';
            
            testimonialsSlider.appendChild(testimonialsTrack);
            testimonialsSlider.appendChild(prevButton);
            testimonialsSlider.appendChild(nextButton);
            
            testimonialsContainer.appendChild(sectionTitle);
            testimonialsContainer.appendChild(testimonialsSlider);
            
            testimonialsSection.appendChild(testimonialsContainer);
            
            // Insert testimonials section before contact section
            const contactSection = document.getElementById('contact');
            contactSection.parentNode.insertBefore(testimonialsSection, contactSection);
            
            // Carousel functionality
            let currentSlide = 0;
            const slideWidth = 100;
            const totalSlides = testimonials.length;
            
            function goToSlide(slideIndex) {
                if (slideIndex < 0) {
                    slideIndex = totalSlides - 1;
                } else if (slideIndex >= totalSlides) {
                    slideIndex = 0;
                }
                
                currentSlide = slideIndex;
                testimonialsTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
            }
            
            prevButton.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
            });
            
            nextButton.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
            });
            
            // Auto play
            setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        }
        
        // Uncomment to add testimonials section
        // createTestimonialsSection();
        
        // Parallax effect on scroll
        function setupParallaxEffect() {
            window.addEventListener('scroll', function() {
                const scrollPosition = window.pageYOffset;
                
                // Parallax effect for hero section
                const heroSection = document.querySelector('.hero');
                if (heroSection) {
                    heroSection.style.backgroundPosition = `50% ${scrollPosition * 0.4}px`;
                }
            });
        }
        
        // Uncomment to add parallax effect
        // setupParallaxEffect();
        
        // Portfolio item details popup
        function setupPortfolioPopup() {
            const projectCards = document.querySelectorAll('.project-card');
            
            // Create modal container
            const modalContainer = document.createElement('div');
            modalContainer.className = 'modal-container';
            modalContainer.style.position = 'fixed';
            modalContainer.style.top = '0';
            modalContainer.style.left = '0';
            modalContainer.style.width = '100%';
            modalContainer.style.height = '100%';
            modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            modalContainer.style.display = 'none';
            modalContainer.style.justifyContent = 'center';
            modalContainer.style.alignItems = 'center';
            modalContainer.style.zIndex = '2000';
            modalContainer.style.opacity = '0';
            modalContainer.style.transition = 'opacity 0.3s ease';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            modalContent.style.backgroundColor = 'white';
            modalContent.style.padding = '2rem';
            modalContent.style.borderRadius = '8px';
            modalContent.style.width = '90%';
            modalContent.style.maxWidth = '800px';
            modalContent.style.maxHeight = '90vh';
            modalContent.style.overflow = 'auto';
            modalContent.style.position = 'relative';
            modalContent.style.transform = 'scale(0.8)';
            modalContent.style.transition = 'transform 0.3s ease';
            
            const closeButton = document.createElement('button');
            closeButton.className = 'close-button';
            closeButton.innerHTML = '&times;';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '10px';
            closeButton.style.right = '15px';
            closeButton.style.border = 'none';
            closeButton.style.background = 'none';
            closeButton.style.fontSize = '1.5rem';
            closeButton.style.cursor = 'pointer';
            closeButton.style.color = '#4a5568';
            
            modalContent.appendChild(closeButton);
            modalContainer.appendChild(modalContent);
            document.body.appendChild(modalContainer);
            
            // Close modal when clicking the close button or outside the modal content
            closeButton.addEventListener('click', closeModal);
            modalContainer.addEventListener('click', function(e) {
                if (e.target === modalContainer) {
                    closeModal();
                }
            });
            
            // Add click event to project cards
            projectCards.forEach(card => {
                card.style.cursor = 'pointer';
                
                card.addEventListener('click', function() {
                    // Get project details
                    const title = this.querySelector('.project-title').textContent;
                    const description = this.querySelector('.project-description').textContent;
                    const imageSrc = this.querySelector('.project-image img').src;
                    const tags = Array.from(this.querySelectorAll('.project-tag')).map(tag => tag.textContent);
                    
                    // Populate modal with project details
                    modalContent.innerHTML = `
                        <button class="close-button" style="position: absolute; top: 10px; right: 15px; border: none; background: none; font-size: 1.5rem; cursor: pointer; color: #4a5568;">&times;</button>
                        <h2 style="font-size: 1.75rem; margin-bottom: 1rem; color: #2d3748;">${title}</h2>
                        <div style="margin-bottom: 1.5rem;">
                            <img src="${imageSrc}" alt="${title}" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #2d3748;">Project Description</h3>
                            <p style="line-height: 1.8;">${description}</p>
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #2d3748;">Technologies Used</h3>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                ${tags.map(tag => `<span style="background-color: #e6f7ff; color: #4299e1; padding: 0.25rem 0.5rem; border-radius: 5px; font-size: 0.875rem; font-weight: 500;">${tag}</span>`).join('')}
                            </div>
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #2d3748;">Project Details</h3>
                            <p style="line-height: 1.8;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.</p>
                        </div>
                        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                            <a href="#" style="display: inline-block; padding: 0.5rem 1rem; background-color: #4299e1; color: white; text-decoration: none; border-radius: 5px; font-weight: 500; transition: background-color 0.3s; font-size: 0.875rem;">View Demo</a>
                            <a href="#" style="display: inline-block; padding: 0.5rem 1rem; background-color: #4299e1; color: white; text-decoration: none; border-radius: 5px; font-weight: 500; transition: background-color 0.3s; font-size: 0.875rem;">Source Code</a>
                        </div>
                    `;
                    
                    // Show modal
                    modalContainer.style.display = 'flex';
                    setTimeout(() => {
                        modalContainer.style.opacity = '1';
                        modalContent.style.transform = 'scale(1)';
                    }, 10);
                    
                    // Reattach close button event
                    modalContainer.querySelector('.close-button').addEventListener('click', closeModal);
                });
            });
            
            function closeModal() {
                modalContainer.style.opacity = '0';
                modalContent.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    modalContainer.style.display = 'none';
                }, 300);
            }
        }
        
        // Uncomment to add portfolio popup
        // setupPortfolioPopup();
        
        // Add active class to navigation links based on scroll position
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            window.addEventListener('scroll', () => {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.clientHeight;
                    
                    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                        link.style.color = '#4299e1';
                    } else {
                        link.style.color = '#2d3748';
                    }
                });
            });
        }
        
        // Initialize active nav link highlighting
        updateActiveNavLink();