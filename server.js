//initializes
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { Events } = require("./events");
//app
const app = express();

//port
const port = 6400;

//middleware
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const schema = mongoose.Schema;

const eventSchema = new schema({
  event: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

const Event = mongoose.model("event", eventSchema);

const saveEvent = (req, res) => {
  console.log(req.params);
};

const triggerEvent = async (req, res) => {
  try {
    let eventEmittter = new Events();
    eventEmittter.trigger(req.params.eventName);
    const event = new Event({
      event: req.params.eventName,
    });
    console.log(event);
    let response = await event.save();
    res.json(response);
  } catch (err) {
    res.send(err);
  }
};

const getUser = (req, res) => {
  res.send("Hello");
};

app.use("/api/:eventName", triggerEvent);

mongoose
  .connect("mongodb://localhost:27017/spenza", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || port, () => {
      console.log("connected...");
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
