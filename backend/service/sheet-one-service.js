import SheetOne from "../models/sheet-one.model.js"

// Create a new sheet one entry
export const createSheetOneService = async (data, userId) => {
  try {
    const newEntry = new SheetOne({
      ...data,
      createdBy: userId,
    })

    return await newEntry.save()
  } catch (error) {
    throw new Error(error.message)
  }
}

// Get all sheet one entries
export const getAllSheetOnesService = async () => {
  try {
    return await SheetOne.find().sort({ createdAt: -1 })
  } catch (error) {
    throw new Error(error.message)
  }
}

// Get a single sheet one entry
export const getSheetOneService = async (id) => {
  try {
    const entry = await SheetOne.findById(id)

    if (!entry) {
      throw new Error("Entry not found")
    }

    return entry
  } catch (error) {
    throw new Error(error.message)
  }
}

// Update a sheet one entry
export const updateSheetOneService = async (id, data, userId, userRole) => {
  try {
    const entry = await SheetOne.findById(id)

    if (!entry) {
      throw new Error("Entry not found")
    }

    // Check if user is authorized to update this entry
    if (entry.createdBy && entry.createdBy.toString() !== userId && userRole !== "admin") {
      throw new Error("You are not authorized to update this entry")
    }

    return await SheetOne.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })
  } catch (error) {
    throw new Error(error.message)
  }
}

// Delete a sheet one entry
export const deleteSheetOneService = async (id, userId, userRole) => {
  try {
    const entry = await SheetOne.findById(id)

    if (!entry) {
      throw new Error("Entry not found")
    }

    // Check if user is authorized to delete this entry
    if (entry.createdBy && entry.createdBy.toString() !== userId && userRole !== "admin") {
      throw new Error("You are not authorized to delete this entry")
    }

    return await SheetOne.findByIdAndDelete(id)
  } catch (error) {
    throw new Error(error.message)
  }
}

