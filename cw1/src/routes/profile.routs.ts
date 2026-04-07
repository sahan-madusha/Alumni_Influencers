import { Router } from "express";
import { protect, validate } from "../middlewares";
import { profileController } from "../controllers";
import { updateProfileSchema } from "../models";
import { upload } from "../middlewares";

const router = Router();

router.get(
    "/",
    protect,
    profileController.getProfile,
    /* 
      #swagger.tags = ['Profile']
      #swagger.description = 'Retrieve the profile.'
    */
);

router.patch(
    "/update",
    protect,
    validate(updateProfileSchema),
    profileController.updateProfile,
    /* 
      #swagger.tags = ['Profile']
      #swagger.description = 'Update the profile. All fields are optional.'
    */
);

router.post(
    "/upload-picture",
    protect,
    upload.single("profilePicture"),
    profileController.uploadProfilePicture,
    /* 
      #swagger.tags = ['Profile']
      #swagger.description = 'Upload a profile picture. Max size 5MB.'
    */
);

export const profileRoutes = router;
