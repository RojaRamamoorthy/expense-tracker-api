const express = require('express')
const mongoose=require('mongoose')
const app = express()
const port = 3000
const Expense = require('./models/expense')
mongoose.connect('mongodb+srv://Roja:rojar.20msc@cluster0.pqcxsmz.mongodb.net/newDb?retryWrites=true&w=majority',{
    useUnifiedTopology: true
});
app.use(express.json());
app.get('/expenses',async (req, res) => {
    const result =await Expense.find();
  res.send(result);
})
app.get('/expenses/:id',async (req, res) => {
   try{ const id=req.params.id;
    const result =await Expense.findById(id);
    if(result)
        res.send(result);
    else
        res.send("No expense with that id");
   }catch(err){
    res.send(err);
   }
})
app.delete('/expenses/:id',async (req, res) => {
  try{
     const id=req.params.id;
   const result =await Expense.findByIdAndDelete(id);
   if(result){
       res.send(result);
       console.log("Updated")
   }
   else
       res.send("No expense with that id");
  }catch(err){
   res.send(err);
  } 
})
app.post('/expense',async (req, res) => {
  console.log(req.body)
  const newExpense=req.body
  await Expense.create(newExpense)
  res.send('Created');
  
})
app.put('/expenses/:id',async (req, res) => {
 const id=req.params.id;
 const updateObject=req.body;
 const updatedObject=await Expense.findByIdAndUpdate(id,
  {$set :  updateObject},{
  new:true
 })
 res.send(updatedObject)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})