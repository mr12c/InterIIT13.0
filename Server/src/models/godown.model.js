import mongoose from "mongoose";

const godownSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  parent_godown: {
    type:String,
    default: null // In case it's a top-level godown with no parent
  }
});

export const Godown = mongoose.model('Godown', godownSchema);
  