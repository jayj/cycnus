<?php
/**
 * Cycnuc functions file
 *
 * @package    Cycnus
 * @subpackage Functions
 */

/* Add the child theme setup function to the 'after_setup_theme' hook. */
add_action( 'after_setup_theme', 'cycnus_child_theme_setup', 11 );

/**
 * Theme setup function.
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

	/* Register the Libre Baskerville font as a new heading font. */
	add_action( 'theme_fonts_register', 'cycnus_register_font', 11 );

	/* Filter the footer content. */
	add_filter( "{$prefix}_footer_content", 'cycnus_footer_content' );

}

function cycnus_footer_content( $content ) {

	$content = '<p class="credit">' . __( 'Copyright &copy; [the-year] [site-link].<br />Powered by [wp-link], [theme-link], and [child-link].', 'cycnus' );

	return $content;
}


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
