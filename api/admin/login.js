// Vercel Serverless Function: Admin Authentication Endpoint (POST /api/admin/login)
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      message: 'Method not allowed. Only POST is accepted for login.'
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const usernameInput = (body?.username || body?.user || '').trim();
    const passwordInput = (body?.password || body?.pass || '').trim();

    // Environment Variable override support for production security on Vercel
    const validUsername = process.env.ADMIN_USER || 'admin';
    const validPassword = process.env.ADMIN_PASS || 'admin123';

    if (usernameInput === validUsername && passwordInput === validPassword) {
      // Create session token payload
      const payload = {
        sub: usernameInput,
        role: 'administrator',
        site: 'WP Master Hub',
        iat: Date.now(),
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };

      const token = Buffer.from(JSON.stringify(payload)).toString('base64');

      return res.status(200).json({
        status: 'success',
        message: 'Autentikasi admin berhasil.',
        token: `wpmh_${token}`,
        user: {
          username: usernameInput,
          displayName: 'Administrator Utama',
          role: 'Administrator',
          email: process.env.ADMIN_EMAIL || 'admin@wpmasterhub.id',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        }
      });
    } else {
      return res.status(401).json({
        status: 'error',
        message: 'Username atau Password salah! Periksa kembali kredensial Anda.'
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: 'Format request tidak valid.',
      detail: err.message
    });
  }
};
