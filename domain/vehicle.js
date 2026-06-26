
class VehicleTask {
  constructor({ TaskID, Duration, Impact }) {
    this.taskId = TaskID;
    this.duration = Duration;
    this.impact = Impact;
  }

 
  get efficiency() {
    if (!this.duration) return 0;
    return this.impact / this.duration;
  }
}

module.exports = { VehicleTask };
