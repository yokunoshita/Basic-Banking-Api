const router = require('express').Router();
const postController = require('../../controllers/v1/postController.js');
const getController = require('../../controllers/v1/getController.js');

router.post('/v1/Uregist', postController.registerUser);
router.post('/v1/Aregist', postController.registerAccount);
router.post('/v1/transfer', postController.transfer);

router.get('/v1/users', getController.indexUser);
router.get('/v1/user/:userId', getController.showUser);
router.get('/v1/accounts', getController.indexAccount);
router.get('/v1/account/:accountId', getController.showAccount);
router.get('/v1/transactions', getController.indexTransaction);
router.get('/v1/transaction/:transactionId', getController.showTransaction);

module.exports = router;