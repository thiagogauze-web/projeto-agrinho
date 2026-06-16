document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SCRIPT DO DASHBOARD (CHART.JS) ---
    // Gráfico de Linhas - Consumo de Água e Energia
    const ctxConsumo = document.getElementById('chartConsumo').getContext('2d');
    const chartConsumo = new Chart(ctxConsumo, {
        type: 'line',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Irrigação (Litros x10)',
                data: [45, 39, 60, 41, 50, 32, 28],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.3
            }, {
                label: 'Energia Limpa Consumida (kWh)',
                data: [12, 15, 14, 18, 11, 9, 8],
                borderColor: '#eab308',
                backgroundColor: 'transparent',
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top' } }
        }
    });

    // Gráfico de Pizza - Distribuição das Culturas
    const ctxCulturas = document.getElementById('chartCulturas').getContext('2d');
    new Chart(ctxCulturas, {
        type: 'doughnut',
        data: {
            labels: ['Soja Sustentável', 'Milho', 'Área de Preservação'],
            datasets: [{
                data: [40, 35, 25],
                backgroundColor: ['#15803d', '#eab308', '#10b981'],
                borderWidth: 0
            }]
        },
        options: { responsive: true }
    });


    // --- 2. INTEGRAÇÃO DE SENSORES SIMULADOS (Métricas Vivas) ---
    setInterval(() => {
        const txtUmidade = document.getElementById('txt-umidade');
        const txtEnergia = document.getElementById('txt-energia');
        
        if (txtUmidade) {
            const novaUmidade = Math.floor(Math.random() * (65 - 58 + 1)) + 58;
            txtUmidade.textContent = `${novaUmidade}%`;
        }

        if (txtEnergia) {
            const atualEnergia = parseFloat(txtEnergia.textContent);
            const novaEnergia = (atualEnergia + (Math.random() * 0.2)).toFixed(1);
            txtEnergia.textContent = `${novaEnergia} kWh`;
        }
    }, 4000);


    // --- 3. ALGORITMO DE FILTRAGEM DOS PROJETOS ---
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            const projectCards = document.querySelectorAll('.project-card');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.classList.remove('hide');
                    card.style.opacity = '0';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });


    // --- 4. SUBMISSÃO DE FORMULÁRIO COM FEEDBACK "TOAST" ---
    const form = document.getElementById('advanced-form');
    const toast = document.getElementById('toast');
    const projectContainer = document.getElementById('projects-container');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('dev-name').value;
            const categoria = document.getElementById('proj-category').value;
            const titulo = "Projeto de " + nome;
            const desc = document.getElementById('proj-desc').value;

            // Define ícone e cor de fundo com base na categoria escolhida
            let bgClass = 'tech-bg';
            let iconClass = 'fa-lightbulb';
            let catLabel = 'Tecnologia';

            if (categoria === 'sustentavel') {
                bgClass = 'sust-bg';
                iconClass = 'fa-leaf';
                catLabel = 'Sustentabilidade';
            } else if (categoria === 'edu') {
                bgClass = 'edu-bg';
                iconClass = 'fa-book';
                catLabel = 'Educação';
            }

            const novoCard = document.createElement('div');
            novoCard.className = `project-card`;
            novoCard.setAttribute('data-category', categoria);
            
            novoCard.innerHTML = `
                <div class="project-img ${bgClass}">
                    <i class="fa-solid ${iconClass}"></i>
                </div>
                <div class="project-body">
                    <span class="project-tag">${catLabel}</span>
                    <h3>${titulo}</h3>
                    <p>${desc}</p>
                </div>
            `;

            if (projectContainer) {
                projectContainer.prepend(novoCard);
            }

            if (toast) {
                toast.textContent = "Parabéns! Seu projeto foi adicionado e renderizado na lista acima.";
                toast.classList.remove('hidden');
                setTimeout(() => toast.classList.add('hidden'), 6000);
            }

            form.reset();
        });
    }


    // --- 5. MENU MOBILE RESPONSIVO ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});
