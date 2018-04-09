var duration = require('moment').duration


/* https://github.com/moment/moment/blob/develop/src/lib/duration/create.js */
const isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/

const regexpRegex = /^\/.*\/[gimuy]*$/


// Add a JSON representation for RegExp objects
if(RegExp.prototype.toJSON === undefined)
   RegExp.prototype.toJSON = RegExp.prototype.toString


/**
 * Check if an object is a number or represent one of them
 *
 * @param {*} value
 *
 * @return {Boolean}
 */
function isNumber(value)
{
  return !isNaN(value)
}

/**
 * Create Javascript objects and primitives from their string representation
 *
 * Promote the string fields to Javascript objects when the server returns a
 * JSON with only strings on its values. The current promotions are {Boolean},
 * {Number}, {RegExp} {duration} and {Date}.
 *
 * @param {*} value
 *  value to be converted in a Javascript object
 */
function string2js(value)
{
  if(typeof value === 'string')
  {
    // Boolean
    if(value === 'false') return false
    if(value === 'true')  return true

    // Number
    if(isNumber(value)) return parseFloat(value)

    // RegExp
    if(value.match(regexpRegex)) return RegExp(value)

    // ISO8601 duration
    if(value.match(isoRegex)) return duration(value)

    // Date
    var date = new Date(value)
    if(date.toString() !== 'Invalid Date') return date
  }

  return value
}

/**
 * Create Javascript objects from the string fields on a JSON object
 *
 * @param {string} key
 *  key of the JSON object, ignored
 * @param {*} value
 *  value to be converted in a Javascript object
 */
string2js.reviver = function(key, value)
{
  return string2js(value)
}


module.exports = string2js
