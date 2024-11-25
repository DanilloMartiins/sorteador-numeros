function sortear() {
    let quantidade = parseInt(document.getElementById('quantidade').value);
    let de = parseInt(document.getElementById('de').value);
    let ate = parseInt(document.getElementById('ate').value);

    // Verificar se os campos estão preenchidos
    if (isNaN(quantidade) || isNaN(de) || isNaN(ate) || quantidade <= 0 || de <= 0 || ate <= 0) {
        let resultado = document.getElementById('resultado');
        resultado.innerHTML = `<label class="texto__paragrafo">Por favor, preencha todos os campos corretamente.</label>`;
        return;
    }

    // Verificar se "Do número" é maior que "Até o número"
    if (de > ate) {
        let resultado = document.getElementById('resultado');
        resultado.innerHTML = `<label class="texto__paragrafo">O campo "Do número" não pode ser maior que o campo "Até o número".</label>`;
        return;
    }

    // Verificar se os valores estão dentro do limite de 100
    if (de > 100 || ate > 100) {
        let resultado = document.getElementById('resultado');
        resultado.innerHTML = `<label class="texto__paragrafo">Os valores "De" e "Até" devem ser no máximo 100.</label>`;
        return;
    }

    let sorteados = [];
    
    for (let i = 0; i < quantidade; i++) {
        let tentativas = 0;
        let numero = obterNumeroAleatorio(de, ate);

        while (sorteados.includes(numero)) {
            numero = obterNumeroAleatorio(de, ate);
            tentativas++;
            
            if (tentativas > 100) {  // Limite de tentativas para evitar loop infinito
                alert('Não foi possível gerar um número não repetido dentro do intervalo fornecido.');
                return;
            }
        }

        sorteados.push(numero);
    }

    let resultado = document.getElementById('resultado');
    resultado.innerHTML = `<label class="texto__paragrafo">Números sorteados: ${sorteados.join(', ')}</label>`;

    // Habilitar botão "Reiniciar"
    let reiniciarBtn = document.getElementById('btn-reiniciar');
    reiniciarBtn.classList.remove('container__botao-desabilitado');
    reiniciarBtn.classList.add('container__botao');
    reiniciarBtn.disabled = false;
}

function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reiniciar() {
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';
    document.getElementById('resultado').innerHTML = '<label class="texto__paragrafo">Números sorteados: nenhum até agora</label>';
    let reiniciarBtn = document.getElementById('btn-reiniciar');
    reiniciarBtn.classList.remove('container__botao');
    reiniciarBtn.classList.add('container__botao-desabilitado');
    reiniciarBtn.disabled = true;
}
