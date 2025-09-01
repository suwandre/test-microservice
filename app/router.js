// All routing logic in one file

const express = require('express');
const controller = require('./controller');
const validator = require('./validator');
const authenticator = require('./authenticator');

const router = express.Router();

// User routes
router.get('/users', 
  validator.validatePagination,
  controller.getUsers
);

router.get('/users/:id',
  validator.validateUserId,
  controller.getUserById
);

router.post('/users',
  validator.validateCreateUser,
  controller.createUser
);

router.put('/users/:id',
  authenticator.authenticate,
  validator.validateUserId,
  controller.updateUser
);

router.delete('/users/:id',
  authenticator.authenticate,
  authenticator.authorize(['admin']),
  validator.validateUserId,
  controller.deleteUser
);

// Order routes
router.get('/orders',
  authenticator.authenticate,
  controller.getOrders
);

router.post('/orders',
  authenticator.authenticate,
  validator.validateCreateOrder,
  controller.createOrder
);

router.get('/orders/:id',
  authenticator.authenticate,
  controller.getOrderById
);

router.delete('/orders/:id',
  authenticator.authenticate,
  controller.cancelOrder
);

// Payment/Invoice routes (BTCPay style)
router.post('/invoice',
  authenticator.validateApiKey,
  validator.validateInvoiceAmount,
  controller.createInvoice
);

router.get('/invoice/:invoiceId',
  authenticator.validateApiKey,
  controller.getInvoiceStatus
);

router.post('/webhook/btcpay',
  controller.handleWebhook
);

// Token management
router.post('/auth/refresh',
  authenticator.refreshToken,
  (req, res) => {
    res.json({ success: true, tokens: req.newTokens });
  }
);

module.exports = router;
