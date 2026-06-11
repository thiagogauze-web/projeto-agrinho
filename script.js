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
    // Simula a mudança nos números da fazenda de forma assíncrona
    setInterval(() => {
        const txtUmidade = document.getElementById('txt-umidade');
        const txtEnergia = document.getElementById('txt-energia');
        
        // Oscila umidade entre 58% e 65%
        const novaUmidade = Math.floor(Math.random() * (65 - 58 + 1)) + 58;
        txtUmidade.textContent = `${novaUmidade}%`;

        // Acrescenta variação decimal na energia gerada
        const atualEnergia = parseFloat(txtEnergia.textContent);
        const novaEnergia = (atualEnergia + (Math.random() * 0.2)).toFixed(1);
        txtEnergia.textContent = `${novaEnergia} kWh`;
    }, 4000);


    // --- 3. ALGORITMO DE FILTRAGEM DOS PROJETOS ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove classe ativa de todos e adiciona no clicado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.classList.remove('hide');
                    // Efeito sutil de fade-in via script
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

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Pega valores digitados
        const nome = document.getElementById('dev-name').value;
        const categoria = document.getElementById('proj-category').value;
        const titulo = "Novo Projeto de " + nome;
        const desc = document.getElementById('proj-desc').value;

        // Injeta DINAMICAMENTE um novo card na listagem existente
        const novoCard = document.createElement('div');
        novoCard.className = `project-card`;
        novoCard.setAttribute('data-category', categoria);
        
        novoCard.innerHTML = `
            <div class="project-img ${categoria === 'tech' ? 'tech-bg' : categoria === 'sustentavel' ? 'sust-bg' : 'edu-bg'}">
                <i class="fa-solid fa-lightbulb"></i>
            </div>
            <div class="project-body">
                <span class="project-tag">${categoria}</span>
                <h3>${titulo}</h3>
                <p>${desc}</p>
            </div>
        `;

        projectContainer.prepend(novoCard); // Coloca no topo da lista

        // Feedback visual instantâneo
        toast.textContent = "Parabéns! Seu projeto foi adicionado e renderizado na lista acima.";
        toast.classList.remove('hidden');
        form.reset();

        setTimeout(() => toast.classList.add('hidden'), 6000);
    });


    // --- 5. MENU MOBILE RESPONSIVO ---
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu').querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
});
