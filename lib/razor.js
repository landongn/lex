(function(window, document, undefined){

if (!window.razor) {
    var razor = {

      //copies one object to another, optionally performing some kind of transform.
      copy: function(target, source, overwrite, transform) {
        for (var key in source) {
          if (overwrite || typeof target[key] === 'undefined') {
              target[key] = transform ? transform(source[key]) :  source[key];
          }
        }
        return target;
      },
      //creates a namespaced object, forcing it to exist within the razor namespace.
      //don't use this function directly, use .extend(namespace, object);
      create: function(name, value) {
        var node = window.razor,
        nameParts = name ? name.split('.') : [],
        c = nameParts.length;
        for (var i = 0; i < c; i++) {
          var part = nameParts[i];
          var nso = node[part];
          if (!nso) {
            nso = (value && i + 1 === c) ? value : {};
            node[part] = nso;
          }
          node = nso;
        }
      return node;
    },
    //Extend the base namespace. passing .extend(foo, {}); creates an object with the 'namespace' foo in the razor root.
    //extending another namespace?  use the same one, but create your subclass as an object. eg; .extend(foo, {bar:{ baz: 'false'}});
    //TODO: make this available in all namespaces.
    extend: function(target, source, overwrite) {
      return razor.copy(
        typeof target === 'string' ?
          razor.create(target) : target,
          source,
          overwrite);
    },
    //creates a mostly-unique global identifier.
    //MD5 in javascript is verbose, unecessary, and hard.  Besides, if you're creating enough MD5s for collision to be an argument, you're doing it wrong.
    guid: function() {
      return 'rzr' + (Math.random() * (1<<30)).toString(16).replace('.', '');
    },

    //Want to use another templating lib? sure. just call razor.extend('razor', {render: function(foo, bar){}}, true) with whatever you want.
    //render a template called _source_ that gets compiled inline and invoked with the passed _data_.
    render: function(source, data){
      return Mustache.render(source, data);
    },
    keys: function(obj, name){
      if (obj !== Object(obj)) throw new TypeError('Invalid object');
          var keys = [];
          for (var key in obj) if (hasOwnProperty.call(obj, key)) keys[keys.length] = key;
          return keys;
    }
  };

  //Finally, expose the object to the global.
  window.razor = razor;
}

})(window, document);