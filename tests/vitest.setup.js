import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

global.ResizeObserver = require('resize-observer-polyfill');

localStorage.clear();
