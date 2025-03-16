# debug
[![OpenCollective](https://opencollective.com/debug/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/debug/sponsors/badge.svg)](#sponsors)

* == tiny JavaScript debugging utility /
  * -- modelled AFTER -- Node.js core's debugging technique
  * uses
    * | 
      * Node.js
      * web browsers
  * 💡exposes `debug` 💡
    * == function  

* `npm install debug`

* `debug(nameOfYourModule)`
  * ⚠️return ONLY decorated version of `console.error`⚠️ 
    * == stderr
    * / allow you to toggle the 
      * debug output / DIFFERENT parts of your module
      * WHOLE module

* _Example:_ [here](examples)

* `DEBUG`
  * == environment variable / enable these -- based on -- 
    * space or
    * comma-delimited names

## Windows command prompt notes

### CMD

* `set DEBUG=*,-not_this`
  * _Example:_
	```cmd
	set DEBUG=* & node app.js
	```

### PowerShell (VS Code default)

* `$env:DEBUG = "*,-not_this"`
  * _Example:_
	```cmd
	$env:DEBUG='app';node app.js
	```
* run the program as usual
  * _Example:_
	```js
	  "windowsDebug": "@powershell -Command $env:DEBUG='*';node app.js",
	```

## Namespace Colors

* debug instance's color -- depends on -- its namespace name
* SMALL handful of basic colors

#### Node.js

* if stderr is a TTY -> colors are enabled  
* recommendations
  * install the [`supports-color`](https://npmjs.org/supports-color)

<img width="521" src="https://user-images.githubusercontent.com/71256/29092181-47f6a9e6-7c3a-11e7-9a14-1928d8a711cd.png">

#### Web Browser

* == colors enabled | "Web Inspectors" / understand the `%c` formatting option 
* _Examples:_
  * WebKit web inspectors,
  * [Firefox v31](https://hacks.mozilla.org/2014/05/editable-box-model-multiple-selection-sublime-text-keys-much-more-firefox-developer-tools-episode-31/)
  * Firefox's Firebug plugin | ANY version

<img width="524" src="https://user-images.githubusercontent.com/71256/29092033-b65f9f2e-7c39-11e7-8e32-f6f0d8e865c1.png">

## Millisecond diff

When actively developing an application it can be useful to see when the time spent between one `debug()` call and the next. 
Suppose for example you invoke `debug()` before requesting a resource, and after as well, the "+NNNms" will show you how much time was spent between calls.

<img width="647" src="https://user-images.githubusercontent.com/71256/29091486-fa38524c-7c37-11e7-895f-e7ec8e1039b6.png">

When stdout is not a TTY, `Date#toISOString()` is used, making it more useful for logging the debug information as shown below:

<img width="647" src="https://user-images.githubusercontent.com/71256/29091956-6bd78372-7c39-11e7-8c55-c948396d6edd.png">

## Conventions

* if you're using this in one or more of your libraries, you _should_ use the name of your library so that developers may toggle debugging as desired without guessing names. 
If you have more than one debuggers you _should_ prefix them with your library name and use ":" to separate features. 
For example "bodyParser" from Connect would then be "connect:bodyParser".  
If you append a "*" to the end of your name, it will always be enabled regardless of the setting of the DEBUG environment variable.  
You can then use it for normal output as well as debug output.

## `*`
* -- reduce -- extra annotations
  * _Example:_ `DEBUG=connect:bodyParser,connect:compress,connect:session` -- replace -- `DEBUG=connect:*`

* if you want to exclude SPECIFIC debuggers -> prefix them with `-`
  * _Example:_ `DEBUG=*,-connect:*` == include ALL debuggers / EXCEPT TO starting with "connect:"

## Environment Variables | run Node.js 

* change the behavior of the debug logging

| Name      | Purpose                                           |
|-----------|---------------------------------------------------|
| `DEBUG`   | Enables/disables SPECIFIC debugging namespaces.   |
| `DEBUG_HIDE_DATE` | Hide date from debug output (non-TTY).    |
| `DEBUG_COLORS`| Whether or not to use colors in the debug output. |
| `DEBUG_DEPTH` | Object inspection depth.                      |
| `DEBUG_SHOW_HIDDEN` | Shows hidden properties on inspected objects.     |


* `DEBUG_` environment variable -- is converted into an -- Options object / -- gets used with -- `%o`/`%O` formatters
* see [Node.js `util.inspect()`](https://nodejs.org/api/util.html#util_util_inspect_object_options)

## Formatters

* -- uses -- [printf-style](https://wikipedia.org/wiki/Printf_format_string) formatting
* officially supported formatters

| Formatter | Representation |
|-----------|----------------|
| `%O`      | Pretty-print an Object on multiple lines. |
| `%o`      | Pretty-print an Object all on a single line. |
| `%s`      | String. |
| `%d`      | Number (both integer and float). |
| `%j`      | JSON. Replaced with the string '[Circular]' if the argument contains circular references. |
| `%%`      | Single percent sign ('%'). This does not consume an argument. |

### Custom formatters

* steps
  * extends the `debug.formatters` object

## Browser Support

* if you 
  * want to build a browser-ready script -> use [browserify](https://github.com/substack/node-browserify)
  * do NOT want to build it yourself -> use the [browserify-as-a-service](https://wzrd.in/)

* Debug's enable state -- is persisted by -- `localStorage`
  * | browser's console 
    ```
    localStorage.debug;
    ```

* | Chromium-based web browsers (e.g. Brave, Chrome, and Electron),
  * 👀if "Verbose" log level is enabled -> JavaScript console -- by default—ONLY show -- messages / logged by `debug` 👀
	<img width="647" src="https://user-images.githubusercontent.com/7143133/152083257-29034707-c42c-4959-8add-3cee850e6fcf.png">

## Output streams

* if you want to configure `debug()` behavior / per-namespace -> override the `log` method

## Extend debugger

* _Example:_ [here](examples/extendDebugger.js)

## Set dynamically

* TODO: You can also enable debug dynamically by calling the `enable()` method :

```js
let debug = require('debug');

console.log(1, debug.enabled('test'));

debug.enable('test');
console.log(2, debug.enabled('test'));

debug.disable();
console.log(3, debug.enabled('test'));

```

print :   
```
1 false
2 true
3 false
```

Usage :  
`enable(namespaces)`  
`namespaces` can include modes separated by a colon and wildcards.
   
Note that calling `enable()` completely overrides previously set DEBUG variable : 

```
$ DEBUG=foo node -e 'var dbg = require("debug"); dbg.enable("bar"); console.log(dbg.enabled("foo"))'
=> false
```

`disable()`

Will disable all namespaces. 
The functions returns the namespaces currently enabled (and skipped).
This can be useful if you want to disable debugging temporarily without knowing what was enabled to begin with.

For example:

```js
let debug = require('debug');
debug.enable('foo:*,-foo:bar');
let namespaces = debug.disable();
debug.enable(namespaces);
```

Note: There is no guarantee that the string will be identical to the initial
enable string, but semantically they will be identical.

## Checking whether a debug target is enabled

After you've created a debug instance, you can determine whether or not it is enabled by checking the `enabled` property:

```javascript
const debug = require('debug')('http');

if (debug.enabled) {
  // do stuff...
}
```

You can also manually toggle this property to force the debug instance to be
enabled or disabled.

## usage | child processes

Due to the way `debug` detects if the output is a TTY or not, colors are not shown in child processes when `stderr` is piped. 
A solution is to pass the `DEBUG_COLORS=1` environment variable to the child process.  
For example:

```javascript
worker = fork(WORKER_WRAP_PATH, [workerPath], {
  stdio: [
    /* stdin: */ 0,
    /* stdout: */ 'pipe',
    /* stderr: */ 'pipe',
    'ipc',
  ],
  env: Object.assign({}, process.env, {
    DEBUG_COLORS: 1 // without this settings, colors won't be shown
  }),
});

worker.stderr.pipe(process.stderr, { end: false });
```

## License

* MIT
