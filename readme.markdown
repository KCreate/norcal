# norcal

p2p command-line calendar

# example

```
$ norcal
     June 2016
Su Mo Tu We Th Fr Sa  [0] 19:00 javascript study group
          1  2  3  4  [1] 21:00 hardware hack night
 5  6  7  8  9 10 11  [2] 20:00 fly to pdx
12 13 14 15 16 17 18
19 20 21 22 23 24 25
26 27 28 29 30
```

# usage

```
norcal

  Show a calendar and events for the current month.

norcal add TIMESTR {-t TITLE}

  Add an event by its TIMESTR with a TITLE.

norcal rm ID

  Delete an event by its ID.

norcal query {--gt GT --lt LT}

  List events from GT to LT.
```

# api

``` js
var norcal = require('norcal')
```

## var cal = norcal(opts)

Create a new norcal instance `cal` from:

* `opts.log` - hyperlog instance to use
* `opts.db` - leveldb instance to use

## cal.add(time, opts, cb)

Add an event given by a free-form string `time` which is parsed by
[parse-messy-schedule][1]. Optionally:

* `opts.created` - parse relative to this time
* `opts.value` - a value to store alongside the time

`cb(err, node, id)` fires with the underlying hyperlog `node` and the generated
key/value `id`.

[1]: https://npmjs.com/package/parse-messy-schedule

## cal.remove(id, cb)

Remove an event by its `id`.

## var stream = cal.query(opts, cb)

Produce a readable objectMode stream of events in the range given in `opts`:

* `opts.gt` - date instance or string
* `opts.lt` - date instance or string

Each document in the object stream:

* `doc.time` - a Date instance for the event
* `doc.value` - extra properties like a title
* `doc.created` - when this record was created / relative to
* `doc.key` - the id in the underlying key/value store

You can collect all of the documents with `cb(err, docs)`.

# install

To get the command-line tool:

```
npm install -g norcal
```

To get the library:

```
npm install norcal
```

# license

BSD
