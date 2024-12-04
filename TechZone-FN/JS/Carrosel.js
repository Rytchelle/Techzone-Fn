let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide > *'); // Seleciona todas as imagens e vídeos
const totalSlides = slides.length; // Número total de slides (imagens + vídeos)

// Atualiza a posição do slide com base no índice atual
function updateSlidePosition() {
  // Muda a posição do carrossel com base no índice
  document.querySelector('.carousel-slide').style.transform = `translateX(-${currentIndex * 100}%)`;

  // Se houver vídeos, pause o vídeo anterior e inicie o novo vídeo
  const currentSlide = slides[currentIndex];
  const allVideos = document.querySelectorAll('.carousel-video');

  // Pausar todos os vídeos
  allVideos.forEach(video => video.pause());

  // Se o slide atual for um vídeo, comece a reprodução do vídeo
  if (currentSlide.tagName.toLowerCase() === 'video') {
    currentSlide.play();
  }
}

// Muda a imagem ou vídeo com base na direção (anterior ou próxima)
function mudarImagem(direction) {
  currentIndex += direction;

  // Garante que o índice não ultrapasse os limites
  if (currentIndex < 0) currentIndex = totalSlides - 1;
  else if (currentIndex >= totalSlides) currentIndex = 0;

  updateSlidePosition(); // Atualiza a posição do slide
}

// Auto-play do carrossel a cada 3 segundos
setInterval(() => {
  mudarImagem(1); // Move para a próxima imagem ou vídeo automaticamente
}, 5000 );

// Inicializa o carrossel
updateSlidePosition();
