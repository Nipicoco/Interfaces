from flask import Flask, jsonify, render_template, request as req
import telepot, time
app = Flask(__name__)

Material = {
            0: [],
            1: [],
            2: [],
            3: [],
}# lista de datos de los sensores 

Id = '1595463486'
Token = '5849597738:AAF-0qzQCdEwZHVt616mlOOwosq9C_4lAWw'



@app.route('/datos', methods=['POST'])
def Array():
    datos = req.json    
    Material[0] = datos['01']
    Material[1] = datos['25']
    Material[2] = datos['10']
    Material[3] = datos['te']
    print(Material) 
    return 'OK'

@app.route('/')
def inicio():
    return render_template('index.html')
    
@app.route('/data')
def ObtenerDatos():
    return Material

@app.route("/enviar", methods=['POST'])
def envio():
    bot = telepot.Bot(Token)
    time.sleep(5)
    with open('D:\Descargas\MP.png','rb') as photo_file:
        bot.sendMessage(Id, 'Grafico Material Particulado')
        bot.sendPhoto(Id,photo=photo_file)
        
    return(print("enviado"))
@app.route("/enviar2", methods=['POST'])
def envio2():
    bot = telepot.Bot(Token)
    time.sleep(5)
    with open('D:\Descargas\TP.png','rb') as photo_file:
        bot.sendMessage(Id, 'Grafico Temperatura')
        bot.sendPhoto(Id,photo=photo_file)
    return(print("enviado"))




if __name__ == '__main__':
    app.run(debug=True)
