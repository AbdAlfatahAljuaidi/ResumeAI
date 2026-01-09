const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resumeTitle: { type: String, required: true }, // To distinguish between resumes
  personalInfo: {
    name: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    summary: { type: String},
    website: { type: String},
    linkedin: { type: String}

  },
  experience: [{
    jobName: { type: String, required: true },
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: String }, // String to allow "Present" or Dates
    stillWorking: { type: Boolean, default: false },
    description: { type: String }
  }],
  education: [{
    faculty: { type: String, required: true },
    universityName: { type: String, required: true },
    address: { type: String, required: true },
    grade: { type: Number },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  }],
  skills: [{
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., "Technical" or "Soft Skill"
    level: { type: String } // e.g., "Expert", "Beginner"
  }]
}, { timestamps: true });


module.exports = mongoose.model('resume', resumeSchema);