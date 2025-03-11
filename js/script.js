document.addEventListener("DOMContentLoaded", () => {
    //carregando os elementos do DOM
    const selectEletroduto = document.getElementById("selectEletroduto");
    const listaFios = document.getElementById("listarFios");
    const adicionarFioBtn = document.getElementById("adicionarFio");
    const calcularBtn = document.getElementById("calcular");
    const resultadoDiv = document.getElementById("resultado");

    // preencher opções de eletrodutos
    eletrodutos.forEach(eletroduto => {
        let option = document.createElement("option");
        option.value = eletroduto.id;
        option.textContent = `${eletroduto.nome} (Área: ${eletroduto.area} mm²)`;
        selectEletroduto.appendChild(option);
    });

    // adicionando fios a lista
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

        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.appendChild(select);
        listItem.appendChild(inputQuantidade);
        listaFios.appendChild(listItem);
    });

    // calculo e validação
    calcularBtn.addEventListener("click", () => {
        let eletrodutoSelecionado = eletrodutos.find(e => e.id == selectEletroduto.value);
        if (!eletrodutoSelecionado) {
            resultadoDiv.textContent = "Selecione um eletroduto.";
            resultadoDiv.style.display = "block";
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

        let percentualOcupacao = (areaOcupada / eletrodutoSelecionado.area) * 100;
        resultadoDiv.textContent = `Área ocupada: ${areaOcupada} mm² (${percentualOcupacao.toFixed(2)}%)`;
        resultadoDiv.style.display = "block";

        let limitePermitido;
        if (totalCondutores === 1) {
            limitePermitido = 53;
        } else if (totalCondutores === 2) {
            limitePermitido = 31;
        } else {
            limitePermitido = 40;
        }

        if (percentualOcupacao > limitePermitido) {
            resultadoDiv.classList.add("alert-danger");
            resultadoDiv.classList.remove("alert-info");
            resultadoDiv.textContent += ` - Fora do limite permitido de ${limitePermitido}%. Escolha um eletroduto maior.`;
        } else {
            resultadoDiv.classList.add("alert-info");
            resultadoDiv.classList.remove("alert-danger");
        }
    });
});