const aggregatorController = require('../aggregator_module/controllers/aggregatorController');
const authMiddleware = require('../guards/auth')

const aggregatorRoutes = (app, router) => {
  router.get('/aggregator/getAll',authMiddleware, aggregatorController.getAllAggregators);
  router.get('/aggregator/get/:id',authMiddleware, aggregatorController.getAggregatorById);
  router.post('/aggregator/create',authMiddleware, aggregatorController.createAggregator);
  router.put('/aggregator/update/:id',authMiddleware, aggregatorController.updateAggregator);
  router.delete('/aggregator/delete/:id',authMiddleware, aggregatorController.deleteAggregator);
};
  
  
  
module.exports = aggregatorRoutes;
// CRUD Routes for Aggregators



