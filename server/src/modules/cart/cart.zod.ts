import { z } from "zod";

export const addToCartSchema = z.object({
      courseId: z.string().min(1),

});

 

export const removeFromCartSchema = z.object({
  params: z.object({
    courseId: z.string().min(1),
  }),
});
