const router = require('express').Router();
const userRouter = require('./userRouter');
const accountRouter = require('./accountRouter');
const transactionRouter = require('./transactionRouter');

router.get('/', (req, res) => {
    res.json({
      status: true,
      message: 'Connected',
      data: null
    });
  });
router.use('/users', userRouter);
router.use('/accounts', accountRouter);
router.use('/transactions', transactionRouter);

module.exports = router;