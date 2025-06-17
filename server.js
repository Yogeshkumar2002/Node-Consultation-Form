const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const Details = require("./models/form.model.js");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

mongoose
  .connect(
    "mongodb+srv://yogeshkumar2002rs:Yogesh2002@cluster0.580d7um.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server is running on port 5000 thanks");
    });
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });

app.get("/submit", async (req, res) => {
  try {
    const detail = await Details.find({});
    res.status(200).json(detail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/submit", upload.single("Report"), async (req, res) => {
  try {
    const { body, file } = req;

    const details = {
      ...body,
      Report: file ? {
        originalName: file.originalname,
        storedFileName: file.filename,
        size: file.size,
        mimetype: file.mimetype,
        newPath: `/uploads/${file.filename}`,
      }
      : null,
    };

    const newEntry = new Details(details);
    await newEntry.save();

    res.status(200).json({ message: "Form submitted successfully", newEntry});
  } catch (err) {
    console.error("Backend Error:", err);
    res.status(400).json({ error: err.message });
  }
});

app.put("/submit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const details = await Details.findByIdAndUpdate(id, req.body);
    if (!details) {
      return res.status(404).json({ message: "Detail Not Found" });
    }
    const updateDetails = await Details.findById(id);
    res.status(200).json(updateDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/submit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const detail = await Details.findByIdAndDelete(id, req.body);
    if (!detail) {
      return res.status(404).json({ message: "Detail Not Found" });
    }
    res.status(200).json({ message: "Details Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
