(function ( $ ) {
	"use strict";
	jQuery( document ).ready( function () {

		var $gaoop  = jQuery( '.gaoop' );
		var ua_code = $gaoop.data( 'gaoop_ua' );

		/**
		 * Check if opt-out cookie has NOT been set already
		 */
		if ( document.cookie.indexOf( 'ga-disable-' + ua_code + '=true' ) <= -1 && jQuery.isFunction( window.gaoop_analytics_optout ) ) {
			/** Check if hide-info cookie was checked **/
			if ( document.cookie.indexOf( 'gaoop_hide_info=true' ) > -1 ) {
				/* yes, set */
				if ( 1 != $gaoop.data( 'gaoop_hide' ) ) {
					$gaoop.addClass( 'gaoop_closed' ).show();
				}
			} else {
				/* not set */
				$gaoop.show();
			}
		}


		/**
		 * Close banner
		 */
		function gaoop_close() {

			if ( 1 == $gaoop.data( 'gaoop_hide' ) ) {
				$gaoop.fadeOut( 500 );
			} else {
				$gaoop.css( 'left', 'auto' ).css( 'right', 0 );
				$gaoop.find( '.gaoop-opt-out-content' ).hide();
				$gaoop.find( '.gaoop-opt-out-link, .gaoop-close-icon' ).hide();
				$gaoop.animate( { 'opacity': 0.5, 'width': '55px' }, 500 );
				$gaoop.addClass( 'gaoop_closed' );
			}

			document.cookie = 'gaoop_hide_info=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
		}


		/**
		 * Open banner
		 */
		function gaoop_open() {
			/* destroy cookie */
			document.cookie = 'gaoop_hide_info=true; expires=Thu, 31 Dec 1901 23:59:59 UTC; path=/';

			$gaoop.removeClass( 'gaoop_closed' );
			$gaoop.animate( { 'opacity': 1, 'width': '100%' }, 500, function () {
				$gaoop.find( '.gaoop-opt-out-link, .gaoop-close-icon' ).fadeIn( 300 );
				$gaoop.find( '.gaoop-opt-out-content' ).show();
			} );
		}


		/**
		 * Click Opt-Out Button
		 */
		$gaoop.find( 'a.gaoo-opt-out' ).click( function ( e ) {
			e.preventDefault();
			if ( jQuery.isFunction( window.gaoop_analytics_optout ) ) {
				gaoop_analytics_optout();
				$gaoop.fadeOut( 500 );
			}
		} );


		/**
		 * Click info icon
		 */
		$gaoop.find( '.gaoop-info-icon' ).click( function ( e ) {
			e.preventDefault();

			if ( $gaoop.hasClass( 'gaoop_closed' ) ) {
				gaoop_open();
			}

		} );


		/**
		 * Click to close the window
		 */
		$gaoop.find( '.gaoop-close-icon' ).click( function ( e ) {
			e.preventDefault();
			gaoop_close();
		} );


		/**
		 * Click to close the window
		 */

		jQuery( document ).on( 'click', '.gaoop-close-link', function ( e ) {
			e.preventDefault();
			gaoop_close();
		} );

	} );
})( jQuery );
