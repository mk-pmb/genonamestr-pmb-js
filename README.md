
<!--#echo json="package.json" key="name" underline="=" -->
genonamestr-pmb
===============
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Parser for the genonamestr music notation format. Allows to express a melody
as a human-readable text.
<!--/#echo -->

__Purpose:__
I needed a method to store a melody in a text file, so my first idea was to
just write the note names. In school I learned the German names, so in
genonamestr the pinao key left of C is called [H, not B][hbhist].

  [hbhist]: https://en.wikipedia.org/wiki/Musical_note#History_of_note_names

__The name__ is just an abbreviation for "GErman NOte NAmes MElody STRing".


API
---

This module exports one function:

### parseGeNoNaMeStr(melody[, opt])

Translates a string `melody` into an array of music events,
with optional options object `opt`.

Supported options, and their defaults:

* `octaveOffset` (integer, default: 0):
  Which octave the note names refer to. Zero means Helmholtz pitch notation,
  so uppercase `C` means MIDI note 36, lowercase `c` means MIDI note 48.
* `noteDura` (float, default: some small number):
  Default duration for how long a note is to be played, in seconds.
* `noteGapFrac` (float, default: some small number):
  Default duration for a pause (silence) after each note,
  in units of 1 `noteDura`.
* `parseLimit` (integer, default: 0): How many melody parts to parse.
  Zero means "all parts".

The `melody` string may consist of any combination of:

* Whitespace: Space, Tab, CR, LF. They're ignored.
* Note name: Any letter `A-H` or `a-h`,
  optionally followed by `#` (U+0023 number sign).
  * Grammar-wise, a number sign is allowed after any of these letters,
    but the parser will only accept it for C, D, F and G, because
    the other combinations can be expressed with just letters:
    `E#`&rarr;`F`,
    `A#`&rarr;`B`,
    `B#`&rarr;`H`,
    `H#`&rarr;`c`,
    etc.
  * There's a special additional note name `¢` (U+00A2 cent sign)
    which is just above `h` (initially, MIDI note 60). There's no `¢#`.
  * There's a special additional note name `,` (U+002C comma)
    which is silent, so it's a pause.
  * Duration of a note can be extended by appending `…` and an optional
    number `num` to its name.
    `num` can be integer or float, and it cannot have a sign or an exponent.
    If `num` is missing or zero, it defaults to 1.
    The note duration will be extended by `num` units of `noteDura`,
    so its effective duration should be `(num+1) * noteDura`.
    This has no effect on `noteGapFrac` calculations.
* Comment: A number sign (`#`) that isn't part of a note name,
  followed by any amount of characters that are not U+000A line feed.
  Comments are ignored.
* Number tweak: A tweak marker (listed below),
  optionally followed by a number `num`.
  (Sign optional, decimal point optional, no exponent.)
  If the number is omitted, `0` (zero) is assumed,
  and for some tweaks, zero means to use the default value.
  Supported tweak markers:
  * `<`: Move note name range `num` octaves to the left (lower pitch).
    (default: 1)
  * `>`: Move note name range `num` octaves to the right (higher pitch).
    (default: 1)
  * `<>`: Reset the note name range to Helmholtz,
    then move it `num` octaves to the right (higher pitch).
  * `~`: Set `noteDura` to `num` seconds. (default: default `noteDura`)
  * `~×`: Multiply note duration by `num`. (default: 1)
  * `~…`: Set `noteGapFrac` to `num`.



Usage
-----

from [test/usage.js](test/usage.js):
<!--#include file="test/usage.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="16" -->
```javascript
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
```
<!--/include-->



<!--#toc stop="scan" -->



Known issues
------------

* needs more/better tests and docs




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
