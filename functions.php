<?php
/**
 * Cycnuc functions file
 *
 * @package    Cycnus
 * @subpackage Functions
 * @version    1.0.0
 * @author     Jesper Johansen <kontakt@jayj.dk>
 * @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

/* Add the child theme setup function to the 'after_setup_theme' hook. */
add_action( 'after_setup_theme', 'cycnus_child_theme_setup', 11 );

/**
 * Theme setup function
 *
 * @since 1.0.0
 */
function cycnus_child_theme_setup() {

	/* Get the theme prefix. */
	$prefix = hybrid_get_prefix();

	/* Add theme support for custom backgrounds. */
	add_theme_support( 'custom-background', array( 'default-color' => 'ffffff' ));

	/* Add theme support for Loop Pagination. */
	add_theme_support( 'loop-pagination' );

	/* Filter the body class. */
	add_filter( 'body_class', 'cycnus_body_class' );

	/* Register JS needed for the Theme Customizer. */
	add_action( 'customize_preview_init', 'cycnus_customizer_live_preview' );

	/* Register the Libre Baskerville font as a new heading font. */
	add_action( 'theme_fonts_register', 'cycnus_register_font', 11 );
}

/**
 * Extends the default WordPress body class to denote:
 *   1. White or empty background color to change the layout
 *
 * @since Cycnus 1.0.0
 */
function cycnus_body_class( $classes ) {
	$background_color = get_background_color();

	if ( empty( $background_color ) ) {
		$classes[] = 'custom-background-empty';
	} elseif ( in_array( $background_color, array( 'fff', 'ffffff' ) ) ) {
		$classes[] = 'custom-background-white';
	}

	return $classes;
}

/**
 * Registers JS needed for the Theme Customizer
 *
 * @since Cycnus 1.0.0
 */
function cycnus_customizer_live_preview() {

	wp_enqueue_script(
		'cycnus-theme-customizer',
		CHILD_THEME_URI . '/js/customizer.js',
		array( 'jquery', 'customize-preview' ),
		'1.0.0',
		true
	);

}

/**
 * Registers a new font for the headings
 *
 * @param  object $fonts
 * @return void
 */
function cycnus_register_font( $fonts ) {

	/* Libre Baskerville font family (normal, italic, bold). */
	$fonts->add_font( array(
		'handle' => 'libre-baskerville',
		'family' => 'Libre Baskerville',
		'type'   => 'google'
	));

	$fonts->add_font( array(
		'handle' => 'libre-baskerville-italic',
		'family' => 'Libre Baskerville',
		'style'  => 'italic',
		'type'   => 'google'
	));

	$fonts->add_font( array(
		'handle' => 'libre-baskerville-bold',
		'family' => 'Libre Baskerville',
		'weight' => 700,
		'type'   => 'google'
	));

	/* Add the font as a heading font in favor of Open Sans Condensed. */
	$fonts->add_setting( array(
		'id'        => 'headers',
		'default'   => 'libre-baskerville',
		'selectors' => array()
	));

	$fonts->add_setting( array(
		'id'        => 'headers-bold',
		'default'   => 'libre-baskerville-bold',
		'selectors' => array()
	));

	$fonts->add_setting( array(
		'id'        => 'headers-italic',
		'default'   => 'libre-baskerville-italic',
		'selectors' => array()
	));
}
