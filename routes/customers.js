const CustomerService = require('../services/CustomerService')

module.exports = (server) => {
  // Get Customers
  server.get('/customers', CustomerService.getAllCustomers)

  // Add Customer
  server.post('/customers', CustomerService.addCustomer)

  // Get Single Customer
  server.get('/customers/:id', CustomerService.getCustomerById)

  // Update Customer
  server.put('/customers/:id', CustomerService.editCustomer)

  // Delete Customer
  server.del('/customers/:id', CustomerService.deleteCustomerById)
}