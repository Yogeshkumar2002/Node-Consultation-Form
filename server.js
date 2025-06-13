const express = require('express');
const mongoose = require('mongoose');
const Details = require('./models/form.model.js')
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://yogeshkumar2002rs:Yogesh2002@cluster0.580d7um.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server is running on port 5000 thanks");
    });
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });

app.get('/submit', async (req,res) => {
  try{
    const detail = await Details.find({});
    res.status(200).json(detail);
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
});

app.post('/submit', async(req, res) => {
  try {
    const detail = await Details.create(req.body);
    console.log('Received data:', req.body);
    res.status(200).json({ message: 'Form submitted successfully', detail});
  }
  catch(error) {
    console.error("Backend Error:", error); 
    res.status(500).json({message:error.message});
  }

});


