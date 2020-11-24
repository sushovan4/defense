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

    if( $('cite').length > 0 ) {
        $.get( '/assets/latex/sush-cloud.html', function( data ) {
            citations( data );
        });
        }
    
        if( $('fullcite').length > 0 ) {
        $.get( '/assets/latex/sush-cloud.html', function( data ) {
            fullcite( data );
        });
        }
        
        $(document.body).on('click', '.cite', function(event) {
        $('html, body').animate({
            scrollTop: $('.refs [data-text="'+ $(this).data('text')+'"]').offset( ).top
        }, 1000);
    });
});


function citations( data ) {
    var refCount = 1;
    $('cite').each(function( ) {
	var texts = $( this ).text( ).split( ',' );
	var newText = '[';
	for( var i = 0; i < texts.length; i++ ) {
	    var text = texts[ i ];
	    var refs = $('.ref[data-text="'+ text +'"]'); 
	    if(  refs.length > 0 ) {
		var count = $( refs[ 0 ] ).children( ).eq( 0 ).text( );
		newText += '<a class="cite" data-text="'+ text +'">' +
		    count.substring( 1, count.length - 1 ) + '</a>,';
		continue;
	    }
	    
	    newText += '<a class="cite" data-text="'+ text +'">' + refCount + '</a>,';
	    var startIdx = data.indexOf( 'name="'+ text );
	    var ref;
	    if( startIdx == -1 )
		ref = 'Not Found';
	    else {
		var endIdx = data.indexOf( '</td>', startIdx + 45 + text.length);
		ref = data.substring( startIdx + 45 + text.length , endIdx);
		var links = ref.substring( ref.lastIndexOf('[') );
		ref = ref.substring( 0, ref.lastIndexOf('[')  );
	    }
	    $('.refs').append('<div class="ref row" data-text="' + text +
			      '"><div class="one wide column">[' + refCount +
			      ']</div><div class="fifteen wide column">'+ ref +
			       '<br><span class="reflinks">' + links + '</span></div>');
	    refCount++;   
	}
	$(this).html( newText.substring( 0, newText.length - 1) + ']'  );
    });
}

function fullcite( data ) {
    $('fullcite').each(function( ) {
	var text = $( this ).text( );
	var startIdx = data.indexOf( 'name="'+ text );
	var ref;
	if( startIdx == -1 )
	    ref = 'Not Found';
	else {
	    var endIdx = data.indexOf( '</td>', startIdx + 45 + text.length);
	    ref = data.substring( startIdx + 45 + text.length , endIdx);
	    var links = ref.substring( ref.lastIndexOf('[') );
	    ref = ref.substring( 0, ref.lastIndexOf('[')  );
	}
	$(this).replaceWith('<div>'+ ref + '<br>'
			    + '<span class="reflinks">' + links + '</span></div>');
    });
}