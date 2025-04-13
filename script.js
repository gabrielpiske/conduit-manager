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

    // Delegar eventos para elementos dinâmicos
    document.addEventListener('change', function(e) {
        // Evento para radios de tipo de fio
        if (e.target.classList.contains('fio-radio') && e.target.checked) {
            const linha = e.target.closest('.fios-linha');
            const selectTamanho = linha.querySelector('.fio-tamanho');
            const inputQuantidade = linha.querySelector('.fio-quantidade');
            
            const tipoFio = e.target.getAttribute('data-tipo');
            preencherSelectTamanho(selectTamanho, tipoFio);
            selectTamanho.disabled = false;
            inputQuantidade.disabled = false;
        }
    });

    // Evento para remover linhas
    document.addEventListener('click', function(e) {
        if (e.target.closest('.remover-linha')) {
            e.target.closest('.fios-linha').remove();
            atualizarBotaoAdicionar();
        }
    });

    // Função para atualizar estado do botão adicionar
    function atualizarBotaoAdicionar() {
        const totalLinhas = document.querySelectorAll('.fios-linha').length;
        adicionarLinhaBtn.disabled = totalLinhas >= 4;
        
        if (adicionarLinhaBtn.disabled) {
            adicionarLinhaBtn.style.opacity = "0.5";
            adicionarLinhaBtn.style.cursor = "not-allowed";
        } else {
            adicionarLinhaBtn.style.opacity = "1";
            adicionarLinhaBtn.style.cursor = "pointer";
        }
    }

    // Adicionar nova linha de fios
    adicionarLinhaBtn.addEventListener("click", () => {
        const totalLinhas = document.querySelectorAll('.fios-linha').length;
        
        if (totalLinhas >= 4) {
            mostrarResultado("Máximo de 4 linhas atingido.", "danger");
            return;
        }
    
        const novaLinha = document.createElement("div");
        novaLinha.className = "fios-linha";
        
        const linhaNumero = totalLinhas + 1;
        
        novaLinha.innerHTML = `
            <div class="opcoes-container">
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
                <div class="fio-remover">
                    <button class="remover-linha" aria-label="Remover linha">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="inputs-container">
                <select class="fio-tamanho" disabled>
                    <option value="">Selecione</option>
                </select>
                <input type="number" class="fio-quantidade" min="1" value="1" disabled>
            </div>
        `;
        
        linhasAdicionais.appendChild(novaLinha);
        atualizarBotaoAdicionar();
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
                    tipo: tipoFio,
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

        const eletrodutoAdequado = eletrodutoSelecionado.tamanhos
            .sort((a, b) => a.area - b.area)
            .find(e => (areaOcupada / e.area) * 100 <= limitePermitido);

        if (eletrodutoAdequado) {
            const percentual = (areaOcupada / eletrodutoAdequado.area) * 100;
            mostrarResultado(`Eletroduto adequado: ${eletrodutoAdequado.nome} (${eletrodutoAdequado.area.toFixed(2)} mm²)`, "info");
            gerarRelatorio(eletrodutoAdequado, areaOcupada, percentual, limitePermitido, fiosSelecionados);
        } else {
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
    
        const totalCondutores = fiosSelecionados.reduce((total, fio) => total + fio.quantidade, 0);
        const areaEletroduto = eletroduto.area;
        const areaMinimaNecessaria = areaOcupada / (limite / 100);
    
        resultadoDiv.innerHTML = `
            ${listaFiosHTML}
            <div class="relatorio-card">
                <h2>📊 Relatório de Dimensionamento</h2>
                <p><strong>Eletroduto selecionado:</strong> ${eletroduto.nome}</p>
                <p><strong>Área total do eletroduto:</strong> ${areaEletroduto.toFixed(2)} mm²</p>
                <p><strong>Área ocupada pelos condutores:</strong> ${areaOcupada.toFixed(2)} mm²</p>
                <p><strong>Percentual de ocupação:</strong> ${percentual.toFixed(2)}%</p>
                <p><strong>Limite Permitido:</strong> ${limite}%</p>
                <p><strong>Total de Condutores:</strong> ${totalCondutores}</p>
                <button id="copiarRelatorioBtn" class="relatorio-btn">📋 Copiar relatório detalhado</button>
            </div>
        `;
    
        document.getElementById("copiarRelatorioBtn").addEventListener("click", () => {
            const relatorioDetalhado = `
                Relatório Detalhado:
    
                Eletroduto:
    
                ABNT – Associação Brasileira de Normas Técnicas, "NBR 5410: Instalações elétricas em baixa tensão", 2004.
    
                6.2.11.1.6 As dimensões internas dos eletrodutos e de suas conexões devem permitir que, após montagem da linha, os condutores possam ser instalados e retirados com facilidade. Para tanto:
    
                a) a taxa de ocupação do eletroduto, dada pelo quociente entre a soma das áreas das seções transversais dos condutores previstos, calculadas com base no diâmetro externo, e a área útil da seção transversal do eletroduto, não deve ser superior a:
    
                53% no caso de um condutor;
                31% no caso de dois condutores;
                40% no caso de três ou mais condutores;
    
                Quantidade de condutores utilizados: ${totalCondutores} condutores, sendo assim ${limite}%;
                
                Cálculo de área interna do eletroduto:
                
                ÁREA = (π × (${eletroduto.diametro?.toFixed(2) || 'diâmetro'}²) ÷ 4 = ${areaEletroduto.toFixed(2)} mm²
    
                Cálculo de área dos condutores:
                
                ${fiosSelecionados.map(fio => 
                    `${fio.quantidade} condutores tipo ${fio.tipo} de ${fio.nome.split(' ')[0]} mm²\n` +
                    `ÁREA = (π × ${Math.sqrt(fio.area * 4 / Math.PI).toFixed(2)}²) ÷ 4 × ${fio.quantidade} = ${(fio.area * fio.quantidade).toFixed(2)} mm²`
                ).join('\n\n')}
    
                Total = ${areaOcupada.toFixed(2)} mm²
    
                Como o eletroduto pode ter no máximo uma taxa de ocupação de ${limite}% e o valor total da área do eletroduto é de ${areaEletroduto.toFixed(2)} mm². 
                Sendo assim é necessário que haja uma área livre interna de no mínimo ${areaEletroduto.toFixed(2)} × ${(limite/100).toFixed(2)} = ${(areaEletroduto * (limite/100)).toFixed(2)} mm².
                
                A área dos condutores é ${areaOcupada.toFixed(2)} mm², que é ${areaOcupada <= (areaEletroduto * (limite/100)) ? 'menor ou igual' : 'maior'} que a área mínima permitida de ${(areaEletroduto * (limite/100)).toFixed(2)} mm².
                
                Conclui-se então a necessidade da utilização de um eletroduto tipo ${eletroduto.nome.split(' ')[0].toUpperCase()} de no mínimo ${eletroduto.diametro ? eletroduto.diametro + 'mm' : 'tamanho adequado'}.
                
                📊 RESUMO:
                - Tipo de eletroduto: ${eletroduto.nome}
                - Área total: ${areaEletroduto.toFixed(2)} mm²
                - Área ocupada: ${areaOcupada.toFixed(2)} mm² (${percentual.toFixed(2)}%)
                - Limite ABNT: ${limite}%
                - Condutores: ${totalCondutores}
                ${fiosSelecionados.map(fio => `- ${fio.quantidade}x ${fio.tipo} ${fio.nome}`).join('\n            ')}
            `;
    
            navigator.clipboard.writeText(relatorioDetalhado.trim()).then(() => {
                alert("✅ Relatório detalhado copiado com sucesso!");
            }).catch(err => {
                alert("❌ Erro ao copiar relatório detalhado.");
                console.error(err);
            });
        });
    }

    // Adiciona a primeira linha inicial
    adicionarLinhaBtn.click();
});