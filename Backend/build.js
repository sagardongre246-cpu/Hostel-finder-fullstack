/**
 * Build script for production deployment
 * Ensures all dependencies are properly installed
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Starting HostelFinder Backend Build Process...');

try {
  // Check if package.json exists
  if (!fs.existsSync(path.join(__dirname, 'package.json'))) {
    throw new Error('package.json not found');
  }

  console.log('📦 Installing dependencies...');
  execSync('npm install --production', { stdio: 'inherit' });

  console.log('🔍 Checking required files...');
  const requiredFiles = [
    'server.js',
    'config/database.js',
    'models/User.js',
    'routes/authRoutes.js'
  ];

  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(__dirname, file))) {
      throw new Error(`Required file missing: ${file}`);
    }
  }

  console.log('✅ Build completed successfully!');
  console.log('🚀 Ready for deployment on Render');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}