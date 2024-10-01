function carregarObjetivosAprendizagem() {
    const content = document.getElementById('content');

    // Carrega o CSS exclusivo da aba
    const tabStylesheet = document.getElementById('tab-stylesheet');
    tabStylesheet.href = 'css/objetivosAprendizagem.css';

    // Limpa o conteúdo anterior
    content.innerHTML = '';

    // Cria a estrutura HTML
    const header = document.createElement('div');
    header.className = 'objetivos-header';
    header.innerHTML = '<h2>Objetivos de Aprendizagem</h2>';
    content.appendChild(header);

    const objetivosContent = document.createElement('div');
    objetivosContent.className = 'objetivos-content';

    // Adiciona botão para salvar como TSV
    const botaoSalvar = document.createElement('button');
    botaoSalvar.innerHTML = '<i class="fas fa-save" style="font-size: 1.2rem;"></i>'; // Ícone de disquete
    botaoSalvar.onclick = salvarComoTSV;
    content.appendChild(botaoSalvar);

    // Adiciona botão para carregar TSV
    const botaoCarregar = document.createElement('div'); // Usar um div para adicionar ícone
    botaoCarregar.className = 'file-upload'; // Classe para estilização
    botaoCarregar.innerHTML = '<i class="fas fa-folder-open"></i>'; // Ícone de pasta
    botaoCarregar.onclick = () => document.getElementById('input-file').click(); // Clica no input oculto

    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.id = 'input-file'; // Adiciona um ID para o input
    inputFile.accept = '.tsv';
    inputFile.style.display = 'none'; // Oculta o input
    inputFile.onchange = carregarTSV;

    content.appendChild(botaoCarregar);
    content.appendChild(inputFile);
    
    // Coluna Geral
    const colunaGeral = document.createElement('div');
    colunaGeral.className = 'coluna-geral';
    
    const cursosHeader = document.createElement('div');
    cursosHeader.className = 'objetivos-header';
    cursosHeader.innerHTML = '<h3>Cursos</h3>';
    colunaGeral.appendChild(cursosHeader);

    const cursosContainer = document.createElement('div');
    cursosContainer.className = 'cursos-container';
    cursosContainer.appendChild(criarCampoTexto('cursos', true)); // Campo inicial
    colunaGeral.appendChild(cursosContainer);

    const equipamentosHeader = document.createElement('div');
    equipamentosHeader.className = 'objetivos-header';
    equipamentosHeader.innerHTML = '<h3>Equipamentos</h3>';
    colunaGeral.appendChild(equipamentosHeader);

    const equipamentosContainer = document.createElement('div');
    equipamentosContainer.className = 'equipamentos-container';
    equipamentosContainer.appendChild(criarCampoTexto('equipamentos', true)); // Campo inicial
    colunaGeral.appendChild(equipamentosContainer);

    objetivosContent.appendChild(colunaGeral);
    
    // Coluna Capacidades
    const colunaCapacidades = document.createElement('div');
    colunaCapacidades.className = 'coluna-capacidades';

    const capacidadesHeader = document.createElement('div');
    capacidadesHeader.className = 'objetivos-header';
    capacidadesHeader.innerHTML = '<h3>Capacidades</h3>';
    colunaCapacidades.appendChild(capacidadesHeader);
    
    const capacidadesContainer = document.createElement('div');
    capacidadesContainer.className = 'capacidades-container'; // Classe para o contêiner de capacidades
    capacidadesContainer.appendChild(criarCampoTexto('capacidades', true)); // Campo inicial
    colunaCapacidades.appendChild(capacidadesContainer);

    objetivosContent.appendChild(colunaCapacidades);
    
    // Coluna Práticas
    const colunaPraticas = document.createElement('div');
    colunaPraticas.className = 'coluna-praticas';

    // Bloco de Práticas Presenciais
    const praticasHeader = document.createElement('div');
    praticasHeader.className = 'objetivos-header';
    praticasHeader.innerHTML = '<h3>Práticas Presenciais</h3>';
    colunaPraticas.appendChild(praticasHeader);
    
    const praticasContainer = document.createElement('div');
    praticasContainer.className = 'praticas-container'; // Classe para o contêiner de práticas
    praticasContainer.appendChild(criarCampoTexto('praticas', true)); // Campo inicial
    colunaPraticas.appendChild(praticasContainer);

    // Bloco de Foco da Experiência Prática
    const focoHeader = document.createElement('div');
    focoHeader.className = 'objetivos-header';
    focoHeader.innerHTML = '<h3>Foco da Experiência Prática</h3>';
    colunaPraticas.appendChild(focoHeader);
    
    const focoContainer = document.createElement('div');
    focoContainer.className = 'foco-container'; // Classe para o contêiner de foco
    focoContainer.appendChild(criarCampoTexto('foco', true)); // Campo inicial
    colunaPraticas.appendChild(focoContainer);

    objetivosContent.appendChild(colunaPraticas);

    content.appendChild(objetivosContent);

    // Atualiza o estado dos botões ao carregar
    atualizarBotoes('cursos');
    atualizarBotoes('equipamentos');
    atualizarBotoes('capacidades');
    atualizarBotoes('praticas'); // Adiciona a atualização para a coluna de práticas
    atualizarBotoes('foco'); // Adiciona a atualização para a coluna de foco
}

