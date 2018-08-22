window.msdnSubscription = (function(window, document, $){
    'use strict';

    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var app = { };

    app.log = function() {
        app.log.history = app.log.history || [];
        app.log.history.push( arguments );
        if ( window.console ) {
            window.console.log( Array.prototype.slice.call(arguments) );
        }
    };

    app.init = function() {
        $.extend(app, ajax_object);
        $( '.msdn-subscribe-button' ).on( 'click', app.handleSubscribe );
        $( '.msdn-unsubscribe-button' ).on( 'click', app.handleUnsubscribe );
        var data = {
            'action': 'is_subscriber'
        };
        $.ajax({
            'type' : 'GET',
            'url' : app.ajax_url,
            'dataType' : 'JSON',
            'data' : data,
            'success' : function( response ) {

                if ( response.success ) {
                    app.log( 'Success', response );
                } else {
                    app.log( 'Something went wrong!', response );
                    return;
                }

                if( response.data && response.data.isSubscriber ) {
                    if ( response.data.isSubscriber === 'true' ) {
                        $( '.msdn-subscribe-button' ).hide().off( 'click', app.handleSubscribe );
                    } else if ( response.data.isSubscriber === 'false' ) {
                        $( '.msdn-unsubscribe-button' ).hide().off( 'click', app.handleUnsubscribe );
                    }
                }
            },
            'error' : function( jqXHR, textStatus, errorThrown ) {
                app.log( 'Something went wrong!', {
                    'jqXHR'       : jqXHR,
                    'textStatus'  : textStatus,
                    'errorThrown' : errorThrown
                } );
            }
            });
    };

    function IsEmail( email ) {
        return regex.test(email);
    }

    app.handleSubscribe = function( evt ) {
        HandleClickEvent( evt, $(this), 'msdn_subscribe' );
    }

    app.handleUnsubscribe = function( evt ) {
        HandleClickEvent( evt, $(this), 'msdn_unsubscribe' );
    }

    function HandleClickEvent( evt, clickedButton, action ) {
        evt.stopPropagation();
        var data = {
            'action': action
        };

        var emailInputTag = clickedButton.siblings(".msdn-subscribe-email");
        if ( emailInputTag.length > 0 ) {
            data.email = emailInputTag.val();
        }

        if ( data.email && ! IsEmail( data.email ) ) {
            clickedButton.siblings(".msdn-subscribe-message")
                 .text("Invalid email format. Please try again.")
                 .addClass( "msdn-subscribe-error" )
                 .show();
            return;
        }

        var nonce = clickedButton.siblings("input[name='_msdn_subscribe_nonce']");
        if (  nonce.length > 0 ) {
            data.nonce = nonce.val();
        }

        var fail = function( response ) {
            app.log( 'Something went wrong!', response );
        };

        $.ajax({
            'type' : 'POST',
            'url' : app.ajax_url,
            'dataType' : 'JSON',
            'data' : data,
            'success' : function( response ) {

                if ( response.success ) {
                    app.log( 'Success', response );
                } else {
                    fail( response );
                }

                if( response.data && response.data.message ) {
                    clickedButton.siblings(".msdn-subscribe-message")
                        .text(response.data.message)
                        .addClass( response.success ? "msdn-subscribe-success" : "msdn-subscribe-error" )
                        .show();
                }
            },
            'error' : function( jqXHR, textStatus, errorThrown ) {
                fail( {
                    'jqXHR'       : jqXHR,
                    'textStatus'  : textStatus,
                    'errorThrown' : errorThrown
                } );
            }
        }); // end of ajax
    };  // end of HandleClickEvent

    $(window).load( app.init );
    return app;

})(window, document, jQuery);
