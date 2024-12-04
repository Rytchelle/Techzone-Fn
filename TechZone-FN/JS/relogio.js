// Define a data de término da oferta (exemplo: hoje às 23h59)
const offerEndDate = new Date();
offerEndDate.setHours(23, 59, 59);

// Atualiza o contador a cada segundo
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = offerEndDate - now;

    if (distance <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "Oferta Expirada";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
}, 1000);
