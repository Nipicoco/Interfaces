import requests as req, time as ti, random as ra


sURL= 'http://127.0.0.1:8000/datos'

def Generate():
    dData = {
        '01': ra.randint(+5, 100),
    }