import type { Request, Response } from "express";
import type { Server } from "socket.io";
import Review from "../models/review.model.ts";
import User from "../models/user.model.ts";
import type { AuthRequest } from "../types/authTypes.ts";

export async function getReviewsByBusinessId(req: Request, res: Response) {
  const { businessId } = req.params;
  try {
    const reviews = await Review.find({ businessId: businessId }).sort({
      updatedAt: -1,
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.log(`review.controller: `, (error as Error).message);
    res.status(500).json("Server error getting all reviews");
  }
}

export async function getReview(req: Request, res: Response) {
  const { reviewId } = req.params;
  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      console.log(`review.controller: Not found `, reviewId);
      return res.status(401).json("No review found");
    }

    res.status(200).json(review);
  } catch (error) {
    console.log(`review.controller: `, (error as Error).message);
    res.status(500).json("Server error getting review");
  }
}

export async function createReview(req: Request, res: Response) {
  const { businessId } = req.params;
  const userId = (req as AuthRequest).userId;
  const { title, description, rating } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log(`review.controller: Not found user`, userId);
      return res.status(401).json("No user found");
    }

    const { username } = user;

    const newReview = new Review({
      title,
      description,
      username,
      rating,
      businessId: businessId,
      userId: userId,
    });

    const savedReview = await newReview.save();
    const io = req.app.get("io") as Server;
    io.to(businessId).emit("newReview", savedReview);
    res.status(201).json(savedReview);
  } catch (error) {
    console.log(`review.controller: `, (error as Error).message);
    if ((error as Error).name === "ValidationError") {
      res.status(400).json((error as Error).message);
    } else {
      res.status(500).json("Server error while creating review");
    }
  }
}

export async function editReview(req: Request, res: Response) {
  const { reviewId } = req.params;

  try {
    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedReview) {
      console.log(`review.controller: `, reviewId);
      return res.status(401).json("No review found");
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    console.log(`review.controller: `, (error as Error).message);
    if ((error as Error).name === "ValidationError") {
      res.status(400).json((error as Error).message);
    } else {
      res.status(500).json({ message: "Server error while updating review" });
    }
  }
}

export async function deleteReview(req: Request, res: Response) {
  const { reviewId } = req.params;
  try {
    const deletedReview = await Review.findOneAndDelete({
      _id: reviewId,
    });

    if (!deletedReview) {
      console.log(`review.controller: `, reviewId);
      res.status(404).json("No review found");
    }
    res.status(200).json("Review deleted succesfuly");
  } catch (error) {
    console.log(`review.controller: `, (error as Error).message);
    res.status(500).json("Server error deleting review");
  }
}
