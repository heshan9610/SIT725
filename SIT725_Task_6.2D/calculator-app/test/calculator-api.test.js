// calculator-api.test.js

describe("Calculator API", function () {
  let expect;

  before(async () => {
    expect = (await import("chai")).expect;
  });

  const request = require("request");
  const baseUrl = "http://localhost:3000";

  it("returns status 200 to check if API root is reachable", function (done) {
    request(baseUrl, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  // Addition tests
  it("should return correct sum for valid numbers", function (done) {
    request.get(
      `${baseUrl}/calculate`,
      { qs: { operation: "add", a: 10, b: 5 } },
      function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        const result = JSON.parse(body);
        expect(result.result).to.equal(15);
        done();
      }
    );
  });

  // Subtraction test
  it("should return correct difference", function (done) {
    request.get(
      `${baseUrl}/calculate`,
      { qs: { operation: "subtract", a: 20, b: 8 } },
      function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        const result = JSON.parse(body);
        expect(result.result).to.equal(12);
        done();
      }
    );
  });

  // Multiplication test
  it("should return correct product", function (done) {
    request.get(
      `${baseUrl}/calculate`,
      { qs: { operation: "multiply", a: 4, b: 5 } },
      function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        const result = JSON.parse(body);
        expect(result.result).to.equal(20);
        done();
      }
    );
  });

  // Division test
  it("should return correct division result", function (done) {
    request.get(
      `${baseUrl}/calculate`,
      { qs: { operation: "divide", a: 20, b: 4 } },
      function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        const result = JSON.parse(body);
        expect(result.result).to.equal(5);
        done();
      }
    );
  });

  // Division by zero
  it("should return error when dividing by zero", function (done) {
    request.get(
      `${baseUrl}/calculate`,
      { qs: { operation: "divide", a: 10, b: 0 } },
      function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        const result = JSON.parse(body);
        expect(result.error).to.include("Cannot divide by zero");
        done();
      }
    );
  });

  // Missing parameters
  it("should return error for missing parameters", function (done) {
    request.get(
      `${baseUrl}/calculate`,
      { qs: { operation: "add", a: 10 } },
      function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        const result = JSON.parse(body);
        expect(result.error).to.include("Invalid or missing parameters");
        done();
      }
    );
  });

  // Non-numeric input
  it("should return error for non-numeric input", function (done) {
    request.get(
      `${baseUrl}/calculate`,
      { qs: { operation: "add", a: "abc", b: "def" } },
      function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        const result = JSON.parse(body);
        expect(result.error).to.include("Invalid or missing parameters");
        done();
      }
    );
  });

  // Invalid operation
  it("should return error for unsupported operation", function (done) {
    request.get(
      `${baseUrl}/calculate`,
      { qs: { operation: "power", a: 2, b: 3 } },
      function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        const result = JSON.parse(body);
        expect(result.error).to.include("Invalid operation");
        done();
      }
    );
  });

  // Float number support
  it("should correctly handle float inputs", function (done) {
    request.get(
      `${baseUrl}/calculate`,
      { qs: { operation: "multiply", a: 2.5, b: 4.2 } },
      function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        const result = JSON.parse(body);
        expect(result.result).to.be.closeTo(10.5, 0.001);
        done();
      }
    );
  });
});
