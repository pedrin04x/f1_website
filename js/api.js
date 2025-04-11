// Funções para buscar dados da API
async function carregarClassificacaoPilotos(ano = 2025) {
    try {
        const resposta = await fetch(`https://f1api.dev/api/${ano}/drivers-championship`);
        const dados = await resposta.json();
        return dados.drivers_championship;
    } catch (erro) {
        console.error("Erro ao carregar classificação de pilotos:", erro);
        return [];
    }
}

async function carregarClassificacaoEquipes(ano = 2025) {
    try {
        const resposta = await fetch(`https://f1api.dev/api/${ano}/constructors-championship`);
        const dados = await resposta.json();
        return dados.constructors_championship;
    } catch (erro) {
        console.error("Erro ao carregar classificação de equipes:", erro);
        return [];
    }
}

async function carregarProximaCorrida() {
    try {
        const resposta = await fetch(`https://f1api.dev/api/next-race`);
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error("Erro ao carregar próxima corrida:", erro);
        return null;
    }
}

async function carregarUltimaCorrida() {
    try {
        const resposta = await fetch(`https://f1api.dev/api/last-race`);
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error("Erro ao carregar última corrida:", erro);
        return null;
    }
}

async function carregarCircuitos(ano = 2025) {
    try {
        const resposta = await fetch(`https://f1api.dev/api/${ano}/circuits`);
        const dados = await resposta.json();
        return dados.circuits;
    } catch (erro) {
        console.error("Erro ao carregar circuitos:", erro);
        return [];
    }
}