const request = require('supertest')("http://localhost:3000/qa")
const expect = require("chai").expect

describe("GET /questions", () => {
  it("returns by default the first 5 questions for a product", async () => {
    const res = await request.get("/questions/?product_id=1")
    expect(res.status).to.eql(200)
    console.log(res.body)
    expect(res.body.results.length).to.be.lessThan(6)
  })
})

describe("GET /answers", () => {
  it("returns by default the first 5 answers for a question", async () => {
    const res = await request.get("/questions/1/answers")
    expect(res.status).to.eql(200)
    console.log(res.body)
    expect(res.body.results.length).to.be.lessThan(6)
  })
})

describe("PUT /questions", () => {
  it("should increment question helpfulness by 1", async () => {
    const getRequest1 = await request.get("/questions/?product_id=1")
    const res = await request.put("/questions/5/helpful")
    const getRequest2 = await request.get("/questions/?product_id=1")
    const oldValue = getRequest1.body.results[2].question_helpfulness
    const newValue = getRequest2.body.results[2].question_helpfulness
    expect(res.status).to.eql(204)
    expect(newValue).to.eql(oldValue + 1)
  })
})