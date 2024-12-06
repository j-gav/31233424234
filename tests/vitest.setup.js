import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

// eslint-disable-next-line no-undef
global.ResizeObserver = require('resize-observer-polyfill');

localStorage.clear();
