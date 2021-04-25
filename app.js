const express = require('express');
const app= express();
const mongoose=require("mongoose");

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded());

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology:true });
mongoose.connection.on("error", function(e){console.error(e);});




var schema = mongoose.Schema({
  name:{type:String, default: "Anónimo"},
  count:{type:Number, default:1}
});


var Visitor = mongoose.model("Visitor", schema);


app.get('/', async (req, res) => {
  const visitorName = req.query.name;
  const existVisitor = await Visitor.findOne({name: visitorName}).catch((error)=> console.error(error))
  if(existVisitor && visitorName){
    await countVisits(visitorName).catch((error) => console.error(error))
  }else{
    await Visitor.create({name: visitorName, count:1}).catch((error) => console.error(error)); 
  }


  await Visitor.find(function (err, visitors){
    if (err) return console.error(err, visitors)
    res.render('table', {visitors: visitors})
  })
})

function countVisits(visitorName){
  Visitor.findOne({ name: visitorName}, function (err, visitor){
    if (err) return console.error(error)
    visitor.count += 1;
    visitor.save(function(err){
      if (err) return console.error(error)
    })
  })
}

app.listen(3000, () => console.log('Linstening on port 3000!'));
