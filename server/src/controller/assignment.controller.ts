import { Response } from "express";
import asyncHandler from "../utils/AsyncHandler";
import {
  AssignmentModel,
  AssignmentStatus,
  ATask,
} from "../models/assignment.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import {
  CreateTaskSchema,
  GradeTaskSchema,
  SubmitTaskSchema,
  UpdateTaskSchema,
} from "../validation/Assignment.validation";
import { AuthRequest } from "../@types/auth.types";
import mongoose from "mongoose";

export const createAssignment = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized: user not found");

    const parsed = CreateTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`,
      );
      throw new ApiError(400, "Invalid input", errors);
    }

    const assignmentData: Partial<ATask> = {
      ...parsed.data,
      assignedBy: new mongoose.Types.ObjectId(req.user.id),

      assignedTo: parsed.data.assignedTo
        ? new mongoose.Types.ObjectId(parsed.data.assignedTo)
        : undefined,
    };

    const assignment = await AssignmentModel.create(assignmentData);

    res.json(
      new ApiResponse(200, assignment, "Assignment created successfully"),
    );
  },
);

export const updateAssignment = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized: user not found");
    }

    const parsed = UpdateTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`,
      );
      throw new ApiError(400, "Invalid input", errors);
    }

    const assignmentId = req.params.id;

    const updatedAssignment = await AssignmentModel.findOneAndUpdate(
      {
        _id: assignmentId,
        assignedBy: req.user.id,
      },
      { $set: parsed.data },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedAssignment) {
      throw new ApiError(404, "Assignment not found or you are not authorized");
    }

    res.json(
      new ApiResponse(
        200,
        updatedAssignment,
        "Assignment updated successfully",
      ),
    );
  },
);

export const deleteAssignment = asyncHandler(async (req: AuthRequest, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized: user not found");
  }

  const assignmentId = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
    throw new ApiError(400, "Invalid assignment ID");
  }

  const assignment = await AssignmentModel.findOneAndDelete({
    _id: assignmentId,
    assignedBy: req.user.id,
  });

  if (!assignment) {
    throw new ApiError(404, "Assignment not found or you are not authorized");
  }

  res.json(new ApiResponse(200, null, "Assignment deleted successfully"));
});

export const submitAssignment = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }
    const parsed = SubmitTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map(
        (i) => `${i.path.join(".")}: ${i.message}`,
      );
      throw new ApiError(400, "Invalid input", errors);
    }

    const assignment = await AssignmentModel.findById(req.params.id);
    if (!assignment) {
      throw new ApiError(404, "Assignment not found");
    }


    if (
      assignment.assignedTo &&
      assignment.assignedTo.toString() !== req.user.id
    ) {
      throw new ApiError(403, "You are not assigned to this task");
    }

    const updateData: any = {
      status: parsed.data.status,
      submittedBy: req.user.id,
    };

    switch (parsed.data.status) {
      case AssignmentStatus.IN_PROGRESS:
        updateData.submissionText = parsed.data.submissionText;
        updateData.submittedAt = null;
        break;

      case AssignmentStatus.COMPLETED:
        updateData.submissionText = parsed.data.submissionText;
        updateData.submittedAt = new Date();
        break;

      case AssignmentStatus.CANCELLED:
        updateData.submissionText = null;
        updateData.submittedAt = null;
        break;
    }

    const updatedAssignment = await AssignmentModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true },
    );

    res.json(
      new ApiResponse(200, updatedAssignment, "Assignment status updated"),
    );
  },
);

export const gradeAssignment = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const parsed = GradeTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`,
      );
      throw new ApiError(400, "Invalid input", errors);
    }

    const updatedAssignment = await AssignmentModel.findOneAndUpdate(
      { _id: req.params.id, assignedBy: req.user.id },
      {
        $set: {
          marks: parsed.data.marks,
          totalMarks: parsed.data.totalMarks,
          feedback: parsed.data.feedback,
        },
      },
      { new: true, runValidators: true },
    );

    if (!updatedAssignment) throw new ApiError(404, "Assignment not found");

    res.json(
      new ApiResponse(200, updatedAssignment, "Task graded successfully"),
    );
  },
);

export const getStudentTasks = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const tasks = await AssignmentModel.find({ assignedTo: req.user.id }).sort({
      status: 1,
      DeadLine: 1,
    });

    res.json(new ApiResponse(200, tasks, "Student tasks fetched successfully"));
  },
);

export const getTeacherTasks = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const tasks = await AssignmentModel.find({
      assignedBy: req.user.id,
    }).sort({ dueDate: 1 });

    res.json(new ApiResponse(200, tasks, "Teacher tasks fetched successfully"));
  },
);

export const getAssignmentById = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const task = await AssignmentModel.findOne({
      _id: req.params.id,
      $or: [{ assignedBy: req.user.id }, { assignedTo: req.user.id }],
    });

    if (!task) throw new ApiError(404, "Assignment not found");

    res.json(new ApiResponse(200, task, "Task fetched successfully"));
  },
);

export const assignAssignmentToStudent = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const { assignmentId, studentId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(assignmentId) ||
      !mongoose.Types.ObjectId.isValid(studentId)
    ) {
      throw new ApiError(400, "Invalid assignment or student ID");
    }

    const assignment = await AssignmentModel.findOneAndUpdate(
      {
        _id: assignmentId,
        assignedBy: req.user.id,
      },
      {
        $set: {
          assignedTo: studentId,
          status: AssignmentStatus.IN_PROGRESS,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!assignment) {
      throw new ApiError(404, "Assignment not found or not authorized");
    }

    res.json(
      new ApiResponse(200, assignment, "Assignment assigned successfully"),
    );
  },
);
