
const logo = document.querySelector("#Logomarca");
const CardArea = document.querySelector("main div");
const Editor = document.querySelector("#Edit");
const About = document.querySelector("#About");
var NQ = 0;

// Ir para homepage
logo.addEventListener("click", function(){
    window.location.href = "index.html";
})

//
Editor.addEventListener("click", function(){
    window.location.href = "TextEditor.html";
    });

About.addEventListener("click", function(){
    window.location.href = "About.html";
})

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

document.querySelector("#Delete").addEventListener("click", function(){
    localStorage.removeItem('db');
    location.reload();
})