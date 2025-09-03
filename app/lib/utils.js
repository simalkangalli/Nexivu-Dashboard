import mongoose from "mongoose";

let isConnected = false; // keep track globally

export const connectToDB = async () => {
  if (isConnected) {
    console.log("=> Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MyDashboardDB", 
    });

    isConnected = db.connections[0].readyState;
    console.log(" MongoDB connected:", isConnected);
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    throw error;
  }
};
