import Router from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getItemById, getItemsByCategory, getAllCategories, advancedSearch, changedGodown } from "../controllers/item.controller.js";
 

const router = Router();

router.route('/:item_id').get(verifyJWT,getItemById);
router.route('/getItemByCategory/:category').get(verifyJWT,getItemsByCategory);
router.route('/getAllCategories').post(getAllCategories);
router.route('/changeGodown').post(changedGodown)
// New advanced search route
router.route('/search/advanced').get(advancedSearch);

export default router;
