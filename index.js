import express, {json} from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(morgan("dev"));
app.use(json());
app.use(cors());
app.use(express.static("dist"));
app.use(requestLogger);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});
app.get("/api/persons/:id", (req, res) => {
  const {id} = req.params;

  const findPerson = persons.find(
    (person) => person.id === Number.parseInt(id)
  );

  findPerson
    ? res.json(findPerson)
    : res.status(400).json({error: "user does not exist"});
});
app.post("/api/persons", (req, res) => {
  const data = req.body;

  const randomId = Math.random() * 200;

  persons.push({
    ...data,
    id: randomId,
  });

  res.status(201).json({message: "User created"});
});
app.delete("/api/persons/:id", (req, res) => {
  const {id} = req.params;

  let user = persons.some((person) => person.id === Number(id));

  if (!user) {
    res.status(400).json({error: "user does not exist"});
    return;
  }
  persons = persons.filter((person) => person.id !== id);

  res.status(200).json({message: "user deleted"});
});

app.get("/info", (req, res) => {
  const content = `
  <p>Phone has info for ${persons.length} people</p>
  </br>
    <p>${new Date().getUTCDate()}</p>
  `;
  res.send(content);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: "unknown endpoint"});
};

app.use(unknownEndpoint);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("server listening in port " + PORT);
});
