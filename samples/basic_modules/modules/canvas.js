
razor.extend('canvas', {
	tick: 60,
	render: function(state){

    //rendering logic for our canvas:
    //provide a current interval time, plus a state object that holds an object literal with any metadata about the current state.
    //depending on where you add your logic, updating the state is a 'good thing' so we don't step on any toes once we've updated anything.

	},

  scene: null,
  ctx: null,
  createScene: function(){
    var c = document.createElement('canvas');
    var empty = document.createElement('canvas');
    empty.width = empty.height = 1;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    c.style.background = '#000';
    c.style.position = 'absolute';
    c.style.left = c.style.top = '0px';

    var ctx = c.getContext('2d');
    razor.canvas.ctx = ctx;
    document.body.appendChild(c);
    razor.canvas.scene = c;
  }

});

(function(){
	razor.canvas.createScene();
  //do the render thing as a shim- just to be safe.
    window.requestAnimFrame = (function(){
      return window.requestAnimationFrame  ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
          window.setTimeout(callback, 1000 / 60);
        };
    })();

    (function animloop(){
      razor.canvas.render(razor.state);
      requestAnimFrame(animloop);
    })();
})();