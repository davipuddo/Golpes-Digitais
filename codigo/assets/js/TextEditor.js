
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
        
        // Caixa de texto
        text.addEventListener("input", function(){
            UpdatePreview ();
        });

        // Salvar como arquivo txt
        document.querySelector("#save").addEventListener("click", function(){
            if (text.value != "")
            {
                let textVal = text.value;
                let textArray = Jtext.val().split("\n");
                let arquivo = new Blob([ textVal ], { type: 'text/plain' });
                if (textArray[0] == "")
                {textArray[0] = "IDS - Document";}
                let fileName = textArray[0];
                var dLink = document.createElement("a");
                dLink.download = fileName;
                if (window.webkitURL != null) 
                {
                    // Chrome
                    dLink.href = window.webkitURL.createObjectURL(arquivo);
                } 
                else 
                {
                    // Firefox
                    dLink.href = window.URL.createObjectURL(arquivo);
                    dLink.onclick = dLink.remove();
                    dLink.style.display = "none";
                    document.body.appendChild(dLink);
                }
                dLink.click();
            }
            else
            {
                alert("O arquivo nao pode ser baixado vazio. ");
            }
        })  

        // Forma primitiva de navegacao entre o editor e pagina principal
        profile.addEventListener("click", function(){
            window.location.href = "index.html";
        });