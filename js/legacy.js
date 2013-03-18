// Javascript for legacy

var count = '0'; // variable for add c++ function, start count at zero to add to first number
        
$( init ); // call this function on page load
         
/* Initial Function when page is loaded */
function init() {
            
    var count = '0';
            
    // JQuery hides the sqr result and the add result
    $('.sqrDrag').hide();
    $('.addDrag').hide();
            
    /* set up draggable divs */
            
    // make the numDrag div draggable
    $('.numDrag').draggable({
	    containment: 'window', /* drag is limited to window */
                cursor: 'move', /* draggable moves with cursor */
                start: handleDragStart, /* call this event when the dragging starts */
                stop: handleDragStop, /* call this event when the dragging stops */
                drag: handleDragDrag, /* call this event when div is dragging */
                revert: true, /* set the draggable to return to original position when released */
                addClasses: true,
		});
            
    // make the sqrDrag div draggable
    $('.sqrDrag').draggable({
	    containment: 'window',
                cursor: 'move',
                start: handleDragStart,
                stop: handleDragStop,
                drag: handleDragDrag,
                revert: true,
                addClasses: true,
		});
            
    // make the addDrag div draggable
    $('.addDrag').draggable({
	    containment: 'window',
                cursor: 'move',
                start: handleDragStart,
                stop: handleDragStop,
                drag: handleDragDrag,
                revert: true,
                addClasses: true,
		});
          
    /* set up droppable divs */
            
    // make the dropBox div for C function droppable
    $('.dropBox').droppable({
	    start: handleDragStart, /* call this event when the dragging starts */
                drop: handleDropEvent, /* call this event when the draggable div is dropped into this div */
                out: outEvent, /* call this event when the draggable div is dragged out of this div */
                over: overEvent, /* call this event when the draggable div is hovering out of this div */
                hoverClass: 'hovered2', /* when the draggable div is hovering out of this div, can change CSS of DIV */
		});
        
            
    // make the dropBox2 div for C++ function droppable
    $('.dropBox2').droppable({
	    start: handleDragStart,
                drop: handleDropEvent2,
                out: outEvent2,
                over: overEvent2,
                hoverClass: 'hovered',
		});
          
    // make the fDropBox div for Fortran function droppable
    $('.fDropBox').droppable({
	    start: handleDragStart,
                drop: fHandleDropEvent,
                out: fOutEvent,
                over: fOverEvent,
                tolerance: 'touch', /* means that this droppable div reacts on first touch by draggable */
		});
            
} // end init function
        
        
// when dragging starts event
function handleDragStart(event, ui) {
            
    // change C function dropbox
    $(".dropBox").text('Drop Here To Square Number!' );
    $(".dropBox").prepend('</br></br></br></br></br></br>');
            
    // change C++ function dropbox
    $(".dropBox2").text('Drop Here To Add Number!' );
    $(".dropBox2").prepend('</br></br></br></br></br></br>');
            
    // change fortran function dropbox
    $(".fDropBox").text('Fibonacci!');
    $(".fDropBox").prepend('');
    $(".fDropBox").animate({width: '100px', minHeight: '35px', backgroundColor: '#E7FBF8F'}, 800, afterAnimationOut(event,ui));
            
}// end dragging start
        
/* DropBox 1 for C Function Events*/
        
// when draggable is dropped into C droppable
function handleDropEvent(event, ui) {
            
    var draggable = ui.draggable; // get the draggable div
    $('.sqrDrag').show(); // show the result div
            
    // change droppable text
    $(".dropBox").text('Block "' + draggable.attr('name') + '" was dropped on me!' );
    $(".dropBox").prepend('</br></br></br></br></br>');
    $(".dropBox").append('</br></br>' + draggable.attr('name') + ' * ' + draggable.attr('name') + '</br>|</br>|</br>|</br>|</br>|</br>V');
            
    // AJAX: sends data to server, where django and python are
    // Python returns this: return HttpResponse(simplejson.dumps(_sqr.sqr(int(num))), mimetype="application/json")
    $.ajax({
                   
	    url:"/legacy/sqr/" + draggable.attr('name') + "/", /* url where you can pass in variables to django and python */
                type: "GET", /* define type 'GET' or 'POST' */
                
                /* if ajax is succesful, the return value from python is 'response' */
                success: function(response){
                   
		if(response >= 0) {
		    $(".sqrDrag").attr('name', response);
		    $(".sqrDrag").text(response);
		}
		else{
		    alert('The Number ' + draggable.attr('name') + ' * ' + draggable.attr('name') + ' is too big to be displayed.');
		    $(".dropBox").text('Drop Here To Square Number!' );
		    $(".dropBox").prepend('</br></br></br></br></br></br>');
		}
	    },
                   
                /* if ajax fails */
                error: function(response){
		return null;
	    },
            
		}) // end AJAX
            
        } // end drop event for C function
        
