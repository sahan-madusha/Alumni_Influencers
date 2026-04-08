import { Router } from "express";
import { protect, validate } from "../middlewares";
import { bidController } from "../controllers/bid.controller";
import { placeBidSchema, updateBidSchema } from "../models/bid.model";

const router = Router();

router.post(
  "/",
  protect,
  validate(placeBidSchema),
  bidController.placeBid,
  /* 
      #swagger.tags = ['Bidding']
      #swagger.description = 'Place a new blind bid for the Alumni of the Day.'
    */
);
router.patch(
  "/",
  protect,
  validate(updateBidSchema),
  bidController.updateBid,
  /* 
      #swagger.tags = ['Bidding']
      #swagger.description = 'Update an existing active bid (Increase only).'
    */
);
router.get(
  "/status",
  protect,
  bidController.getBidStatus,
  /* 
      #swagger.tags = ['Bidding']
      #swagger.description = 'Check your current bidding status (Winning/Losing).'
    */
);
router.get(
  "/slots",
  protect,
  bidController.getRemainingSlots,
  /* 
      #swagger.tags = ['Bidding']
      #swagger.description = 'Check how many times more you can win this month.'
    */
);
router.post(
  "/trigger-selection",
  protect,
  bidController.triggerSelection,
  /* 
      #swagger.tags = ['Bidding']
      #swagger.description = 'DEBUG: Manually trigger the daily winner selection (midnight logic).'
    */
);

export const bidRoutes = router;
