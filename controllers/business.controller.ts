import type { Request, Response } from "express";
import Business from "../models/business.model.ts";

export async function getBusinesses(req: Request, res: Response) {
  try {
    const businesses = await Business.find();
    res.status(200).json(businesses);
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
