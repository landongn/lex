#Lex

### Lex is a simple javascript microframework, but no simpler.

Lex is a _low level pattern_ more than it is a framework.  There are no MVC constructs of any kind (though you can write your own!).  

I don't personally think that Javascript lends itself all that well to the MVC system.  Assuming you had a persistant model in which to store data in the browser (and you do, of course, with localStorage and IndexedDB), not to mention that controllers / collections often end up becoming a silly mess of state control and triggers, I often ask myself, why even bother?

Javascript is a _functional_ language.  It offers you (i think) the best syntax in the modern programming world (and I'm big on python, too.), first class functions, and literals.  This isn't super unique, but I think it lends itself well to the _pattern_ of what lex can do you for you when it comes to writing clean, easy to understand code.

Lex allows you to write idomatic, modularized javascript.  it's up to you to define your namespaces, app interactions, events, templates, and some nice functional helpers.

##How to Use

Using lex is very straightforward:

```javascript
//create razor.module
razor.extend('module', {
	//define some stuff
	foo: function(){
		return this;
	},
	bar: 42
});

(function(){
	razor.module.foo();
})();
```

```
//rolling custom events? that's cake in razor
razor.extend('myEventModule', {
	//define some stuff
	foo: function(){
		razor.emit('event', {});
	}
});

razor.extend('myOtherModule', {
	init: function(){
		razor.on('event', function(data){
			//process the event and it's data
		});
	}
});

(function(){
	razor.myOtherModule.init();
})();
```

The _Observer_ pattern is one that javascript is really freakin' good at. Lex tries to make the process of writing and responding to custom events, ridiculously easy.

##Building

Lex is built with grunt.js; so there is a slight requirement to have nodejs installed.

building Lex is cake:

```
$ grunt lint
$ grunt concat
$ grunt min
```

check /dist/razor.js or the minified version as /dist/rzr.js