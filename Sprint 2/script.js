document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('items-container');
            if (!container) {
                console.error('Elemento com ID "items-container" não encontrado.');
                return;
            }
            // Salvar o array atualizado no localStorage
            localStorage.setItem('info', JSON.stringify(data));
            // Renderiza os itens iniciais
            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                itemDiv.dataset.name = item.name.toLowerCase(); // Normaliza o nome aqui

                itemDiv.innerHTML = `
                    <a href="info.html?title=${item.title}">
                        <h5 class="card-title"><span>${item.title}</span></h5>
                    </a>
                    <p>${item.description}</p>
                    <hr>
                `;
                container.appendChild(itemDiv);
            });

            // Função de filtro
            const searchForm = document.getElementById('search-form');
            const searchInput = document.getElementById('search-input');

            if (searchForm && searchInput) {
                searchForm.addEventListener('submit', function(event) {
                    event.preventDefault(); // Evita o envio padrão do formulário
                    filterItems();
                });

                // Adiciona evento de entrada para filtrar em tempo real
                searchInput.addEventListener('input', filterItems);
            } else {
                console.error('Elemento "search-form" ou "search-input" não encontrado.');
            }
        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
});

function filterItems() {
    var searchQuery = document.getElementById('search-input').value.toLowerCase();
    var items = document.querySelectorAll('.item');

    items.forEach(function(item) {
        var itemName = item.getAttribute('data-name').toLowerCase();
        if (itemName.includes(searchQuery)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}
