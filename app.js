const express = require('express');
const app = express();

app.use(express.json());

//Endpoint 1: Contador de Frecuencia de Palabras
app.post('/api/utils/word-frequency', (req, res) => {
    const texto = req.body.texto;

    if (!texto) {
        return res.status(400).json({ error: 'El texto es requerido' });
    }

    //pasar  el texto a minuscula y eliminar comas y puntos
    const limpiarTexto = texto
        .toLowerCase()
        .replace(/[.,]/g, '');

    //separar las palabras por espacios
    const palabras = limpiarTexto.split(' ');

    //contar con un objeto, se deja objeto vacio como acumulador
    const contador = {};

    for (let palabra of palabras) {
        if (palabra === '') continue;

        if (contador[palabra]) {
            contador[palabra]++;
        } else {
            contador[palabra] = 1;
        }
    }

    res.json(contador);
});

app.listen(3000, () => {
    console.log('servidor arrancando en http://localhost:3000');
});