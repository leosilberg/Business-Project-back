import type { Request, Response } from "express";
import mongoose from "mongoose";
import Business from "../models/business.model.ts";
import Review from "../models/review.model.ts";

interface BusinessQuery {
  page?: string;
  pageCount?: string;
  sortBy?: string;
  name?: string;
  district?: string;
  city?: string;
  category?: string;
  minRating?: string;
}

export async function getBusinesses(
  req: Request<unknown, unknown, unknown, BusinessQuery>,
  res: Response
) {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const pageCount = req.query.pageCount ? parseInt(req.query.pageCount) : 8;
  const sortBy = req.query.sortBy ? req.query.sortBy : "name";
  const name = req.query.name;
  const district = req.query.district;
  const city = req.query.city;
  const category = req.query.category?.split(",");
  const minRating = req.query.minRating && parseInt(req.query.minRating);

  const match = {
    ...(name && { name: { $regex: name, $options: "i" } }),
    ...(district && { district: { $regex: district, $options: "i" } }),
    ...(city && { city: { $regex: city, $options: "i" } }),
    ...(category && { category: { $in: category } }),
    ...(minRating && { avgRating: { $gte: minRating } }),
  };

  try {
    const businesses = await Business.aggregate([
      { $match: match },
      {
        $facet: {
          data: [
            {
              $sort: { [sortBy]: 1 },
            },
            { $skip: (page - 1) * pageCount },
            { $limit: pageCount },
          ],
          total: [{ $count: "count" }],
        },
      },
      {
        $project: {
          data: 1,
          currentpage: { $ceil: page },
          totalPages: {
            $ceil: {
              $divide: [{ $arrayElemAt: ["$total.count", 0] }, pageCount],
            },
          },
        },
      },
    ]);

    // const businesses = await Business.aggregate([
    //   {
    //     $facet: {
    //       data: [
    //         { $match: match },
    //         {
    //           $sort: { [sortBy]: 1 },
    //         },
    //         { $skip: (pageNum - 1) * pageCount },
    //         { $limit: pageCount },
    //         {
    //           $lookup: {
    //             from: "reviews",
    //             localField: "_id",
    //             foreignField: "businessId",
    //             as: "reviews",
    //           },
    //         },
    //         { $unwind: "$reviews" },
    //         {
    //           $group: {
    //             _id: "$_id",
    //             avgRating: { $avg: "$reviews.rating" },
    //             business: { $first: "$$ROOT" },
    //           },
    //         },
    //         {
    //           $replaceRoot: {
    //             newRoot: {
    //               $mergeObjects: [
    //                 "$business",
    //                 { avgRating: { $round: ["$avgRating", 1] } },
    //               ],
    //             },
    //           },
    //         },
    //         {
    //           $match: minRating ? { avgRating: { $gte: minRating } } : {},
    //         },
    //         {
    //           $unset: "reviews",
    //         },
    //         {
    //           $sort: { [sortBy]: 1 },
    //         },
    //       ],
    //       total: [{ $count: "count" }],
    //     },
    //   },
    //   {
    //     $project: {
    //       data: 1,
    //       currentpage: { $ceil: pageNum },
    //       totalPages: {
    //         $ceil: {
    //           $divide: [{ $arrayElemAt: ["$total.count", 0] }, pageCount],
    //         },
    //       },
    //     },
    //   },
    // ]);

    res.status(200).json(businesses[0]);
  } catch (error) {
    console.log(`business.controller: `, (error as Error).message);
    res.status(500).json("Server error getting all businesses");
  }
}

export async function getBusiness(req: Request, res: Response) {
  const { businessId } = req.params;
  try {
    const business = await Business.findById(businessId);
    if (!business) {
      console.log(`business.controller: Not found `, businessId);
      return res.status(401).json("No business found");
    }

    res.status(200).json(business);
  } catch (error) {
    console.log(`business.controller: `, (error as Error).message);
    res.status(500).json("Server error getting business");
  }
}

export async function createBusiness(req: Request, res: Response) {
  try {
    const newBusiness = new Business(req.body);
    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    error as Error;
    console.log(`business.controller: `, (error as Error).message);
    if ((error as Error).name === "ValidationError") {
      res.status(400).json((error as Error).message);
    } else {
      res.status(500).json("Server error while creating business");
    }
  }
}

export async function editBusiness(req: Request, res: Response) {
  const { businessId } = req.params;

  try {
    const updatedBusiness = await Business.findOneAndUpdate(
      { _id: businessId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBusiness) {
      console.log(`business.controller: Not found`, businessId);
      return res.status(401).json("No business found");
    }

    res.status(200).json(updatedBusiness);
  } catch (error) {
    console.log(`business.controller: `, (error as Error).message);
    if ((error as Error).name === "ValidationError") {
      res.status(400).json((error as Error).message);
    } else {
      res.status(500).json({ message: "Server error while updating business" });
    }
  }
}
export async function updateBusinessRating(businessId: string) {
  try {
    const aggregate = await Review.aggregate([
      { $match: { businessId: new mongoose.Types.ObjectId(businessId) } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
      { $set: { avgRating: { $round: ["$avgRating", 1] } } },
    ]);

    const updatedBusiness = await Business.findOneAndUpdate(
      { _id: businessId },
      { avgRating: aggregate[0].avgRating },
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (error) {
    console.log(`business.controller: update rating`, (error as Error).message);
  }
}

export async function deleteBusiness(req: Request, res: Response) {
  const { businessId } = req.params;
  try {
    const deletedBusiness = await Business.findOneAndDelete({
      _id: businessId,
    });

    if (!deletedBusiness) {
      console.log(`business.controller: `, businessId);
      res.status(404).json("No business found");
    }
    res.status(200).json("Business deleted succesfuly");
  } catch (error) {
    console.log(`business.controller: `, (error as Error).message);
    res.status(500).json("Server error deleting business");
  }
}
