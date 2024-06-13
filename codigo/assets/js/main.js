
// Constantes
const logo = document.querySelector("#Logomarca");
const CardArea = document.querySelector("main div");
const Editor = document.querySelector("#Edit");
const About = document.querySelector("#About");
const Delete = document.querySelector("#Delete");
const search = document.querySelector("#Search");

var NQ = 0;
var CardsReady = false;

// Ir para homepage
logo.addEventListener("click", function(){
    window.location.href = "index.html";
})

// Ir para o editor de texto
Editor.addEventListener("click", function(){
    window.location.href = "TextEditor.html";
    });

// Ir para a pagina sobre
About.addEventListener("click", function(){
    window.location.href = "About.html";
})

// Criar Cards baseados no DB
function Cards()
{
    CardsReady = true;
    var data = JSON.parse(localStorage.getItem('db'));
    var TN = data.length
    for (let i = 0; i < TN; i++)
    {
        CardArea.innerHTML += `<div class="card">
                                <div class="text">
                                   <h3 class="card-title">${data[i].title}</h3>
                                   <p class="card-subtitle">${data[i].subtitle}</p>
                                </div>
                                   <button id="${i}" class="GoToDoc">Visitar</button>
                               </div>`
    }
}

// Deletar Cards
Delete.addEventListener("click", function(){
    localStorage.removeItem('db');
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
                let link = window.location.origin + '/codigo/document.html';
                let url = new URL(link);
                url.searchParams.append('n', i);
                let modifiedUrl = url.toString();
                window.location.href = modifiedUrl
                delete(url);
            })
    }

    // Pesquisar
    document.addEventListener('DOMContentLoaded', function () {
        const searchInput = document.getElementById('searchInput');
    
        searchInput.addEventListener('input', function () {
          const searchTerm = this.value.toLowerCase();
    
          const animalCards = document.querySelectorAll('.card');
    
          animalCards.forEach(function (card) {
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