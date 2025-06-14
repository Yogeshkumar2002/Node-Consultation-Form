const mongoose = require("mongoose");
const DetailSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  concern: {
    type: String,
    required: true,
  },
  emergencyName: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  emergencyContact: {
    type: Number,
    required: true,
  },
  alternateContact: {
    type: Number,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  severity: {
    type: String,
    required: true,
  },
  symptomsChanged: {
    type: String,
    required: true,
  },
  consultedDoctor: {
    type: String,
    required: true,
  },
  diseases: {
    type: [String],
    required: true,
  },
  vaccinations: {
    type: String,
    required: true,
  },
  ReceivedVaccine: {
    type: String,
    required: true,
  },
  smoking: {
    type: String,
    required: true,
  },
  Drinking: {
    type: String,
    required: true,
  },
  Drug: {
    type: String,
    required: true,
  },
  Caffeine: {
    type: String,
    required: true,
  },
  Exercise: {
    type: String,
    required: true,
  },
  Sleep: {
    type: String,
    required: true,
  },
  Diet: {
    type: String,
    required: true,
  },
  Feeling: {
    type: String,
    required: true,
  },
  Therapy: {
    type: String,
    required: true,
  },
  Disability: {
    type: String,
    required: true,
  },
  Report: {
   name: {
     type: String,
    required: true,
   },
   size: {
     type: Number,
     required: true
   }, 
   mimetype: {
    type: String,
    required: true,
   }
  },
  dor: {
    type: Date,
    required: true,
  },
  typeOfTest: {
    type: String,
    required: true,
  },
},
{
    timestamps: true
});

const Details = mongoose.model("Details", DetailSchema);
module.exports = Details;



