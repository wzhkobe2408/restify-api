const Utils = require('../utils')
const errors = require('restify-errors')
const Customer = require('../models/Customer')

// Get Customers
const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({})
    res.send(customers)
    next()
  } catch (error) {
    return next(new errors.InvalidContentError(error))
  }  
}

// Add Customer
const addCustomer = async (req, res, next) => {
  // Check for JSON
  Utils.checkforReqType(req, 'application/json')
  const { name, email, balance } = req.body
  const customer = new Customer({
    name,
    email,
    balance
  })
  try {
    const newCustomer = await customer.save()
    res.send(201)
    next()
  } catch (error) {
    return next(new errors.InternalError(error.message))
  }
}

// Get Single Customer
const getCustomerById = async (req, res, next) => {
  try {
    const customers = await Customer.findById(req.params.id)
    res.send(customers)
    next()
  } catch (error) {
    return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`))
  }  
}

// Update Customer
const editCustomer = async (req, res, next) => {
  // Check for JSON
  Utils.checkforReqType(req, 'application/json')
  try {
    const customer = await Customer.findOneAndUpdate({ _id: req.params.id }, req.body)
    res.send(200)
    next()
  } catch (error) {
    return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`))
  }
}

// Delete Customer
const deleteCustomerById = async (req, res, next) => {
  try {
    const customer = await Customer.findOneAndDelete({ _id: req.params.id })
    res.send(204)
    next()
  } catch (error) {
    return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`))
  }
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  deleteCustomerById,
  addCustomer,
  editCustomer
}