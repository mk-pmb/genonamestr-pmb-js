/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

try { require('usnam-pmb'); } catch (ignore) {}

var equal = require('equal-pmb');


(function readmeDemo() {
  //#u
  var genonamestr = require('genonamestr-pmb'), melody,
    cN = 'note', cP = 'pause', cG = 0.125;

  melody = '~0.25 ~…0.5 Ba…, ^.5 C…2h,… >>h ^×.5<>h ^<>-1h';
  equal.lists(genonamestr(melody), [
    { t: cN, name: 'B', midiKey: 47,  dura: 0.25, vol: 1,     gap: cG },
    { t: cN, name: 'a', midiKey: 57,  dura: 0.5,  vol: 1,     gap: cG },
    { t: cP,                          dura: 0.25,             gap: cG },
    { t: cN, name: 'C', midiKey: 36,  dura: 0.75, vol: 0.5,   gap: cG },
    { t: cN, name: 'h', midiKey: 59,  dura: 0.25, vol: 0.5,   gap: cG },
    { t: cP,                          dura: 0.5,              gap: cG },
    { t: cN, name: 'h', midiKey: 83,  dura: 0.25, vol: 0.5,   gap: cG },
    { t: cN, name: 'h', midiKey: 59,  dura: 0.25, vol: 0.25,  gap: cG },
    { t: cN, name: 'h', midiKey: 47,  dura: 0.25, vol: 0,     gap: cG },
  ]);
  //#r
}());









console.log("+OK usage test passed.");    //= "+OK usage test passed."
