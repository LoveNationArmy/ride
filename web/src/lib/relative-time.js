const SECOND = 1000

const MINUTE = 60 * SECOND

const HOUR = 60 * MINUTE

const DAY = 24 * HOUR

const WEEK = 7 * DAY

const YEAR = DAY * 365

const MONTH = YEAR / 12

const formats = [
  [ 0, 'έληξε' ],
  [ 0.7 * MINUTE, 'μόλις τώρα' ],
  [ 1.5 * MINUTE, 'σε ένα λεπτό' ],
  [ 60 * MINUTE, 'σε \'? λεπτά', MINUTE ],
  [ 1.5 * HOUR, 'σε μία ώρα' ],
  [ DAY, 'σε ? ώρες', HOUR ],
  [ 2 * DAY, 'αύριο' ],
  [ 7 * DAY, 'σε ? ημέρες', DAY ],
  [ 1.5 * WEEK, 'σε μία εβδομάδα' ],
  [ MONTH, 'σε ? εβδομάδες', WEEK ],
  [ 1.5 * MONTH, 'σε ένα μήνα' ],
  [ YEAR, 'σε ? μήνες', MONTH ],
  [ 1.5 * YEAR, 'σε ένα χρόνο' ],
  [ Number.MAX_VALUE, 'σε ? χρόνια', YEAR ]
]

export default (date) => {
  const now = Date.now()
  const then = date.getTime()

  const delta = then - now

  let format, i, len

  for (i = -1, len = formats.length; ++i < len;) {
    format = formats[i]
    if (delta < format[0]) {
      return !format[2] ? format[1] : format[1].replace('?', Math.round(delta / format[2]))
    }
  }
}
