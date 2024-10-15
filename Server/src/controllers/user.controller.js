import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import dotenv from "dotenv"
import jwt from 'jsonwebtoken';
import { verifyJWT } from "../middlewares/auth.middleware.js";

dotenv.config();
import ApiResponse from "../utils/ApiResponse.js";
 
const registerUser = asyncHandler(async (req, res) => {
     
    const { username, email,fullname, password1,password2} = req.body;
    console.log(username, email, fullname, password1, password2)

    if([username, email, fullname, password1, password2].some((field)=>field?.trim ==="")){
        throw new ApiError(400,"All fields are required")
    }
    

  const existUser = await  User.findOne({
        $or: [
            { username },
            { email },
        ],
    })
    if (existUser) {
        throw new ApiError(409, "Username or email already exists");
    }


     
  const user = await  User.create({
        username,
        email,
        fullname,
        password:password1,
        

    })


    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser) throw new ApiError(500,"User not created Sucessfully");

   return   res.status(201).json(new ApiResponse(201,createdUser,"User registered successfully" ))
    
     
});



const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken =  user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken:accessToken, refreshToken:refreshToken}


    } catch(error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


 const loginUser = asyncHandler(async (req, res) => {
  // Extract email and password from request body
  const {  email, password} = req.body;
  console.log( email,  password)

  // Check if email or password fields are empty
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  // Check if the email exists in the database
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new ApiError(400, "Email does not exist");
  }

  // Verify if the password is correct
  const validOrNot = await existingUser.isPasswordCorrect(password);
  if (!validOrNot) {
    throw new ApiError(401, "Incorrect password");
  }

  // Generate access and refresh tokens
  
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(existingUser._id);
  // console.log(accessToken,refreshToken)
  // Retrieve the logged-in user data without the refreshToken and password fields
  const loggedInUser = await User.findById(existingUser._id).select("-refreshToken -password");

  // Set cookie options
  const options = {
    httpOnly: true,
    secure: false,
  };

  // Return the tokens and user data to the client
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, {
      user: loggedInUser,
      accessToken:accessToken,
      refreshToken:refreshToken,
    }, "User logged in successfully"));
});



const logoutUser = asyncHandler(async (req,res) =>{
    await User.findByIdAndUpdate(req.user._id,{$unset:{refreshToken:""}})
    // clear cookies
    const options = {
        httpOnly:true,
       secure:false
    }
    return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(new ApiResponse(200,{},"user logged out succesfully"))
})
    
 




const refreshAccessToken = asyncHandler(
  async (req,res) =>{

     const incomingToken = req.cookies?.refreshToken ||  req?.header("AuthorizationRef")?.replace("Bearer ", "")
     console.log(req?.header("AuthorizationRef")?.replace("Bearer ", ""))
      
     if(!incomingToken){
        throw new ApiError(401,"Unauthorized request due to this")
     }
     const decodedToken =  jwt.verify(incomingToken,process.env.REFRESH_TOKEN_SECRET)
    
try {
       const user  =  await User.findById(decodedToken._id)
       console.log(user)
       if(!user){
          throw new ApiError(401,"Invalid refresh token")
       }
       console.log(incomingToken == user.refreshToken)
    //    if(incomingToken !== user.refreshToken){
    //     throw new ApiError(401,"Refresh token is expired or used")
    // }
   const {accessToken,refreshToken}=await generateAccessAndRefereshTokens(user._id)
       
       const options = {
          httpOnly:true,
          secure:false
       }
       return res
       .status(200)
       .cookie("accessToken", accessToken, options)
       .cookie("refreshToken", refreshToken, options)
       .json(new ApiResponse(200, {accessToken,refreshToken,user}, "acess and refresh token generated sucsessfully"));
    }
  

   catch (error) {
  console.log(error)
}
}


)


const changeCurrentPassword = asyncHandler(async (req,res) => {
  const { oldPassword, newPassword } = req.body;
   
  if (!oldPassword ||!newPassword) {
    throw new ApiError(400, "All fields are required");
  }
  if(oldPassword===newPassword) {
    throw new ApiError(400, "Old and new password should not be same");
  }
   
  const user = req.user;

  const currentUser = await User.findById(user._id);
  const validOrNot = await currentUser.isPasswordCorrect(oldPassword);
  if (!validOrNot) {
    throw new ApiError(401, "Incorrect old password");
  }
  currentUser.password = newPassword;
  await currentUser.save({ validateBeforeSave: false });
  return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));

})


const currentUser = asyncHandler(
  async(req,res)=>{
    const user = req.user
    if(!user){
      throw new ApiError(401,"Unauthorized request")
    }
    const currentUser = await User.findById(user._id).select(["-password refreshToken"])
    if(!currentUser){
      throw new ApiError(404,"User not found")
    }
    return res.status(200).json(new ApiResponse(200,currentUser,"User data"))
  }
)


