document.addEventListener("DOMContentLoaded", () => {
    // Elementos do DOM
    const selectEletroduto = document.getElementById("selectEletroduto");
    const listaFios = document.getElementById("listarFios");
    const adicionarFioBtn = document.getElementById("adicionarFio");
    const calcularBtn = document.getElementById("calcular");
    const resultadoDiv = document.getElementById("resultado");

    // NECESSARIO ATUALIZAR COM VALORES VALIDOS, NÃO ESTÃO TODOS CORRETOS/ATUALIZADOS
    const eletrodutos = [
        { id: 1, nome: "Canaflex 20mm", area: 186 },
        { id: 2, nome: "Canaflex 25mm", area: 337 },
        { id: 3, nome: "PVC Rígido 32mm", area: 530 }
        // falta coisa
    ];

    const fios = [
        { id: 1, nome: "Cabo 1,5mm²", area: 17 },
        { id: 2, nome: "Cabo 2,5mm²", area: 21 },
        { id: 3, nome: "Cabo 4mm²", area: 30 }
        //falta colocar dados validos 
    ];

    // Preencher opções de eletrodutos
    eletrodutos.forEach(eletroduto => {
        let option = document.createElement("option");
        option.value = eletroduto.id;
        option.textContent = `${eletroduto.nome} (Área: ${eletroduto.area} mm²)`;
        selectEletroduto.appendChild(option);
    });

    // Adicionar fios à lista
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

    // Cálculo e validação
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

        // Determinar o limite permitido
        let limitePermitido = calcularLimiteABNT(totalCondutores);

        let percentualOcupacao = (areaOcupada / eletrodutoSelecionado.area) * 100;

        if (percentualOcupacao > limitePermitido) {
            let eletrodutoRecomendado = eletrodutos.find(e => (areaOcupada / e.area) * 100 <= limitePermitido);
            let mensagem = eletrodutoRecomendado
                ? `Fora do limite permitido. Recomenda-se usar: ${eletrodutoRecomendado.nome} (Área: ${eletrodutoRecomendado.area} mm²)`
                : "Fora do limite permitido. Não há eletroduto adequado disponível.";

            mostrarResultado(mensagem, "danger");
        } else {
            mostrarResultado("Dentro do limite permitido.", "info");
            gerarRelatorio(eletrodutoSelecionado, areaOcupada, percentualOcupacao, limitePermitido);
        }
    });

    // calcular o limite
    function calcularLimiteABNT(totalCondutores) {
        if (totalCondutores === 1) return 53;
        if (totalCondutores === 2) return 31;
        return 40;
    }

    // exibir resultado
    function mostrarResultado(mensagem, tipo) {
        resultadoDiv.textContent = mensagem;
        resultadoDiv.classList.add(`alert-${tipo}`);
        resultadoDiv.style.display = "block";
    }

    // relatório
    function gerarRelatorio(eletroduto, areaOcupada, percentual, limite) {
        resultadoDiv.innerHTML += `
        <div class="card mt-4">
            <div class="card-body">
                <h4 class="card-title">Relatório Detalhado</h4>
                <p><strong>Eletroduto:</strong> ${eletroduto.nome}</p>
                <p><strong>Área Total do Eletroduto:</strong> ${eletroduto.area} mm²</p>
                <p><strong>Área Ocupada:</strong> ${areaOcupada} mm²</p>
                <p><strong>Percentual de Ocupação:</strong> ${percentual.toFixed(2)}%</p>
                <p><strong>Limite Permitido pela ABNT:</strong> ${limite}%</p>
                <p><strong>Status:</strong> ${percentual > limite ? "❌ Fora do limite" : "✅ Dentro do limite"}</p>
                <hr>
                <p><strong>Projetista - Técnico em Desenvolvimento de Sistemas: </strong>Gabriel Schweder Piske</p>
                <p><strong>Professor Orientador - Engenheiro Eletrecista: </strong>Anderson Luis Wilvert</p>
            </div>
        </div>`;
    }
});
