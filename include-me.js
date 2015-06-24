module.exports = {
	getRandomInRange: getRandomInRange,
	isInViewport: isInViewport,
	scrollBasePosition: scrollBasePosition
};

/**
* Return a random number between 2 numbers
* 
* @param {Number} from
* @param {Number} to
* @return Number 
*/

function getRandomInRange(from, to) {
	return (Math.random() * (to - from) + from).toFixed(0) * 1;
}

/**
* Check if an element is within the viewport (on the Y axis)
* 
* @param {HTMlElement} element - element to check if it's in the viewport
* @param {Number} offset - change where the bottom and/or top of the window ends by offset
* @return Boolean 
*/

function isInViewport(element, offset) {
  var viewportHeight = $(window).height();
  var elementToTop = element.getBoundingClientRect().top;
  var elementHeight = $(element).outerHeight();
  
  return !(elementToTop < 0 - offset || elementToTop > viewportHeight + offset);
}

/**
* Get the base position of an element as a percentage of the windows height
* 
* @param {HTMlElement} element - element to get the base position of
* @param {Number} maxElementHeight - if the height of element is more than this the calculation will use maxElementHeight instead
* @param {Number} offset - change where the bottom of the window ends by offset
* @return Number 
*/

function scrollBasePosition(element, maxElementHeight, offset) {
  var elementToTop = element.getBoundingClientRect().top;
  var viewportHeight = $(window).height();
  var elementHeight = $(element).outerHeight() > maxElementHeight ? maxElementHeight : $(element).outerHeight();;
  var elementBasePosition = viewportHeight - (elementToTop + elementHeight);

  return (elementBasePosition - offset) / viewportHeight;
}


// @todo: Remove jQuery dep!
function setInputWidthsBasedOnPlaceholders() {
	$('input[placeholder]').each(function () {
		var fontSize = $(this).css('font-size');
		var $fake = $('<div/>')
						.text('W')
						.css({
							'font-size': fontSize, 
							'position': 'absolute', 
							'top': '0', 
							'left': '0', 
							'visibility': 'hidden', 
							'height': 'auto', 
							'width': 'auto', 
							'white-space': 'nowrap', 
							'z-index': '-1'
						});
		$('body').append($fake);
		var letterSize = $fake.width();
		$(this).css('min-width', $(this).attr('placeholder').length * letterSize + 'px');
	});
}