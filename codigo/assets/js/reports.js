// Ir para menu home
const home = document.querySelector('button#Logomarca');

home.addEventListener('click',function(){
    window.location.href = 'index.html';
})

// Função para salvar denúncias no localStorage
function salvarDenuncias() {
    const denuncias = document.querySelectorAll('.denuncia');
    const dadosDenuncias = [];

    denuncias.forEach(denuncia => {
        const nome = denuncia.querySelector('.nome').innerText;
        const data = denuncia.querySelector('.data').innerText;
        const descricao = denuncia.querySelector('.descricao').innerText;

        dadosDenuncias.push({ nome, data, descricao });
    });

    localStorage.setItem('denuncias', JSON.stringify(dadosDenuncias));
}

// Função para carregar denúncias do localStorage
function carregarDenuncias() {
    const dadosDenuncias = JSON.parse(localStorage.getItem('denuncias'));

    if (dadosDenuncias) {
        dadosDenuncias.forEach(dados => {
            adicionarDenunciaNaPagina(dados.nome, dados.data, dados.descricao);
        });
    }
}

// Função para adicionar uma nova denúncia na página
function adicionarDenunciaNaPagina(nome, data, descricao) {
    const novaDenuncia = document.createElement('div');
    novaDenuncia.classList.add('denuncia');
    novaDenuncia.innerHTML = `<div><strong>Nome:</strong> <span class="nome">${nome}</span><br>
                              <strong>Data:</strong> <span class="data">${data}</span><br>
                              <strong>Descrição:</strong> <span class="descricao">${descricao}</span></div>
                              <div><button class="deletarDenuncia">Deletar</button></div>`;
    novaDenuncia.style.borderRadius = "12px";
    novaDenuncia.style.margin = "12px 0";
    novaDenuncia.style.display = "flex";
    novaDenuncia.style.justifyContent = "space-between";
    const del = novaDenuncia.querySelector('.deletarDenuncia');
    del.style.marginTop = "5px";
    novaDenuncia.querySelector('.deletarDenuncia').addEventListener('click', function() {
        novaDenuncia.remove();
        salvarDenuncias();
    });
    document.getElementById('listaDenuncias').appendChild(novaDenuncia);
}

var toggleBloco = false;
document.getElementById('botaoAdicionar').addEventListener('click', function () {
    const bloco = document.getElementById('formularioDenuncia');
    toggleBloco = !toggleBloco;
    if (toggleBloco)
    {
        bloco.style.display = 'block';
    }
    else
    {
        bloco.style.display = 'none';
    }
});

document.getElementById('formDenuncia').addEventListener('submit', function (event) {
    event.preventDefault();

    // Pega os valores do formulário
    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;
    const descricao = document.getElementById('descricao').value;

    // Adiciona a nova denúncia na página
    adicionarDenunciaNaPagina(nome, data, descricao);

    // Salva as denúncias no localStorage
    salvarDenuncias();

    // Limpa o formulário e esconde ele
    document.getElementById('formDenuncia').reset();
    document.getElementById('formularioDenuncia').style.display = 'none';
    toggleBloco = !toggleBloco;
});
// Função para o botão "Cancelar"
document.getElementById('botaoCancelar').addEventListener('click', function () {
    document.getElementById('formDenuncia').reset();
    document.getElementById('formularioDenuncia').style.display = 'none';
    toggleBloco = !toggleBloco;
});


// Carrega as denúncias ao carregar a página
window.onload = carregarDenuncias;