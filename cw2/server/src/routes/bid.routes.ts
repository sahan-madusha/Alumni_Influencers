import { Router } from "express";
import { protect, validate } from "../middlewares";
import { bidController } from "../controllers/bid.controller";
import { placeBidSchema, updateBidSchema } from "../models/bid.model";

const router = Router();

router.post(
  "/",
  protect,
  validate(placeBidSchema),
  bidController.createBid,
  /* 
      #swagger.tags = ['Bidding']
      #swagger.description = 'Place a new bid for today.'
    */
);
router.patch(
  "/",
  protect,
  validate(updateBidSchema),
  bidController.updateBid,
  /* 
      #swagger.tags = ['Bidding']
      #swagger.description = 'Update your active pending bid for today.'
    */
);
router.delete(
  "/",
  protect,
  bidController.cancelBid,

  /* 
      #swagger.tags = ['Bidding']
      #swagger.description = 'Cancel your active pending bid for today.'
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
  "/limit",
  protect,
  bidController.getRemainingLimit,
  /* 
      #swagger.tags = ['Bidding']
      #swagger.description = 'Check how many times more you can win this month.'
    */
);
router.get(
  "/history",
  protect,
  bidController.getBidingHistory,
  /* 
      #swagger.tags = ['Bidding']
      #swagger.description = 'View your personal bidding history (WIN, LOSS, PENDING).'
    */
);

router.get(
  "/alumni-of-the-day",
  bidController.getAlumniOfTheDay,
  /* 
      #swagger.tags = ['Bidding']
      #swagger.description = 'Retrieve the current Alumni of the Day (today\'s featured winner).'
    */
);
router.get(
  "/tomorrow-slot",
  bidController.getTomorrowSlotStatus,
  /* 
      #swagger.tags = ['Bidding']
      #swagger.description = 'Check the availability of tomorrow\'s bidding slot.'
    */
);

export const bidRoutes = router;
