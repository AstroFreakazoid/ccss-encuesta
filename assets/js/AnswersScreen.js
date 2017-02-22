
$( document ).ready(function() {
	$(".radio").click(function (e) {
		alertDGC("gfbtgb");
	});
});

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
