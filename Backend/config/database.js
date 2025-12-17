/**
 * MongoDB Database Configuration
 * Handles connection to MongoDB database
 * Uses in-memory DB for development if no MONGODB_URI is set
 */

const mongoose = require('mongoose');
const { connectMemoryDB } = require('./memoryDB');

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is properly configured
    const mongoURI = process.env.MONGODB_URI;
    const isConfigured = mongoURI && 
                        !mongoURI.includes('<username>') && 
                        !mongoURI.includes('<password>') &&
                        !mongoURI.includes('xxxxx');

    if (!isConfigured) {
      console.log('⚠️  No MongoDB URI configured, using in-memory database for development');
      await connectMemoryDB();
      return;
    }

    // Try to connect to configured MongoDB
    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    console.log('🔄 Falling back to in-memory database...');
    await connectMemoryDB();
  }
};

module.exports = connectDB;
