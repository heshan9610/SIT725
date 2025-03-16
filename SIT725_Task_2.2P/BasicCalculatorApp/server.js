var express = require("express");
const path = require("path");

var app = express();
var port = process.env.port || 3003;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// GET endpoint to calculate
app.get("/calculate", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const operation = req.query.operation;

  if (isNaN(num1) || isNaN(num2)) {
    return res.send(
      "Error: Please provide valid numbers using query parameters 'num1' and 'num2'."
    );
  }

  let result;
  switch (operation) {
    case "addition":
      result = num1 + num2;
      break;
    case "subtraction":
      result = num1 - num2;
      break;
    case "multiplication":
      result = num1 * num2;
      break;
    case "division":
      if (num2 === 0) {
        return res.send("Error: Division by zero is not allowed.");
      }
      result = num1 / num2;
      break;
    default:
      return res.send(
        "Error: Please provide a valid operation ('addition', 'subtraction', 'multiplication', 'division')."
      );
  }

  res.send(
    `The result of ${operation} between ${num1} and ${num2} is: ${result}`
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
