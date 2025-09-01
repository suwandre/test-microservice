const { FileUtils } = require('@suwandre/auto-swagger-generator/dist/utils/file-utils');
const config = require('./swagger-config.json');
const path = require('path');

async function debugFileScan() {
  console.log('🔧 Debug: File scanning...');
  console.log('📁 Config:', JSON.stringify(config, null, 2));
  
  const resolvedPath = path.resolve(config.inputPath);
  console.log('🎯 Resolved input path:', resolvedPath);
  
  // Check if directory exists
  const fs = require('fs');
  if (!fs.existsSync(resolvedPath)) {
    console.error('❌ Input directory does not exist:', resolvedPath);
    return;
  }
  
  // List directory contents
  const files = fs.readdirSync(resolvedPath);
  console.log('📂 Files in directory:', files);
  
  // Try manual file finding
  try {
    const foundFiles = await FileUtils.findMicroserviceFiles(resolvedPath);
    console.log('🔍 Found files:', foundFiles);
  } catch (error) {
    console.error('❌ Error finding files:', error);
  }
}

debugFileScan();
