// Função para exibir notificações ao usuário
function exibirNotificacao(mensagem, tipo = 'info') {
    const notificacao = document.getElementById('notificacao');
    notificacao.innerHTML = mensagem;

    notificacao.style.background = tipo === 'success' ? '#d4edda' : '#f8d7da';
    notificacao.style.color = tipo === 'success' ? '#155724' : '#721c24';
    notificacao.style.border = tipo === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
    notificacao.style.display = 'block';

    setTimeout(() => {
        notificacao.style.display = 'none';
    }, 3000);
}

// Função para adicionar um novo produto
async function adicionarProduto() {
    const nome = prompt("Digite o nome do produto:");
    const descricao = prompt("Digite a descrição do produto:");
    let preco = prompt("Digite o preço do produto:");
    const foto = prompt("Digite o URL da imagem do produto:");

    // Validações básicas
    if (!nome || !descricao || !preco || !foto) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    // Adiciona o prefixo "R$" ao preço, se não estiver presente
    preco = preco.startsWith('R$') ? preco : `R$ ${preco}`;

    const novoProduto = {
        nome: nome,
        descricao: descricao,
        preco: preco,
        foto: foto
    };

    try {
        // Requisição POST para o backend
        const response = await fetch('http://localhost:8080/prod', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoProduto)
        });

        if (response.ok) {
            const produtoCriado = await response.json(); // Recebe o produto criado do backend
            console.log('Produto criado com sucesso:', produtoCriado);

            let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
            produtos.push({
                id: produtoCriado.id,
                nome: produtoCriado.nome,
                descricao: produtoCriado.descricao,
                preco: produtoCriado.preco,
                foto: produtoCriado.foto
            });
            localStorage.setItem('produtos', JSON.stringify(produtos));

            atualizarPaginaProdutos();
            exibirNotificacao('Produto criado com sucesso!', 'success');
        } else {
            console.error("Erro ao criar produto no backend:", response.statusText);
            exibirNotificacao('Erro ao criar o produto.', 'error');
        }
    } catch (error) {
        console.error("Erro ao criar o produto:", error);
        exibirNotificacao("Erro ao conectar ao servidor.", 'error');
    }
}

// Função para atualizar a exibição dos produtos
function atualizarPaginaProdutos() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const sectionProdutos = document.querySelector('.selecao_produtos');
    sectionProdutos.innerHTML = '';

    const urlAtual = window.location.pathname;
    const mostrarAcoes = urlAtual.includes('TodosProdutos.html'); // Exibe os botões apenas na página "TodosProdutos.html"

    produtos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('descrição_Prudu');
        produtoDiv.id = produto.id;

        produtoDiv.innerHTML = `
           <div class="poo">
                <div class="Caixateste">
                    <a class="clicar_produtos" href="/produto.html?id=${produto.id}">
                        <img class="img_produtos" src="${produto.foto}" alt="${produto.nome}">
                    </a>
                </div>
                <div class="Detalhes">
                    <h4 class="nomep">${produto.nome}</h4>
                    <strong class="preço">${produto.preco}</strong>
                </div>
           </div>
        `;

        if (mostrarAcoes) {
            const acoesDiv = document.createElement('div');
            acoesDiv.classList.add('acoes_produto');
            acoesDiv.innerHTML = `
                <div class="Detalhes">
                    <button class="editar" onclick="editarProduto('${produto.id}')">Editar</button>
                    <button class="excluir" onclick="excluirProduto('${produto.id}')">Excluir</button>
                </div>
            `;
            produtoDiv.appendChild(acoesDiv);
        }

        sectionProdutos.appendChild(produtoDiv);
    });
}

// Função para inicializar produtos
function inicializarProdutos() {
    if (!localStorage.getItem('produtos')) {
        localStorage.setItem('produtos', JSON.stringify([]));
    }
}

// Função para excluir um produto
async function excluirProduto(id) {
    const confirmacao = confirm("Tem certeza que deseja excluir este produto?");

    if (confirmacao) {
        try {
            const response = await fetch(`http://localhost:8080/prod/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
                produtos = produtos.filter(produto => produto.id !== id);
                localStorage.setItem('produtos', JSON.stringify(produtos));
                atualizarPaginaProdutos();
                exibirNotificacao("Produto excluído com sucesso!", 'success');
            } else if (response.status === 404) {
                exibirNotificacao("Produto não encontrado no backend.", 'error');
            } else {
                exibirNotificacao("Erro ao excluir produto no backend.", 'error');
            }
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            exibirNotificacao("Erro ao conectar ao servidor.", 'error');
        }
    } else {
        console.log("Exclusão cancelada.");
    }
}

// Função para editar um produto
async function editarProduto(id) {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const produto = produtos.find(prod => prod.id === id);

    if (produto) {
        let novoNome = prompt("Digite o novo nome do produto:", produto.nome);
        let novaDescricao = prompt("Digite a nova descrição do produto:", produto.descricao);
        let novoPreco = prompt("Digite o novo preço do produto:", produto.preco);
        let novaFoto = prompt("Digite o novo URL da imagem do produto:", produto.foto);

        novoPreco = novoPreco.startsWith('R$') ? novoPreco : `R$ ${novoPreco}`;

        produto.nome = novoNome;
        produto.descricao = novaDescricao;
        produto.preco = novoPreco;
        produto.foto = novaFoto;

        localStorage.setItem('produtos', JSON.stringify(produtos));
        atualizarPaginaProdutos();

        const response = await fetch(`http://localhost:8080/prod/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });

        if (response.ok) {
            exibirNotificacao('Produto atualizado com sucesso!', 'success');
        } else {
            exibirNotificacao('Erro ao atualizar produto.', 'error');
        }
    }
}

// Inicializar os produtos e atualizar a página
inicializarProdutos();
atualizarPaginaProdutos();
