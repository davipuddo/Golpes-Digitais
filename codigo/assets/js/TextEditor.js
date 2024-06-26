
        const profile = document.querySelector("#PIcon");
        const Jtext = $("#markdownText");
        const text = document.querySelector("#markdownText");
        const preview = document.querySelector("#preview");
        const logo = document.querySelector("#Logomarca");
        var   keyname;

        // Home button
        logo.addEventListener("click", function(){
            window.location.href = "index.html";
        })

        // Responsividade
        if (window.matchMedia("(max-width:800px)").matches)
        {
                if (!confirm("Resolucao nao recomendada, deseja continuar?."))
                {
                    window.location.href = "index.html";
                }
        }

        // Converter valores do textarea para markdown e mostra-los ao lado
        function UpdatePreview (){

            // Conversao para Markdown
            const markdown = marked.parse(text.value);

            // Mostrar resultado
            preview.innerHTML = DOMPurify.sanitize(markdown,
                {USE_PROFILES: {html: true}});
        };
        
        // Atualizar caixa de texto ao digitar
        text.addEventListener("input", UpdatePreview);

        // Descobrir a data
        function CurrentDate()
        {
            let date = new Date().toLocaleDateString();
            for (let i = 0; i < date.length; i++)
            {
                date = date.replace("/", "-");
            }
            return (date);
        }

        // Salvar texto no localStorage
        function SaveText ()
        {   
            var N = 0;
            var Docs = [];
            // Se o documento estiver em branco
            if (text.value == "")
            {
                alert("O documento nao pode ser salvo vazio. ");
            }
            else
            {   
                let Mtitle  = null;
                let Stitle = null;
                let textVal = text.value;

                // Definir o titulo
                if (document.querySelector("#preview h1") == null)
                {
                    Mtitle = "Untitled";
                }
                else
                {
                    Mtitle = document.querySelector("#preview h1").innerHTML;
                }

                // Definir o subtitulo
                if (document.querySelector("#preview h3") == null)
                {
                    Stitle = "No Subtitle";
                }
                else
                {
                    Stitle = document.querySelector("#preview h3").innerHTML;
                }

                // Copiar dados antigos
                if (JSON.parse(localStorage.getItem('db')))
                {
                    Docs = JSON.parse(localStorage.getItem('db'));
                    N = (Docs.length);
                }

                // Objeto com dados atuais
                obj = {
                    title: Mtitle,
                    description: Stitle,
                    date: CurrentDate(),
                    text: textVal,
                    N: N
                };

                // Guardar todos os dados no array
                Docs.push(obj);

                // Salvar dados
                localStorage.setItem("db", JSON.stringify(Docs));   
                alert("Documento salvo. ");
            }
            return(Docs.title);
        };

        function ShowText()
        {
            data = JSON.parse(localStorage.getItem("db")).text;
            text.value = data
        }
        
        // Botao de salvar
        document.querySelector("#save").addEventListener("click", function(){
            keyname = SaveText();
        });