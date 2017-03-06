/**
 * Created by alego on 17/2/2017.
 */


$(document).ready(function(){
    columnChart();

    function columnChart(){
        var item = $('.chart', '.column-chart').find('.item'),
            itemWidth = 100 / item.length;
        item.css('width', itemWidth + '%');

        $('.column-chart').find('.item-progress').each(function(){
            var itemProgress = $(this),
                itemProgressHeight = $(this).parent().height() * ($(this).data('percent') / 100);
            itemProgress.css('height', itemProgressHeight);
        });
    };
});
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
            $("#output").addClass("alert alert-success animated fadeInUp").html("Welcome back " + "<span style='text-transform:uppercase'>" + textfield.val() + "</span>");
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
            });

            //show avatar
            $(".avatar").css({
                "background-image": "url('https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRL1uzmgyrfPwUC7UwnOFHFtkAhQrAUYufbLzWvOt9N8pRt1zlV')"
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
    /*	Contact Form
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