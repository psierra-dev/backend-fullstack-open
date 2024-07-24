import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

console.log("pass", password);
const url = `mongodb://mongo:${password}@viaduct.proxy.rlwy.net:36380`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const agendaSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Agenda = mongoose.model("Agenda", agendaSchema);

if (!name || !number) {
  console.log("entra");
  Agenda.find({}).then((agendas) => {
    console.log(agendas, "ads");
    mongoose.connection.close();
  });
  //process.exit(1);
} else {
  const note = new Agenda({
    name,
    number,
  });

  note.save().then((result) => {
    console.log("agenda saved!", result);
    mongoose.connection.close();
  });
}
