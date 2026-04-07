import { Router } from "express";
import { protect, validate } from "../middlewares";
import { profileController } from "../controllers";
import {
  certificationSchema,
  degreeSchema,
  employmentSchema,
  licenseSchema,
  updateCertificationSchema,
  updateDegreeSchema,
  updateEmploymentSchema,
  updateLicenseSchema,
  updateProfileSchema,
} from "../models";
import { upload } from "../middlewares";

const router = Router();

router.get(
  "/",
  protect,
  profileController.getProfile /* #swagger.tags = ['Profile'] #swagger.description = 'Retrieve the profile.' */,
);

router.patch(
  "/update",
  protect,
  validate(updateProfileSchema),
  profileController.updateProfile /* #swagger.tags = ['Profile'] #swagger.description = 'Update the profile. All fields are optional.' */,
);

router.post(
  "/upload-picture",
  protect,
  upload.single("profilePicture"),
  profileController.uploadProfilePicture /* #swagger.tags = ['Profile'] #swagger.description = 'Upload a profile picture. Max size 5MB.' */,
);

router.post(
  "/degree",
  protect,
  validate(degreeSchema),
  profileController.addDegree /* #swagger.tags = ['Profile'] */,
);
router.patch(
  "/degree/:id",
  protect,
  validate(updateDegreeSchema),
  profileController.updateDegree /* #swagger.tags = ['Profile'] */,
);
router.delete(
  "/degree/:id",
  protect,
  profileController.deleteDegree /* #swagger.tags = ['Profile'] */,
);

router.post(
  "/employment",
  protect,
  validate(employmentSchema),
  profileController.addEmployment /* #swagger.tags = ['Profile'] */,
);
router.patch(
  "/employment/:id",
  protect,
  validate(updateEmploymentSchema),
  profileController.updateEmployment /* #swagger.tags = ['Profile'] */,
);
router.delete(
  "/employment/:id",
  protect,
  profileController.deleteEmployment /* #swagger.tags = ['Profile'] */,
);

router.post(
  "/certification",
  protect,
  validate(certificationSchema),
  profileController.addCertification /* #swagger.tags = ['Profile'] */,
);
router.patch(
  "/certification/:id",
  protect,
  validate(updateCertificationSchema),
  profileController.updateCertification /* #swagger.tags = ['Profile'] */,
);
router.delete(
  "/certification/:id",
  protect,
  profileController.deleteCertification /* #swagger.tags = ['Profile'] */,
);

router.post(
  "/license",
  protect,
  validate(licenseSchema),
  profileController.addLicense /* #swagger.tags = ['Profile'] */,
);
router.patch(
  "/license/:id",
  protect,
  validate(updateLicenseSchema),
  profileController.updateLicense /* #swagger.tags = ['Profile'] */,
);
router.delete(
  "/license/:id",
  protect,
  profileController.deleteLicense /* #swagger.tags = ['Profile'] */,
);

export const profileRoutes = router;
