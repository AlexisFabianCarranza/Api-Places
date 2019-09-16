const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: false}));

const places = [
  {
    'title': 'Oficina Codigo',
    'description': 'Lorem Ipsum',
    'addres': 'Lorem IPsum'
  },
  {
    'title': 'Oficina Codigo',
    'description': 'Lorem Ipsum',
    'addres': 'Lorem IPsum'
  },
  {
    'title': 'Oficina Codigo',
    'description': 'Lorem Ipsum',
    'addres': 'Lorem IPsum'
  },
  {
    'title': 'Oficina Codigo',
    'description': 'Lorem Ipsum',
    'addres': 'Lorem IPsum'
  }
];

app.get('/', (req,res)=>{
  res.json(places);res.send('Hola mundo');
});

app.post('/', (req,res)=>{
  res.json(req.body.nombres);
})

app.use(express.static('public'));



app.listen(3000,function(){
  console.log('Estoy listo para recibir peticiones')
});
