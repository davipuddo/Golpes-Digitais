
document.addEventListener("DOMContentLoaded", function() {
    
    if (!localStorage.getItem('faqs')) {
        const faqs = [
            {
                id: 1,
                question: "O que é phishing e como posso reconhecê-lo?",
                answer: "O phishing é uma forma de fraude online em que os criminosos tentam obter informações pessoais, como senhas e números de cartão de crédito, fingindo ser entidades confiáveis em e-mails ou mensagens."
            },
            {
                id: 2,
                question: "Como posso proteger minhas senhas e dados online?",
                answer: "Use senhas fortes e únicas. Use um gerenciador de senhas. Mantenha seus dispositivos atualizados. Evite Wi-Fi público não seguro."
            },
            {
                id: 3,
                question: "É seguro clicar em links ou baixar anexos de e-mails de remetentes desconhecidos?",
                answer: "Não é uma boa ideia clicar em links ou baixar anexos de e-mails de pessoas que você não conhece. Pode ser arriscado e você poderia acabar com vírus no seu computador ou sendo enganado por golpes online. É melhor sempre ser cauteloso e só clicar em links de fontes confiáveis."
            },
            {
                id: 4,
                question: "O que devo fazer se eu suspeitar que fui vítima de um golpe online?",
                answer: "Se você suspeitar que foi vítima de um golpe, entre em contato imediatamente com seu banco ou instituição financeira, altere suas senhas, monitore suas contas para atividades suspeitas e considere informar a polícia ou um órgão de proteção ao consumidor."
            },
            {
                id: 5,
                question: "Como posso identificar um site seguro para compras online?",
                answer: "Verifique se o site tem um endereço que começa com \"https://\" e procure por um ícone de cadeado na barra de endereço. Além disso, leia avaliações de outros clientes e evite sites com ofertas que parecem boas demais para serem verdade."
            }
        ];
        localStorage.setItem('perguntas', JSON.stringify(perguntas));
    }

    
    const faqs = JSON.parse(localStorage.getItem('faqs'));
    const accordion = document.getElementById('accordionExample');

    faqs.forEach(faq => {
        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');

        const header = document.createElement('h2');
        header.classList.add('accordion-header');
        header.id = `heading${faq.id}`;

        const button = document.createElement('button');
        button.classList.add('accordion-button', 'collapsed');
        button.type = 'button';
        button.dataset.bsToggle = 'collapse';
        button.dataset.bsTarget = `#collapse${faq.id}`;
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', `collapse${faq.id}`);

        const question = document.createElement('ul');
        const listItem = document.createElement('li');
        listItem.textContent = faq.question;
        question.appendChild(listItem);
        button.appendChild(question);
        header.appendChild(button);

        const collapse = document.createElement('div');
        collapse.id = `collapse${faq.id}`;
        collapse.classList.add('accordion-collapse', 'collapse');
        collapse.setAttribute('aria-labelledby', `heading${faq.id}`);
        collapse.dataset.bsParent = '#accordionExample';

        const body = document.createElement('div');
        body.classList.add('accordion-body');
        body.textContent = faq.answer;
        collapse.appendChild(body);

        accordionItem.appendChild(header);
        accordionItem.appendChild(collapse);

        accordion.appendChild(accordionItem);
    });

    // Implementar a funcionalidade de pesquisa
    document.getElementById('searchInput').addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const items = accordion.querySelectorAll('.accordion-item');
        items.forEach(item => {
            const question = item.querySelector('li').textContent.toLowerCase();
            if (question.includes(query)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
