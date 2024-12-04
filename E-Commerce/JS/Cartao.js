// Seletores dos campos do formulário
const form = document.querySelector("#credit-card");

const cardNumber = document.querySelector("#card-number");
const cardHolder = document.querySelector("#name-text");
const cardExpiration = document.querySelector("#valid-thru-text");
const cardCVV = document.querySelector("#cvv-text");

const cardNumberText = document.querySelector(".number-vl");
const cardHolderText = document.querySelector(".name-vl");
const cardExpirationText = document.querySelector(".expiration-vl");
const cardCVVText = document.querySelector(".cvv-vl");

// Formatar número do cartão
cardNumber.addEventListener("keyup", (e) => {
    let inputVal = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (!inputVal) {
        cardNumberText.innerText = "0000 0000 0000 0000";
    } else {
        if (inputVal.length > 12) {
            inputVal = inputVal.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
        } else if (inputVal.length > 8) {
            inputVal = inputVal.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
        } else if (inputVal.length > 4) {
            inputVal = inputVal.replace(/(\d{4})(\d{0,4})/, "$1 $2");
        }

        e.target.value = inputVal; // Atualiza o valor digitado com os espaços
        cardNumberText.innerText = inputVal;
    }
});

// Formatar nome do titular
cardHolder.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        cardHolderText.innerText = "NOME COMPLETO";
    } else {
        cardHolderText.innerText = e.target.value.toUpperCase(); // Converte para maiúsculas
    }
});

// Formatar validade
cardExpiration.addEventListener("keyup", (e) => {
    let inputVal = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (!inputVal) {
        cardExpirationText.innerText = "MM/AA";
    } else {
        if (inputVal.length > 2) {
            inputVal = inputVal.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
        }

        e.target.value = inputVal; // Atualiza o valor digitado com a formatação
        cardExpirationText.innerText = inputVal;
    }
});

// Atualizar CVV
cardCVV.addEventListener("keyup", (e) => {
    let inputVal = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (inputVal.length > 3) {
        inputVal = inputVal.slice(0, 3); // Limita a 3 caracteres
    }

    e.target.value = inputVal; // Atualiza o valor digitado com a formatação
    cardCVVText.innerText = inputVal;
});

// Envio do formulário
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de submit

    // Captura os valores dos campos
    const nome_cart = cardHolder.value.trim();
    const numero_cart = cardNumber.value.trim(); // Número com espaços
    const val_cart = cardExpiration.value.trim(); // Validade com "/"
    const cvv_cart = cardCVV.value.trim(); // CVV como string

    // Validações básicas
    if (!nome_cart || !numero_cart || !val_cart || !cvv_cart) {
        alert("Todos os campos são obrigatórios.");
        return;
    }

    if (cvv_cart.length !== 3) {
        alert("O CVV deve ter exatamente 3 dígitos.");
        return;
    }

    // Monta o objeto do cartão
    const cartao = {
        nome_cart,
        numero_cart, // Mantém os espaços
        val_cart, // Mantém a barra
        cvv_cart // Envia como string
    };

    console.log("Enviando os seguintes dados:", cartao);

    try {
        // Requisição POST para o backend
        const response = await fetch("http://localhost:8080/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartao)
        });

        if (response.ok) {
            const cartaoCriado = await response.json();
            console.log("Cartão criado com sucesso:", cartaoCriado);
            alert("Cartão adicionado com sucesso!");
            form.reset(); // Reseta os campos do formulário
        } else {
            console.error("Erro ao adicionar cartão:", response.statusText);
            alert("Erro ao adicionar o cartão.");
        }
    } catch (error) {
        console.error("Erro ao conectar com o backend:", error);
        alert("Erro ao conectar ao servidor.");
    }
});
