const express = require('express');
const app= express();
const mongoose=require("mongoose");

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded());

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology:true });
mongoose.connection.on("error", function(e){console.error(e);});

// var products = new mongoose.Schema({
//   name:{type:String},
//   price: {type: Number},
// })

// app.get('/products', async (req, res) => {
//   await products.create({name,price})
//   const products = await products.find({})
//   res.json(books)
// })

var UserSchema= new mongoose.Schema({
  name:{type:String},
  email: {type: String},
  password: {type: String}
})

var User = mongoose.model("User", UserSchema);



app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', async (req, res) => {
  res.render('register')
  
});

app.post('/register', async (req,res)=>{
  await User.create({name:req.body.name, email:req.body.email}).catch(error=>{console.error(error)})
  const users = await User.find();
  res.render('data',{users:users}).catch(error=>{console.error(error)})})




app.listen(3000, () => console.log('Linstening on port 3000!'))
