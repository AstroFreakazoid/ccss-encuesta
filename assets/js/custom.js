/* ========================================================================= */
/*	Preloader
/* ========================================================================= */

jQuery(window).load(function(){

	$("#preloader").fadeOut("slow");

});


$(document).ready(function(){

	/* ========================================================================= */
	/*	Menu item highlighting
	/* ========================================================================= */

	jQuery('#nav').singlePageNav({
		offset: jQuery('#nav').outerHeight(),
		filter: ':not(.external)',
		speed: 1200,
		currentClass: 'current',
		easing: 'easeInOutExpo',
		updateHash: true,
		beforeStart: function() {
			console.log('begin scrolling');
		},
		onComplete: function() {
			console.log('done scrolling');
		}
	});
	
    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $("#navigation").css("background-color","#3498db");
        } else {
            $("#navigation").css("background-color","rgba(16, 22, 54, 0.2)");
        }
    });
	
	/* ========================================================================= */
	/*	Fix Slider Height
	/* ========================================================================= */	

	var slideHeight = $(window).height();
	
	$('#slider, .carousel.slide, .carousel-inner, .carousel-inner .item').css('height',slideHeight);

	$(window).resize(function(){'use strict',
		$('#slider, .carousel.slide, .carousel-inner, .carousel-inner .item').css('height',slideHeight);
	});
	
	
	/* ========================================================================= */
	/*	Portfolio Filtering
	/* ========================================================================= */	
	
	
    // portfolio filtering

    $(".project-wrapper").mixItUp();
	
	
	$(".fancybox").fancybox({
		padding: 0,

		openEffect : 'elastic',
		openSpeed  : 650,

		closeEffect : 'elastic',
		closeSpeed  : 550,

		closeClick : true,
	});
	
	/* ========================================================================= */
	/*	Parallax
	/* ========================================================================= */	
	
	$('#facts').parallax("50%", 0.3);
	
	/* ========================================================================= */
	/*	Timer count
	/* ========================================================================= */

	"use strict";
    $(".number-counters").appear(function () {
        $(".number-counters [data-to]").each(function () {
            var e = $(this).attr("data-to");
            $(this).delay(6e3).countTo({
                from: 50,
                to: e,
                speed: 3e3,
                refreshInterval: 50
            })
        })
    });
	
	/* ========================================================================= */
	/*	Back to Top
	/* ========================================================================= */
	
	
    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $("#back-top").fadeIn(200)
        } else {
            $("#back-top").fadeOut(200)
        }
    });
    $("#back-top").click(function () {
        $("html, body").stop().animate({
            scrollTop: 0
        }, 1500, "easeInOutExpo")
    });
	
});

/* ==========  START GOOGLE MAP ==========

function initialize() {
    var myLatLng = new google.maps.LatLng(22.402789, 91.822156);

    var mapOptions = {
        zoom: 14,
        center: myLatLng,
        disableDefaultUI: true,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'roadatlas']
        }
    };

    var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);


    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: 'img/location-icon.png',
        title: '',
    });

}

google.maps.event.addDomListener(window, "load", initialize);
 ========== END GOOGLE MAP ========== */



// ========== LOGICA FORMULARIO MODAL DE REGISTRARPREGUNTA  ========== 

