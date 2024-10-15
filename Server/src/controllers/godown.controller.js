import { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Godown } from "../models/godown.model.js";

const getGodown = asyncHandler(async (req, res) => {
  const godownData = await Godown.aggregate([
    {
      $match: {
        $expr: {
          $or: [
            { $eq: ["$parent_godown", null] },
            { $eq: ["$parent_godown", "$id"] }
          ]
        }
      }
    },
    {
      $lookup: {
        from: "items",
        localField: "id",
        foreignField: "godown_id",
        as: "items"
      }
    },
    {
      $graphLookup: {
        from: "godowns",
        startWith: "$id",
        connectFromField: "id",
        connectToField: "parent_godown",
        as: "subGodowns"
      }
    },
    {
      $lookup: {
        from: "items",
        localField: "subGodowns.id",
        foreignField: "godown_id",
        as: "subGodownsItems"
      }
    },
    {
      $addFields: {
        subGodowns: {
          $map: {
            input: "$subGodowns",
            as: "subGodown",
            in: {
              id: "$$subGodown.id", // Explicitly add subgodown_id field
              name: "$$subGodown.name",
              items: {
                $filter: {
                  input: "$subGodownsItems",
                  as: "item",
                  cond: { $eq: ["$$item.godown_id", "$$subGodown.id"] }
                }
              }
            }
          }
        },
        godown_id: "$id", // Explicitly add godown_id field
        items: {
          $map: {
            input: "$items",
            as: "item",
            in: "$$item"
          }
        }
      }
    },
    {
      $project: {
        name: 1,
        id: 1, // Include godown_id in the result
        items: 1,
        subGodowns: 1
      }
    }
  ]);
  
    
    // console.log(godownData);

    if (!godownData) {
        throw new ApiError(404, "Godown not found");
    }

    res.status(200).json(new ApiResponse(200, { godownData }, "Godown fetched successfully"));
});

export { getGodown };
