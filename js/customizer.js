/**
 * Change the body border colors when the background color is updated.
 */
( function( $ ) {

	wp.customize( 'background_color', function( value ) {

		value.bind( function( to ) {
			// Custom background color
			if ( to && '#ffffff' !== to ) {
				$( 'body' ).css({
					'border-top-color': 'rgba(0, 0, 0, 0.3)',
					'border-bottom-color': 'rgba(0, 0, 0, 0.4)'
				});
			// Default background color
			} else {
				$( 'body' ).css({
					'border-top-color': '#c0392b',
					'border-bottom-color': '#2980b9'
				});
			}
		});

	});

} )( jQuery );
