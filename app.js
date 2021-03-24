const express = require('express');
const app= express();

app.get('/makers/:nombre',(req, res)=>{
    res.send(`<h1>Hola ${req.params.nombre || "desconocido"}!</h1>`);
});

app.listen(3000, () => console.log('Linstening on port 3000!'));