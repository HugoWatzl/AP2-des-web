if (sessionStorage.getItem('logado')){
    let lista_jogadores;

    const pega_json = async(caminho) => {
        const resposta = await fetch(caminho);
        const dados = await resposta.json();
        return dados;
    }

    const carregarDados = async (url) => {
        container.innerHTML = `
        <div style = 'display: flex; flex-direction: column; justify-content: center; align-itens: center; margin: 0 auto;'>
            <img src = 'assets/imagens/loading.gif'/>
            <h3>Carregando dados, por favor aguarde...</h3>
        </div>
        `;
        const data = await pega_json(url);
        lista_jogadores = data;
        
        container.innerHTML = '';

        lista_jogadores.forEach((jogador) => {
            constroiCard(jogador);
        });
    }

    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.flexWrap = 'wrap';
    container.style.gap = '2em';
    container.style.justifyContent = 'center';
    container.style.maxWidth = '1200px';
    container.style.margin = '0 auto';
    container.id = 'myContainer';

    document.body.appendChild(container);

    const escudo = document.createElement('img');
    escudo.src = 'assets/imagens/escudo.png';

    const title = document.createElement('h1');
    title.innerHTML = 'Elenco botafogo 2024';
    title.style.color = 'white';
    title.style.textAlign = 'center';
    title.style.fontFamily = 'sans-serif';
    title.style.textTransform = 'uppercase';
    title.style.margin = '0';
    title.style.padding = '0';

    const divEscudo = document.createElement('div');
    divEscudo.style.display = 'flex';
    divEscudo.style.width = '5rem';
    divEscudo.style.height = '5rem';

    divEscudo.appendChild(escudo);

    const btn_feminino = document.createElement('button');
    btn_feminino.innerHTML = 'Elenco Feminino';
    btn_feminino.onclick = () => {
        container.innerHTML = '';
        carregarDados('https://botafogo-atletas.mange.li/2024-1/feminino');
    }

    const btn_masculino = document.createElement('button');
    btn_masculino.innerHTML = 'Elenco Masculino';
    btn_masculino.onclick = () => {
        container.innerHTML = '';
        carregarDados('https://botafogo-atletas.mange.li/2024-1/masculino');
    }

    const btn_all = document.createElement('button');
    btn_all.innerHTML = 'Elenco Completo';
    btn_all.onclick = () => {
        container.innerHTML = '';
        carregarDados('https://botafogo-atletas.mange.li/2024-1/all');
    }

    const btn_sair = document.createElement('button');
    btn_sair.id = 'btn_sair';
    btn_sair.innerHTML = 'Sair';
    btn_sair.onclick = () => {
        sessionStorage.removeItem('logado');
        window.location.href = 'index.html';
    }

    const divPesquisa = document.createElement('div');
    divPesquisa.style.textAlign = 'center';
    divPesquisa.style.marginTop = '15px';
    divPesquisa.style.padding = '1rem';

    const inputPesquisa = document.createElement('input');
    inputPesquisa.id = 'inputPesquisa';
    inputPesquisa.placeholder = 'Pesquise o nome do jogador';
    inputPesquisa.type = 'text';
    divPesquisa.appendChild(inputPesquisa);

    inputPesquisa.onkeyup = (event) => {
        const valor = event.target.value;
        const resultado = lista_jogadores.filter(
            (elemento) => elemento.nome.toLowerCase().includes(valor.toLowerCase())
        )
        container.innerHTML= '';
    
        resultado.forEach(
            (jogador) => {
                constroiCard(jogador)
            }
        )
    }

    const header = document.createElement('div');
    header.append(divEscudo);
    header.append(title);
    header.append(btn_sair);
    header.style.display = 'flex';
    header.style.flexWrap = 'wrap';
    header.style.backgroundColor = 'black';
    header.style.justifyContent = 'center';
    header.style.alignItems = 'center';
    header.style.padding = '1rem';
    header.style.margin = '0';
    header.style.height = 'fit-content';
    header.style.marginBottom = '5px';

    const botoes = document.createElement('div');
    botoes.id = 'btns';
    botoes.style.height = '4rem';
    botoes.style.justifyContent = 'center';
    botoes.style.marginBottom = '5px';
    botoes.style.gap = '1rem';
    botoes.appendChild(btn_masculino);
    botoes.appendChild(btn_feminino);
    botoes.appendChild(btn_all);

    const select = document.createElement('select')
    select.id = 'select';
    select.style.height = '4rem';
    select.style.justifyContent = 'center';
    select.style.marginBottom = '5px';
    select.innerHTML = `
    <select>
        <option disabled selected>Escolha o elenco</option>
        <option value='Feminino'>Elenco Feminino</option>
        <option value='Masculino'>Elenco Masculino</option>
        <option value='All'>Elenco Completo</option>
    </select>
    `;
    select.onchange = (e) => {
        const valor = e.target.value;
        if (valor === 'Feminino'){
            container.innerHTML = '';
            carregarDados('https://botafogo-atletas.mange.li/2024-1/feminino');
        } else if (valor === 'Masculino'){
            container.innerHTML = '';
            carregarDados('https://botafogo-atletas.mange.li/2024-1/masculino');
        } else if (valor === 'All'){
            container.innerHTML = '';
            carregarDados('https://botafogo-atletas.mange.li/2024-1/all');
        }
    }

    document.body.appendChild(header);
    document.body.appendChild(botoes);
    document.body.appendChild(select);
    document.body.appendChild(divPesquisa);
    document.body.appendChild(container);

    const handleClick = (e) => {
        const card = e.target.closest('article')
        const dados = card.dataset;

        for (const p in dados){
            document.cookie = `${p}=${dados[p]}`;
        }

        localStorage.setItem('atleta', JSON.stringify(dados));
        window.location.href = `individual.html?id=${dados.id}`;
    }

    const constroiCard = ( atleta ) => {
        const divCard = document.createElement('article');
        //divCard.className = 'card';
        // radial-gradient(circle, rgba(255,255,255,1) 29%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)
        divCard.style.background = 'black';
        divCard.style.display = 'grid';
        divCard.style.width = '220px';
        divCard.style.padding = '.5rem';
        divCard.style.border = '2px solid rgba(0,0,0,0.8)';
        divCard.style.borderRadius = '10px';
        divCard.style.boxShadow = '12px 25px 25px 0px rgba(0,0,0,0.8)';
        divCard.style.gridTemplateRows = "20rem 1rem 5rem";
        divCard.style.gridTemplateAreas = "'a1' 'a2' 'a3'";

        divCard.dataset.id = atleta.id;
        divCard.dataset.descricao = atleta.descricao;
        divCard.dataset.nome = atleta.nome;
        divCard.dataset.nomeCompleto = atleta.nome_completo;
        divCard.dataset.posicao = atleta.posicao;
        divCard.dataset.imagem = atleta.imagem;
        divCard.dataset.elenco = atleta.elenco;
        divCard.dataset.nascimento = atleta.nascimento;
        divCard.dataset.altura = atleta.altura;

        divCard.onclick = handleClick;

        const imagem = document.createElement('img');
        imagem.style.gridArea = 'a1';
        imagem.style.display = 'flex';
        imagem.style.height = '20rem';
        imagem.style.width = '100%';
        imagem.style.objectFit = 'cover';
        imagem.style.objectPosition = 'top';
        imagem.src = atleta.imagem;
        imagem.alt = atleta.nome;

        const titulo = document.createElement('section');
        titulo.style.gridArea = "a2 a3";
        titulo.style.display = 'flex';
        titulo.style.flexDirection = 'column';
        titulo.style.alignItems = 'center';
        titulo.style.justifyContent = 'center';

        const pPosicao = document.createElement('p');
        pPosicao.style.fontFamily = '"Bebas Neue", sans-serif';
        pPosicao.style.fontWeight = '400';
        pPosicao.style.fontSize = '1.3rem';
        pPosicao.style.textTransform = 'uppercase';
        pPosicao.style.color = 'white';
        pPosicao.style.backgroundColor = 'black';
        pPosicao.style.width = '100%';
        pPosicao.style.textAlign = 'center';
        pPosicao.innerHTML = atleta.posicao;

        titulo.appendChild(pPosicao);

        const btn_detalhe = document.createElement('button');
        btn_detalhe.id = 'btn_detalhe';
        btn_detalhe.style.gridArea = 'a3';
        btn_detalhe.innerHTML = 'SAIBA MAIS';

        divCard.appendChild(imagem);
        divCard.appendChild(titulo);
        divCard.appendChild(btn_detalhe)

        container.appendChild(divCard);
    }
}else {
    const h1 = document.createElement('h1');
    h1.textContent = 'Acesso negado, faça login para acessar essa página';
    document.body.innerHTML = '';
    document.body.appendChild(h1);
}

document.getElementById('bnt_SaibaMais').addEventListener('click', function() {
    window.location.href = 'individual.html';
});


btn_more