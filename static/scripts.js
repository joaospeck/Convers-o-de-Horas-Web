function adicionarDataHora() {
    var datesContainer = document.getElementById('datesContainer');
    var newDateTimeInput = document.createElement('div');
    newDateTimeInput.className = 'date-time-input';
    newDateTimeInput.innerHTML = `
        <input type="text" class="dataInicio" placeholder="Data e Hora de Início" required>
        <input type="text" class="dataFim" placeholder="Data e Hora de Término" required>
        <button type="button" onclick="removerDataHora(this)">Remover</button>
        <button type="button" onclick="adicionarDataHora()"> Data e Hora adicional</button>
    `;
    datesContainer.appendChild(newDateTimeInput);
}

function removerDataHora(button) {
    var dateToRemove = button.parentNode;
    dateToRemove.parentNode.removeChild(dateToRemove);
}

function removerTodasDataHora() {
    var datesContainer = document.getElementById('datesContainer');
    // Remove todos os elementos abaixo do primeiro elemento de data e hora
    while (datesContainer.children.length > 1) {
        datesContainer.removeChild(datesContainer.lastChild);
    }
}

document.getElementById('calcForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    var dataInicio = [];
    var dataFim = [];
    document.querySelectorAll('.dataInicio').forEach(function(input) {
        dataInicio.push(input.value);
    });
    document.querySelectorAll('.dataFim').forEach(function(input) {
        dataFim.push(input.value);
    });
    calcularDiferencasTempo(dataInicio, dataFim);
});


function calcularDiferencasTempo(dataInicio, dataFim) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('resultado').innerHTML = xhr.responseText;
        }
    };
    xhr.open('POST', '/calcular_diferencas_tempo');
    xhr.setRequestHeader('Content-Type', 'application/json');

        var dados = {
            dataInicio: dataInicio,
            dataFim: dataFim
        };

        xhr.send(JSON.stringify(dados));
    }

    function limparCampos() {
        document.getElementById('resultado').innerHTML = '';
        var inputs = document.querySelectorAll('input[type="text"]');
        inputs.forEach(function(input) {
        input.value = '';  // Limpa o valor do campo
    });
}

