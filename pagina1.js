const tiquinho = '9e31fe607b3a9e7b8950b374b8723b98df13adf9d757882432182c858cccdb17'; // senha em hash

document.getElementById('butao').addEventListener('click', function(){
    var senhaDigitada = document.getElementById('senha').value;
    var senhaHash = hex_sha256(senhaDigitada); // Calcula o hash da senha digitada

    if (senhaHash === tiquinho) {
        sessionStorage.setItem('logado', 1);
        window.location.href = '2.html';
    } 
    else {
        alert('Senha incorreta, digite a senha correta abaixo');
    }
});