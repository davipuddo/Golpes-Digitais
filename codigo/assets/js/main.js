
const logo = document.querySelector("#Logomarca");
const CardArea = document.querySelector("main div");
const Editor = document.querySelector("#Edit");
const About = document.querySelector("#About");
const Delete = document.querySelector("#Delete");
var NQ = 0;

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
    var data = JSON.parse(localStorage.getItem('db'));
    var TN = data.length
    for (let i = 0; i < TN; i++)
    {
        CardArea.innerHTML += `<div class="card" style="width: 28rem; height: 18rem">
                                <div class="text">
                                   <h3 class="card-title">${data[i].title}</h3>
                                   <p class="card-subtitle">${data[i].subtitle}</p>
                                </div>
                                   <button id="${i}">Visitar</button>
                               </div>`
    }
}

// Deletar Cards
Delete.addEventListener("click", function(){
    localStorage.removeItem('db');
    location.reload();
})

// Carregar cards
document.addEventListener("DOMContentLoaded", function(){
    if (localStorage.getItem('db'))
        {
            Cards();
        }
})