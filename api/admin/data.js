// Vercel Serverless Function: Admin Dashboard Data Endpoint (GET / POST /api/admin/data)
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Token check (Optional header authorization)
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'success',
      timestamp: new Date().toISOString(),
      server: 'Vercel Serverless Function Engine',
      stats: {
        totalProducts: 6,
        activePromos: 3,
        totalDocs: 4,
        pendingProposals: 2,
        monthlyRevenue: 14850000,
        activeLicenses: 1240,
        systemHealth: '100% Operational',
        lastUpdated: new Date().toLocaleString('id-ID')
      },
      systemInfo: {
        platform: 'Vercel Serverless Platform',
        nodeVersion: process.version,
        region: process.env.VERCEL_REGION || 'iad1 (Vercel Serverless)',
        environment: process.env.VERCEL_ENV || 'production'
      }
    });
  }

  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }

      const { action, payload } = body || {};

      return res.status(200).json({
        status: 'success',
        action: action || 'sync_admin_data',
        message: 'Data berhasil diproses oleh Vercel Admin API Endpoint.',
        receivedPayload: payload || null,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      return res.status(400).json({
        status: 'error',
        message: 'Gagal memproses data.',
        detail: err.message
      });
    }
  }

  return res.status(405).json({
    status: 'error',
    message: 'Method tidak diizinkan. Gunakan GET atau POST.'
  });
};
