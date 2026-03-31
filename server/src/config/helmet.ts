import { HelmetOptions } from "helmet";

export const helmetConfig: HelmetOptions = {
  contentSecurityPolicy:
    process.env.NODE_ENV === "production" ? undefined : false,
  crossOriginEmbedderPolicy: false,
};
