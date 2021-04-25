const express = require('express');
const app= express();
const mongoose=require("mongoose");

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded());

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology:true });
mongoose.connection.on("error", function(e){console.error(e);});

var UserSchema= new mongoose.Schema({
  name:{type:String},
  email: {type: String},
  password: {type: String}
})

var User = mongoose.model("User", UserSchema);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req,res)=>{
  const user = new users ({name: req.query.name, email: req.query.mail, password: req.query.password})
  await user.save()
  res.render('/usersreg')
})





app.listen(3000, () => console.log('Linstening on port 3000!'));
