const express = require('express');
const app= express();
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded());
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology:true });
mongoose.connection.on("error", function(e){console.error(e);});


// let elements= Visitor.count;

var Schema = mongoose.Schema({
  // date:{type: Date, default: Date.now},
  name:{type:String, default: "Anónimo"},
  count:{type:Number, default:1}
})


var Visitor = mongoose.model("Visitor", Schema);


app.get('/', async (req, res) => {
  const visitorName = req.query.name;
  const existVisitor = await Visitor.findOne({name: visitorName}).catch((error)=> console.error(error))
  if(existVisitor && visitorName){
    await countVisits(visitorName).catch((error) => console.error(error))
  }else{
    await Visitor.create({name: visitorName}).catch((error) => console.error(error)) 
  }


  await Visitor.find(function (err, visitors){
    if (err) return console.error(err, visitors)
    res.render('table', {visitors: visitors})
  })
})

function countVisits(visitorName){
  Visitors.findOne({ nme: visitorName}, function (err, visitor){
    if (err) return console.error(error)
    visitor.count += 1;
    visitor.save(function(err){
      if (err) return console.error(error)
    })
  })
}
// Visitor.find(function(err, articles) {
//   if (err) return console.error(err);
//   console.log(articles))
// });




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
