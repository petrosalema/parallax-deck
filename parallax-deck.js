/* Petro Salema 2013 */
(function parallaxing(global, $, mandox) {

	'use strict';

	if (mandox) {
		eval(uate)('parallaxing.js');
	}

	var PARALLAX_FACTOR = 0.2;
	var MIN_WINDOW_WIDTH = 600;

	var enabled = true;
	var window_height = 0;
	var containers = [];
	var contents = [];
	var heights = [];
	var bottoms = [];
	var offsets = [];
	var $window = $(window);
	var $sections = $('.parallax');

	function reset($collection) {
		return $collection.css({
			height: '',
			marginTop: '',
			zIndex: ''
		});
	}

	function resize() {
		window_height = $window.height();
		var zIndex = $sections.length;

		enabled = $window.width() >= MIN_WINDOW_WIDTH;

		if (!enabled) {
			$('body').removeClass('parallaxing').height('');
			$sections.each(function () {
				reset(reset($(this)).css('position', 'relative').children().first());
			});
			return;
		}

		$sections.css('position', 'relative').each(function (i) {
			var $element = reset($(this)).css({
				zIndex: zIndex--
			});
			containers[i] = $element;
			contents[i] = reset($element.children().first());
			offsets[i] = $element.offset().top;
			heights[i] = Math.max(window_height, $element.height());
			bottoms[i] = offsets[i] + heights[i];
			contents[i].height(heights[i]);
			containers[i].height(heights[i]);
		});

		$sections.css('position', 'fixed');

		$('body').addClass('parallaxing')
		         .height(bottoms.length ? bottoms[bottoms.length - 1] : 0);

		scroll();
	}

	function scroll() {
		if (!enabled) {
			return;
		}
		var offset = $window.scrollTop();
		var i;
		var len = containers.length
		for (i = 0; i < len; i++) {
			containers[i].css('height', bottoms[i] - offset);
			contents[i].css(
				'margin-top',
				Math.round((offsets[i] - offset) * PARALLAX_FACTOR)
			);
		}
	}

	var delay = null;
	function delayed_resize() {
		if (delay) {
			clearTimeout(delay);
		}
		delay = setTimeout(resize, 200);
	}

	global.Parallaxing = {
		resize: resize,
		scroll: scroll,
		delayed_resize: delayed_resize,
		PARALLAX_FACTOR: PARALLAX_FACTOR,
		MIN_WINDOW_WIDTH: MIN_WINDOW_WIDTH
	};

}(window, window.jQuery, window.mandox));
