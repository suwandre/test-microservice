// All authentication functions in one file

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: 'Authorization token required',
      format: 'Bearer <token>' 
    });
  }
  
  const token = authHeader.substring(7);
  
  // Mock JWT verification
  if (token === 'valid-token') {
    req.user = { id: 1, email: 'user@example.com', role: 'user' };
    next();
  } else if (token === 'admin-token') {
    req.user = { id: 1, email: 'admin@example.com', role: 'admin' };
    next();
  } else {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

exports.authorize = (requiredRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (requiredRoles.length === 0) {
      return next();
    }
    
    if (!requiredRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions',
        required: requiredRoles,
        current: req.user.role
      });
    }
    
    next();
  };
};

exports.validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(401).json({ 
      error: 'API key required',
      header: 'x-api-key'
    });
  }
  
  // Mock API key validation
  const validApiKeys = {
    'test-key-123': { name: 'Test App', tier: 'basic' },
    'btcpay-key-456': { name: 'BTCPay Integration', tier: 'premium' }
  };
  
  const keyData = validApiKeys[apiKey];
  if (!keyData) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  req.apiKey = { key: apiKey, ...keyData };
  next();
};

exports.refreshToken = (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token required' });
  }
  
  // Mock refresh token validation
  if (refreshToken === 'valid-refresh-token') {
    req.newTokens = {
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token'
    };
    next();
  } else {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
};
