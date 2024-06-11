
            // Constantes
            const logo = document.querySelector("#Logomarca");
            const money = document.querySelector("#money");

            // Home button
            logo.addEventListener("click", function(){
              window.location.href = "index.html";
          })

            // Dados do grafico
            var Tsize = 26;

            // Controlar responsividade do grafico          
            // NOTA : Usar F5 para atualizar o grafico apos alteracao da resolucao da pagina
            if (window.matchMedia("(max-width:500px").matches)
            {
              Tsize = 18;
            }

            // Dados do grafico
            var ValuesNames = ["Falso Pagamento", "Invasão de contas", "Anúncio falso", "Outros"];
            var ValuesPercentage = [54, 22, 21, 3];
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
                        usePointStyle: true,
                        fontSize : (Tsize-6),
                        fontStyle: "bold",
                        fontColor: "#333",
                      }
                    }
                }
              };
          // Criar grafico
          new Chart("piechart", data);

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