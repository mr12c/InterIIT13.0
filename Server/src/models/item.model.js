import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
   
  item_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
     
    required: true
  },
  godown_id: {
    type:String,

    required: true
  },
  brand: {
    type: String,
    required: true
  },
  attributes: {
    type: Object,
    required: true,
    properties: {
      type: { type: String, required: true },
      material: { type: String, required: true },
      warranty_years: { type: Number, required: true }
    }
  },
  image_url: {
    type: String,
    required: true
  }
});

export const Item = mongoose.model('Item', itemSchema);
