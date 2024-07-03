
// Constantes
const logo = document.querySelector("#Logomarca");
const CardArea = document.querySelector("main div");
const Editor = document.querySelector("#Edit");
const About = document.querySelector("#About");
const Delete = document.querySelector("#Delete");
const search = document.getElementById('searchInput');
const reports = document.querySelector("#denuncia");
const scroll = document.querySelector('button#scroll');
const openSearch = document.querySelector('button#openSearch');

var NQ = 0;
var CardsReady = false;

// Ir para homepage
logo.addEventListener("click", function(){
   window.location.href = changeURL('index.html');
})

// Ir para o editor de texto
Editor.addEventListener("click", function(){
    window.location.href = changeURL('TextEditor.html');
    });

// Ir para a pagina sobre
About.addEventListener("click", function(){
    window.location.href = changeURL('About.html');
})

// Ir para denuncias
reports.addEventListener('click', function(){
    window.location.href = changeURL('Report.html');
})

// Botao para ir para o topo da pagina
scroll.addEventListener('click', function () {

    window.scrollTo(0, 0);
})

// Mudar a url de forma mais ampla
function changeURL (html) {
    let url = window.location.href;
    url = url.split('.html');
    url = url[0].split('/');
    url[url.length-1] = html;
    url = url.join('/');
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
                                 <div class="btn">
                                   <button id="${i}" class="GoToDoc" title="Visitar notícia">Visitar</button>
                                 </div>
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
else
{
    setTimeout(function() {
        if (localStorage.getItem('db'))
        {
            Cards();  
        }
        else
        {
            console.error("Dados do LocalStorage nao carregados!");
        }
    }, 1000);
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
    
        searchInput.addEventListener('input', function () {
          const searchTerm = this.value.toLowerCase();
    
          const Cards = document.querySelectorAll('.card');
    
          Cards.forEach(function (card) {
            const titulo = card.querySelector('h3:first-of-type').textContent.toLowerCase();
    
            if (titulo.includes(searchTerm)) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        });
    });
}

var toggleSearch = false;
openSearch.addEventListener('click', function(){
    if (toggleSearch)
    {
        search.style.display = 'none';
    }
    else
    {
        search.style.display = 'block';
        search.style.position = 'fixed';
        search.style.transform = 'translate(-297px, 10px)'
        search.style.zIndex = '2';
    }
    toggleSearch = !toggleSearch;
})

// Media Queries
function MediaQueries ()
{
    let info = `<i class="fa-solid fa-circle-info" aria-hidden="true"></i>`;
    let flag = `<i class="fa-solid fa-flag" aria-hidden="true"></i>`;
    let reportText = '';
    let aboutText = '';
    if (matchMedia("(max-width:575px)").matches)
    {
        aboutText = info;
        reportText = flag;
    }
    else
    {
        aboutText = info + 'Sobre';
        reportText = flag + 'Denúncias';
    }

    if (reports.innerHTML !== reportText)
    {
        reports.innerHTML = reportText;
    }

    if (About.innerHTML !== aboutText)
    {
        About.innerHTML = aboutText;
    }
}

MediaQueries();
setInterval(MediaQueries, 100); // Procurar por mudancas a cada 0.1 segundos
