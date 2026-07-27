import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  salary: { type: String, default: "" },
  type: { type: String, enum: ["full-time", "part-time", "contract", "internship"], default: "full-time" },
  description: { type: String, default: "" },
  requirements: [{ type: String }],
  benefits: [{ type: String }],
  remote: { type: Boolean, default: false },
  postedDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Job', JobSchema);
