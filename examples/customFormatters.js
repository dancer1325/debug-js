const createDebug = require('debug')
createDebug.formatters.h = (v) => {
	return v.toString('hex')
}

const debug = createDebug('foo')
debug('this is hex: %h', new Buffer('hello world'))
//   foo this is hex: 68656c6c6f20776f726c6421 +0ms
