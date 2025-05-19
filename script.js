console.log('%c Oh you are a developer huh!', 'color: #ff0000; font-size: 20px; font-weight: bold;');
const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
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
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
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
        setTimeout(typeWriter, 500);
        function createSkillBars() {
            const skillLevels = {
                'HTML/CSS': 90,
                'JavaScript': 70,
                'Vue.js': 60,
                'Node.js': 60,
                'Electron.js': 65,
                'Tailwindcss': 59
            };
            
            const skillsContainer = document.querySelector('.skills-container');
            const skillBarsSection = document.createElement('div');
            skillBarsSection.className = 'skill-bars';
            skillBarsSection.style.marginTop = '3rem';
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
                
                skillInfo.appendChild(skillName);
                skillInfo.appendChild(skillPercentage);
                progressBarOuter.appendChild(progressBarInner);
                skillBar.appendChild(skillInfo);
                skillBar.appendChild(progressBarOuter);
                skillBarsSection.appendChild(skillBar);
            }
            skillsContainer.appendChild(skillBarsSection);
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
        createSkillBars();
        function setupPortfolioFilters() {
            const categories = ['All', 'Web', 'Telegram-bot', 'Desktop'];
            const projectsContainer = document.querySelector('.projects-container');
            
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
                    document.querySelectorAll('.filter-button').forEach(btn => {
                        btn.style.backgroundColor = '#e2e8f0';
                        btn.style.color = '#4a5568';
                        btn.dataset.active = 'false';
                    });
                    
                    this.style.backgroundColor = '#4299e1';
                    this.style.color = 'white';
                    this.dataset.active = 'true';
                    
                    filterProjects(this.dataset.category);
                });
                
                if (category === 'All') {
                    filterButton.dataset.active = 'true';
                }
                
                filterContainer.appendChild(filterButton);
            });
            const projectsGrid = document.querySelector('.projects-grid');
            projectsContainer.insertBefore(filterContainer, projectsGrid);            
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
        setupPortfolioFilters();
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
        setupParallaxEffect();
            function setupPortfolioPopup() {
            const projectCards = document.querySelectorAll('.project-card');
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
            closeButton.addEventListener('click', closeModal);
            modalContainer.addEventListener('click', function(e) {
                if (e.target === modalContainer) {
                    closeModal();
                }
            });
            projectCards.forEach(card => {
                card.style.cursor = 'pointer';
                
                card.addEventListener('click', function() {
                    const title = this.querySelector('.project-title').textContent;
                    const description = this.querySelector('.project-description').textContent;
                    const imageSrc = this.querySelector('.project-image img').src;
                    const tags = Array.from(this.querySelectorAll('.project-tag')).map(tag => tag.textContent);                    
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
                        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                            <a href="#" style="display: inline-block; padding: 0.5rem 1rem; background-color: #4299e1; color: white; text-decoration: none; border-radius: 5px; font-weight: 500; transition: background-color 0.3s; font-size: 0.875rem;">View Demo</a>
                            <a href="#" style="display: inline-block; padding: 0.5rem 1rem; background-color: #4299e1; color: white; text-decoration: none; border-radius: 5px; font-weight: 500; transition: background-color 0.3s; font-size: 0.875rem;">Source Code</a>
                        </div>
                    `;
                    modalContainer.style.display = 'flex';
                    setTimeout(() => {
                        modalContainer.style.opacity = '1';
                        modalContent.style.transform = 'scale(1)';
                    }, 10);
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
setupPortfolioPopup();
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
                    }
                });
            });
        }
updateActiveNavLink();