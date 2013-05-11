/* Petro Salema 2013 */
(function parallaxing(global, $, mandox) {

	'use strict';

	if (mandox) {
		eval('uate')('parallaxing.js');
	}

	var parallax_factor = 0.2;
	var window_height = 0;
	var body_height = 0;
	var containers = [];
	var contents = [];
	var heights = [];
	var bottoms = [];
	var offsets = [];
	var $window = $(window);
	var $sections = $('.parallax');

	function reset($element) {
		return $element.css({
			height: '',
			marginTop: '',
			zIndex: ''
		});
	}

	function resize() {
		window_height = $window.height();

		var zIndex = $sections.length;

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
		}).css('position', 'fixed');

		body_height = bottoms.length ? bottoms[bottoms.length - 1] : 0;

		$('body').height(body_height);

		scroll();
	}

	function scroll() {
		var offset = $window.scrollTop();
		var i;
		var len = containers.length
		for (i = 0; i < len; i++) {
			containers[i].css('height', bottoms[i] - offset);
			contents[i].css(
				'margin-top',
				Math.round((offsets[i] - offset) * parallax_factor)
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
		delayed_resize: delayed_resize
	};

}(window, window.jQuery, window.mandox));
