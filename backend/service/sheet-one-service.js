import SheetOne from "../models/sheet-one.model.js"

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

export const getAllSheetOnesService = async () => {
  try {
    return await SheetOne.find().sort({ createdAt: -1 })
  } catch (error) {
    throw new Error(error.message)
  }
}

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

export const updateSheetOneService = async (id, data, userId, userRole) => {
  try {
    const entry = await SheetOne.findById(id)

    if (!entry) {
      throw new Error("Entry not found")
    }

    if (entry.createdBy && entry.createdBy.toString() !== userId && userRole !== "admin") {
      throw new Error("You are not authorized to update this entry")
    }

    return await SheetOne.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deleteSheetOneService = async (id, userId, userRole) => {
  try {
    const entry = await SheetOne.findById(id)

    if (!entry) {
      throw new Error("Entry not found")
    }

    if (entry.createdBy && entry.createdBy.toString() !== userId && userRole !== "admin") {
      throw new Error("You are not authorized to delete this entry")
    }

    return await SheetOne.findByIdAndDelete(id)
  } catch (error) {
    throw new Error(error.message)
  }
}