$(document).ready(function () {
//INITIALIZE TOOLTIPS
    $('.nav-tabs > li a[title]').tooltip();
    //WIZARD
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
		var $target = $(e.target);
   		if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });
	$(".prev-step").click(function (e) {
	var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);
	 });
});
//FUNCION QUE HACE TAB PARA EL REGISTRO DE UNA NUEVA PREGUNTA
$(".nuevaPregunta").click(function (e) {
	var $active = $('.wizard .nav-tabs li.1');
    $active.next().removeClass('disabled');
    nextTab($active);
    $( '.wizard .nav-tabs li.1' ).addClass( "disabled" );
    $( '.wizard .nav-tabs li.3' ).addClass( "disabled" );
    $( '.wizard .nav-tabs li.4' ).addClass( "disabled" );
		limpiarText1();
});
//ESTA FUNCION LIMPIA LOS INPUT TEXT DE LAS PREGUNTAS Y RESPUESTAS
function limpiarText1(){
	$('#pregunta').val("");
	$('#respA').val("");
	$('#respB').val("");
	$('#respC').val("");
	$('#respD').val("");
}
//FUNCION QUE HACE TAB PARA EL REGISTRO DE UN NUEVO TEMA
$(".nuevoTema").click(function (e) {
	var $active = $('.wizard .nav-tabs li.2');
    prevTab($active);
    $( '.wizard .nav-tabs li.1' ).removeClass('disabled');
    $( '.wizard .nav-tabs li.2' ).addClass( "disabled" );
    $( '.wizard .nav-tabs li.3' ).addClass( "disabled" );
    $( '.wizard .nav-tabs li.4' ).addClass( "disabled" );
    limpiarText2();
});
//ESTA FUNCION LIMPIA LOS INPUT TEXT DEL TEMA,DE LAS PREGUNTAS Y RESPUESTAS
function limpiarText2(){
	$('#tema').val("");
	$('#pregunta').val("");
	$('#respA').val("");
	$('#respB').val("");
	$('#respC').val("");
	$('#respD').val("");
}
//EVENTO CLICK DEL BOTON QUE REGISTRAR EL TEMA, AQUI SE VALIDA QUE EL INPUT TEXT NO ESTE EN BLANCO
$(".btnContinue1").click(function (e) {
    if ($('#tema').val() === ''|| $('#tema').val().indexOf(" ") == 0 ) {
       alertDGC('Ingrese el tema por favor');
    } else {
        var $active = $('.wizard .nav-tabs li.active');
    	$active.next().removeClass('disabled');
    	nextTab($active);
    }
});
//EVENTO CLICK DEL BOTON QUE REGISTRAR LA PREGUNATA, AQUI SE VALIDA QUE EL INPUT TEXT NO ESTE EN BLANCO
$(".btnContinue2").click(function (e) {
    if ($('#pregunta').val() === ''|| $('#pregunta').val().indexOf(" ") == 0 ) {
       alertDGC('Ingrese la pregunta por favor');
    } else {
        var $active = $('.wizard .nav-tabs li.active');
    	$active.next().removeClass('disabled');
    	nextTab($active);
    }
});

//EVENTO CLICK DEL BOTON QUE REGISTRAR LAS REPUESTAS, AQUI SE VALIDA QUE LOS INPUT TEXT NO ESTEN EN BLANCO.
$(".btnContinue3").click(function (e) {
	var siguiente=true;

    if ($('#respA').val() === ''|| $('#respA').val().indexOf(" ") == 0 ) {
       alertDGC('Ingrese la respuesta A');
       siguiente=false;
    }
    if ($('#respB').val() === ''|| $('#respB').val().indexOf(" ") == 0 ) {
       alertDGC('Ingrese la respuesta B');
       siguiente=false;
    } 
    if ($('#respC').val() === ''|| $('#respC').val().indexOf(" ") == 0 ) {
       alertDGC('Ingrese la respuesta C');
       siguiente=false;
    } 
    if ($('#respD').val() === ''|| $('#respD').val().indexOf(" ") == 0 ) {
       alertDGC('Ingrese la respuesta D');
       siguiente=false;
    }
	if(siguiente===true){
        var $active = $('.wizard .nav-tabs li.active');
    	$active.next().removeClass('disabled');
    	nextTab($active);
    }
});
//INICIO ALERT
function alertDGC(mensaje)
{
    var dgcTiempo=500
    var ventanaCS='<div class="dgcAlert"><div class="dgcVentana"><div class="dgcCerrar"></div><div class="dgcMensaje">'+mensaje+'<br><div class="dgcAceptar">Aceptar</div></div></div></div>';
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
//FIN ALERT
function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}
	// ========== LOGICA FORMULARIO MODAL DE REGISTRARPREGUNTA  ========== 