const getAllOutlets  = require('../Outlets_Module/controllers/outletController')
const authMiddleware = require('../guards/auth')

const outletRoutes = (app, router) => {
  router.post( "/outlet/getAll",authMiddleware,getAllOutlets.getAllOutlets );};
module.exports = outletRoutes;
