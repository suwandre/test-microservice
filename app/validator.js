// All validation functions in one file

exports.validateCreateUser = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || name.length < 2) {
    return res.status(400).json({ error: 'Name is required and must be at least 2 characters' });
  }
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }
  next();
};

exports.validateUserId = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'Valid numeric user ID is required' });
  }
  req.userId = parseInt(id);
  next();
};

exports.validateCreateOrder = (req, res, next) => {
  const { userId, items } = req.body;
  if (!userId || !Number.isInteger(userId)) {
    return res.status(400).json({ error: 'Valid userId is required' });
  }
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item' });
  }
  next();
};

exports.validateInvoiceAmount = (req, res, next) => {
  const { amount, currency } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Valid amount is required' });
  }
  if (!currency || !['USD', 'EUR', 'BTC', 'SATS'].includes(currency)) {
    return res.status(400).json({ error: 'Valid currency is required' });
  }
  next();
};

exports.validatePagination = (req, res, next) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  if (page < 1) page = 1;
  if (limit < 1 || limit > 100) limit = 10;
  req.pagination = { page, limit, offset: (page - 1) * limit };
  next();
};
