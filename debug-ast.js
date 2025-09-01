const { ASTParser } = require('@suwandre/auto-swagger-generator/dist/utils/ast-utils');
const fs = require('fs');

const filePath = './app/controller.js';
const content = fs.readFileSync(filePath, 'utf-8');

console.log('📄 File content preview:');
console.log(content.substring(0, 500) + '...');
console.log('\n🔍 AST Parser results:');

const functions = ASTParser.parseFile(content);
console.log(`Found ${functions.length} functions:`);

functions.forEach((func, index) => {
  console.log(`${index + 1}. ${func.name} (${func.httpMethod || 'unknown method'})`);
  console.log(`   Parameters: ${func.parameters.length}`);
  console.log(`   Comments: ${func.comments.length}`);
});
