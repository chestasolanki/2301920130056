class Notification {
  constructor(raw) {
    this.id = raw.id || raw.NotificationID;
    this.message = raw.message;
    this.raw = raw;
  }
}

module.exports = { Notification };
