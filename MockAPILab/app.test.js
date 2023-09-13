const httpMocks = require('node-mocks-http')
const controller = require('./controllers/ltk')

let response, request

beforeAll(() => {
  response = httpMocks.createResponse
  request = httpMocks.createRequest
})

it('should return loan data', async () => {
  await controller.getAllLoans(request, response)
  expect(response.statusCode).toEqual(200)
  expect(response._getData().loans.length).toBeGreaterThanOrEqual(1)
})

it('should return single loan data', async () => {
  request._setParameter('id', 1)
  await controller.getLoan(request, response)
  expect(response.statusCode).toEqual(200)
})

it('should add a single loan data', async () => {
  request._setBody({
    borrowers: [{ firstName: 'Test', lastName: 'User', phone: 'XYXXXXXXXXX' }],
  })
  await controller.createLoan(request, response)
  expect(response.statusCode).toEqual(201)
})

it('should delete a single loan data', async () => {
  request._setParameter('loanId', 1)
  await controller.deleteLoan(request, response)
  expect(response.statusCode).toEqual(200)
})
