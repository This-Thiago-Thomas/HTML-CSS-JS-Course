// cria as constantes
const rememberDiv = document.querySelector('.remember');
const forgetDiv = document.querySelector('.forget');
const form = document.querySelector('form');
const nameInput = document.querySelector('#entername');
const submitBtn = document.querySelector('#submitname');
const forgetBtn = document.querySelector('#forgetname');

const h1 = document.querySelector('h1');
const personalGreeting = document.querySelector('.personal-greeting');

// Não deixa o form fazer o submit quando o botão é pressionado
form.addEventListener('submit', function(e){
    e.preventDefault();
})

// roda a função quando o botão 'Say hello' é pressionado.
submitBtn.addEventListener('click', function(){
    // armazena o nome digitado no armazenamento web
    localStorage.setItem('name', nameInput.value);
    // roda nameDisplayCheck() para atualizar e mostrar a  
    // saudação personalizada.
    nameDisplayCheck();
})

// roda a função quando o botão 'Forget' é pressionado.
forgetBtn.addEventListener('click', function(){
    // remove o nome do armazenamento web
    localStorage.removeItem('name');
    // roda nameDisplayCheck() para atualizar e mostrar a  
    // saudação genérica
    nameDisplayCheck();
})

// defina a função nameDisplayCheck()
function nameDisplayCheck() {
    // verifica se existe o nome no armazenamento web
    if(localStorage.getItem('name')) {
        // se sim, mostra a mensagem personalizada
        let name = localStorage.getItem('name');
        h1.textContent = 'Welcome, ' +name;
        personalGreeting.textContent = 'Welcome to our website, ' + name + '! We hope you have fun while you are here.';
        // só deixa ativada a função de esquecer (forget)
        submitBtn.disabled = true;
        forgetBtn.disabled = false;
        //forgetDiv.style.display = 'block';
        //rememberDiv.style.display = 'none';
    } else {
        // se não, mostra uma mensagem genérica
        h1.textContent = 'Welcome to our website';
        personalGreeting.textContent = 'Welcome to our website. We hope you have fun while you are here.';
        // só deixa ativada a função de escolher o nome.
        submitBtn.disabled = false;
        forgetBtn.disabled = true;
        //forgetDiv.style.display = 'none';
        //rememberDiv.style.display = 'block';
    }
}

document.body.onload = nameDisplayCheck;