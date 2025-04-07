import { eletrodutos, fios } from './dados.js';

document.addEventListener("DOMContentLoaded", () => {
    const selectEletroduto = document.getElementById("selectEletroduto");
    const adicionarLinhaBtn = document.getElementById("adicionarLinha");
    const calcularBtn = document.getElementById("calcular");
    const resultadoDiv = document.getElementById("resultado");
    const linhasAdicionais = document.getElementById("linhas-adicionais");
    
    let contadorLinhas = 1; // Começa com 1 porque já temos a primeira linha

    // Carrega eletrodutos
    eletrodutos.forEach(eletroduto => {
        let option = document.createElement("option");
        option.value = eletroduto.tipo;
        option.textContent = eletroduto.tipo;
        selectEletroduto.appendChild(option);
    });

    // Função para criar uma nova linha
    function criarNovaLinha() {
        if (contadorLinhas >= 4) {
            mostrarResultado("Você pode adicionar no máximo 4 linhas.", "danger");
            return;
        }
        
        contadorLinhas++;
        const novaLinha = document.createElement("div");
        novaLinha.className = "fios-linha";
        novaLinha.innerHTML = `
            <div class="fio-opcao">
                <input type="radio" name="linha${contadorLinhas}" class="fio-radio" data-tipo="PVC">
                <select class="fio-tamanho" disabled>
                    <option value="">Selecione</option>
                </select>
                <input type="number" class="fio-quantidade" min="1" value="1" disabled>
            </div>
            <div class="fio-opcao">
                <input type="radio" name="linha${contadorLinhas}" class="fio-radio" data-tipo="EPR/XLPE 1KV UNIFILAR">
                <select class="fio-tamanho" disabled>
                    <option value="">Selecione</option>
                </select>
                <input type="number" class="fio-quantidade" min="1" value="1" disabled>
            </div>
            <div class="fio-opcao">
                <input type="radio" name="linha${contadorLinhas}" class="fio-radio" data-tipo="EPR/XLPE 1KV MULTIFILAR 2 VIAS">
                <select class="fio-tamanho" disabled>
                    <option value="">Selecione</option>
                </select>
                <input type="number" class="fio-quantidade" min="1" value="1" disabled>
            </div>
            <div class="fio-opcao">
                <input type="radio" name="linha${contadorLinhas}" class="fio-radio" data-tipo="EPR/XLPE 1KV MULTIFILAR 3 VIAS">
                <select class="fio-tamanho" disabled>
                    <option value="">Selecione</option>
                </select>
                <input type="number" class="fio-quantidade" min="1" value="1" disabled>
            </div>
            <div class="fio-opcao">
                <input type="radio" name="linha${contadorLinhas}" class="fio-radio" data-tipo="EPR/XLPE 1KV MULTIFILAR 4 VIAS">
                <select class="fio-tamanho" disabled>
                    <option value="">Selecione</option>
                </select>
                <input type="number" class="fio-quantidade" min="1" value="1" disabled>
            </div>
        `;
        
        linhasAdicionais.appendChild(novaLinha);
        
        // Configura os eventos para os novos radios
        novaLinha.querySelectorAll('.fio-radio').forEach(radio => {
            radio.addEventListener('change', function() {
                const tipoFio = this.dataset.tipo;
                const fioData = fios.find(f => f.tipo === tipoFio);
                const tamanhoSelect = this.parentElement.querySelector('.fio-tamanho');
                const quantidadeInput = this.parentElement.querySelector('.fio-quantidade');
                
                tamanhoSelect.disabled = !this.checked;
                quantidadeInput.disabled = !this.checked;
                
                if (this.checked && fioData) {
                    tamanhoSelect.innerHTML = '<option value="">Selecione</option>';
                    fioData.tamanhos.forEach(tamanho => {
                        let option = document.createElement("option");
                        option.value = tamanho.area;
                        option.textContent = tamanho.nome;
                        tamanhoSelect.appendChild(option);
                    });
                }
            });
        });
    }

    // Configura o botão para adicionar linhas
    adicionarLinhaBtn.addEventListener("click", criarNovaLinha);

    // Configura os eventos para a primeira linha
    document.querySelectorAll('.fio-radio').forEach(radio => {
        radio.addEventListener('change', function() {
            const tipoFio = this.dataset.tipo;
            const fioData = fios.find(f => f.tipo === tipoFio);
            const tamanhoSelect = this.parentElement.querySelector('.fio-tamanho');
            const quantidadeInput = this.parentElement.querySelector('.fio-quantidade');
            
            tamanhoSelect.disabled = !this.checked;
            quantidadeInput.disabled = !this.checked;
            
            if (this.checked && fioData) {
                tamanhoSelect.innerHTML = '<option value="">Selecione</option>';
                fioData.tamanhos.forEach(tamanho => {
                    let option = document.createElement("option");
                    option.value = tamanho.area;
                    option.textContent = tamanho.nome;
                    tamanhoSelect.appendChild(option);
                });
            }
        });
    });

    calcularBtn.addEventListener("click", () => {
        resultadoDiv.innerHTML = "";
        resultadoDiv.classList.remove("alert-danger", "alert-info");

        // Verifica se um eletroduto foi selecionado
        let tipoEletrodutoSelecionado = selectEletroduto.value;
        if (!tipoEletrodutoSelecionado) {
            mostrarResultado("Selecione um tipo de eletroduto.", "danger");
            return;
        }

        // Obtém todos os fios selecionados nas linhas
        const fiosSelecionados = [];
        
        document.querySelectorAll('.fios-linha').forEach(linha => {
            const radioSelecionado = linha.querySelector('.fio-radio:checked');
            if (!radioSelecionado) return;
            
            const tipoFio = radioSelecionado.dataset.tipo;
            const tamanhoSelect = radioSelecionado.parentElement.querySelector('.fio-tamanho');
            const quantidadeInput = radioSelecionado.parentElement.querySelector('.fio-quantidade');
            
            if (tamanhoSelect.value === "") return;
            
            const fioData = fios.find(f => f.tipo === tipoFio);
            if (!fioData) return;
            
            const tamanhoData = fioData.tamanhos.find(t => t.area.toString() === tamanhoSelect.value);
            if (!tamanhoData) return;
            
            const quantidade = parseInt(quantidadeInput.value) || 1;
            
            fiosSelecionados.push({
                tipo: tipoFio,
                nome: tamanhoData.nome,
                area: tamanhoData.area,
                quantidade: quantidade
            });
        });

        if (fiosSelecionados.length === 0) {
            mostrarResultado("Selecione pelo menos um fio válido.", "danger");
            return;
        }

        // Calcula a área ocupada e total de condutores
        let areaOcupada = 0;
        let totalCondutores = 0;

        fiosSelecionados.forEach(fio => {
            areaOcupada += parseFloat(fio.area) * fio.quantidade;
            totalCondutores += fio.quantidade;
        });

        // Calcula o limite permitido conforme ABNT
        let limitePermitido = calcularLimiteABNT(totalCondutores);
        let eletrodutoSelecionado = eletrodutos.find(e => e.tipo === tipoEletrodutoSelecionado);

        // Encontra o eletroduto adequado
        let eletrodutoAdequado = eletrodutoSelecionado.tamanhos.find(e => (areaOcupada / e.area) * 100 <= limitePermitido);

        if (eletrodutoAdequado) {
            const percentualOcupacao = (areaOcupada / eletrodutoAdequado.area) * 100;
            mostrarResultado(`Use: ${eletrodutoAdequado.nome} (Área: ${eletrodutoAdequado.area} mm²)`, "info");
            gerarRelatorio(fiosSelecionados, eletrodutoAdequado, areaOcupada, percentualOcupacao, limitePermitido);
        } else {
            // Procura em todos os eletrodutos por um adequado
            let todosEletrodutos = eletrodutos.flatMap(e => e.tamanhos.map(t => ({
                tipo: e.tipo,
                nome: t.nome,
                area: t.area
            })));
            
            let eletrodutoRecomendado = todosEletrodutos.find(e => (areaOcupada / e.area) * 100 <= limitePermitido);
            
            if (eletrodutoRecomendado) {
                const percentualOcupacao = (areaOcupada / eletrodutoRecomendado.area) * 100;
                mostrarResultado(`Nenhum adequado no tipo escolhido. Sugestão: ${eletrodutoRecomendado.tipo} ${eletrodutoRecomendado.nome} (Área: ${eletrodutoRecomendado.area} mm²)`, "danger");
                gerarRelatorio(fiosSelecionados, eletrodutoRecomendado, areaOcupada, percentualOcupacao, limitePermitido);
            } else {
                mostrarResultado("Nenhum eletroduto disponível é adequado para a quantidade de fios selecionados.", "danger");
            }
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

    function gerarRelatorio(fiosSelecionados, eletroduto, areaOcupada, percentual, limite) {
        // Lista de fios selecionados
        let listaFiosHTML = '<div class="fios-selecionados"><h3>Fios Selecionados:</h3><ul>';
        
        fiosSelecionados.forEach(fio => {
            listaFiosHTML += `<li>${fio.tipo} (${fio.nome}) - Quantidade: ${fio.quantidade}</li>`;
        });
        listaFiosHTML += '</ul></div>';
        
        // Relatório de ocupação
        resultadoDiv.innerHTML = `
            ${listaFiosHTML}
            <div class="relatorio-card">
                <h2>📊 Relatório de Ocupação</h2>
                <p><span class="label">Eletroduto:</span> ${eletroduto.tipo ? eletroduto.tipo + ' ' : ''}${eletroduto.nome}</p>
                <p><span class="label">Área Total:</span> ${eletroduto.area} mm²</p>
                <p><span class="label">Área Ocupada:</span> ${areaOcupada.toFixed(2)} mm²</p>
                <p><span class="label">Percentual de Ocupação:</span> <strong>${percentual.toFixed(2)}%</strong></p>
                <p><span class="label">Limite Permitido:</span> ${limite}%</p>
                <p><span class="label">Total de Condutores:</span> ${fiosSelecionados.reduce((total, fio) => total + fio.quantidade, 0)}</p>
            </div>`;
    }
});