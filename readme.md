#Lex

### Lex is a simple javascript microframework, but no simpler.

Lex allows you to write idomatic, modularized javascript code without major reliance on other components.  it's up to you to define your namespaces, app interactions, and it includes some very basic niceties (EventEmitter, Mustache, some functional goodies like keys()) to get you up and running.

Using lex is straightforward as possible:

```javascript
razor.extend('module', {
	foo: function(){
		return this;
	},
	bar: 42
});

//Need to add automatic initalization logic to your modules?
(function(){
	razor.module.foo();
})();
```

for another more involved example, check out the ./samples/basic_modules/modules.html file.  Note though; the module doesn't really do anything amazing, just gives you some examples of working between modules.

Lex is built with grunt.js; so there is a slight requirement to have nodejs installed.

building Lex is cake:

```
$ grunt lint
$ grunt concat
$ grunt min
```

check /dist/razor.js or the minified version as /dist/rzr.js