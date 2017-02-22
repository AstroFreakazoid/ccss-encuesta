

$( document ).ready(function() {

	  
	// myVar=setInterval(alertFunc,3000);
	$(".radio").click(function (e) {

		alertDGC("gfbtgb");

	});

	
});

function siguienteAnswer() {

    
}

//Inicio Alert
function alertDGC(mensaje)
{
    var dgcTiempo=500
    var ventanaCS='<div class="dgcAlert "><div class="dgcVentana"><div class="dgcCerrar"></div><div class="dgcMensaje "><span class="glyphicon glyphicon-hand-right parpadea text" id="headAlert "></span><br>Gracias por su Respuesta<br><div class="dgcAceptar">Cambiar Respuesta</div> <br><br> </div></div></div>';
    $('body').append(ventanaCS);
    var alVentana=$('.dgcVentana').height();
    var alNav=$(window).height();
    var supNav=$(window).scrollTop();
    $('.dgcAlert').css('height',$(document).height());
    $('.dgcVentana').css('top',((alNav-alVentana)/2+supNav-100)+'px');
    $('.dgcAlert').css('display','block');
    $('.dgcAlert').animate({opacity:1},dgcTiempo);
    $('.dgcCerrar,.dgcAceptar').click(function(e) {
        $('.dgcAlert').animate({opacity:0},dgcTiempo);
        setTimeout("$('.dgcAlert').remove()",dgcTiempo);
    });
}
window.alert = function (message) {
  alertDGC(message);
};

//Fin Alert



var wow = new WOW ({
	boxClass:     'wow',      // animated element css class (default is wow)
	animateClass: 'animated', // animation css class (default is animated)
	offset:       120,          // distance to the element when triggering the animation (default is 0)
	mobile:       false,       // trigger animations on mobile devices (default is true)
	live:         true        // act on asynchronously loaded content (default is true)
  }
);
wow.init();