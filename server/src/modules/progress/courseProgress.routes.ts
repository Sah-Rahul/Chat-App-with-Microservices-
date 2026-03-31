 
import express from 'express';
import * as progressController from './courseProgress.controller'; 
import {
  updateProgressSchema,
  markLectureCompleteSchema,
  updateQuizScoreSchema,
  updateAssignmentScoreSchema,
  getProgressQuerySchema,
  getCourseProgressSchema,
} from './courseProgress.zod';
import { isAuthenticated } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { UserRole } from '../users/user.enums';
import { authorize } from '../../middleware/authorized.middleware';

const courseProgressRoutes = express.Router();

 
courseProgressRoutes.post(
  '/:courseId/update',
  isAuthenticated,
  validate(updateProgressSchema),
  progressController.updateProgress
);

 
courseProgressRoutes.post(
  '/:courseId/complete-lecture',
  isAuthenticated,
  validate(markLectureCompleteSchema),
  progressController.markLectureComplete
);

 
courseProgressRoutes.post(
  '/:courseId/quiz-score',
  isAuthenticated,
  validate(updateQuizScoreSchema),
  progressController.updateQuizScore
);

 
courseProgressRoutes.post(
  '/:courseId/assignment-score',
  isAuthenticated,
  validate(updateAssignmentScoreSchema),
  progressController.updateAssignmentScore
);

 
courseProgressRoutes.get(
  '/:courseId',
  isAuthenticated,
  validate(getCourseProgressSchema),
  progressController.getCourseProgress
);

 
courseProgressRoutes.get(
  '/',
  isAuthenticated,
  validate(getProgressQuerySchema),
  progressController.getAllProgress
);

 
courseProgressRoutes.delete(
  '/:courseId/reset',
  isAuthenticated,
  validate(getCourseProgressSchema),
  progressController.resetProgress
);

 
courseProgressRoutes.get(
  '/:courseId/statistics',
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.SUPER_ADMIN),
  validate(getCourseProgressSchema),
  progressController.getProgressStatistics
);

export default courseProgressRoutes;