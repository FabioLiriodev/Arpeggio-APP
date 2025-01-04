let contadorDeUso = 0;

// Função que será chamada ao clicar no botão "Buscar"
function realizarBusca() {
    // Obtendo os valores dos campos
    const nome = document.getElementById("busca-input").value.trim();
    const regiao = document.querySelector('input[name="regiao"]:checked');
    const tipo = document.querySelector('input[name="tipo"]:checked');
    // Verifica se algum rádio foi selecionado

    // Validando se os campos obrigatórios estão preenchidos
    if (!nome || !regiao || !tipo) {
        alert("Por favor, preencha todos os campos obrigatórios antes de buscar.");
        return; // Interrompe a execução se algum campo estiver vazio
    }

    contadorDeUso++;

    const contadorElement = document.getElementById("contador-uso");
    
    if (contadorElement && regiao.value == 'BR') {
        contadorElement.textContent = `O Arpeggio já foi usado ${contadorDeUso} vezes desde o seu lançamento!`;
    } else {
        contadorElement.textContent = `Arpeggio has been used ${contadorDeUso} times since its launch!`;
    }

    // Se todos os campos estiverem preenchidos, esconder a seção de "emptystate"
    const emptyState = document.querySelector(".ferramenta__emptystate");
    const resultadoSection = document.querySelector(".ferramenta__resultado");
    const contadorSection = document.querySelector(".ferramenta__contador-titulo");
    if (emptyState) {
        emptyState.classList.add("hidden"); // Esconde a seção de estado vazio
    }

    if (resultadoSection) {
        resultadoSection.classList.remove("hidden"); // Exibe a seção de resultados
    }

    if (contadorSection) {
        contadorSection.classList.remove("hidden"); // Exibe a seção de contador
    }
    
}

async function callRequest() {
const url = `https://arpeggio-api-374326808505.southamerica-east1.run.app/v1/`;
var buscaInput = document.getElementById('busca-input');
var artistaNome = buscaInput.value;

const pais = document.querySelector('input[name=regiao]:checked').value;
const audio = document.querySelector('input[name=tipo]:checked').value;

const urlMusica =  `${url}artista?nome=${artistaNome}&regiao=${pais}&tipo=ALBUM%2CSINGLE`;
const urlPodcast = `${url}podcast?nome=${artistaNome}&regiao=${pais}`;

let urlFinal;

if (audio === "musica") {
    urlFinal =  `${url}artista?nome=${artistaNome}&regiao=${pais}&tipo=ALBUM%2CSINGLE`;
} else {
    urlFinal = `${url}podcast?nome=${artistaNome}&regiao=${pais}`;
}

try {
    const url = `https://arpeggio-api-374326808505.southamerica-east1.run.app/v1/`;
    const urlMusica =  `${url}artista?nome=${artistaNome}&regiao=${pais}&tipo=ALBUM%2CSINGLE`;
    const urlPodcast = `${url}podcast?nome=${artistaNome}&regiao=${pais}`;



    // Realizando a chamada à API
    const response = await fetch(urlFinal);
    if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }

    // Convertendo resposta para JSON
    const data = await response.json();

    // Exibindo os resultados
    exibirResultados(data);
} catch (error) {
    console.error("Erro durante a busca:", error.message);
    alert("Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.");
}

}

function exibirResultados(data) {
const resultadoSection = document.querySelector(".ferramenta__resultado");
resultadoSection.innerHTML = ""; // Limpa resultados anteriores

const { busca, resultados } = data;

// Criando título com o nome da busca
const titulo = document.createElement("h2");
titulo.textContent = `Resultados para "${busca}"`;
resultadoSection.appendChild(titulo);

// Iterando sobre os resultados
resultados.forEach((item) => {
    const { streaming, artista, albuns, erro } = item;

    // Criando um bloco para cada serviço de streaming
    const bloco = document.createElement("div");
    bloco.classList.add("resultado__item");

    // Adicionando ícone correspondente
    const icone = document.createElement("img");
    icone.src = getIconForStreaming(streaming); // Função para associar o ícone
    icone.alt = streaming;
    bloco.appendChild(icone);

    // Adicionando informações do resultado
    const info = document.createElement("p");
    if (erro) {
        info.textContent = `${erro}`;
    } else {
        info.textContent = `${albuns} álbuns encontrados`;
    }
    bloco.appendChild(info);

    // Adicionando o bloco à seção de resultados
    resultadoSection.appendChild(bloco);
});

const buscaInput = document.getElementById("busca-input");
buscaInput.value = ""

}

function getIconForStreaming(streaming) {
// Retorna o caminho para o ícone baseado no nome do streaming
switch (streaming) {
    case "Youtube Music":
        return "/assets/img/Ícone Youtube.svg";
    case "Spotify":
        return "./assets/img/Ícone Spotify.svg";
    case "Deezer":
        return "./assets/img/logo-deezer.png";
    case "Tidal":
        return "./assets/img/Ícone Tidal.svg";
    default:
        return "path/to/default-icon.png";
}
    
}

// Função chamada ao recarregar a página para garantir que o estado inicial esteja correto
window.onload = function() {
    // Esperar o carregamento do DOM completo
    const buscaInput = document.getElementById("busca-input");
    if (buscaInput) {
        buscaInput.value = ""; // Limpa o campo de busca
    }
    
    const emptyState = document.querySelector(".ferramenta__emptystate");
    const resultadoSection = document.querySelector(".ferramenta__resultado");
    const contadorSection = document.querySelector(".ferramenta__contador-titulo");
    // Garantir que a seção de "emptystate" apareça e as outras seções fiquem ocultas ao carregar a página
    if (emptyState) {
        emptyState.classList.remove("hidden"); // Exibe a seção de estado vazio
    }
    if (resultadoSection) {
        resultadoSection.classList.add("hidden"); // Oculta a seção de resultados
    }
    if (contadorSection) {
        contadorSection.classList.add("hidden"); // Oculta a seção de contador
    }
}



   
