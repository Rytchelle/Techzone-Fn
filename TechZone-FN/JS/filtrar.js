let debounceTimeout; // Variável para armazenar o timeout do debounce

function filtrarProdutos() {
    clearTimeout(debounceTimeout); // Limpa o timeout anterior

    // Adiciona o delay antes de chamar a função de busca
    debounceTimeout = setTimeout(() => {
        let nomeProduto = document.getElementById("inputBusca").value.trim();

        // Esconde a lista de produtos se o campo de busca estiver vazio
        if (nomeProduto === "") {
            const listaProdutos = document.getElementById("listaProdutos");
            listaProdutos.style.display = 'none'; // Esconde a lista
            return; // Interrompe a execução se o campo estiver vazio
        }

        fetch(`http://localhost:8080/prod/search?nome=${nomeProduto}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar produtos");
                }
                return response.json();
            })
            .then(produtos => {
                if (produtos.length === 0) {
                    console.log("Nenhum produto encontrado");
                    exibirMensagemNenhumProduto(); // Função para exibir uma mensagem de "nenhum produto encontrado"
                } else {
                    console.log("Produtos encontrados:", produtos);
                    exibirProdutos(produtos); // Função para exibir os produtos no HTML
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, 300); // 300ms de delay
}

function exibirProdutos(produtos) {
    const listaProdutos = document.getElementById("listaProdutos");
    listaProdutos.innerHTML = ''; // Limpar a lista antes de adicionar novos itens
    listaProdutos.style.display = 'block'; // Tornar a lista visível

    produtos.forEach(produto => {
        const item = document.createElement("li");
        item.innerHTML = `
            <a href="produto.html?id=${produto.id}" style="display: flex; align-items: center;">
                <img src="${produto.foto}" alt="${produto.nome}" style="width: 50px; height: 50px; margin-right: 10px; object-fit: cover; border-radius: 5px;" />
                <span>${produto.nome} - ${produto.preco}</span>
            </a>
        `;
        listaProdutos.appendChild(item);
    });
}

function exibirMensagemNenhumProduto() {
    const listaProdutos = document.getElementById("listaProdutos");
    listaProdutos.innerHTML = ''; // Limpar qualquer conteúdo anterior
    listaProdutos.style.display = 'block'; // Tornar a lista visível
    const mensagem = document.createElement("li");
    mensagem.textContent = "Nenhum produto encontrado";
    listaProdutos.appendChild(mensagem);
}
