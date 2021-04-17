const express = require('express');
const app= express();
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded());



// app.get('/',(req, res)=>{
//     let ens= ['1 soy impar','2 soy par']
//     res.send(`<p>${ens}!</p>`);
// });

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/hello',(req,res)=>{
  res.send("Hola "+req.body.name)
})
app.listen(3000, () => console.log('Linstening on port 3000!'));
