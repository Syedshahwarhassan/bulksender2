const express=require('express')

const app=express();


app.listen(4600,()=>console.log('Server is running on port 4600'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('./public'))

let employees=[
  {id:1, name:'John Doe', department:'Sales', salary:5000},
  {id:2, name:'Jane Smith', department:'Marketing', salary:6000},
  {id:3, name:'Michael Johnson', department:'Finance', salary:7000}]
  app.get('/',(req,res)=>{
    res.render('index')
  })
  app.get('/add',(req,res)=>{
    res.send(employees)
  })