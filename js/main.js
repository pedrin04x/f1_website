document.addEventListener('DOMContentLoaded', async function() {
    // Sistema de abas
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).class.classList.add('active');
        });
    });
    
    // Menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
    });
    
    // Carrega todos os dados
    await carregarDados();
});

async function carregarDados() {
    await atualizarClassificacaoPilotos();
    await atualizarClassificacaoEquipes();
    await atualizarProximaCorrida();
    await atualizarUltimaCorrida();
    await atualizarCircuitos();
}

async function atualizarClassificacaoPilotos() {
    const pilotos = await carregarClassificacaoPilotos();
    const tbody = document.querySelector("#tabela-pilotos tbody");
    tbody.innerHTML = "";

    pilotos.forEach(piloto => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${piloto.position}</td>
            <td>
                <a href="${piloto.driver.url}" target="_blank">
                    ${piloto.driver.name} ${piloto.driver.surname}
                </a>
            </td>
            <td>${piloto.driver.nationality}</td>
            <td>${piloto.team.teamName}</td>
            <td>${piloto.points}</td>
            <td>${piloto.wins}</td>
        `;
        tbody.appendChild(tr);
    });
}

async function atualizarClassificacaoEquipes() {
    const equipes = await carregarClassificacaoEquipes();
    const tbody = document.querySelector("#tabela-equipes tbody");
    tbody.innerHTML = "";

    equipes.forEach(equipe => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${equipe.position}</td>
            <td>${equipe.team.teamName}</td>
            <td>${equipe.points}</td>
            <td>${equipe.wins}</td>
        `;
        tbody.appendChild(tr);
    });
}

async function atualizarProximaCorrida() {
    const corrida = await carregarProximaCorrida();
    if (!corrida) return;

    const highlightCard = document.querySelector('.highlight-card:first-child');
    highlightCard.querySelector('img').src = corrida.circuit.image || 'images/gp-destaque.jpg';
    highlightCard.querySelector('h3').textContent = `Próximo GP: ${corrida.raceName}`;
    highlightCard.querySelector('p').textContent = 
        `${new Date(corrida.date).toLocaleDateString()} - ${corrida.circuit.circuitName}`;
}

async function atualizarUltimaCorrida() {
    const corrida = await carregarUltimaCorrida();
    if (!corrida) return;

    const container = document.getElementById('ultima-corrida');
    container.innerHTML = `
        <div class="race-header">
            <h3>${corrida.raceName}</h3>
            <p>${new Date(corrida.date).toLocaleDateString()} - ${corrida.circuit.circuitName}</p>
        </div>
        <table class="race-results-table">
            <thead>
                <tr>
                    <th>Pos</th>
                    <th>Piloto</th>
                    <th>Equipe</th>
                    <th>Pontos</th>
                </tr>
            </thead>
            <tbody>
                ${corrida.results.map(result => `
                    <tr>
                        <td>${result.position}</td>
                        <td>${result.driver.name} ${result.driver.surname}</td>
                        <td>${result.team.teamName}</td>
                        <td>${result.points}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

async function atualizarCircuitos() {
    const circuitos = await carregarCircuitos();
    const container = document.getElementById('circuitos-container');
    container.innerHTML = "";

    circuitos.forEach(circuito => {
        const card = document.createElement("div");
        card.className = "circuit-card";
        card.innerHTML = `
            <img src="${circuito.image || 'images/default-circuit.jpg'}" alt="${circuito.circuitName}">
            <div class="circuit-info">
                <h3>${circuito.circuitName}</h3>
                <p><strong>Local:</strong> ${circuito.location}, ${circuito.country}</p>
                <p><strong>Primeiro GP:</strong> ${circuito.firstGrandPrix}</p>
                <p><strong>Comprimento:</strong> ${circuito.length} km</p>
            </div>
        `;
        container.appendChild(card);
    });
}