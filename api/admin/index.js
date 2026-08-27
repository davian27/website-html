// Vercel Serverless Function: Admin Root API Endpoint
module.exports = (req, res) => {
  // Handle CORS preflight options request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  return res.status(200).json({
    status: 'success',
    service: 'WP Master Hub Admin API Engine',
    version: '1.0.0',
    environment: process.env.VERCEL_ENV || 'vercel-serverless',
    timestamp: new Date().toISOString(),
    endpoints: {
      healthCheck: 'GET /api/admin',
      login: 'POST /api/admin/login',
      getDashboardData: 'GET /api/admin/data',
      updateData: 'POST /api/admin/data'
    },
    message: 'WP Admin Vercel API Endpoint is active and operational.'
  });
};
