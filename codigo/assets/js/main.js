
const logo = document.querySelector("#Logomarca");
const CardArea = document.querySelector("main div");
var NQ = 0;

logo.addEventListener("click", function(){
    window.location.href = "index.html";
})

function Cards()
{
    var data = JSON.parse(localStorage.getItem('db'));
    var TN = data.length
    console.log(TN);
    
    CardArea.innerHTML = `<div class="card" style="width: 22rem; height: 12rem">
                              <h3 class="card-title">${data[0].title}</h3>
                              <a href="#" class="btn btn-primary"><button>Visitar</button></a>
                          </div>`

    for (let i = 1; i < TN; i++)
    {
        CardArea.innerHTML += `<div class="card" style="width: 22rem; height: 12rem">
                                   <h3 class="card-title">${data[i].title}</h3>
                                   <a href="#" class="btn btn-primary"><button>Visitar</button></a>
                               </div>`
    }
}