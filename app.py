from flask import Flask, jsonify, render_template, request as req
import telepot, time
app = Flask(__name__)

Material = {
            0: [],
            1: [],
            2: [],
            3: [],
}# lista de datos de los sensores 

#datos para telepot
Id = '1595463486'
Token = '5849597738:AAF-0qzQCdEwZHVt616mlOOwosq9C_4lAWw'


#creando la estructura para los datos recibidos
@app.route('/datos', methods=['POST'])
def Array():
    datos = req.json    
    Material[0] = datos['01']
    Material[1] = datos['25']
    Material[2] = datos['10']
    Material[3] = datos['te']
    print(Material) 
    return 'OK'

#home route
@app.route('/')
def inicio():
    return render_template('index.html')
    
#data route
@app.route('/data')
def ObtenerDatos():
    return Material

#post data to telepot route
@app.route("/enviar", methods=['POST'])
def envio():
    #def bot
    bot = telepot.Bot(Token)
    time.sleep(5)
    #creates the file and sends it using telepot sendMessage + sendPhoto function to previously created id
    with open('D:\Descargas\MP.png','rb') as photo_file:
        bot.sendMessage(Id, 'Grafico Material Particulado')
        bot.sendPhoto(Id,photo=photo_file)
        
    return(print("enviado"))

#second post route for telepot for second canvas / temperature graph
@app.route("/enviar2", methods=['POST'])
def envio2():
    #instantiate bot
    bot = telepot.Bot(Token)
    time.sleep(5)
    #create and send message + saved img to previously created id
    with open('D:\Descargas\TP.png','rb') as photo_file:
        bot.sendMessage(Id, 'Grafico Temperatura')
        bot.sendPhoto(Id,photo=photo_file)
    return(print("enviado"))




if __name__ == '__main__':
    app.run(debug=True)