const i18n = require('i18n');

module.exports = class FlowchatMapI18n {

  constructor() {
    this.input = this._input.bind(this);
    this.output = this._output.bind(this);
  }

  get i18n() {
    return i18n;
  }

  configure(config) {
    i18n.configure(config);
  }

  _input() {
    throw new Error('flowchat-map-i18n is an output-only mapping. For input translations use Wit.ai,\
Google Translate or similar.');
  }

  _output({ data, sessionId }) {
    return { data: this._deepConvert(data), sessionId };
  }

  _deepConvert(obj, prevObj = {}, prevKey = 'text') {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; ++i) {
        obj[i] = this._deepConvert(obj[i], obj, i);
      }
    } else if (typeof obj === 'object') {
      if ('i18n' in obj) {
        return i18n.__mf(obj.i18n, obj.i18n);
      }
      for (let key in obj) {
        obj[key] = this._deepConvert(obj[key], obj, key);
      }
    }
    return obj;
  }

};
