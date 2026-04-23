import { z } from "zod";

export const placeBidSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
  }),
});

export const updateBidSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
  }),
});

export type PlaceBidDTO = z.infer<typeof placeBidSchema>["body"];
export type UpdateBidDTO = z.infer<typeof updateBidSchema>["body"];

export interface BidResponseDTO {
  id: string;
  userId: string;
  amount: number;
  status: string;
  createdAt: Date;
}
