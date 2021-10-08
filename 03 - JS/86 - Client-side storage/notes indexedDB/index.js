// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

// Cria uma instancia de um objeto bd (banco de dados) para armazenar o banco aberto nele
let db;

window.onload = function() {
  // Abre nosso banco, é criado se não existir
  let request = window.indexedDB.open('notes_db', 1);

  // Quando ocorreu um erro ao abrir o banco de dados
  request.onerror = function() {
    console.log('Houve falha ao abrir o banco de dados');
  }
  // Quando o banco abre com sucesso
  request.onsuccess = function() {
    console.log('Banco de dados abriu com sucesso');
    // Armazena o objeto do banco aberto na variavel db. Será bastante usado abaixo.
    db = request.result;
    // Roda a função displayData() para mostrar as notas do banco
    displayData();
  }

  // Configura as tabelas do banco se já não estiver configurado.
  request.onupgradeneeded = function(e) {
    // Pega uma referencia do banco aberto
    let db = e.target.result;

    // Cria um "armazenamento de objetos" para armazenar nossas notas dentro (basicamente como se fosse uma tabela)
    // Incluindo uma chave auto incrementável
    let objectStore = db.createObjectStore('notes_os', { keyPath: 'id', autoIncrement: true });
    
    // Define quais itens de dados o 'objectStore' vai conter.
    objectStore.createIndex('title', 'title', { unique: false });
    objectStore.createIndex('body', 'body', { unique: false });

    console.log('Configuração do banco de dados concluida');

  }

  // Cria o manipulador "onsubmit" para que quando o form for submetido execulta a funcao
  // addData()
  form.onsubmit = addData;


  // Cria a função addData()
  function addData(e) {
    // Cancela o submit padrão, não atualizando a pagina
    e.preventDefault();

    // Pega os valores inseridos nos campos de formulário e armazena no objeto pronto para ser
    // inserido no banco de dados
    let newItem = {
      title: titleInput.value,
      body: bodyInput.value
    }

    // Abre uma transação ler/escrever no banco, pronto para incluir dados.
    let transaction = db.transaction(['notes_os'], 'readwrite');

    // Faz uma requisição para adicionar o objeto 'newItem' ao 'objectStore'
    let objectStore = transaction.objectStore('notes_os');
    let request = objectStore.add(newItem);
    request.onsuccess = function() {
      // Limpa o form, para adicionar o proximo item.
      titleInput.value = '';
      bodyInput.value = '';
    };

    // Informa quando a transação occorer com sucesso, uma mensagem no log.
    transaction.oncomplete = function() {
      console.log('Transação completa: modificação no banco de dados feita.');

      // Atualiza a visualização dos dados para mostrar o novo item adicionado na lista.
      displayData();
    }

    transaction.onerror = function() {
      console.log('Houve um erro na transação.');
    }
  }


  function displayData() {
    // Aqui nos esvaziamos o conteudo do elemento da lista cada vez que ela é exibida
    // Se não fizermos isso, ela vai duplicar a lista cada vez que uma nova nota é adicionada
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    // Abra nosso 'objectStore' e obtenha o cursor, que itera por todos os diferentes
    // itens de dados do 'objectStore'
    let objectStore = db.transaction('notes_os').objectStore('notes_os');
    objectStore.openCursor().onsuccess = function(e) {
      // Pegue a referencia do cursor
      let cursor = e.target.result;

      // Se ainda houver outro item de dados para iterar, continue executando este código 
      if(cursor) {
        // Crie um li, h3 e p para colocar cada item de dados dentro 
        // ao exibi-lo estruturar o fragmento HTML e anexá-lo dentro da lista 
        const listItem = document.createElement('li');
        const h3 = document.createElement('h3');
        const para = document.createElement('p');

        listItem.appendChild(h3);
        listItem.appendChild(para);
        list.appendChild(listItem);

        // Coloque o dado do cursor para dentro do h3 e do paragrafo
        h3.textContent = cursor.value.title;
        para.textContent = cursor.value.body;

        // Armazene o ID do item de dados dentro de um atributo no listItem, para sabermos
        // a qual item ele corresponde Isso será útil mais tarde, quando quisermos excluir itens 
        listItem.setAttribute('data-note-id', cursor.value.id);

        // Crie um botão e coloque-o dentro de cada listItem
        const deleteBtn = document.createElement('button');
        listItem.appendChild(deleteBtn);
        deleteBtn.textContent = 'Deletar';

        // Defina um manipulador de eventos para que, quando o botão for clicado
        // a função deleteItem () seja executada 
        deleteBtn.onclick = deleteItem;

        // Itere para o próximo item no cursor
        cursor.continue();
      } else {
        // Novamente, se o item da lista estiver vazio, exibir uma mensagem 'Nenhuma nota armazenada'
        if(!list.firstChild) {
          const listItem = document.createElement('li');
          listItem.textContent = 'Nenhuma nota armazenada'
          list.appendChild(listItem);
        }
        // se não houver mais itens de cursor para iterar, diga isso
        console.log('Todas as notas estão sendo exibidas');
      }
    };
  }

  function deleteItem(e) {
    // recupere o nome da tarefa que deseja excluir. Nós precisamos 
    // para convertê-lo em um número antes de tentar usá-lo com o IDB; 
    // Os valores da Chave do IDB são sensíveis ao tipo.
    let noteId = Number(e.target.parentNode.getAttribute('data-note-id'));

    // abra uma transação de banco de dados e exclua a tarefa, encontrando-a usando o id que recuperamos acima
    let transaction = db.transaction(['notes_os'], 'readwrite');
    let objectStore = transaction.objectStore('notes_os');
    let request = objectStore.delete(noteId);

    // relatar que o item de dados foi excluído
    transaction.oncomplete = function() {
      // deletar o parent do botão
      // que é o item da lista, por isso não é mais exibido
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      console.log('Note ' + noteId + ' deleted.');

      // Novamente, se o item da lista estiver vazio, exibir uma mensagem 'Nenhuma nota armazenada'
      if(!list.firstChild) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No notes stored.';
        list.appendChild(listItem);
      }
    };
  }

}