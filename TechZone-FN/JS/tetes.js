function editarProduto(produtoId) {
    alert(`Você clicou em Editar para o produto com ID: ${produtoId}`);
    // Aqui você pode redirecionar para uma página de edição, por exemplo:
    // window.location.href = `/editarProduto/${produtoId}`;
}

function excluirProduto(produtoId) {
    let confirmacao = confirm(`Tem certeza que deseja excluir o produto com ID: ${produtoId}?`);
    if (confirmacao) {
        document.getElementById(produtoId).remove(); // Remove o produto da tela
        alert(`Produto com ID: ${produtoId} foi excluído.`);
    }
}
