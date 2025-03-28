import SheetOne from "../models/sheet-one.js";
import { ApiError } from "../utils/ApiError.js";

// Create a new sheet one entry
export const createSheetOne = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const newEntry = new SheetOne({
      ...req.body,
      createdBy: userId,
    });

    const savedEntry = await newEntry.save();

    res.status(201).json({
      success: true,
      message: "Entry created successfully",
      data: savedEntry,
    });
  } catch (error) {
    next(new ApiError(400, error.message)); // Fixed
  }
};

// Get all sheet one entries
export const getAllSheetOnes = async (req, res, next) => {
  try {
    const entries = await SheetOne.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    next(new ApiError(500, error.message)); // Fixed
  }
};

// Get a single sheet one entry
export const getSheetOne = async (req, res, next) => {
  try {
    const entry = await SheetOne.findById(req.params.id);

    if (!entry) {
      return next(new ApiError(404, "Entry not found")); // Fixed
    }

    res.status(200).json({
      success: true,
      data: entry,
    });
  } catch (error) {
    next(new ApiError(500, error.message)); // Fixed
  }
};

// Update a sheet one entry
export const updateSheetOne = async (req, res, next) => {
  try {
    const entry = await SheetOne.findById(req.params.id);

    if (!entry) {
      return next(new ApiError(404, "Entry not found")); // Fixed
    }

    // Check if user is authorized to update this entry
    if (entry.createdBy && entry.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return next(new ApiError(403, "You are not authorized to update this entry")); // Fixed
    }

    const updatedEntry = await SheetOne.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Entry updated successfully",
      data: updatedEntry,
    });
  } catch (error) {
    next(new ApiError(400, error.message)); // Fixed
  }
};

// Delete a sheet one entry
export const deleteSheetOne = async (req, res, next) => {
  try {
    const entry = await SheetOne.findById(req.params.id);

    if (!entry) {
      return next(new ApiError(404, "Entry not found")); // Fixed
    }

    // Check if user is authorized to delete this entry
    if (entry.createdBy && entry.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return next(new ApiError(403, "You are not authorized to delete this entry")); // Fixed
    }

    await SheetOne.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Entry deleted successfully",
    });
  } catch (error) {
    next(new ApiError(500, error.message)); // Fixed
  }
};
