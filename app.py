from flask import Flask, render_template, request, jsonify
from flask_frozen import Freezer
from datetime import datetime

app = Flask(__name__)
freezer = Freezer(app)  # Criar uma instância do Freezer

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calcular_diferencas_tempo', methods=['POST'])
def calcular_diferencas_tempo():
    data_inicio = request.json['dataInicio']
    data_fim = request.json['dataFim']

    diferenca_total = 0
    for inicio, fim in zip(data_inicio, data_fim):
        try:
            data_inicio_dt = datetime.strptime(inicio, "%d/%m/%Y %H:%M")
            data_fim_dt = datetime.strptime(fim, "%d/%m/%Y %H:%M")
            diferenca = data_fim_dt - data_inicio_dt
            minutos_totais = diferenca.total_seconds() / 60
            diferenca_total += minutos_totais
        except ValueError:
            return jsonify({"erro": "Por favor, insira datas e horas válidas no formato especificado."}), 400

    return jsonify(diferenca_total)

if __name__ == '__main__':
    freezer.freeze()  # Congelar o aplicativo Flask usando o Freezer
