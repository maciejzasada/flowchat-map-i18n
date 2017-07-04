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

  _output({ data, state, sessionId }) {
    const i18nState = (state && state.i18n) ? state.i18n : {};
    return { data: this._deepConvert(data, i18nState), state, sessionId };
  }

  _deepConvert(obj, state, prevObj = {}, prevKey = 'text') {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; ++i) {
        obj[i] = this._deepConvert(obj[i], state, obj, i);
      }
    } else if (typeof obj === 'object') {
      if ('i18n' in obj) {
        const i18nData = Object.assign({}, obj.i18n, state);
        return i18n.__mf(i18nData, i18nData);
      }
      for (let key in obj) {
        obj[key] = this._deepConvert(obj[key], state, obj, key);
      }
    }
    return obj;
  }

};
