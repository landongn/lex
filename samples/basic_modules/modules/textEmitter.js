razor.extend('pipeline', {

	//abstraction of the MUD style text pipelining.

	interval: 30, //ms
	lines: 300, //vertically, how many lines we will be controlling
	write_queue: [], //FIFO queue for incoming lines of text

	defaultColor: '#ffffff',
	defaultFont: '18pt Ubuntu Mono',
	queue: function(line){
		razor.pipeline.write_queue.push(line);
		razor.pipeline.write();
	},
	pending_write: false,
	write: function(){
		if (razor.pipeline.pending_write){
			return;
		}
		while (razor.pipeline.write_queue.length >= 1) {
			razor.pipeline.pending_write = true;
			//while we have items in the queue
			var _line = razor.pipeline.write_queue.shift();
			console.log('thisLine, presanitized', _line);

			//if the line added to the buffer is bigger than 30 characters, chunk those lines out
			//to the queue for later processing.
			var currentLine, thisLine;
			console.log(_line.length);
			if(_line.length > 30){
				thisLine = _line.slice(0, 29);
				console.log(thisLine);
				currentLine = thisLine;
				razor.pipeline.write_queue.push(_line.slice(29, _line.length));
			} else {
				currentLine = _line;
			}

			//bring in event delimiters from razor.keywords:
			var eventKeys = razor.keys(razor.actions);
			var textOptions = [];
			var currentLineWords = currentLine.split(' ');
			for (var ii = 0; ii < currentLineWords.length; ii++) {
				if(eventKeys.indexOf(currentLineWords[ii]) > 0){
					textOptions.push([currentLineWords[ii], ii]);
				}
			}

			if(textOptions.length > 0){
				//we have some kind of word based transform. use the index to translate the word and bind events.
				for (var textOption in textOptions){
					//TODO: write the transform.
				}
			}

			if (razor.pipeline.last_write <= razor.pipeline.interval) {
				setTimeout(function(){
					//Finally, write the line into the canvas at the bottom.
					console.log('writing line', currentLine);
					razor.canvas.ctx.font = razor.pipeline.defaultFont;
					razor.canvas.ctx.fillStyle = razor.pipeline.defaultColor;
					razor.canvas.ctx.fillText(currentLine, 30, 100);
				}, razor.pipeline.interval);
			} else {
				//Finally, write the line into the canvas at the bottom.
				console.log('writing line', currentLine);
				razor.canvas.ctx.font = razor.pipeline.defaultFont;
				razor.canvas.ctx.fillStyle = razor.pipeline.defaultColor;
				razor.canvas.ctx.fillText(currentLine, 30, 100);
			}
		}
		razor.pipeline.pending_write = false;
	}

});