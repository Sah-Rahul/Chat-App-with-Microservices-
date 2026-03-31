import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: (origin, cb) => {
    const allowed = (process.env.CORS_ORIGINS ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!origin) return cb(null, true);

    if (allowed.includes(origin)) return cb(null, true);

    return cb(new Error("CORS blocked"), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
