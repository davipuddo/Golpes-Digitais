
// Constantes
const logo = document.querySelector("#Logomarca");
const money = document.querySelector("#money");
const Edit = document.querySelector("#EditPie");
const back = document.querySelector('button#back');
const databox = document.querySelector('#data section');

// Botao home
logo.addEventListener("click", function(){
    window.location.href = "index.html";
})

// Botao home
back.addEventListener("click", function(){
  window.location.href = "index.html";
})


// Dados iniciais do grafico
var ValuesPercentage = ["Falso Pagamento", "Invasão de contas", "Anúncio falso", "Outros"];
var ValuesNames = [54 ,22, 21, 3];

// Ler local storage
if (localStorage.getItem("percentages"))
{
  ValuesPercentage = JSON.parse(localStorage.getItem("percentages"));
}
else
{
  SetPercentageOriginal();
}

if (localStorage.getItem("names"))
{
  ValuesNames = JSON.parse(localStorage.getItem('names'));
}
else
{
  SetNameOriginal();
}

// Editar grafico
Edit.addEventListener("click", function(){
  
  // Editar porcentagens
  let tmp = prompt("Forneca o valor de quatro porcentangens separados por espaco: ");
  if (tmp === '')
  {
    SetPercentageOriginal();
  }
  else
  {
    tmp = tmp.split(' ');
    for (let i = 0; i < 4; i++)
    {
      ValuesPercentage[i] = parseInt(tmp[i]);
    }
  }
  localStorage.setItem("percentages", JSON.stringify(ValuesPercentage));

  // Editar nomes
  tmp = prompt("Forneca quatro nomes separados por espaco: ");
  if (tmp === '')
    {
      SetNameOriginal();
    }
    else
    {
      tmp = tmp.split(' ');
      for (let i = 0; i < 4; i++)
      {
        ValuesNames[i] = tmp[i];
      }
    }
    localStorage.setItem("names", JSON.stringify(ValuesNames));

  UpdateGraph();
})

// Funcoes para dados originais
function SetPercentageOriginal(){
    ValuesPercentage[0] = 54;
    ValuesPercentage[1] = 22;
    ValuesPercentage[2] = 21;
    ValuesPercentage[3] = 3;
}

function SetNameOriginal(){
    ValuesNames[0] = "Falso Pagamento";
    ValuesNames[1] = "Invasão de contas";
    ValuesNames[2] = "Anúncio falso";
    ValuesNames[3] = "Outros";
}

// Dados do grafico
var Tsize = 26;

// Dados do grafico
var Colors = ["#FF6445","#45FF77","#45FFF5","#62807E" ];
var data = {
      type: "pie",
      labels: "Grafico",
      data: {
        labels: ValuesNames,
        datasets: [{
          borderWidth: 2,
          borderColor: "#222",
          backgroundColor: Colors,
          data: ValuesPercentage,
        }],
      },
      options: {
          title: {
              display: true,
              text: "Tipos mais comuns de golpes",
              fontSize: Tsize,
              fontColor: "#333",
          },
          legend: {
            position: "right",
            labels: {
              boxWidth: 40,
              padding: 16,
              usePointStyle: true,
              fontSize : (Tsize-6),
              fontStyle: "bold",
              fontColor: "#333",
            }
          }
      }
    };

// Constante do grafico
const MyChart = new Chart("piechart", data);

// Atualizar grafico
function UpdateGraph (){
  MyChart.update();
}

// Controlar responsividade do grafico          
var ix = 0;
function MediaQueries(){

  
  let tmp = ix;
  if (window.matchMedia("(max-width:350px)").matches)
  {
    MyChart.options.title.fontSize = 18;
    MyChart.options.legend.labels.fontSize = 12;
    MyChart.options.legend.labels.boxWidth = 6;
    MyChart.options.legend.labels.padding = 8;
    ix = 3;
  }
  else if (window.matchMedia("(max-width:420px)").matches)
  {
    // Media querie do grafico
    MyChart.options.title.fontSize = 18;
    MyChart.options.legend.labels.fontSize = 12;
    MyChart.options.legend.labels.boxWidth = 10;
    MyChart.options.legend.labels.padding = 10;
    ix = 2;
  }
  else if (window.matchMedia("(max-width:500px)").matches)
  {
    MyChart.options.title.fontSize = 20;
    MyChart.options.legend.labels.fontSize = 16;
    MyChart.options.legend.labels.boxWidth = 20;
    MyChart.options.legend.labels.padding = 12  ;
    ix = 1;
  }
  else
  {
    MyChart.options.title.fontSize = 26;
    MyChart.options.legend.labels.fontSize = 20;
    MyChart.options.legend.labels.boxWidth = 40;
    MyChart.options.legend.labels.padding = 16;
    ix = 0;

    databox.style.height = '310px';
  }
  if (ix != tmp)
  {
    UpdateGraph();
  }

  // Outras media queries
  if (window.matchMedia("(max-width:420px)").matches)
  {

  }
}

setInterval (MediaQueries, 100);    // Procurar mudancas na resolucao a cada 0.1 segundos

// Apresentar numero de reais perdidos
var target = 22.9;
let x = 0;
var interval = setInterval(function(){
  if (x < target && x < 22)
  {x += 1}
  if (x >= 22 && x < target)
  { x += 0.3}
  if (x > target)
  {x = target}
  if (x == target)
  {
      clearInterval(interval)
  };
  money.innerHTML = x + " Bilhões de reais";
}, 40);
    
var faqOBJ = {};

// Ler dados do arquivo FAQ.json
fetch("./assets/json/FAQ.json")
  .then(res => checkError(res))
  .then(res => res.json())
  .then(res => faqOBJ = res)
  .then(ReadFAQ);

// Verificar existencia dos dados do arquivo FAQ.json
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

// Adicionar a funcionalidade aos botoes
function FAQButons (){
  
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(faqItem => {
        const faqQuestion = faqItem.querySelector('.faq-question');
        const faqToggle = faqQuestion.querySelector('.faq-toggle');
  
        faqQuestion.addEventListener('click', () => {
          faqItem.classList.toggle('active');
      });
  });
}

// Criar perguntas e respostas baseados no objeto de dados (faqOBJ)
function ReadFAQ () {

  const FAQbox = document.querySelector('.container');
  if (faqOBJ.length >= 0)
  {
    for (let i = 0; i < faqOBJ.length; i++)
    {
      let faq = faqOBJ[i];
      FAQbox.innerHTML +=  `<div class="faq-item">
                              <div class="faq-question">
                                  <h2>${faq.question}</h2>
                                  <span class="faq-toggle"><i class="fa-solid fa-chevron-down"></i></span>
                              </div>
                              <div class="faq-answer">
                                <p>${faq.answer}</p>
                              </div>
                            </div>
                            <hr style="height: 3px; background-color: blue; border-radius: 20px;">`
    }
  }
  FAQButons();  // Definir botoes novos
}
