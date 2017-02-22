var wow = new WOW ({
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       120,          // distance to the element when triggering the animation (default is 0)
            mobile:       false,       // trigger animations on mobile devices (default is true)
            live:         true        // act on asynchronously loaded content (default is true)
        }
    );
    wow.init();

      function checkAdviceInput(){
        if($( window ).width() > 500){
            setScreenMode();
        }else{
            setPhoneMode();
        }
    }

    function setPhoneMode(){
        $('#login').removeClass('login-container');
    }
    function setScreenMode(){
        $('#login').addClass('login-container');
    }

    $(function(){
        var textfield = $("input[name=user]");
        $('button[type="submit"]').click(function(e) {
            e.preventDefault();
            //little validation just to check username
            if (textfield.val() != "") {
                //$("body").scrollTo("#output");
                $("#output").addClass("alert alert-success animated fadeInUp").html("Bienvenido " + "<span style='text-transform:uppercase'>" + textfield.val() + "</span>");
                $("#output").removeClass(' alert-danger');
                $("input").css({
                    "height":"0",
                    "padding":"0",
                    "margin":"0",
                    "opacity":"0"
                });
                //change button text
                $('button[type="submit"]').html("continue")
                    .removeClass("btn-info")
                    .addClass("btn-default").click(function(){
                    $("input").css({
                        "height":"auto",
                        "padding":"10px",
                        "opacity":"1"
                    }).val("");
                    debugger;
                    document.location.href="../index.html";
                });

                //show avatar
                $(".avatar").css({
                    "background-image": "url('https://lh6.googleusercontent.com/-CJiiie5rYOE/AAAAAAAAAAI/AAAAAAAAAVc/uWXTDjnIbv0/photo.jpg')"
                });
            } else {
                //remove success mesage replaced with error message
                $("#output").removeClass(' alert alert-success');
                $("#output").addClass("alert alert-danger animated fadeInUp").html("Disculpa, ingresa un nombre valido! ");
            }
            //console.log(textfield.val());

        });
    });

    $(function(){
        /* ========================================================================= */
        /*  Contact Form
         /* ========================================================================= */

        $('#contact-form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: "come on, you have a name don't you?",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "no email, no message"
                },
                message: {
                    required: "um...yea, you have to write something to send this form.",
                    minlength: "thats all? really?"
                }
            },
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"process.php",
                    success: function() {
                        $('#contact-form :input').attr('disabled', 'disabled');
                        $('#contact-form').fadeTo( "slow", 0.15, function() {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor','default');
                            $('#success').fadeIn();
                        });
                    },
                    error: function() {
                        $('#contact-form').fadeTo( "slow", 0.15, function() {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });
    });






(function() {

//Inicializar Firebase
    const config = {
            apiKey: "AIzaSyBKuYQ3_d7KPfsI6jGHnq6z8-WwVOC2GkU",
            authDomain: "ccss-a05e5.firebaseapp.com",
            databaseURL: "https://ccss-a05e5.firebaseio.com",
            storageBucket: "ccss-a05e5.appspot.com",
            messagingSenderId: "1052202995741"
    };
    firebase.initializeApp(config);

  // Obtener elementos
  const txtEmail = document.getElementById('loginEmail');
  const txtPassword = document.getElementById('loginPassword');
  const emailRegis = document.getElementById('email');
  const passwordRegis = document.getElementById('password');
  const btnLogin = document.getElementById('btnLogin');
  const btnRegistrar = document.getElementById('btnRegistrar');
  // const btnLogout = document.getElementById('btnLogout');

  // Añadir Evento login
  btnLogin.addEventListener('click', e => {
    //Obtener email y pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);

    

    promise.then(function(e) {

      alertDGC("todo bien");

    }).catch(function(e) {

      alertDGC("No se puede iniciar la seción  Verifique su correo o Contraseña");

    });


  });



 // Añadir evento signup
  btnRegistrar.addEventListener('click', e => {
    // Obtener email y pass
    // TODO: comprobar que el email sea real
    const emailR = emailRegis.value;
    const passR = passwordRegis.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.createUserWithEmailAndPassword(emailR, passR);

       promise.then(function(e) {

      alert("Registro exitoso")

    }).catch(function(e) {

      alertDGC(e.message);

    });


    

  });

  

} ());


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