/* When draggable div is dragged out of this C function droppable */
function outEvent(event, ui) {
    var draggable = ui.draggable;
    $(".dropBox").text('Drop Here!' );
    $(".dropBox").prepend('</br></br></br></br></br></br>');
} // end outEvent
        
/* When draggable div is dragged over of this C function droppable */
function overEvent(event, ui) {
    var draggable = ui.draggable;
    $(".dropBox").text('Block "' + draggable.attr('name') + '" is hovering over me!' );
    $(".dropBox").prepend('</br></br></br></br></br></br>');
} // end overEvent
        
/* End DropBox 1 Events*/
        
/* DropBox 2 Events*/
        
// when draggable is dropped into C++ drow();
            
$(".dropBox2").text('Block "' + draggable.attr('name') + '" was dropped on me!' );
$(".dropBox2").prepend('</br></br></br></br></br>');
$(".dropBox2").append('</br></br>' + count + ' + ' + draggable.attr('name') + '</br>|</br>|</br>|</br>|</br>|</br>V');
            
// ajax
$.ajax({
	url:"/legacy/add/" + draggable.attr('name') + "/" + count + "/",
	    type: "GET",
	    success: fuepend('</br></br></br></br></br></br>');
    }
                   
    },
                   
    error: function(response){
	return null;
},
                   
    }) // end ajax
            
        } // end drop event for C++ function  
        
/* When draggable div is dragged out of this C++ function droppable */
function outEvent2(event, ui) {
    var draggable = ui.draggable;
    $(".dropBox End DropBox 2 Events*/
        
        /* DropBox Fortran Events*/
        
        // when draggable is dropped into FORTRAN droppable
        function fHandleDropEvent(event, ui) {
            
            var draggable = ui.draggable;
            
            // Check if draggable is larger than 60 and displays message
            if (parseInt(draggable.attr('name')) > 60) {
                
                  
                url:"/legacy/fib/" + draggable.attr('name') + "/",
                type: "GET",
                success: function(response){$(".bText").text(response);},
                error: function(response){return null;},
                   
            })
            
        } // end drop event for Fortran function 
        
        /* When draggable div is dragged out of this Fortran function droppable */
        function fOutEvent(event, ui) {
            $(".fDropBox").animate({width: '100px', minHeight: '35px', backgroundColor: '#E7FBF8F'}, 800, afterAnimunction afterAnimationOver(event, ui){
            var draggable = ui.draggable;
            $(".fDropBox").text('Drop here for first "' + draggable.attr('name') + '" numbers of Fibonacci!' );
            $(".fDropBox").prepend('</br>');
        }
        
        function afterAnimationOut(event, ui){
            var draggable = ui.draggable;
            $(".fDropBox").text('Fibonacci!' );
            $(".fDropBox").prepend('</br>');
        }
        
        function afterAnimationReset() {
            $(".fDropBox").text('Fibonacci!' );
            $(".fDropBox").prepend('</br>');
          // show position of draggable div when dragging */
        function handleDragDrag( event, ui ) {
            var offsetXPos = parseInt( ui.offset.left );
            var offsetYPos = parseInt( ui.offset.top );
            $(".infoBox").text("X-Pos: " + offsetXPos + ", Y-Pos: " + offsetYPos);
        }
        
        /* End Position of Draggable Div */
        
        // When reset button is pushed, reset all results
        function resetResults() {
            
            $('.sqrDrag').text("0");
            $('.ad}, 800, afterAnimationReset());
            count = '0';
            
        }
