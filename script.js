document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // ELEMENTOS DO HTML
    // =======================================================
    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('startButton');
    const mainContent = document.getElementById('main-content');
    const musica = document.getElementById('minhaMusica');

    // =======================================================
    // FUNÇÃO PRINCIPAL PARA INICIAR O SITE
    // =======================================================
    function iniciarSite() {
        // 1. Some com a tela de início e mostra o conteúdo principal
        startScreen.style.opacity = '0';
        setTimeout(() => {
            startScreen.style.display = 'none';
        }, 1000); // Espera a transição do CSS terminar

        mainContent.style.display = 'flex';

        // 2. Inicia a música e ajusta os botões
        musica.play();
        configurarControlesMusica(true); // true = música está tocando

        // 3. Inicia o contador
        atualizarContador();
        setInterval(atualizarContador, 1000);

        // 4. Inicia o slideshow
        mostrarProximoSlide();
        setInterval(mostrarProximoSlide, timer);
    }

    // Adiciona o evento de clique ao botão de início
    startButton.addEventListener('click', iniciarSite);

    // =======================================================
    // LÓGICA DO CONTADOR DE TEMPO
    // =======================================================
    // Formato: 'ANO-MÊS-DIATHORA:MINUTO:SEGUNDO'
    const dataInicio = new Date('2024-07-30T23:55:00');
    const elementoContador = document.getElementById('contador');

    function atualizarContador() {
        const agora = new Date();
        const diferenca = agora - dataInicio;
        let segundos = Math.floor(diferenca / 1000);
        let minutos = Math.floor(segundos / 60);
        let horas = Math.floor(minutos / 60);
        let dias = Math.floor(horas / 24);
        let meses = Math.floor(dias / 30.44);
        let anos = Math.floor(meses / 12);
        dias %= 30.44; meses %= 12; horas %= 24; minutos %= 60; segundos %= 60;
        elementoContador.innerHTML = `Nos amamos há:<br><strong>${anos}</strong> anos, <strong>${Math.floor(meses)}</strong> meses, <strong>${Math.floor(dias)}</strong> dias, <br><strong>${horas}</strong> horas, <strong>${minutos}</strong> minutos e <strong>${segundos}</strong> segundos!`;
    }

    // =======================================================
    // LÓGICA DOS CONTROLES DA MÚSICA
    // =======================================================
    const btnTocar = document.getElementById('btnTocar');
    const btnPausar = document.getElementById('btnPausar');

    function configurarControlesMusica(estaTocando) {
        btnPausar.style.display = estaTocando ? 'inline-block' : 'none';
        btnTocar.style.display = estaTocando ? 'none' : 'inline-block';

        btnTocar.addEventListener('click', () => {
            musica.play();
            btnPausar.style.display = 'inline-block';
            btnTocar.style.display = 'none';
        });

        btnPausar.addEventListener('click', () => {
            musica.pause();
            btnTocar.style.display = 'inline-block';
            btnPausar.style.display = 'none';
        });
    }

    // =======================================================
    // LÓGICA DO SLIDESHOW DE FOTOS
    // =======================================================
    let slideIndex = -1;
    const slides = document.querySelectorAll('.slide');
    const timer = 4000; // Tempo em milissegundos (4 segundos)

    function mostrarProximoSlide() {
        if (slides.length === 0) return;
        if (slideIndex >= 0) slides[slideIndex].style.display = 'none';
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].style.display = 'block';
    }
});