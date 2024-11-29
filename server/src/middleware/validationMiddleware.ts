import { NextFunction } from "express";
import { AnyZodObject, z, ZodSchema,ZodError } from "zod";
import { Request, Response } from "express";

export const validationMiddleware =(ZodSchema:AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                ZodSchema.parse(req.body);
                next();
            } catch (err) {
                if (err instanceof z.ZodError) {
                    res.status(400).json({ status: 400, message: err.issues, success:false })
                }
            }
        }

