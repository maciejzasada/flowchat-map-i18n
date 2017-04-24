const i18n = require('i18n');

module.exports = class FlowchatMapI18n {

  get i18n() {
    return i18n;
  }

  configure(config) {
    i18n.configure(config);
  }

  input() {
    throw new Error('flowchat-map-i18n is an output-only mapping. For input translations use Wit.ai,\
Google Translate or similar.');
  }

  output() {
    return function ({ data, sessionId }) {
      if (typeof data === 'object' && data.i18n) {
        return { data: i18n.__mf(data.i18n, data.i18n), sessionId };
      }
      return { data, sessionId };
    }
  }

}
