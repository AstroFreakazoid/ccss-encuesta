$(document).ready(function () {
        //Initialize tooltips
        $('.nav-tabs > li a[title]').tooltip();
        
        //Wizard
        $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

            var $target = $(e.target);
        
            if ($target.parent().hasClass('disabled')) {
                return false;
            }
        });

        // $(".next-step").click(function (e) {

        //     var $active = $('.wizard .nav-tabs li.active');
        //     $active.next().removeClass('disabled');
        //     nextTab($active);

        // });

        $(".prev-step").click(function (e) {

            var $active = $('.wizard .nav-tabs li.active');
            prevTab($active);

        });


    

    });

//Funcion que hace tab para el registro de una nueva pregunta
    $(".nuevaPregunta").click(function (e) {

        var $active = $('.wizard .nav-tabs li.1');
        $active.next().removeClass('disabled');
        nextTab($active);
        $( '.wizard .nav-tabs li.1' ).addClass( "disabled" );
        $( '.wizard .nav-tabs li.3' ).addClass( "disabled" );
        $( '.wizard .nav-tabs li.4' ).addClass( "disabled" );
        limpiarText1();
    });
//Esta funcion limpia los input text de las preguntas y respuestas
    function limpiarText1(){
        $('#pregunta').val("");
        $('#respA').val("");
        $('#respB').val("");
        $('#respC').val("");
        $('#respD').val("");
    }
//Funcion que hace tab para el registro de un nuevo tema
    $(".nuevoTema").click(function (e) {

        var $active = $('.wizard .nav-tabs li.2');
        prevTab($active);
        $( '.wizard .nav-tabs li.1' ).removeClass('disabled');
        $( '.wizard .nav-tabs li.2' ).addClass( "disabled" );
        $( '.wizard .nav-tabs li.3' ).addClass( "disabled" );
        $( '.wizard .nav-tabs li.4' ).addClass( "disabled" );
        limpiarText2();
    });

//Esta funcion limpia los input text del tema,de las preguntas y respuestas
    function limpiarText2(){
        $('#tema').val("");
        $('#pregunta').val("");
        $('#respA').val("");
        $('#respB').val("");
        $('#respC').val("");
        $('#respD').val("");
        
    }

//Evento click del boton que registrar el tema, aqui se valida que el input text no este en blanco

    $(".btnContinue1").click(function (e) {
        if ($('#tema').val() === ''|| $('#tema').val().indexOf(" ") == 0 ) {
        alertDGC('Ingrese el tema por favor');
        } else {
            var $active = $('.wizard .nav-tabs li.active');
            $active.next().removeClass('disabled');
            nextTab($active);
        }
    });
//Evento click del boton que registrar la pregunata, aqui se valida que el input text no este en blanco

    $(".btnContinue2").click(function (e) {
        if ($('#pregunta').val() === ''|| $('#pregunta').val().indexOf(" ") == 0 ) {
        alertDGC('Ingrese la pregunta por favor');
        } else {
            var $active = $('.wizard .nav-tabs li.active');
            $active.next().removeClass('disabled');
            nextTab($active);
        }
    });

//Evento click del boton que registrar las repuestas, aqui se valida que los input text no esten en blanco.

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


//Inicio Alert
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

//Fin Alert

    function nextTab(elem) {
        $(elem).next().find('a[data-toggle="tab"]').click();
    }
    function prevTab(elem) {
        $(elem).prev().find('a[data-toggle="tab"]').click();
    }


//according menu

    $(document).ready(function()
    {
        //Add Inactive Class To All Accordion Headers
        $('.accordion-header').toggleClass('inactive-header');
        
        //Set The Accordion Content Width
        var contentwidth = $('.accordion-header').width();
        $('.accordion-content').css({});
        
        //Open The First Accordion Section When Page Loads
        $('.accordion-header').first().toggleClass('active-header').toggleClass('inactive-header');
        $('.accordion-content').first().slideDown().toggleClass('open-content');
        
        // The Accordion Effect
        $('.accordion-header').click(function () {
            if($(this).is('.inactive-header')) {
                $('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');
                $(this).toggleClass('active-header').toggleClass('inactive-header');
                $(this).next().slideToggle().toggleClass('open-content');
            }
            
            else {
                $(this).toggleClass('active-header').toggleClass('inactive-header');
                $(this).next().slideToggle().toggleClass('open-content');
            }
        });
        
        return false;
    });