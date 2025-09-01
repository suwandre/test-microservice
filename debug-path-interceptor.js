const path = require('path');

// Override path functions to catch undefined values
const originalResolve = path.resolve;
const originalJoin = path.join;

path.resolve = function(...args) {
  if (args.some(a => a === undefined)) {
    console.error('❌ path.resolve called with undefined:', args);
    console.trace('Stack trace:');
    throw new Error('Undefined argument to path.resolve detected');
  }
  return originalResolve(...args);
};

path.join = function(...args) {
  if (args.some(a => a === undefined)) {
    console.error('❌ path.join called with undefined:', args);
    console.trace('Stack trace:');
    throw new Error('Undefined argument to path.join detected');
  }
  return originalJoin(...args);
};

console.log('🔍 Path debugger loaded');

// Now run the swagger generator
const { generateSwaggerDocs } = require('@suwandre/auto-swagger-generator');
const config = require('./swagger-config.json');

(async () => {
  try {
    console.log('🚀 Starting swagger docs generation with path debugging...');
    await generateSwaggerDocs(config);
    console.log('✅ Swagger docs generated successfully');
  } catch (error) {
    console.error('❌ Error during swagger generation:', error.message);
  }
})();
