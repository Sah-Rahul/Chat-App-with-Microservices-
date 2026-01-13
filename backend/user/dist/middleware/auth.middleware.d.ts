import type { Request } from "express";
import type { IUser } from "../model/user.model.js";
export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}
export declare const isauth: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
//# sourceMappingURL=auth.middleware.d.ts.map