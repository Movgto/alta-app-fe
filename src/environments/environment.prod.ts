

console.log('API URL: ', process.env['API_URL']);

export const environment = {
  production: true,
  apiUrl: process.env['API_URL'] || 'http://localhost:5000/api'
};
