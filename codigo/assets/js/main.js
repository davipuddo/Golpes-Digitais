
    const text = document.querySelector("#markdownText");
    const preview = document.querySelector("#preview");
    const upload = document.querySelector("#upload");

    text.addEventListener("input", function(){   

        // Conversao para Markdown
        const markdown = marked.parse(text.value);

        // Mostrar resultado
        preview.innerHTML = DOMPurify.sanitize(markdown,
            {USE_PROFILES: {html: true}});
    });

    upload.addEventListener("click", function(){

    })