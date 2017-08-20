/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX = module.exports, rxEat = require('rxeat170819');


EX = function parseGeNoNaMeStr(melody, opt) {
  opt = Object.assign({}, EX.dfltOpt, opt);
  var evt = [], limit = (+opt.limit || 0), re = rxEat(melody), nx;
  if (!limit) { limit = melody.length; }
  re.opt = opt;
  re.evt = evt;
  while (limit && re.tx) {
    re(EX.wspCmtRx);
    nx = (re(EX.noteRgx, EX.foundNote)
      || re(EX.numTweakRgx, EX.foundNumTweak)
      );
    if (!nx) { break; }
    limit -= 1;
    if (nx.t) { evt.push(nx); }
  }
  if (re.tx) { evt.push({ t: '??', v: re.tx }); }
  return evt;
};


EX.dfltOpt = {
  octaveOffset: 0,
  noteDura: 0.2,
  noteGapFrac: 0.25,
};


EX.octaveNotes = (function () {
  var nio = 'C C# D D# E F F# G G# A B H';
  nio = (nio
    + ' ' + nio.toLowerCase()
    + ' ¢'
    ).split(/ /);
  nio.forEach(function (n, i) { nio[n] = i; });
  nio.B = nio.H;
  return nio;
}());


EX.midiGreatC = 36;
EX.wspCmtRx = /^\s+|^#[\x00-\t\v-\uFFFF]*/;

EX.noteRgx = /^([A-Ha-h]#?|¢|,)(…\d*(?:\.\d+|)|)/;
EX.foundNote = function (name, sustain) {
  var opt = this.opt, note = { t: 'pause' }, dura = 1;
  if (sustain) { dura += (+(sustain.slice(1)) || 1); }
  if (name !== ',') {
    note = EX.octaveNotes[name];
    if (note !== +note) { throw new Error('Unknown note: ' + name); }
    note += (opt.octaveOffset * 12) + EX.midiGreatC;
    note = { t: 'note', name: name, midiKey: note };
  }
  note.dura = dura * opt.noteDura;
  note.gap = opt.noteDura * opt.noteGapFrac;
  return note;
};

EX.numTweakRgx = /^(<>|<|>|~[×…]?)([\+\-]?\d*(?:\.\d+|))/;
EX.foundNumTweak = function (tw, n) {
  EX.adjNumTweak[tw](this.opt, (+n || 0));
  return 'skip';
};
EX.adjNumTweak = {
  '<':  function (opt, n) { opt.octaveOffset -= (n || 1); },
  '>':  function (opt, n) { opt.octaveOffset += (n || 1); },
  '<>': function (opt, n) { opt.octaveOffset = n; },
  '~':  function (opt, n) { opt.noteDura = (n || EX.dfltOpt.noteDura); },
  '~×': function (opt, n) { opt.noteDura *= (n || 1); },
  '~…': function (opt, n) { opt.noteGapFrac = n; },
};




















module.exports = EX;
