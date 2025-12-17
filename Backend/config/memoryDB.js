/**
 * In-Memory MongoDB for Development
 * Automatically starts a local MongoDB instance
 */

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

const connectMemoryDB = async () => {
  try {
    console.log('🔄 Starting in-memory MongoDB...');
    
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    await mongoose.connect(uri);
    
    console.log('✅ In-Memory MongoDB Connected');
    console.log(`📊 Database URI: ${uri}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    return mongoServer;
  } catch (error) {
    console.error(`❌ In-Memory MongoDB failed: ${error.message}`);
    process.exit(1);
  }
};

const disconnectMemoryDB = async () => {
  if (mongoServer) {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log('✅ In-Memory MongoDB stopped');
  }
};

module.exports = { connectMemoryDB, disconnectMemoryDB };
