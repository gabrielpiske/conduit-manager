document.addEventListener("DOMContentLoaded", () => {
    const selectEletroduto = document.getElementById("selectEletroduto");
    const listaFios = document.getElementById("listarFios");
    const adicionarFioBtn = document.getElementById("adicionarFio");
    const calcularBtn = document.getElementById("calcular");
    const resultadoDiv = document.getElementById("resultado");

    const eletrodutos = [
        { id: 1, nome: "Canaflex 20mm", area: 186 },
        { id: 2, nome: "Canaflex 25mm", area: 337 },
        { id: 3, nome: "PVC Rígido 32mm", area: 530 },
        { id: 4, nome: "PVC Rígido 40mm", area: 883 },
        { id: 5, nome: "PVC Rígido 50mm", area: 1397 }
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
        option.value = eletroduto.id;
        option.textContent = `${eletroduto.nome} (Área: ${eletroduto.area} mm²)`;
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

        let eletrodutoSelecionado = eletrodutos.find(e => e.id == selectEletroduto.value);
        if (!eletrodutoSelecionado) {
            mostrarResultado("Selecione um eletroduto.", "danger");
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
        let percentualOcupacao = (areaOcupada / eletrodutoSelecionado.area) * 100;

        if (percentualOcupacao > limitePermitido) {
            let eletrodutoRecomendado = eletrodutos.find(e => (areaOcupada / e.area) * 100 <= limitePermitido);
            let mensagem = eletrodutoRecomendado
                ? `Fora do limite. Recomenda-se: ${eletrodutoRecomendado.nome} (Área: ${eletrodutoRecomendado.area} mm²)`
                : "Fora do limite. Não há eletroduto adequado disponível.";
            mostrarResultado(mensagem, "danger");
        } else {
            mostrarResultado("Dentro do limite permitido.", "info");
            gerarRelatorio(eletrodutoSelecionado, areaOcupada, percentualOcupacao, limitePermitido);
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
                <p><strong>Professor Orientador - Engenheiro Eletrecista: </strong>Anderson Luis Wilvert</p>
            </div>
        </div>`;
    }
});
