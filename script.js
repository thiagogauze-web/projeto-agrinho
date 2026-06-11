document.addEventListener('DOMContentLoaded', () => {
    
    // Seleção do formulário e área de resposta
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    // Evento de envio do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita a página de recarregar

        // Captura os dados digitados
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        // Validação simples extra
        if (nome && email) {
            // Exibe mensagem de sucesso estilizada
            feedback.textContent = `Obrigado pelo contato, ${nome}! Sua ideia de sustentabilidade foi enviada com sucesso para o Projeto Agrinho.`;
            feedback.className = "success"; // Aplica a classe CSS de sucesso
            feedback.classList.remove('hidden');

            // Limpa os campos do formulário
            form.reset();

            // Desaparece com a mensagem após 5 segundos
            setTimeout(() => {
                feedback.classList.add('hidden');
            }, 5000);
        }
    });

    // Animação simples ao rolar a página para o menu mobile (Mera demonstração de clique)
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.addEventListener('click', () => {
        alert('Aqui você pode programar a abertura do menu lateral no celular!');
    });
});
