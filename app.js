const express = require('express');
const app= express();
const mongoose=require("mongoose");

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded());

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology:true });
mongoose.connection.on("error", function(e){console.error(e);});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req,res)=>{
  res.render('/users')
})






app.listen(3000, () => console.log('Linstening on port 3000!'));
