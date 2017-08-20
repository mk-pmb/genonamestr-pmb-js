/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

try { require('usnam-pmb'); } catch (ignore) {}

var equal = require('equal-pmb');


(function readmeDemo() {
  //#u
  var genonamestr = require('genonamestr-pmb'), melody;

  melody = '~0.25 ~…0.5 Ba…, C…2h,… >>h <>h <>-1h';
  equal.lists(genonamestr(melody), [
    { t: 'note',  name: 'B',  midiKey: 47,  dura: 0.25, gap: 0.125 },
    { t: 'note',  name: 'a',  midiKey: 57,  dura: 0.5,  gap: 0.125 },
    { t: 'pause',                           dura: 0.25, gap: 0.125 },
    { t: 'note',  name: 'C',  midiKey: 36,  dura: 0.75, gap: 0.125 },
    { t: 'note',  name: 'h',  midiKey: 59,  dura: 0.25, gap: 0.125 },
    { t: 'pause',                           dura: 0.5,  gap: 0.125 },
    { t: 'note',  name: 'h',  midiKey: 83,  dura: 0.25, gap: 0.125 },
    { t: 'note',  name: 'h',  midiKey: 59,  dura: 0.25, gap: 0.125 },
    { t: 'note',  name: 'h',  midiKey: 47,  dura: 0.25, gap: 0.125 },
  ]);
  //#r
}());









console.log("+OK usage test passed.");    //= "+OK usage test passed."
