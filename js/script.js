document.addEventListener('DOMContentLoaded', () => {

    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const moonIcon = document.getElementById('theme-icon-moon');
    const sunIcon = document.getElementById('theme-icon-sun');

    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            body.classList.remove('light-mode');
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            let newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const coursesToShowInitially = 4;
    const loadMoreContainers = document.querySelectorAll('.load-more-container');

    loadMoreContainers.forEach(container => {
        const button = container.querySelector('.load-more-button');
        if (!button) return;

        const targetGridId = button.dataset.targetGrid;
        const grid = document.getElementById(targetGridId);
        if (!grid) return;

        const cards = Array.from(grid.querySelectorAll('.course-card'));
        
        if (cards.length <= coursesToShowInitially) {
            container.classList.add('hidden');
            return;
        }

        cards.slice(coursesToShowInitially).forEach(card => card.classList.add('hidden'));
        
        button.dataset.state = 'closed'; 

        button.addEventListener('click', () => {
            const currentState = button.dataset.state;
            const icon = button.querySelector('i');

            if (currentState === 'closed') {
                cards.forEach(card => card.classList.remove('hidden'));
                
                button.innerHTML = 'Ver menos <i class="fas fa-chevron-up"></i>';
                button.dataset.state = 'open';

            } else {
                cards.slice(coursesToShowInitially).forEach(card => card.classList.add('hidden'));

                button.innerHTML = 'Ver todos os cursos <i class="fas fa-chevron-down"></i>';
                button.dataset.state = 'closed';

                grid.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
