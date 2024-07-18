/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});
	// Touch?
	if (browser.mobile)
	$body.addClass('touch');

// Transitions supported?
if (browser.canUse('transition')) {

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Prevent transitions/animations on resize.
		var resizeTimeout;

		$window.on('resize', function() {

			window.clearTimeout(resizeTimeout);

			$body.addClass('is-resizing');

			resizeTimeout = window.setTimeout(function() {
				$body.removeClass('is-resizing');
			}, 100);

		});

}

// Scroll back to top.
$window.scrollTop(0);

// Panels.
var $panels = $('.panel');

$panels.each(function() {

	var $this = $(this),
		$toggles = $('[href="#' + $this.attr('id') + '"]'),
		$closer = $('<div class="closer" />').appendTo($this);

	// Closer.
		$closer
			.on('click', function(event) {
				$this.trigger('---hide');
			});

	// Events.
		$this
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('---toggle', function() {

				if ($this.hasClass('active'))
					$this.triggerHandler('---hide');
				else
					$this.triggerHandler('---show');

			})
			.on('---show', function() {

				// Hide other content.
					if ($body.hasClass('content-active'))
						$panels.trigger('---hide');

				// Activate content, toggles.
					$this.addClass('active');
					$toggles.addClass('active');

				// Activate body.
					$body.addClass('content-active');

			})
			.on('---hide', function() {

				// Deactivate content, toggles.
					$this.removeClass('active');
					$toggles.removeClass('active');

				// Deactivate body.
					$body.removeClass('content-active');

			});

	// Toggles.
		$toggles
			.removeAttr('href')
			.css('cursor', 'pointer')
			.on('click', function(event) {

				event.preventDefault();
				event.stopPropagation();

				$this.trigger('---toggle');

			});

});

// Global events.
	$body
		.on('click', function(event) {

			if ($body.hasClass('content-active')) {

				event.preventDefault();
				event.stopPropagation();

				$panels.trigger('---hide');

			}

		});

	$window
		.on('keyup', function(event) {

			if (event.keyCode == 27
			&&	$body.hasClass('content-active')) {

				event.preventDefault();
				event.stopPropagation();

				$panels.trigger('---hide');

			}

		});

// Header.
var $header = $('#header');

// Links.
	$header.find('a').each(function() {

		var $this = $(this),
			href = $this.attr('href');

		// Internal link? Skip.
			if (!href
			||	href.charAt(0) == '#')
				return;

		// Redirect on click.
			$this
				.removeAttr('href')
				.css('cursor', 'pointer')
				.on('click', function(event) {

					event.preventDefault();
					event.stopPropagation();

					window.location.href = href;

				});

	});

// Footer.
var $footer = $('#footer');

// Copyright.
// This basically just moves the copyright line to the end of the *last* sibling of its current parent
// when the "medium" breakpoint activates, and moves it back when it deactivates.
	$footer.find('.copyright').each(function() {

		var $this = $(this),
			$parent = $this.parent(),
			$lastParent = $parent.parent().children().last();

		breakpoints.on('<=medium', function() {
			$this.appendTo($lastParent);
		});

		breakpoints.on('>medium', function() {
			$this.appendTo($parent);
		});

	});

// Main.
var $main = $('.main');

// Thumbs.
	$main.children('.thumb').each(function() {

		var	$this = $(this),
			$image = $this.find('.image'), $image_img = $image.children('img'),
			x;

		// No image? Bail.
			if ($image.length == 0)
				return;

		// Image.
		// This sets the background of the "image" <span> to the image pointed to by its child
		// <img> (which is then hidden). Gives us way more flexibility.

			// Set background.
				$image.css('background-image', 'url(' + $image_img.attr('src') + ')');

			// Set background position.
				if (x = $image_img.data('position'))
					$image.css('background-position', x);

			// Hide original img.
				$image_img.hide();

	});

// Poptrox.
	$main.poptrox({
		baseZIndex: 20000,
		caption: function($a) {

			var s = '';

			$a.nextAll().each(function() {
				s += this.outerHTML;
			});

			return s;

		},
		fadeSpeed: 300,
		onPopupClose: function() { $body.removeClass('modal-active'); },
		onPopupOpen: function() { $body.addClass('modal-active'); },
		overlayOpacity: 0,
		popupCloserText: '',
		popupHeight: 150,
		popupLoaderText: '',
		popupSpeed: 300,
		popupWidth: 150,
		selector: '.thumb > a.image, .thumb2 > a.image',
		usePopupCaption: true,
		usePopupCloser: true,
		usePopupDefaultStyling: false,
		usePopupForceClose: true,
		usePopupLoader: true,
		usePopupNav: true,
		windowMargin: 50
	});

	// Hack: Set margins to 0 when 'xsmall' activates.
		breakpoints.on('<=xsmall', function() {
			$main[0]._poptrox.windowMargin = 0;
		});

		breakpoints.on('>xsmall', function() {
			$main[0]._poptrox.windowMargin = 50;
		});

})(jQuery);

const music = document.getElementById('background-music');
const button = document.getElementById('float-button-music');

// Mengatur volume menjadi 50%
music.volume = 0.15;

// Memulai musik saat halaman dimuat
window.onload = function() {
	music.play();
};

// Fungsi untuk pause dan play musik
button.addEventListener('click', function() {
	if (music.paused) {
		music.play();
		button.innerHTML = '<i class="icon solid fa-pause"></i>';
	} else {
		music.pause();
		button.innerHTML = '<i class="icon solid fa-play"></i>';
	}
});
