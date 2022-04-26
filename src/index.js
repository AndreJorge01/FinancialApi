const express = require("express")();
const {v4} = require("uuid");

const app= express();

app.use(express.json());

const custumers = [];

function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers;

  const custumer = custumers.find((custumer) => custumer.cpf === cpf);

  if (!custumer) {
    return res.status(400).json({ error: "Custumer not found" });
  }

  req.custumer = custumer;
  
  return next();
}

app.post("/account", (req, res) => {
  const { name, cpf,  } = req.body;

  const custumerAlreadyExists = custumers.some(
    (custumer) => custumer.cpf === cpf
  );

  if (custumerAlreadyExists) {
    return res.status(400).json({ error: "Custumer already exists" });
  }

  custumers.push = ({
    cpf,
    name,
    id: v4(),
    statament: []
  });

    return response.status(201).send();

});

app.get("/statement", verifyIfExistsAccountCPF, (req, res) => {
  const {custumer} = req;

  return response.json(custumer.statament);
});

app.post("/deposit", (req, res) => {
  const {description, amount} = req.body;

  const {custumer} = req;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }

  custumer.statament.push(statementOperation);

  return response.status(201).send();
}); 

app.get("/statement/date", verifyIfExistsAccountCPF, (req, res) => {
  const {custumer} = req;
const {date} = req.query;

  const dataformat = new Date(date + " 00:00");

  const statement = custumer.statament.filter(
    (statement) => 
    statement.created_at.toDateString() === 
   new Date(dataformat).toDateString());

  return response.json(statement);
});

app.put("/account", (req, res) => {

});
  
app.listen(3333);