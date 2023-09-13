const express = require('express')
const router = express.Router()

const LTKController = require('../../controllers/ltk')

router.get('/', LTKController.getAllLoans)
router.get('/:id', LTKController.getLoan)
router.post('/', LTKController.createLoan)
router.patch('/:loanId/:pairId', LTKController.updateBorrower)
router.delete('/:loanId/:pairId', LTKController.deleteBorrower)
router.delete('/:loanId', LTKController.deleteLoan)

module.exports = router
