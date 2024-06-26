// Função para obter o valor de um parâmetro específico da query string
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Função para processar o título obtido da URL
function processarTituloDaURL() {
    // Obtém o valor do parâmetro 'title' da query string
    var title = getParameterByName('title');

    // Verifica se o título foi encontrado na query string
    if (title) {
        // Faça o que deseja com o título
        console.log("Título da URL:", title);
        mostraCard(title); // Chamando a função após a verificação do título

    } else {
        console.log("Nenhum título encontrado na URL.");
    }
}

// Função para mostrar o card com base no título
function mostraCard(titulo){
    const container = document.getElementById('items-container');
    let text = localStorage.getItem("info")
    text = JSON.parse(text)
    text.forEach(element => {
        if(element.title === titulo){
            const itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                itemDiv.dataset.name = element.name.toLowerCase(); // Normaliza o nome aqui

                itemDiv.innerHTML = `
                    <a href="info.html?title=${element.title}">
                        <h5 class="card-title"><span>${element.title}</span></h5>
                    </a>
                    <p style="word-wrap: break-word;">${element.passo}</p> <!-- Adicionando a propriedade CSS para quebra de linha -->
                    <hr>
                `;
                container.appendChild(itemDiv);
        }
    });
}


// Chama a função para processar o título da URL quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', processarTituloDaURL);
