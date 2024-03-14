const express = require("express");
const login_required = require("../middleware/auth");
const fs = require("fs");
let rawdata = fs.readFileSync("loans.json");
let loan = JSON.parse(rawdata);

router = express.Router();

router.get("/", login_required, (req, res) => {
  const userRole = req.user.role;

  let filteredLoans;
  if (userRole === "superAdmin" || userRole === "admin") {
    filteredLoans = loan;
  } else {
    filteredLoans = loan.map((loan) => {
      const { applicant, ...rest } = loan;
      return rest;
    });
  }

  res.json(filteredLoans);
});

router.get("/status/:status", login_required, (req, res) => {
  const { status } = req.params;
  const filteredLoans = loan.filter((loan) => loan.status === status);
  res.json(filteredLoans);
});

router.get("/:userEmail/get", login_required, (req, res) => {
  const { userEmail } = req.params;
  const userLoans = loan.filter((loan) => loan.applicant.email === userEmail);
  res.json({ loans: userLoans });
});

router.get("/expired", login_required, (req, res) => {
  const currentDate = new Date();
  const expiredLoans = loan.filter(
    (loan) => new Date(loan.maturityDate) < currentDate
  );
  res.json(expiredLoans);
});

router.delete("/:loanId/delete", login_required, (req, res) => {
  const { loanId } = req.params;
  res.json({ message: `Loan with ID ${loanId} deleted successfully` });
});

module.exports = router;
