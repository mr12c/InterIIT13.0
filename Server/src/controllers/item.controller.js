import { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Item } from "../models/item.model.js";


const getItemById  =  asyncHandler( async(req,res) => {
    const {item_id} = req.params 
    if(!item_id){
        throw new ApiError(400,'item_id is required')
    }
    const item = await Item.findById({_id: item_id})
    if(!item){
        throw new ApiError(404,"item not found")
    }
    res.status(200).json(new ApiResponse(200,{item},"item fetched successfully"))
    

})

const getItemsByCategory = asyncHandler(async(req,res) => {
    const {category} = req.params
    if(!category){
        throw new ApiError(400,'category is required')
    }
    const items = await Item.find({category})
    res.status(200).json(new ApiResponse(200,{items},"items fetched successfully"))
})


const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Item.distinct('category');
    console.log(categories)
    if (!categories.length) {
      throw new ApiError(404, 'No categories found');
    }
  
    res.status(200).json(new ApiResponse(200, { categories }, 'Categories fetched successfully'));
  });
  

const advancedSearch = asyncHandler(async (req, res) => {
    const { name, category, pricerange } = req.query;
  
    
    let query = {};
  
    if (name) {
      query.name = { $regex: name, $options: 'i' }; 
    }
  
    if (category) {
      query.category = category; 
    }
  
    if (pricerange) {
      if (pricerange === 'cheap') {
        query.price = { $gte: 0, $lte: 40 };
      } else if (pricerange === 'middle') {
        query.price = { $gte: 40, $lte: 150 };
      } else if (pricerange === 'high') {
        query.price = { $gt: 150 };
      }
    }
  
    
    const items = await Item.find(query);
  
    
    if (!items.length) {
      throw new ApiError(404, 'No items found for the given search criteria');
    }
  
    
    res.status(200).json(new ApiResponse(200, { items }, 'Items fetched successfully'));
  });
  
  const changedGodown  =  asyncHandler(async (req,res)=>{
    const {godown_id,item_id} = req.body
    if(!godown_id ||!item_id){
        throw new ApiError(400,'Both godown_id and item_id are required')
    }
    const item = await Item.findByIdAndUpdate(item_id,{
      $set:{
        godown_id: godown_id
      }
    })

    if(!item){
        throw new ApiError(404,"item not found")
    }
    res.status(200).json(new ApiResponse(200,{item},"item updated successfully"))
    

  })


export {getItemById,getItemsByCategory,getAllCategories,advancedSearch,changedGodown}