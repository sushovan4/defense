$(document).ready(function( ) {
    $('.divider').each(function( ) {
	$(this).html('<div class="content">'+$(this).html( )+'</div>');
    });
	
    Reveal.addEventListener( 'fragmentshown', function(event) {
	$(event.fragment).find('.divider').css('width', '100%' );
    });
    
    Reveal.addEventListener( 'fragmenthidden', function(event) {
	$(event.fragment).find('.divider').css('width', '0');
    });
    
    $('block').each(function() {
	$( this ).prepend('<div class="header"></div>');
	$( this ).find('.header').html($( this ).data('header'));
    });
    $('definition').each(function() {
	$( this ).prepend('<green><u><div class="header">Definition</div></u></green>');
	$( this ).find('.header').append(' (' + $( this ).data('header') + ')');
    });

});
