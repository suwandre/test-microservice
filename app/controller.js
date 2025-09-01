// All controller functions in one file (matching your company structure)

// User-related controllers
exports.getUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
  res.json({ success: true, users, pagination: { page, limit } });
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = { id: parseInt(id), name: 'John Doe', email: 'john@example.com' };
  res.json({ success: true, user });
};

exports.createUser = async (req, res) => {
  const { name, email, role = 'user' } = req.body;
  const newUser = { id: Date.now(), name, email, role, createdAt: new Date() };
  res.status(201).json({ success: true, user: newUser });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  res.json({ success: true, message: 'User updated', userId: id });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  res.json({ success: true, message: 'User deleted', userId: id });
};

// Order-related controllers
exports.getOrders = async (req, res) => {
  const { userId, status } = req.query;
  const orders = [
    { id: 1, userId: 1, total: 99.99, status: 'completed' },
    { id: 2, userId: 2, total: 149.99, status: 'pending' }
  ];
  res.json({ success: true, orders, filters: { userId, status } });
};

exports.createOrder = async (req, res) => {
  const { userId, items, total } = req.body;
  const order = { id: Date.now(), userId, items, total, status: 'pending' };
  res.status(201).json({ success: true, order });
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = { id: parseInt(id), userId: 1, total: 99.99, status: 'completed' };
  res.json({ success: true, order });
};

exports.cancelOrder = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  res.json({ success: true, message: 'Order cancelled', orderId: id, reason });
};

// Payment-related controllers (for BTCPay testing)
exports.createInvoice = async (req, res) => {
  const { amount, currency, orderId } = req.body;
  const invoice = { 
    id: `inv_${Date.now()}`, 
    amount, 
    currency, 
    orderId, 
    status: 'pending',
    paymentUrl: 'https://btcpay.example.com/invoice/123'
  };
  res.status(201).json({ success: true, invoice });
};

exports.getInvoiceStatus = async (req, res) => {
  const { invoiceId } = req.params;
  const status = { invoiceId, status: 'paid', paidAt: new Date() };
  res.json({ success: true, status });
};

exports.handleWebhook = async (req, res) => {
  const webhookData = req.body;
  res.status(200).json({ success: true, message: 'Webhook processed', received: true });
};

// Private function - should be ignored by parser
function _validateInternalData(data) {
  return data && typeof data === 'object';
}