let contagemCursos = 1; // Contagem inicial para cursos
let contagemEquipamentos = 1; // Contagem inicial para equipamentos
let contagemCapacidades = 1; // Contagem inicial para capacidades
let contagemPraticas = 1; // Contagem inicial para práticas
let contagemFoco = 1; // Contagem inicial para foco

function criarCampoTexto(tipo, isInitial = false) {
    const campoTexto = document.createElement('div');
    campoTexto.classList.add('campo-texto');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Adicionar ${tipo}`;
    
    const botaoAdicionar = document.createElement('button');
    botaoAdicionar.className = 'add-button';
    botaoAdicionar.innerText = '+';
    botaoAdicionar.onclick = () => adicionarCampo(tipo);

    const botaoRemover = document.createElement('button');
    botaoRemover.className = 'remove-button';
    botaoRemover.innerText = 'x';
    botaoRemover.disabled = isInitial; // Desabilita o botão se for o campo inicial
    botaoRemover.onclick = () => removerCampo(botaoRemover, tipo);

    campoTexto.appendChild(input);
    campoTexto.appendChild(botaoAdicionar);
    campoTexto.appendChild(botaoRemover);

    return campoTexto;
}

function adicionarCampo(tipo) {
    let container;
    if (tipo === 'praticas') {
        container = document.querySelector(`.praticas-container`);
        contagemPraticas++;
    } else if (tipo === 'foco') {
        container = document.querySelector(`.foco-container`);
        contagemFoco++;
    } else {
        container = document.querySelector(`.${tipo}-container`);
        if (tipo === 'cursos') {
            contagemCursos++;
        } else if (tipo === 'equipamentos') {
            contagemEquipamentos++;
        } else {
            contagemCapacidades++;
        }
    }

    if (!container) {
        console.error(`${tipo}-container não encontrado.`);
        return;
    }

    const novoCampo = criarCampoTexto(tipo);
    container.appendChild(novoCampo);

    atualizarBotoes(tipo);
}

function removerCampo(botao, tipo) {
    const campoTexto = botao.parentElement;
    campoTexto.remove();

    // Atualiza a contagem
    if (tipo === 'praticas') {
        contagemPraticas--;
    } else if (tipo === 'foco') {
        contagemFoco--;
    } else if (tipo === 'cursos') {
        contagemCursos--;
    } else if (tipo === 'equipamentos') {
        contagemEquipamentos--;
    } else {
        contagemCapacidades--;
    }

    // Atualiza o estado dos botões após a remoção
    atualizarBotoes(tipo);
}

function atualizarBotoes(tipo) {
    const botoesRemover = document.querySelectorAll(`.${tipo}-container .remove-button`);
    botoesRemover.forEach(btn => {
        btn.disabled = (tipo === 'cursos' && contagemCursos <= 1) || 
                       (tipo === 'equipamentos' && contagemEquipamentos <= 1) || 
                       (tipo === 'capacidades' && contagemCapacidades <= 1) || 
                       (tipo === 'praticas' && contagemPraticas <= 1) || 
                       (tipo === 'foco' && contagemFoco <= 1);
        btn.style.backgroundColor = btn.disabled ? 'gray' : ''; // Define a cor cinza quando desabilitado
    });
}

function salvarComoTSV() {
    const dados = [];

    // Coleta dados dos campos de texto em cada coluna
    coletarDados('cursos', dados);
    coletarDados('equipamentos', dados);
    coletarDados('capacidades', dados);
    coletarDados('praticas', dados);
    coletarDados('foco', dados);

    // Converte dados para formato TSV
    const tsvContent = "data:text/tsv;charset=utf-8," + dados.map(e => e.join("\t")).join("\n");

    // Cria um link temporário para download do arquivo
    const encodedUri = encodeURI(tsvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "objetivos_aprendizagem.tsv");
    document.body.appendChild(link); // Necessário para Firefox

    link.click(); // Simula o clique para download
    document.body.removeChild(link); // Remove o link do DOM
}

function coletarDados(tipo, dados) {
    const container = document.querySelector(`.${tipo}-container`);
    if (container) {
        const campos = container.querySelectorAll('.campo-texto input');
        campos.forEach(input => {
            dados.push([tipo, input.value]);
        });
    }
}

function carregarTSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const texto = e.target.result;
        const linhas = texto.split("\n");

        // Limpa os campos antes de carregar novos dados
        limparCampos();

        // Itera sobre as linhas do TSV
        linhas.forEach(linha => {
            const campos = linha.split("\t"); // Usa tabulação como separador
            if (campos.length === 2) {
                const tipo = campos[0].trim();
                const valor = campos[1].trim();
                adicionarCampoComValor(tipo, valor);
            }
        });
    };

    reader.readAsText(file);
}

// Função para adicionar um campo com um valor específico
function adicionarCampoComValor(tipo, valor) {
    if (tipo === 'cursos') {
        const container = document.querySelector('.cursos-container');
        if (container) {
            const novoCampo = criarCampoTexto('cursos');
            container.appendChild(novoCampo);
            novoCampo.querySelector('input').value = valor; // Preenche o valor
        }
    } else if (tipo === 'equipamentos') {
        const container = document.querySelector('.equipamentos-container');
        if (container) {
            const novoCampo = criarCampoTexto('equipamentos');
            container.appendChild(novoCampo);
            novoCampo.querySelector('input').value = valor; // Preenche o valor
        }
    } else if (tipo === 'capacidades') {
        const container = document.querySelector('.capacidades-container');
        if (container) {
            const novoCampo = criarCampoTexto('capacidades');
            container.appendChild(novoCampo);
            novoCampo.querySelector('input').value = valor; // Preenche o valor
        }
    } else if (tipo === 'praticas') {
        const container = document.querySelector('.praticas-container');
        if (container) {
            const novoCampo = criarCampoTexto('praticas');
            container.appendChild(novoCampo);
            novoCampo.querySelector('input').value = valor; // Preenche o valor
        }
    } else if (tipo === 'foco') {
        const container = document.querySelector('.foco-container');
        if (container) {
            const novoCampo = criarCampoTexto('foco');
            container.appendChild(novoCampo);
            novoCampo.querySelector('input').value = valor; // Preenche o valor
        }
    }
}

function limparCampos() {
    const containers = [
        '.cursos-container',
        '.equipamentos-container',
        '.capacidades-container',
        '.praticas-container',
        '.foco-container'
    ];

    containers.forEach(containerClass => {
        const container = document.querySelector(containerClass);
        if (container) {
            container.innerHTML = ''; // Limpa todos os campos
        }
    });
}