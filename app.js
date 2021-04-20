const express = require('express');
const app= express();
// app.set('view engine', 'pug');
// app.set('views', 'views');
// app.use(express.urlencoded());
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/test', { useNewUrlParser: true });
mongoose.connection.on{"error", function(e){console.error(e);}};

const visitorSchema = mongoose.Schema({
  date:{type: date, default: Date.now},
  name:{type:string, default: "Anónimo"},
})

const Visitor = mongoose.model("Visitor", visitorSchema);

app.get('/', (req, res) => {
  const name = req.query.name;
  Visitor.create({...(name ? {name}:{})}, function(err){
    if (err) return console.error(err);
    res.send('<h1>El visitante fue almacenado con éxito</h1>')

  })
});


app.listen(3000, () => console.log('Linstening on port 3000!'));













// app.get('/',(req, res)=>{
//     let ens= ['1 soy impar','2 soy par']
//     res.send(`<p>${ens}!</p>`);
// });

// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.post('/hello',(req,res)=>{
//   res.send("<h1>Hola "+req.body.name+"!</h1>")
// })
