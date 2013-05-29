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
	var outer = [];
	var inner = [];
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

			outer[i] = $element;
			inner[i] = reset($element.children().first());
			offsets[i] = $element.offset().top;

			var height = Math.max(window_height, $element.height());

			var overflow = height - window_height;
			height += overflow / PARALLAX_FACTOR;

			if (overflow) {
				inner[i].children().first().removeClass('middle');
			} else {
				inner[i].children().first().addClass('middle');
			}

			bottoms[i] = offsets[i] + height;
			inner[i].height(height);
			outer[i].height(height);
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
		var len = outer.length
		for (i = 0; i < len; i++) {
			outer[i].css('height', bottoms[i] - offset);
			inner[i].css(
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

	function scroll_to($element) {
		var len = outer.length;
		if (0 === len) {
			$('html, body').animate({scrollTop: $element.offset().top}, 1000);
			return;
		}
		var i;
		for (i = 0; i < len; i++) {
			if ($element[0] === outer[i][0]) {
				$('html, body').animate({scrollTop: offsets[i]}, 1000);
				return;
			}
		}
	}

	global.Parallaxing = {
		resize: resize,
		scroll: scroll,
		scroll_to: scroll_to,
		delayed_resize: delayed_resize,
		PARALLAX_FACTOR: PARALLAX_FACTOR,
		MIN_WINDOW_WIDTH: MIN_WINDOW_WIDTH
	};

}(window, window.jQuery, window.mandox));
