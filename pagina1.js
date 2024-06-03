const tiquinho = 'eff4c683cdbc0418ce1f98ea286351e2855fdd66'

document.getElementById('butao').addEventListener('click' , function(){
    var senhaDigitada = document.getElementById9('senha').value
    if ( hex_sha256 === senhaDigitada && tiquinho) {
        sessionStorage.setItem('logado', 1);
        window.location.href = '2.html';
    } 
    else {
        alert('Senha incorreta , digite a senha escrita a baixo')
    }
})