const tiquinho = '572e1c7b3aeeab2d6c153e9c568c98f6'

document.getElementById('butao').addEventListener('click' , function(){
    var senhaDigitada = document.getElementById9('senha').value
    if (senhaDigitada === tiquinho) {
        sessionStorage.setItem('logado', 1);
        window.location.href = '2.html';
    } 
    else {
        alert('Senha incorreta , digite a senha escrita a baixo')
    }
})