const updateUser = asyncHandler(
  async(req,res)=>{
    const {email , fullname} = req.body
    if(!fullname ||!email){
      throw new ApiError(400,"all fields  are required")
    }
    const updatedUser = await User.findByIdAndUpdate(req.user._id,{
      $set:{
        fullname,
        email
      }
    },{new:ture}).select(["-password "])

    return res.status(200).json(new ApiResponse(200,updatedUser,"email and fullname updated successfully"))


  }
)

const updateAvatar = asyncHandler(async(req,res)=>{
    const avtarLocalPath = req.files?.avtar[0].path
    if(!avtarLocalPath){ throw new ApiError(400,"avatar img is required")}  
    const avtarcloud  = await uploadOnCloudinary(avtarLocalPath)
    if(!avtarcloud?.url ) throw new ApiError(500,"Error uploading images")
      
    const updatedUser = await User.findByIdAndUpdate(req.user._id
      ,
      {$set:
      {
      avtar:avtarcloud.url
      }}
     ,
     {new:true}).select(["-password refreshToken"])
     return res.status(200).json(new ApiResponse(200,updatedUser,"avatar updated successfully"))
})

const updateCoverImg = asyncHandler(async(req,res)=>{
  const coverLocalPath = req.files?.cover_Img[0].path
  if(!coverLocalPath){ throw new ApiError(400,"cover img is required")}  
  const covercloud  = await uploadOnCloudinary(coverLocalPath)
  if(!covercloud?.url ) throw new ApiError(500,"Error uploading images")
      
  const updatedUser = await User.findByIdAndUpdate(req.user._id
      ,
      {$set:
      {
      coverImg:covercloud.url || undefined     }}
     ,
     {new:true}).select(["-password"])
     return res.status(200).json(new ApiResponse(200,updatedUser,

      "coverimage  updated successfully"
     ))
})



const getUserChannel = asyncHandler(  
  async(req,res)=>{
    const username = req.params
    if(!username?.trim()){
         throw new ApiError(400,"username is missing")
    }
    


    const result = await User.aggregate([
      {
        $match:{
          username:username?.toLowercase()
        }
      },
      {
        $lookup:{
          from:"subscription",
          localField:"_id",
          foreignField:"channel",
          as:"subscribers"
        }
      },
      {
        $lookup:{
          from:"subscription",
          localField:"_id",
          foreignField:"subscriber",
          as:"subscriptions"
        }
      },
      {
        $addFields:{
          subscribersCout:{$size:"$subscribers"},
          subscriptionsCount:{$size:"$subscriptions"},
          isSubscribed: {
            $cond: {
                if: {$in: [req.user?._id, "$subscribers.subscriber"]},
                then: true,
                else: false
            }
              }

        }
      }
    ])


    if(!result?.length){
        throw new ApiError(404,"channel not found")
    }
    return res.status(200).json(new ApiResponse(200,result[0],"channel data"))
  
})


const getWatchHistory = asyncHandler(async(req,res) =>{
  const username = req.params
  if(!username?.trim()){
     throw new ApiError(400,"username is missing")
  }
  const user = await User.aggregate([
    {$match:{username:username?.tolowerCase()}},
    {
      $lookup:{
        from:"videos",
        foreignField:"_id",
        localField:"watchHistory",
        as:"watchHistory",
        pipeline:[
          {
            $lookup:{
              from:"users",
              foreignField:"_id",
              localField:"owner",
              as:"owner",
              pipeline:[
                {
                  $project:{
                    username:1,
                    fullname:1,
                    avtar:1
                  }

                }
              ]
            }
          },
          {
            $addFields:{
              owner:{
                $first:"$owner"
              }
            }
          },

        

        ]
      }
    }
  ])
  
  

  return  res.status(200).json(new ApiResponse(200,user[0],"watchHistory fetched succesfully"))
  
})

const getTweets = asyncHandler(
  async(req,res)=>{
     const user = await User.findById(req.user?._id)
     if(!user){
       throw new ApiError(401,"Unauthorized request")
     }
     const users = await User.aggregate([
      {
        $match:{
          username:user?.username.toLowerCase()
        }
      },
      {
        $lookup:{
          from:"tweets",
          foreignField:"createdBy",
          localField:"_id",
          as:"tweets"
        }
      },
      
      
     ])

     res.status(200).json(new ApiResponse(200,users,"Tweets fetched successfully"))
  } 
)




export {registerUser,loginUser,logoutUser,refreshAccessToken,changeCurrentPassword,getUserChannel,getWatchHistory,updateAvatar,updateCoverImg,updateUser,currentUser,getTweets} 

