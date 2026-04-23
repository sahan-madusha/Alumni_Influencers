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
  profileController.getProfile,
  /* 
    #swagger.tags = ['Profile'] 
    #swagger.path = '/profile/'
    #swagger.description = 'Retrieve the authenticated user profile.' 
  */
);


router.patch(
  "/update",
  protect,
  validate(updateProfileSchema),
  profileController.updateProfile,
  /* 
    #swagger.tags = ['Profile'] 
    #swagger.path = '/profile/update'
    #swagger.description = 'Update profile details.' 
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Profile data to update',
        schema: { $ref: '#/definitions/UpdateProfileDTO' }
    }
  */
);

router.post(
  "/upload-picture",
  protect,
  upload.single("profilePicture"),
  profileController.uploadProfilePicture,
  /* 
    #swagger.tags = ['Profile'] 
    #swagger.path = '/profile/upload-picture'
    #swagger.description = 'Upload a profile picture. Max size 5MB.' 
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['profilePicture'] = {
        in: 'formData',
        type: 'file',
        required: 'true',
        description: 'The image file to upload'
    }
  */
);

router.post(
  "/degree",
  protect,
  validate(degreeSchema),
  profileController.addDegree,
  /* 
    #swagger.tags = ['Profile'] 
    #swagger.path = '/profile/degree'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/DegreeDTO' }
    }
  */
);
router.patch(
  "/degree/:id",
  protect,
  validate(updateDegreeSchema),
  profileController.updateDegree,
  /* 
    #swagger.tags = ['Profile'] 
    #swagger.path = '/profile/degree/{id}'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/DegreeDTO' }
    }
  */
);
router.delete(
  "/degree/:id",
  protect,
  profileController.deleteDegree,
  /* 
    #swagger.tags = ['Profile'] 
    #swagger.path = '/profile/degree/{id}'
  */
);

router.post(
  "/employment",
  protect,
  validate(employmentSchema),
  profileController.addEmployment,
  /* 
    #swagger.tags = ['Profile'] 
    #swagger.path = '/profile/employment'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/EmploymentDTO' }
    }
  */
);
router.patch(
  "/employment/:id",
  protect,
  validate(updateEmploymentSchema),
  profileController.updateEmployment,
  /* 
    #swagger.tags = ['Profile'] 
    #swagger.path = '/profile/employment/{id}'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/EmploymentDTO' }
    }
  */
);
router.delete(
  "/employment/:id",
  protect,
  profileController.deleteEmployment,
  /* 
    #swagger.tags = ['Profile'] 
    #swagger.path = '/profile/employment/{id}'
  */
);

router.post(
  "/certification",
  protect,
  validate(certificationSchema),
  profileController.addCertification,
  /* 
    #swagger.tags = ['Profile'] 
    #swagger.path = '/profile/certification'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CertificationDTO' }
    }
  */
);
router.patch(
  "/certification/:id",
  protect,
  validate(updateCertificationSchema),
  profileController.updateCertification,
  /* 
    #swagger.tags = ['Profile'] 
    #swagger.path = '/profile/certification/{id}'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CertificationDTO' }
    }
  */
);
router.delete(
  "/certification/:id",
  protect,
  profileController.deleteCertification,
  /* 
    #swagger.tags = ['Profile'] 
    #swagger.path = '/profile/certification/{id}'
  */
);

router.post(
  "/license",
  protect,
  validate(licenseSchema),
  profileController.addLicense,
  /* 
    #swagger.tags = ['Profile'] 
    #swagger.path = '/profile/license'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/LicenseDTO' }
    }
  */
);
router.patch(
  "/license/:id",
  protect,
  validate(updateLicenseSchema),
  profileController.updateLicense,
  /* 
    #swagger.tags = ['Profile'] 
    #swagger.path = '/profile/license/{id}'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/LicenseDTO' }
    }
  */
);
router.delete(
  "/license/:id",
  protect,
  profileController.deleteLicense,
  /* 
    #swagger.tags = ['Profile'] 
    #swagger.path = '/profile/license/{id}'
  */
);

export const profileRoutes = router;

