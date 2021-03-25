const express = require('express');
const app= express();

app.get('/makers/:nombre',(req, res)=>{
   let name=req.params.nombre.charAt(0).toUpperCase()+req.params.nombre.slice(1) || "Desconocido"
    res.send(`<h1>Hola ${name}!</h1>`);
});

app.listen(3000, () => console.log('Linstening on port 3000!'));
