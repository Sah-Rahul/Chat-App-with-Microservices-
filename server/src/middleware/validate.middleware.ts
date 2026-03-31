import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
 

export const validate =
  (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues.map((i) => i.message).join(", ");
      return next(new Error(message));
    }
    req.body = result.data;
    next();
  };
