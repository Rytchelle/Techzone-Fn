document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idProduto = urlParams.get('id');

    // Seleciona os elementos de carregamento e detalhes
    const carregandoElement = document.getElementById('carregando');
    const detalhesElement = document.getElementById('produtoDetalhes');

    // Oculta a mensagem de carregamento e detalhes inicialmente
    carregandoElement.style.display = 'none';
    detalhesElement.style.display = 'none';

    // Verifica se o ID do produto foi fornecido
    if (!idProduto) {
        console.error('ID do produto não encontrado.');
        detalhesElement.innerHTML = `
            <p>Produto não encontrado. Por favor, selecione um produto válido.</p>
        `;
        detalhesElement.style.display = 'block';
        return; // Interrompe a execução
    }

    // Exibe a mensagem de carregamento
    carregandoElement.style.display = 'block';

    // Faz a requisição para obter os detalhes do produto
    fetch(`http://localhost:8080/prod/prod/${idProduto}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar produto: ' + response.statusText);
            }
            return response.json();
        })
        .then(produto => {
            // Oculta a mensagem de carregamento
            carregandoElement.style.display = 'none';
            
            // Exibe os detalhes do produto
            detalhesElement.style.display = 'block';
            detalhesElement.innerHTML = `
                <div class="detalhes-container">
                    <div class="produto-imagem">
                        <img src="${produto.foto}" alt="${produto.nome}" />
                    </div>
                    <div class="produto-info">
                        <h1 class="N" id="nomeProduto">${produto.nome}</h1>
                        <p class="D" id="descricaoProduto">${produto.descricao}</p>
                        <p class="P" id="precoProduto">${produto.preco}</p>
                        <a class="botao-pagamento" href="/Cartao.html">Efetuar pagamento</a>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Erro ao carregar o produto:', error);
            carregandoElement.style.display = 'none'; // Oculta carregamento em caso de erro
            detalhesElement.style.display = 'block';
            detalhesElement.innerHTML = `
                <p>Erro ao carregar o produto. Verifique sua conexão ou tente novamente mais tarde.</p>
            `;
        });
});
