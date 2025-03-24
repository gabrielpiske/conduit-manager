document.addEventListener("DOMContentLoaded", () => {
    const selectEletroduto = document.getElementById("selectEletroduto");
    const listaFios = document.getElementById("listarFios");
    const adicionarFioBtn = document.getElementById("adicionarFio");
    const calcularBtn = document.getElementById("calcular");
    const resultadoDiv = document.getElementById("resultado");

    const eletrodutos = [
        { tipo: "Kanaflex", tamanhos: [{ nome: "Kanaflex 20mm", area: 186 }, { nome: "Kanaflex 25mm", area: 337 }] },
        { tipo: "Corrugado", tamanhos: [{ nome: "Corrugado 20mm", area: 200 }, { nome: "Corrugado 32mm", area: 500 }] },
        { tipo: "Corrugado Reforçado", tamanhos: [{ nome: "Corrugado Reforçado 25mm", area: 300 }, { nome: "Corrugado Reforçado 40mm", area: 800 }] },
        { tipo: "PVC Rígido", tamanhos: [{ nome: "PVC Rígido 32mm", area: 530 }, { nome: "PVC Rígido 50mm", area: 1397 }] }
    ];

    const fios = [
        { id: 1, nome: "Cabo 1,5mm²", area: 17 },
        { id: 2, nome: "Cabo 2,5mm²", area: 21 },
        { id: 3, nome: "Cabo 4mm²", area: 30 },
        { id: 4, nome: "Cabo 6mm²", area: 38 },
        { id: 5, nome: "Cabo 10mm²", area: 61 }
    ];

    eletrodutos.forEach(eletroduto => {
        let option = document.createElement("option");
        option.value = eletroduto.tipo;
        option.textContent = eletroduto.tipo;
        selectEletroduto.appendChild(option);
    });

    adicionarFioBtn.addEventListener("click", () => {
        let select = document.createElement("select");
        select.classList.add("form-select", "mb-2");

        fios.forEach(fio => {
            let option = document.createElement("option");
            option.value = fio.id;
            option.textContent = `${fio.nome} (Área: ${fio.area} mm²)`;
            select.appendChild(option);
        });

        let inputQuantidade = document.createElement("input");
        inputQuantidade.type = "number";
        inputQuantidade.min = "1";
        inputQuantidade.value = "1";
        inputQuantidade.classList.add("form-control", "mb-2");

        let removerBtn = document.createElement("button");
        removerBtn.textContent = "Remover";
        removerBtn.classList.add("btn", "btn-danger", "mb-2");
        removerBtn.addEventListener("click", () => listItem.remove());

        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.appendChild(select);
        listItem.appendChild(inputQuantidade);
        listItem.appendChild(removerBtn);
        listaFios.appendChild(listItem);
    });

    calcularBtn.addEventListener("click", () => {
        resultadoDiv.innerHTML = "";
        resultadoDiv.classList.remove("alert-danger", "alert-info");

        let tipoEletrodutoSelecionado = selectEletroduto.value;
        if (!tipoEletrodutoSelecionado) {
            mostrarResultado("Selecione um tipo de eletroduto.", "danger");
            return;
        }

        let areaOcupada = 0;
        let totalCondutores = 0;

        listaFios.querySelectorAll("li").forEach(item => {
            let fioSelecionado = fios.find(f => f.id == item.querySelector("select").value);
            let quantidade = parseInt(item.querySelector("input").value);
            if (fioSelecionado && quantidade > 0) {
                areaOcupada += fioSelecionado.area * quantidade;
                totalCondutores += quantidade;
            }
        });

        if (areaOcupada === 0) {
            mostrarResultado("Adicione pelo menos um fio válido.", "danger");
            return;
        }

        let limitePermitido = calcularLimiteABNT(totalCondutores);
        let eletrodutoSelecionado = eletrodutos.find(e => e.tipo === tipoEletrodutoSelecionado);

        let eletrodutoAdequado = eletrodutoSelecionado.tamanhos.find(e => (areaOcupada / e.area) * 100 <= limitePermitido);

        if (eletrodutoAdequado) {
            mostrarResultado(`Use: ${eletrodutoAdequado.nome} (Área: ${eletrodutoAdequado.area} mm²)`, "info");
            gerarRelatorio(eletrodutoAdequado, areaOcupada, (areaOcupada / eletrodutoAdequado.area) * 100, limitePermitido);
        } else {
            let eletrodutoRecomendado = eletrodutos.flatMap(e => e.tamanhos).find(e => (areaOcupada / e.area) * 100 <= limitePermitido);
            mostrarResultado(eletrodutoRecomendado ? `Nenhum adequado no tipo escolhido. Sugestão: ${eletrodutoRecomendado.nome}` : "Nenhum eletroduto disponível é adequado.", "danger");
        }
    });

    function calcularLimiteABNT(totalCondutores) {
        if (totalCondutores === 1) return 53;
        if (totalCondutores === 2) return 31;
        return 40;
    }

    function mostrarResultado(mensagem, tipo) {
        resultadoDiv.textContent = mensagem;
        resultadoDiv.classList.add(`alert-${tipo}`);
        resultadoDiv.style.display = "block";
    }

    function gerarRelatorio(eletroduto, areaOcupada, percentual, limite) {
        resultadoDiv.innerHTML += `
        <div class="card mt-4">
            <div class="card-body">
                <h4 class="card-title">Relatório</h4>
                <p><strong>Eletroduto:</strong> ${eletroduto.nome}</p>
                <p><strong>Área Total:</strong> ${eletroduto.area} mm²</p>
                <p><strong>Área Ocupada:</strong> ${areaOcupada} mm²</p>
                <p><strong>Percentual de Ocupação:</strong> ${percentual.toFixed(2)}%</p>
                <p><strong>Limite Permitido:</strong> ${limite}%</p>
                <p><strong>Status:</strong> ${percentual > limite ? "❌ Fora do limite" : "✅ Dentro do limite"}</p>
                <hr>
                <p><strong>Projetista - Técnico em Desenvolvimento de Sistemas: </strong>Gabriel Schweder Piske</p>
                <p><strong>Professor Orientador - Engenheiro Eletricista: </strong>Anderson Luis Wilvert</p>
            </div>
        </div>`;
    }
});
