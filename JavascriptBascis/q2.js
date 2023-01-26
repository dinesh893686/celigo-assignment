class MetadataParser {
    constructor(version, channel, keyField) {
      this._version = version;
      this._channel = channel;
      this._keyField = keyField;
    }
  
    get version() {
      return this._version;
    }
  
    set version(version) {
      this._version = version;
    }
  
    get channel() {
      return this._channel;
    }
  
    set channel(channel) {
      this._channel = channel;
    }
  
    get keyField() {
      return this._keyField;
    }
  
    set keyField(keyField) {
      this._keyField = keyField;
    }
  
    getKeyFields(jsonArray) {
      let keyFields = [];
      jsonArray.forEach(object => {
        keyFields.push(object[this._keyField]);
      });
      return keyFields;
    }
  }
  
  let metadataParser = new MetadataParser("1.0", "channelA", "channel");
  console.log(metadataParser.version); // "1.0"
  console.log(metadataParser.channel); // "channelA"
  console.log(metadataParser.keyField); // "channel"
  
  metadataParser.version = "2.0";
  console.log(metadataParser.version); // "2.0"
  
  metadataParser.channel = "channelB";
  console.log(metadataParser.channel); // "channelB"
  
  metadataParser.keyField = "name";
  console.log(metadataParser.keyField); // "name"
  
  let jsonArray = [{channel: "A"}, {channel: "B"}, {channel: "C"}];
  console.log(metadataParser.getKeyFields(jsonArray)); // ["A", "B", "C"]
  