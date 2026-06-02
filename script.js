document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formAgrinho');
    const mensagemSucesso = document.getElementById('mensagemSucesso');

    if (form) {
        form.addEventListener('submit', (evento) => {
            // Impede a página de recarregar ao enviar o formulário
            evento.preventDefault();

            // Captura os dados digitados (pode ser usado para salvar futuramente)
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;

            // Exibe a mensagem de sucesso na tela de forma amigável
            mensagemSucesso.style.display = 'block';

            // Limpa os campos do formulário
            form.reset();

            // Remove a mensagem de sucesso após 5 segundos
            setTimeout(() => {
                mensagemSucesso.style.display = 'none';
            }, 5000);
        });
    }
});
