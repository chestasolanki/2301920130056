class Depot {
  constructor(raw) {
    this.id = raw.id || raw.DepotID || raw.depotId;
    this.name = raw.name || raw.DepotName;
    this.raw = raw; 
  }
}

module.exports = { Depot };
