# Modulo ACS-01
# Envio datos Ambientales al Server Flask
#------------------------------------------
import requests as req, time as ti, random as ra

sURL = 'http://127.0.0.1:5000/datos'

def Generate():
    dData = {                       # Datos Ambientales
        '01': [ra.randint(+5,+20)for i in range(20)] ,  #   MP 1.0 ug/m3
        '25': [ra.randint(+5,+20)for i in range(20)] ,  #   MP 2.5 ug/m3
        '10': [ra.randint(+5,+20)for i in range(20)] ,  #   MP 10 ug/m3
        'te': [ra.randint(-10,+10) for i in range(20)]   #   Temperatura
    }
    return dData

#make a request to the server and send the data as json 20 times


while 1:
    dData = Generate()
    Trash = req.post(sURL, json=dData)
    ti.sleep(5)
Trash.close()