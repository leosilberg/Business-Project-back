import type { Request, Response } from "express";
import Like from "../models/like.model.ts";
import Review from "../models/review.model.ts";
import type { AuthRequest } from "../types/authTypes.ts";

export async function likeReview(req: Request, res: Response) {
  const { reviewId } = req.params;
  const userId = (req as AuthRequest).userId;
  try {
    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId },
      { $inc: { likes: 1 } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedReview) {
      console.log(`review.controller: Not found`, reviewId);
      return res.status(401).json("No review found");
    }

    const newLike = new Like({
      review: reviewId,
      user: userId,
    });
    const savedLike = await newLike.save();

    res.status(200).json(updatedReview);
  } catch (error) {
    console.log(`review.controller: `, (error as Error).message);
    res.status(500).json("Server error while liking review");
  }
}

export async function removeLikeReview(req: Request, res: Response) {
  const { reviewId } = req.params;
  const userId = (req as AuthRequest).userId;
  try {
    const deletedLike = await Like.findOneAndDelete({
      review: reviewId,
      user: userId,
    });

    if (!deletedLike) {
      console.log(`review.controller: not found `, reviewId, userId);
      return res.status(401).json("Review has not been liked");
    }

    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId },
      { $inc: { likes: -1 } },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(updatedReview);
  } catch (error) {
    console.log(`review.controller: `, (error as Error).message);
    res.status(500).json("Server error while deleting liked review");
  }
}
