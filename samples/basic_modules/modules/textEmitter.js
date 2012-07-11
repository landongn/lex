razor.extend('pipeline', {

	//abstraction of the MUD style text pipelining.

	interval: 50, //ms
	lines: 300, //vertically, how many lines we will be controlling
	write_queue: [], //FIFO queue for incoming lines of text

	defaultColor: '#ffffff', //default text color.
	defaultFont: '16px Ubuntu Mono', //default font and size
	linePadding: 20, //space between lines in pixels
	charPadding: 7, //space between characters in pixels
	lineLength: 80, //max characters per line before faux \r\n
	buffer: {}, //used when writing characters to the canvas.
	lineX: 10, //current character X position
	lineY: 10, //current line Y Position
	pending_write: false, //is another write in progress? (writes take time.)
	//Queues a line of text (or mass of text) to get rendered in the write queue.
	queue: function(line){
		razor.pipeline.write_queue.push(line);
		razor.pipeline.write();
	},
	//populates the current buffer with the formatted text and promps the fill process
	_writeText: function(line){
		razor.pipeline.buffer.line = line;
		razor.pipeline.buffer.charcount = line.length;
		razor.pipeline.buffer.index = 0;
		razor.pipeline.fill(razor.pipeline.buffer);

	},

	//recursivly draws the buffer to the screen one character at a time. Locked at 'interval' speed.
	fill: function(buffer) {

		var framestart = Number(new Date()); //used for throttling render speed later

		//are we finished?
		if (buffer.charcount === buffer.index){
			//all finished. reset the cursor to the next line.
			razor.pipeline.lineX = 10;
			razor.pipeline.lineY += razor.pipeline.linePadding;
			return;
		}

		//set up some defaults for font rendering.
		razor.canvas.ctx.font = razor.pipeline.defaultFont;
		razor.canvas.ctx.fillStyle = razor.pipeline.defaultColor;

		//write the character to the canvas at (x, y)
		razor.canvas.ctx.fillText(buffer.line[buffer.index], razor.pipeline.lineX, razor.pipeline.lineY);
		razor.pipeline.lineX = (razor.pipeline.lineX + razor.pipeline.charPadding);

		//do we need to finish this line and start a new one?
		if (razor.pipeline.lineX > (razor.pipeline.charPadding * razor.pipeline.lineLength)) {
			razor.pipeline.lineY += razor.pipeline.linePadding;
			razor.pipeline.lineX = 10;
		}

		//increment our index in the buffer
		razor.pipeline.buffer.index +=1;

		//how long did we take to render this?
		var diff = (Number(new Date()) - framestart);

		//did we take less time than the interval between text, or longer?
		if(diff <= razor.pipeline.interval){
			//wait until the interval elapses, then continue rendering
			window.setTimeout(function(){
				razor.pipeline.fill(razor.pipeline.buffer);
			}, diff);
		} else{
			//we're good. keep going as fast as we can.
			razor.pipeline.fill(razor.pipeline.buffer);
		}
	},

	//processes data in the queue, line by line. queue lines longer than we want back into the queue.
	write: function(){

		//are we already working on a write?
		if (razor.pipeline.pending_write){
			//aw snap, better wait until we're finished.
			return;
		}

		//drain the queue, item by item, until we're empty.
		while (razor.pipeline.write_queue.length >= 1) {
			razor.pipeline.pending_write = true; //'lock' the write queue until we're finished

			//nab the first line in the queue
			var _line = razor.pipeline.write_queue.shift();

			//if the line added to the buffer is bigger than _n_ characters, chunk those lines out
			//to the queue for later processing.
			var currentLine, thisLine;
			if(_line.length > 80){
				thisLine = _line.slice(0, 79);
				currentLine = thisLine;
				razor.pipeline.write_queue.push(_line.slice(79, _line.length));
			} else {
				currentLine = _line;
			}

			//bring in event delimiters from razor.keywords for processing.
			//write events in razor.actions as functions matching keywords
			var eventKeys = razor.keys(razor.actions);
			var textOptions = [];
			//split out the words, space delimited
			var currentLineWords = currentLine.split(' ');
			for (var ii = 0; ii < currentLineWords.length; ii++) {
				if(eventKeys.indexOf(currentLineWords[ii]) > 0){
					textOptions.push([currentLineWords[ii], ii]);
				}
			}

			//any keywords found in the text?
			if(textOptions.length > 0){
				//sweet! do something with those keywords here.
				for (var textOption in textOptions){
					//TODO: write the transform.

				}
			}
			//finally, send the modified line out to the write buffer
			razor.pipeline._writeText(currentLine);
		}
		//unlock the write queue
		razor.pipeline.pending_write = false;
	}

});