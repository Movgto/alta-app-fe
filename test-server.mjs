// Test script to verify the server import works
try {
  console.log('Testing server import...');
  const serverModule = await import('./dist/alta-app-fe/server/server.mjs');
  console.log('Available exports:', Object.keys(serverModule));
  
  if (serverModule.reqHandler) {
    console.log('✅ reqHandler found!');
    console.log('reqHandler type:', typeof serverModule.reqHandler);
  } else {
    console.log('❌ reqHandler not found');
  }
} catch (error) {
  console.error('❌ Import failed:', error.message);
}
