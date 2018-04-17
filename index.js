const isostring = require('isostring')
const {duration} = require('moment')


/* https://github.com/moment/moment/blob/develop/src/lib/duration/create.js */
const isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/

const regexpRegex = /^\/.*\/[gimuy]*$/


/**
 * Create Javascript objects from the string fields on a JSON object
 *
 * @param {string} key
 *  key of the JSON object, ignored
 * @param {*} value
 *  value to be converted in a Javascript object
 */
function reviver(key, value)
{
  return string2js(value)
}


/**
 * Create Javascript objects and primitives from their string representation
 *
 * Promote the string value to a Javascript object. The current promotions are
 * {undefined}, {RegExp}, {moment.duration}, {Date} and {JSON} (that includes
 * {Boolean}, {Number} and {null}). In case a promotion is not possible, it
 * return the value as a {string}.
 *
 * @param {*} value
 *  value to be converted in a Javascript object
 */
function string2js(value)
{
  // Value is not a string, return it directly
  if(typeof value !== 'string') return value

  // Undefined
  if(value === 'undefined') return

  // RegExp
  if(value.match(regexpRegex)) return RegExp(value)

  // ISO8601 duration
  if(value.match(isoRegex)) return duration(value)

  // Date
  if(isostring(value)) return new Date(value)

  // JSON
  try
  {
    return JSON.parse(value, reviver)
  }
  catch(e){}

  // Regular string
  return value
}
string2js.reviver = reviver


module.exports = string2js
