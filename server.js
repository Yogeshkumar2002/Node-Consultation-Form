const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Details = require('./models/form.model.js')
const cors = require('cors');

const storage = multer.memoryStorage();
const upload = multer({ storage });

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

app.post('/submit', upload.single('Report'), async (req, res) => {
  try {
    const { body, file } = req;

    const details = {
      ...body,
      Report: {
        name: file.originalname,
        size: file.size,
        mimetype: file.mimetype
      }
    };

    const newEntry = new Details(details);
    await newEntry.save();

    res.status(200).json({ message: "Form submitted successfully" });
  } catch (err) {
    console.error("Backend Error:", err);
    res.status(400).json({ error: err.message });
  }
});

app.put('/submit/:id', async(req,res)=> {
  try {
    const {id} = req.params;

    const details = await Details.findByIdAndUpdate(id, req.body);
    if(!details) {
      return res.status(404).json({message:"Detail Not Found"});
    }
    const updateDetails = await Details.findById(id);
    res.status(200).json(updateDetails)
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
});


app.delete('/submit/:id', async(req,res)=> {
  try {
    const {id} = req.params;

    const detail = await Details.findByIdAndDelete(id, req.body);
    if(!detail) {
      return res.status(404).json({message:"Detail Not Found"});
    }
    res.status(200).json({message:"Details Deleted Successfully"})
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
});


