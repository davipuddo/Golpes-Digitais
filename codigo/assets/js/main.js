
// Constantes
const logo = document.querySelector("#Logomarca");
const CardArea = document.querySelector("main div");
const Editor = document.querySelector("#Edit");
const About = document.querySelector("#About");
const Delete = document.querySelector("#Delete");
const search = document.querySelector("#Search");
const reports = document.querySelector("#denuncia");

var NQ = 0;
var CardsReady = false;

// Ir para homepage
logo.addEventListener("click", function(){
    window.location.href = changeURL('index.html');
})

// Ir para o editor de texto
Editor.addEventListener("click", function(){
    window.location.href = changeURL('index.html');
    });

// Ir para a pagina sobre
About.addEventListener("click", function(){
    window.location.href = changeURL('index.html');
})

// Ir para denuncias
reports.addEventListener('click', function(){
    window.location.href = changeURL('index.html');
})

// Mudar a url de forma mais ampla
function changeURL (html) {
    let url = window.location.href;
    url = url.split('codigo/');
    url = url[0] + 'codigo/' + html;
    return (url);
}

// Ler dados do json
var LocalJson = {};
function JSONData () {
    fetch('./assets/json/news.json')
        .then(res => checkError(res))
        .then(response => response.json())
        .then(response => JSON.stringify(response))
        .then(json => LocalJson = (json))
        .then(function (){
            var data = JSON.parse(LocalJson);
            var LJS = data.length;
            var db = [{}];    
            var start = 0;
            var w = 0;
            if (localStorage.getItem('db'))
            {
                db = JSON.parse(localStorage.getItem('db'));
            }
            for (let i = start; i < LJS; i++)
            {
                db[i] = data[w];
                w++;
            }
            localStorage.setItem('db', JSON.stringify(db));
        });
}

// Verificar existencia dos dados do arquivo news.json
function checkError (response)
{
  if (!response.ok)
    {
      alert('Erro na leitura do FAQ.json\nStatus: ' + response.status);
      console.error(response.status);
      response = undefined;
    }
    return (response);
}

JSONData();

// Criar Cards baseados no DB
function Cards()
{
    CardsReady = true;
    var data = JSON.parse(localStorage.getItem('db'));
    var TN = data.length;
    for (let i = 0; i < TN; i++)
    {
        CardArea.innerHTML += `<div class="card">
                                <div class="text">
                                   <h3 class="card-title">${data[i].title}</h3>
                                   <p class="card-description">${data[i].description}</p>
                                </div>
                                   <button id="${i}" class="GoToDoc">Visitar</button>
                               </div>`
    }
}

// Deletar Cards
Delete.addEventListener("click", function(){
    localStorage.removeItem('db');
    JSONData();
    location.reload();
})

// Carregar cards
 if (localStorage.getItem('db'))
{
    Cards();  
}

if (CardsReady)
{
    // Selecionar noticia
    const Docs = document.querySelectorAll('.GoToDoc');
    for (let i = 0; i < Docs.length; i++)
    {
            Docs[i].addEventListener("click", function(){
                
                // Criar link para a pagina
                let link = changeURL('document.html');
                let url = new URL(link);
                url.searchParams.append('N', i);
                window.location.href = url.toString();
            })
    }

    // Pesquisar
    document.addEventListener('DOMContentLoaded', function () {
        const searchInput = document.getElementById('searchInput');
    
        searchInput.addEventListener('input', function () {
          const searchTerm = this.value.toLowerCase();
    
          const Cards = document.querySelectorAll('.card');
    
          Cards.forEach(function (card) {
            const titulo = card.querySelector('h3:first-of-type').textContent.toLowerCase();
    
            if (titulo.includes(searchTerm)) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
        });
    });
}

// Media Queries
function MediaQueries ()
{
    let flag = `<i class="fa-solid fa-flag" aria-hidden="true"></i>`
    let reportText = '';
    if (matchMedia("(max-width:510px)").matches)
    {
        reportText = flag;
    }
    else
    {
        reportText = flag + 'Denúncias';
    }

    if (reports.innerHTML !== reportText)
    {
        reports.innerHTML = reportText;
    }
}

MediaQueries();
setInterval(MediaQueries, 100); // Procurar por mudancas a cada 0.1 segundos
