import {config} from "dotenv";
config();

import express, {json} from "express";
import morgan from "morgan";
import cors from "cors";
import Agenda from "./models/agenda.js";
import {errorHandler, errorServer} from "./middleware/errorhandler.js";

const app = express();

const requestLogger = (request, _, next) => {
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

/*let persons = [
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
];*/

app.get("/api/persons", async (_, res) => {
  try {
    const persons = await Agenda.find({});

    res.json(persons);
  } catch (error) {
    console.log(error, "error");
  }
});
app.get("/api/persons/:id", async (req, res, next) => {
  const {id} = req.params;

  try {
    /*const findPerson = persons.find(
        (person) => person.id === Number.parseInt(id)
      );
    
      findPerson
        ? res.json(findPerson)
        : res.status(400).json({error: "user does not exist"});*/

    const agenda = await Agenda.findById(id);
    console.log(agenda, "agenda");
    res.json(agenda);
  } catch (error) {
    next(error);
  }
});
app.post("/api/persons", async (req, res, next) => {
  const data = req.body;

  /*const randomId = Math.random() * 200;

  persons.push({
    ...data,
    id: randomId,
  });*/

  if (!data.name || !data.number) {
    return res.status(400).json({error: "data required"});
  }

  try {
    const agenda = new Agenda({
      name: data.name,
      number: data.number,
    });
    await agenda.save();
    res.status(201).json({message: "User created"});
  } catch (error) {
    next(error);
  }
});
app.delete("/api/persons/:id", async (req, res, next) => {
  const {id} = req.params;

  /*let user = persons.some((person) => person.id === Number(id));

  if (!user) {
    res.status(400).json({error: "user does not exist"});
    return;
  }
  persons = persons.filter((person) => person.id !== id);*/

  try {
    await Agenda.findByIdAndDelete(id);
    res.status(200).json({message: "user deleted"});
  } catch (error) {
    next(error);
  }
});
app.put("/api/persons/:id", async (req, res, next) => {
  const {id} = req.params;
  const data = req.body;

  /*let user = persons.some((person) => person.id === Number(id));

  if (!user) {
    res.status(400).json({error: "user does not exist"});
    return;
  }
  persons = persons.filter((person) => person.id !== id);*/

  try {
    await Agenda.findByIdAndUpdate(id, data, {new: true});
    res.status(200).json({message: "user deleted"});
  } catch (error) {
    next(error);
  }
});

app.get("/info", async (_, res) => {
  const persons = await Agenda.find({});

  const content = `
  <p>Phone has info for ${persons.length} people</p>
  </br>
    <p>${new Date().getUTCDate()}</p>
  `;
  res.send(content);
});

app.use(errorHandler);
app.use(errorServer);

const unknownEndpoint = (_, response) => {
  response.status(404).send({error: "unknown endpoint"});
};
app.use(unknownEndpoint);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("server listening in port " + PORT);
});
