const getAllOutlets  = require('../Outlets_Module/controllers/outletController')

const outletRoutes = (app, router) => {
  router.post( "/outlet/getAll",getAllOutlets.getAllOutlets );};
module.exports = outletRoutes;
