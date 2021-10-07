// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

// Cria uma instancia de um objeto bd (banco de dados) para armazenar o banco aberto nele
let db;

window.onload = function () {
  // Abre nosso banco, é criado se não existir
  let request = window.indexedDB.open('notes_db', 1);

  // Quando ocorreu um erro ao abrir o banco de dados
  request.onerror = function () {
    console.log('Houve falha ao abrir o banco de dados');
  }

  // Quando o banco abre com sucesso
  request.onsuccess = function () {
    console.log('Banco de dados abriu com sucesso');
    // Armazena o objeto do banco aberto na variavel db. Será bastante usado abaixo.
    db = request.result;
    // Roda a função displayData() para mostrar as notas do banco
    displayData();
  }

  // Configura as tabelas do banco se já não estiver configurado.
  request.onupgradeneeded = function (e) {
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

}