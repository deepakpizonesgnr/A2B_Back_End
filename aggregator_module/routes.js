const aggregatorController = require('../aggregator_module/controllers/aggregatorController');

const aggregatorRoutes = (app, router) => {
  router.get('/aggregator/getAll', aggregatorController.getAllAggregators);
  router.get('/aggregator/get/:id', aggregatorController.getAggregatorById);
  router.post('/aggregator/create', aggregatorController.createAggregator);
  router.put('/aggregator/update/:id', aggregatorController.updateAggregator);
  router.delete('/aggregator/delete/:id', aggregatorController.deleteAggregator);
};
  
  
  
module.exports = aggregatorRoutes;
// CRUD Routes for Aggregators



