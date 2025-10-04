import Exhibition from "../models/Exhibition.js";
import ExhibitionRegistration from "../models/ExhibitionRegistration.js";
import {uploadToCloudinary, deleteFromCloudinary, upload} from "../config/cloudinary.js"

// Create exhibition
export const createExhibition = async (req, res) => {
  try {
    let exhibitionData = {
      ...req.body,
      curator_id:req.user.id
    }
    if(req.file){
      const uploadData = await uploadToCloudinary(req.file.buffer, "miraas/exhibitions");
      exhibitionData.exhibitionImage = {
        url:uploadData.secure_url,
        publicId:uploadData.public_id
      }
    }

    const exhibition = await Exhibition.create(exhibitionData);

    res.status(201).json({
      success: true,
      message:"Exhibition created succesfully",
      data: exhibition
    });

  } catch (error) {
    console.log("Error in createExhibition:", error);
    res.status(500).json({ 
      success: false,
      message: "Error creating exhibition",
      error: error.message 
    });
  }
};

// Get all exhibitions
export const getExhibitions = async (req, res) => {
  try {
    const exhibitions = await Exhibition.find().populate("curator_id", "username email");
    res.json(exhibitions);
  } catch (error) {
    console.log("Error in getExhibitions:", error);
    res.status(500).json({ message: "Error fetching exhibitions" });
  }
};

// Get single exhibition
export const getExhibitionById = async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id).populate("curator_id", "username email");
    if (!exhibition) return res.status(404).json({ message: "Exhibition not found" });
    res.json(exhibition);
  } catch (error) {
    console.log("Error in getExhibitionById:", error);
    res.status(500).json({ message: "Error fetching exhibition" });
  }
};

// Update exhibition
export const updateExhibition = async (req, res) => {
  try {
    let exhibition = await Exhibition.findById(req.params.id);
    if (!exhibition) return res.status(404).json({ message: "Exhibition not found" });

    const updateData = { ...req.body };
    //handle image update
    if(req.file){
      if(exhibition.exhibitionImage?.publicId){
        await deleteFromCloudinary(exhibition.exhibitionImage.publicId);
      }
      const uploadData = await uploadToCloudinary(req.file.buffer, "miraas/exhibitions");
      updateData.exhibitionImage = {
        url: uploadData.secure_url,
        publicId:uploadData.public_id,
      }
    }

    exhibition = await Exhibition.findByIdAndUpdate(req.params.id, updateData, {new: true});
    res.json({
      success:true,
      message: "Exhibition updated successfully",
      data: exhibition
    });
  } catch (error) {
    console.log("Error in updateExhibition:", error);
    res.status(500).json({
      success: false,
      message: "Error updating exhibition",
      error: error.message
    });;
  }
};

// Delete exhibition
export const deleteExhibition = async (req, res) => {
  try {
    const exhibition = await Exhibition.findByIdAndDelete(req.params.id);
    if (!exhibition) return res.status(404).json({ message: "Exhibition not found" });

    //delete all related registrations
    await ExhibitionRegistration.deleteMany({ exhibition_id: req.params.id });

    //delete related image
    if(exhibition.exhibitionImage?.publicId){
      await deleteFromCloudinary(exhibition.exhibitionImage.publicId);
    }

    res.json({ message: "Exhibition and related registrations deleted successfully" });
    
  } catch (error) {
    console.log("Error in deleteExhibition:", error);
    res.status(500).json({ message: "Error deleting exhibition" });
  }
};

//get stats for exhibitions
export const getExhibitionStats = async (req, res) => {
  try {
    const exhibitions = await Exhibition.find();

    // 1. Total exhibitions
    const totalExhibitions = exhibitions.length;

    // 2. Featured exhibitions
    const featuredExhibitions = exhibitions.filter(ex => ex.is_featured).length;

    // 3. Total bookings
    const totalBookings = exhibitions.reduce(
      (sum, ex) => sum + (ex.current_bookings || 0),
      0
    );

    // 4. Revenue generated
    const revenueGenerated = exhibitions.reduce(
      (sum, ex) =>
        sum + ((ex.entry_fee * (ex.current_bookings || 0)) || 0),
      0
    );

    // 5. Category distribution
    const categoryCounts = exhibitions.reduce((acc, ex) => {
      acc[ex.category] = (acc[ex.category] || 0) + 1;
      return acc;
    }, {});

    const categoryColors = {
      art: "primary",
      history: "success",
      science: "info",
      other: "warning",
    };

    const categoryData = Object.keys(categoryCounts).map(category => ({
      name: category,
      count: categoryCounts[category],
      color:
        categoryColors[category] === "primary" ? "#627EEA" :
        categoryColors[category] === "success" ? "#4CAF50" :
        categoryColors[category] === "info" ? "#F3BA2F" :
        categoryColors[category] === "warning" ? "#E84142" : "#9E9E9E"
    }));

    res.json({
      totalExhibitions,
      featuredExhibitions,
      totalBookings,
      revenueGenerated,
      categoryData
    });

  } catch (error) {
    console.error("❌ Error in getExhibitionStats:", error);
    res.status(500).json({ message: "Error fetching exhibition stats", error: error.message });
  }
};
