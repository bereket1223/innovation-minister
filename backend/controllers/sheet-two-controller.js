import SheetTwo from "../models/sheet-two.js";
import { ApiError } from "../utils/ApiError.js";

// Create a new sheet two entry
export const createSheetTwo = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const newEntry = new SheetTwo({
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
    next(new ApiError(400, error.message)); // ✅ Fixed
  }
};

// Get all sheet two entries
export const getAllSheetTwos = async (req, res, next) => {
  try {
    const entries = await SheetTwo.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    next(new ApiError(500, error.message)); // ✅ Fixed
  }
};

// Get a single sheet two entry
export const getSheetTwo = async (req, res, next) => {
  try {
    const entry = await SheetTwo.findById(req.params.id);

    if (!entry) {
      return next(new ApiError(404, "Entry not found")); // ✅ Fixed
    }

    res.status(200).json({
      success: true,
      data: entry,
    });
  } catch (error) {
    next(new ApiError(500, error.message)); // ✅ Fixed
  }
};

// Update a sheet two entry
export const updateSheetTwo = async (req, res, next) => {
  try {
    const entry = await SheetTwo.findById(req.params.id);

    if (!entry) {
      return next(new ApiError(404, "Entry not found")); // ✅ Fixed
    }

    // Check if user is authorized to update this entry
    if (entry.createdBy && entry.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return next(new ApiError(403, "You are not authorized to update this entry")); // ✅ Fixed
    }

    const updatedEntry = await SheetTwo.findByIdAndUpdate(
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
    next(new ApiError(400, error.message)); // ✅ Fixed
  }
};

// Delete a sheet two entry
export const deleteSheetTwo = async (req, res, next) => {
  try {
    const entry = await SheetTwo.findById(req.params.id);

    if (!entry) {
      return next(new ApiError(404, "Entry not found")); // ✅ Fixed
    }

    // Check if user is authorized to delete this entry
    if (entry.createdBy && entry.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return next(new ApiError(403, "You are not authorized to delete this entry")); // ✅ Fixed
    }

    await SheetTwo.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Entry deleted successfully",
    });
  } catch (error) {
    next(new ApiError(500, error.message)); // ✅ Fixed
  }
};
