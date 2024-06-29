document.addEventListener('DOMContentLoaded', function() {
  mostrarComentarios();
  
  var commentForm = document.getElementById('commentForm');
  commentForm.addEventListener('submit', function(event) {
      event.preventDefault();
      salvarComentario();
  });
});

function salvarComentario() {
  var nome = document.getElementById('name').value;
  var comentario = document.getElementById('comment').value;

  if (nome.trim() !== '' && comentario.trim() !== '') {
      var novoComentario = {
          nome: nome,
          comentario: comentario,
          data: new Date().toLocaleString()
      };

      // Tenta recuperar os comentários do localStorage
      var comentarios = [];
      var comentariosStr = localStorage.getItem('comentarios');

      if (comentariosStr) {
          try {
              comentarios = JSON.parse(comentariosStr);
          } catch (error) {
              console.error('Erro ao fazer parse dos comentários:', error);
          }
      }

   
      comentarios.push(novoComentario);

      // Salva a lista atualizada no localStorage
      localStorage.setItem('comentarios', JSON.stringify(comentarios));

      
      document.getElementById('name').value = '';
      document.getElementById('comment').value = '';

     
      mostrarComentarios();

      
      mostrarMensagem('Comentário enviado');

      setTimeout(function() {
          limparMensagem();
      }, 3000);
  } else {
      alert('Por favor, preencha seu nome e seu comentário antes de enviar.');
  }
}


function mostrarComentarios() {
  var comentariosStr = localStorage.getItem('comentarios');
  var comentarios = [];

  // Verifica se há algum conteúdo válido no localStorage
  if (comentariosStr) {
      try {
          comentarios = JSON.parse(comentariosStr);
      } catch (error) {
          console.error('Erro ao fazer parse dos comentários:', error);
          comentarios = []; // Reinicializa a lista de comentários em caso de erro
      }
  }

  var comentariosLista = document.getElementById('comentariosLista');
  comentariosLista.innerHTML = '';

  if (comentarios.length > 0) {
      comentarios.forEach(function(comentario) {
          var li = document.createElement('li');
          li.innerHTML = '<strong>' + comentario.nome + '</strong> (' + comentario.data + '):<br>' + comentario.comentario;
          comentariosLista.appendChild(li);
      });
  } else {
      comentariosLista.innerHTML = '<li>Nenhum comentário ainda.</li>';
  }
}


function mostrarMensagem(mensagem) {
  var mensagemDiv = document.createElement('div');
  mensagemDiv.id = 'mensagem';
  mensagemDiv.textContent = mensagem;
  document.body.appendChild(mensagemDiv);
}

function limparMensagem() {
  var mensagemDiv = document.getElementById('mensagem');
  if (mensagemDiv) {
      mensagemDiv.remove();
  }
}

function limparComentarios() {
  localStorage.removeItem('comentarios');
  mostrarComentarios();
}
