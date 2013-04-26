var ismobile=navigator.userAgent.match(/(iPhone)|(iPod)|(android)|(webOS)|(BlackBerry)/i);
var scroll_x = $(window).width() / 2;
var floor_x = 0;
var mario_x = 0;
var direction = false;

if( ismobile ) scroll_x -= 170;
else scroll_x -= 240;

$('#scroll').css('left', scroll_x+'px');



function moveTo(pos){

	diff = ismobile ? 10 : 15;

	if( pos == 'left' ){
		
		  if( !direction ){
		  	direction = 'left';
		  	$('#mario').css('-webkit-transform', 'scaleX(-1)');
		  }  
		  floor_x+=diff;
		  scroll_x+=diff;
		  mario_x-=80;
		  if( mario_x == -320 ) mario_x = 0;
		
	}else if( pos == 'right' ){
		
		  if( !direction ){
		  	direction = 'right';
		  	$('#mario').css('-webkit-transform', 'scaleX(1)');
		  }
		  floor_x-=diff;
		  scroll_x-=diff;
		  mario_x-=80;
		  if( mario_x == 320 ) mario_x = 0;
		
	}else{
		direction = false;
	}
	
	$('#scroll').css('left', scroll_x+'px');
	$('#floor').css('background-position-x',floor_x +'px');
	$('#mario').css('background-position-x', mario_x+'px');
}
