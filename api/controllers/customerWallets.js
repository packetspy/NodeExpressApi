const uuidv4 = require('uuid/v4');

module.exports = app => {
    const customerWalletsDB = app.data.customerWallets;
    const controller = {};

    const {
      customerWallets: customerWalletsMock
    } = customerWalletsDB
  
    controller.listCustomerWallets = (req, res) => res.status(200).json(customerWalletsMock);

    controller.saveCustomerWallets = (req, res) => {
      customerWalletsMock.data.push({
        id:uuidv4(),
        parentId:uuidv4(),
        name: req.body.name,
        birthDate: req.body.birthDate,
        cellphone: req.body.cellphone,
        phone: req.body.phone,
        email: req.body.email,
        occupation: req.body.occupation,
        state: req.body.state,
        createdAt: new Date(),
        updatedAt: null
      })
      res.status(201).json(customerWalletsMock);
    }

    controller.deleteCustomerWallet = (req, res) => {
      const { customerId } = req.params;

      const foundCustomerIdIndex = customerWalletsMock.data.findIndex(customer => customer.id === customerId);

      if (foundCustomerIdIndex === -1) {
        res.status(404).json({
            "message":`Customer "${customerId}" not found.`,
            "success":false,
          })
      } else {
        customerWalletsMock.data.splice(foundCustomerIdIndex, 1)
        res.status(200).json({
          "message":`Customer "${customerId}" removed.`,
          "success":true,
        })
      }
    }

    controller.updateCustomerWallet = (req, res) => {
      const { customerId } = req.params;

      const foundCustomerIdIndex = customerWalletsMock.data.findIndex(customer => customer.id === customerId);

      if (foundCustomerIdIndex === -1) {
        res.status(404).json({
            "message":`Customer "${customerId}" not found.`,
            "success":false,
          })
      } else {

        const newCustomer = {
          id: customerId,
          parentId: req.body.parentId,
          name: req.body.name,
          birthDate: req.body.birthDate,
          cellphone: req.body.cellphone,
          phone: req.body.phone,
          email: req.body.email,
          occupation: req.body.occupation,
          state: req.body.state,
          createdAt: null,
          updatedAt: new Date()
        } 

        customerWalletsMock.data.splice(foundCustomerIdIndex, 1, newCustomer)

        res.status(200).json({
          "message": `Customer "${customerId}" updated.`,
          "success": true,
          "customerWallet": newCustomer
        })
      }
    }
      return controller;
  }