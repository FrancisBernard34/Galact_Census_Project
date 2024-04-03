async function buscarPlanetas() {
  try {
    const response = await fetch("https://swapi.dev/api/planets/");
    const data = await response.json();
    const planetasDiv = document.getElementById("planetas");
    data.results.forEach((planeta) => {
      const botao = document.createElement("button");
      botao.textContent = planeta.name;
      botao.addEventListener("click", () => {
        exibirInformacoesPlaneta(planeta);
      });
      planetasDiv.appendChild(botao);
    });
  } catch (error) {
    console.error("Erro ao buscar planetas:", error);
  }
}

async function exibirInformacoesPlaneta(planeta) {
  const infoPlanetaDiv = document.getElementById("infoPlaneta");
  infoPlanetaDiv.innerHTML = `
        <h2>${planeta.name}</h2>
        <p>Clima: ${planeta.climate}</p>
        <p>População: ${planeta.population}</p>
        <p>Tipo de Terreno: ${planeta.terrain}</p>
        <h3>Habitantes Mais Famosos:</h3>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Data de Nascimento</th>
                </tr>
            </thead>
            <tbody id="habitantesTabela"></tbody>
        </table>
    `;

  const habitantesTabela = document.getElementById("habitantesTabela");
  for (const residentUrl of planeta.residents) {
    try {
      const response = await fetch(residentUrl);
      const habitante = await response.json();
      const linha = document.createElement("tr");
      linha.innerHTML = `
                <td>${habitante.name}</td>
                <td>${habitante.birth_year}</td>
            `;
      habitantesTabela.appendChild(linha);
    } catch (error) {
      console.error("Erro ao buscar habitante:", error);
    }
  }
}

async function buscarPlanetaPorNome() {
  const nomePlaneta = document.getElementById("buscaPlaneta").value;
  if (nomePlaneta === "") {
    document.getElementById("infoPlaneta").innerHTML =
      "Digite o nome de um planeta.";
    return;
  }
  try {
    const response = await fetch(
      `https://swapi.dev/api/planets/?search=${nomePlaneta}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      const planeta = data.results[0];
      exibirInformacoesPlaneta(planeta);
    } else {
      document.getElementById("infoPlaneta").innerHTML =
        "Planeta não encontrado.";
    }
  } catch (error) {
    console.error("Erro ao buscar planeta:", error);
  }
}

buscarPlanetas();
