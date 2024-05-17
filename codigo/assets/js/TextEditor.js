
        const profile = document.querySelector("#PIcon");
        const Jtext = $("#markdownText");
        const text = document.querySelector("#markdownText");
        const preview = document.querySelector("#preview");

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
            // Se o documento estiver em branco
            if (text.value == "")
            {
                alert("O documento nao pode ser salvo vazio. ");
            }
            else
            {
                let textVal = text.value;
                let textStr = Jtext.val().split("\n");
                let DocTitle = textStr[0];
                let Docs = {
                        title: DocTitle,
                        Date: CurrentDate(),
                        text: textVal
                    };
                localStorage.setItem(Docs.title, JSON.stringify(Docs));
                console.log(Docs);
                alert("Documento salvo");
            }
        };
        
        // Botao de salvar
        document.querySelector("#save").addEventListener("click", SaveText);

        // Botao de upload
        //document.querySelector("#upload").addEventListener("click", );
