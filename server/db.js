import mongoose from "mongoose";

const Connection = async (url) => {
  try {
    await mongoose.connect(url);
    console.log(`Databse connected successfully`);
  } catch (error) {
    console.log(`Error while connecting with the database `, error);
  }
};

export default Connection;
