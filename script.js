import { eletrodutos, fios } from './dados.js';

document.addEventListener("DOMContentLoaded", () => {
    const selectEletroduto = document.getElementById("selectEletroduto");
    const linhasAdicionais = document.getElementById("linhas-adicionais");
    const adicionarLinhaBtn = document.getElementById("adicionarLinha");
    const calcularBtn = document.getElementById("calcular");
    const resultadoDiv = document.getElementById("resultado");

    // Preenche o select de eletrodutos
    eletrodutos.forEach(eletroduto => {
        let option = document.createElement("option");
        option.value = eletroduto.tipo;
        option.textContent = eletroduto.tipo;
        selectEletroduto.appendChild(option);
    });

    // Adiciona evento aos radios da primeira linha
    document.querySelectorAll('.fio-radio').forEach(radio => {
        radio.addEventListener('change', function() {
            const linha = this.closest('.fios-linha');
            const selectTamanho = linha.querySelector('.fio-tamanho');
            const inputQuantidade = linha.querySelector('.fio-quantidade');
            
            if (this.checked) {
                const tipoFio = this.getAttribute('data-tipo');
                preencherSelectTamanho(selectTamanho, tipoFio);
                selectTamanho.disabled = false;
                inputQuantidade.disabled = false;
            }
        });
    });

    // Função para preencher os selects de tamanho
    function preencherSelectTamanho(select, tipoFio) {
        select.innerHTML = '<option value="">Selecione</option>';
        
        const grupoFios = fios.find(fio => fio.tipo === tipoFio);
        
        if (grupoFios) {
            grupoFios.tamanhos.forEach(tamanho => {
                let option = document.createElement("option");
                option.value = tamanho.area;
                option.textContent = `${tamanho.nome} (${tamanho.area.toFixed(2)} mm²)`;
                select.appendChild(option);
            });
        }
    }

    // Adicionar nova linha de fios
    adicionarLinhaBtn.addEventListener("click", () => {
        // Verifica quantas linhas já existem
        const totalLinhas = document.querySelectorAll('.fios-linha').length;
        
        if (totalLinhas >= 4) {
            mostrarResultado("Máximo de 4 linhas atingido.", "danger");
            return;
        }
    
        const novaLinha = document.createElement("div");
        novaLinha.className = "fios-linha";
        
        const linhaNumero = totalLinhas + 1;
        
        novaLinha.innerHTML = `
            <div class="opcoes-fio">
                <div class="fio">
                    <input type="radio" name="linha${linhaNumero}" id="fio-pvc-${linhaNumero}" class="fio-radio" data-tipo="PVC">
                    <label for="fio-pvc-${linhaNumero}" class="fio-label">PVC</label>
                </div>

                <div class="fio">
                    <input type="radio" name="linha${linhaNumero}" id="fio-unifilar-${linhaNumero}" class="fio-radio" data-tipo="EPR/XLPE 1KV UNIFILAR">
                    <label for="fio-unifilar-${linhaNumero}" class="fio-label">EPR/XLPE 1KV<br><small>UNIFILAR</small></label>
                </div>

                <div class="fio">
                    <input type="radio" name="linha${linhaNumero}" id="fio-multi2-${linhaNumero}" class="fio-radio" data-tipo="EPR/XLPE 1KV MULTIFILAR 2 VIAS">
                    <label for="fio-multi2-${linhaNumero}" class="fio-label">EPR/XLPE 1KV<br><small>MULTIFILAR 2 VIAS</small></label>
                </div>

                <div class="fio">
                    <input type="radio" name="linha${linhaNumero}" id="fio-multi3-${linhaNumero}" class="fio-radio" data-tipo="EPR/XLPE 1KV MULTIFILAR 3 VIAS">
                    <label for="fio-multi3-${linhaNumero}" class="fio-label">EPR/XLPE 1KV<br><small>MULTIFILAR 3 VIAS</small></label>
                </div>

                <div class="fio">
                    <input type="radio" name="linha${linhaNumero}" id="fio-multi4-${linhaNumero}" class="fio-radio" data-tipo="EPR/XLPE 1KV MULTIFILAR 4 VIAS">
                    <label for="fio-multi4-${linhaNumero}" class="fio-label">EPR/XLPE 1KV<br><small>MULTIFILAR 4 VIAS</small></label>
                </div>
                </div>
                <select class="fio-tamanho" disabled>
                    <option value="">Selecione</option>
                </select>
                <input type="number" class="fio-quantidade" min="1" value="1" disabled>
                <button class="remover-linha" aria-label="Remover linha">×</button>
            `;
            
            linhasAdicionais.appendChild(novaLinha);
            
            // ... (mantenha o restante do código de eventos) ...
        });
        
        // Adicione este estilo para desabilitar o botão quando atingir o máximo
        const maxLinhas = 4;
        function atualizarBotaoAdicionar() {
            const totalLinhas = document.querySelectorAll('.fios-linha').length;
            adicionarLinhaBtn.disabled = totalLinhas >= maxLinhas;
            
            if (adicionarLinhaBtn.disabled) {
                adicionarLinhaBtn.style.opacity = "0.5";
                adicionarLinhaBtn.style.cursor = "not-allowed";
            } else {
                adicionarLinhaBtn.style.opacity = "1";
                adicionarLinhaBtn.style.cursor = "pointer";
            }
        }
        
        // Chame esta função sempre que uma linha for adicionada ou removida
        adicionarLinhaBtn.addEventListener("click", atualizarBotaoAdicionar);
        
        // Adicione ao evento de remoção de linha
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('remover-linha')) {
                e.target.closest('.fios-linha').remove();
                atualizarBotaoAdicionar();
            }
        });

    // Calcular dimensionamento
    calcularBtn.addEventListener("click", () => {
        resultadoDiv.innerHTML = "";
        resultadoDiv.style.display = "none";

        const tipoEletrodutoSelecionado = selectEletroduto.value;
        if (!tipoEletrodutoSelecionado) {
            mostrarResultado("Selecione um tipo de eletroduto.", "danger");
            return;
        }

        let areaOcupada = 0;
        let totalCondutores = 0;
        const fiosSelecionados = [];

        // Verifica todas as linhas (inicial e adicionais)
        document.querySelectorAll('.fios-linha').forEach(linha => {
            const radioSelecionado = linha.querySelector('.fio-radio:checked');
            const selectTamanho = linha.querySelector('.fio-tamanho');
            const inputQuantidade = linha.querySelector('.fio-quantidade');
            
            if (radioSelecionado && selectTamanho.value && inputQuantidade.value > 0) {
                const tipoFio = radioSelecionado.getAttribute('data-tipo');
                const area = parseFloat(selectTamanho.value);
                const quantidade = parseInt(inputQuantidade.value);
                areaOcupada += area * quantidade;
                totalCondutores += quantidade;
                
                const optionText = selectTamanho.options[selectTamanho.selectedIndex].text;
                fiosSelecionados.push({
                    tipo: tipoFio, // Adiciona o tipo do fio
                    nome: optionText.split(' (')[0],
                    area: area,
                    quantidade: quantidade
                });
            }
        });

        if (areaOcupada === 0) {
            mostrarResultado("Adicione pelo menos um fio válido.", "danger");
            return;
        }

        const limitePermitido = calcularLimiteABNT(totalCondutores);
        const eletrodutoSelecionado = eletrodutos.find(e => e.tipo === tipoEletrodutoSelecionado);

        // Encontrar o menor eletroduto que atende ao limite
        const eletrodutoAdequado = eletrodutoSelecionado.tamanhos
            .sort((a, b) => a.area - b.area)
            .find(e => (areaOcupada / e.area) * 100 <= limitePermitido);

        if (eletrodutoAdequado) {
            const percentual = (areaOcupada / eletrodutoAdequado.area) * 100;
            mostrarResultado(`Eletroduto adequado: ${eletrodutoAdequado.nome} (${eletrodutoAdequado.area.toFixed(2)} mm²)`, "info");
            gerarRelatorio(eletrodutoAdequado, areaOcupada, percentual, limitePermitido, fiosSelecionados);
        } else {
            // Procurar em todos os eletrodutos se não encontrar no tipo selecionado
            const todosEletrodutos = eletrodutos.flatMap(e => e.tamanhos);
            const eletrodutoRecomendado = todosEletrodutos
                .sort((a, b) => a.area - b.area)
                .find(e => (areaOcupada / e.area) * 100 <= limitePermitido);
            
            if (eletrodutoRecomendado) {
                mostrarResultado(`Nenhum eletroduto adequado no tipo selecionado. Recomendado: ${eletrodutoRecomendado.nome} (${eletrodutoRecomendado.area.toFixed(2)} mm²)`, "danger");
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
        resultadoDiv.className = `alert alert-${tipo}`;
        resultadoDiv.style.display = "block";
    }

    function gerarRelatorio(eletroduto, areaOcupada, percentual, limite, fiosSelecionados) {
        let listaFiosHTML = '<div class="fios-selecionados"><h3>Condutores selecionados:</h3><ul>';
        
        fiosSelecionados.forEach(fio => {
            listaFiosHTML += `<li>${fio.tipo} - ${fio.nome} (${fio.quantidade}x ${fio.area.toFixed(2)} mm²)</li>`;
        });
        
        listaFiosHTML += '</ul></div>';

        resultadoDiv.innerHTML = `
            ${listaFiosHTML}
            <div class="relatorio-card">
                <h2>📊 Relatório de Dimensionamento</h2>
                <p><strong>Eletroduto selecionado:</strong> ${eletroduto.nome}</p>
                <p><strong>Área total do eletroduto:</strong> ${eletroduto.area.toFixed(2)} mm²</p>
                <p><strong>Área ocupada pelos condutores:</strong> ${areaOcupada.toFixed(2)} mm²</p>
                <p><strong>Percentual de ocupação:</strong> ${percentual.toFixed(2)}%</p>
                <p><strong>Limite Permitido:</strong> ${limite}%</p>
                <p><strong>Total de Condutores:</strong> ${fiosSelecionados.reduce((total, fio) => total + fio.quantidade, 0)}</p>
            </div>
        `;
    }
});