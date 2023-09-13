const fs = require('fs/promises')

let loanData = []

const readFile = async () => {
  const data = await fs.readFile('./data/loan.json', 'utf-8')
  loanData = JSON.parse(data)
}

exports.getAllLoans = async (req, res) => {
  await readFile()
  res
    .status(200)
    .send({ message: 'Loans fetched successfully', loans: loanData })
}

exports.getLoan = async (req, res) => {
  await readFile()
  const loanId = req.params.id
  const loan = loanData.find((item) => item.loanId == loanId)
  if (loan) {
    res.status(200).send({ message: 'Loan fetched successfully', loan })
  } else {
    res.status(404).send({ error: 'Loan not found' })
  }
}

exports.createLoan = async (req, res) => {
  const borrowers = req.body.borrowers
  borrowers.forEach((borrower, index) => {
    borrower.pairId = index + 1
  })
  loanData.push({ loanId: loanData.length + 1, borrowers })

  try {
    await fs.writeFile('./data/loan.json', JSON.stringify(loanData, null, 2))
    return res.status(201).json({ message: 'Loan added successfully' })
  } catch (error) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

exports.updateBorrower = async (req, res) => {
  await readFile()

  const { pairId, loanId } = req.params
  const { firstName, lastName, phone } = req.body

  const loan = loanData.find((item) => (item.loanId = loanId))
  if (!loan) {
    res.status(404).send({ error: 'Loan not found' })
  }

  const borrower = loan.borrowers.find((borr) => (borr.pairId = pairId))
  if (!borrower) {
    res.status(404).send({ error: 'Borrower not found' })
  }
  const borrowers = req.body.borrowers
  borrowers.forEach((borrower, index) => {
    borrower.pairId = index + 1
  })
  borrower.firstName = firstName
  borrower.lastName = lastName
  borrower.phone = phone

  try {
    await fs.writeFile('./data/loan.json', JSON.stringify(loanData, null, 2))
    return res
      .status(200)
      .json({ message: 'Borrower information updated successfully', borrower })
  } catch (error) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

exports.deleteBorrower = async (req, res) => {
  await readFile()

  const { pairId, loanId } = req.params

  const loanIndex = loanData.findIndex((item) => item.loanId === loanId)
  if (loanIndex === -1) {
    res.status(404).send({ error: 'Loan not found' })
  }

  const borrowerIndex = loanData[loanIndex].borrowers.findIndex(
    (borr) => (borr.pairId = pairId)
  )
  if (borrowerIndex === -1) {
    res.status(404).send({ error: 'Borrower not found' })
  }

  loanData[loanIndex].borrowers.splice(borrowerIndex, 1)

  try {
    await fs.writeFile('./data/loan.json', JSON.stringify(loanData, null, 2))
    return res.status(200).json({ message: 'Borrower Deleted Successfully' })
  } catch (error) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

exports.deleteLoan = async (req, res) => {
  await readFile()

  const { loanId } = req.params

  const updatedLoans = loanData.findIndex((item) => item.loanId === loanId)

  try {
    await fs.writeFile(
      './data/loan.json',
      JSON.stringify(updatedLoans, null, 2)
    )
    return res.status(200).json({ message: 'Loan Deleted Successfully' })
  } catch (error) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
