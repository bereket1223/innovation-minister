import SheetTwo from "../models/sheet-two.model.js"

// Create a new sheet two entry
export const createSheetTwoService = async (data, userId) => {
  try {
    const newEntry = new SheetTwo({
      ...data,
      createdBy: userId,
    })

    return await newEntry.save()
  } catch (error) {
    throw new Error(error.message)
  }
}

// Get all sheet two entries
export const getAllSheetTwosService = async () => {
  try {
    return await SheetTwo.find().sort({ createdAt: -1 })
  } catch (error) {
    throw new Error(error.message)
  }
}

// Get a single sheet two entry
export const getSheetTwoService = async (id) => {
  try {
    const entry = await SheetTwo.findById(id)

    if (!entry) {
      throw new Error("Entry not found")
    }

    return entry
  } catch (error) {
    throw new Error(error.message)
  }
}

// Update a sheet two entry
export const updateSheetTwoService = async (id, data, userId, userRole) => {
  try {
    const entry = await SheetTwo.findById(id)

    if (!entry) {
      throw new Error("Entry not found")
    }

    // Check if user is authorized to update this entry
    if (entry.createdBy && entry.createdBy.toString() !== userId && userRole !== "admin") {
      throw new Error("You are not authorized to update this entry")
    }

    return await SheetTwo.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })
  } catch (error) {
    throw new Error(error.message)
  }
}

// Delete a sheet two entry
export const deleteSheetTwoService = async (id, userId, userRole) => {
  try {
    const entry = await SheetTwo.findById(id)

    if (!entry) {
      throw new Error("Entry not found")
    }

    // Check if user is authorized to delete this entry
    if (entry.createdBy && entry.createdBy.toString() !== userId && userRole !== "admin") {
      throw new Error("You are not authorized to delete this entry")
    }

    return await SheetTwo.findByIdAndDelete(id)
  } catch (error) {
    throw new Error(error.message)
  }
}

