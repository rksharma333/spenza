const Event = require("events");

class Events {
  constructor() {
    this.event = new Event();
  }

  on(eventName, callback = callback) {
    this.event.on(eventName, () => {
      callback(eventName);
    });
  }

  trigger(eventName) {
    this.event.emit(eventName);
  }

  off(eventName, callback) {
    this.event.off(eventName, callback);
  }
}

let callback = (eventName) => {
  console.log(eventName, "happened!");
};

module.exports.Events = Events;
let k = new Events();
k.on("click", callback);
k.on("mousehover", callback);

// k.trigger("click");
// k.trigger("mousehover");
// k.off("click", callback);
// k.trigger("click");
