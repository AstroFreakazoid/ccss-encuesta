/**
 * Created by alego on 17/2/2017.
 */

$.getScript('http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js',function(){
    $.getScript('http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.0/morris.min.js',function(){

        Morris.Area({
            element: 'area-example',
            data: [
                { y: '1.1.', a: 100, b: 90 },
                { y: '2.1.', a: 75,  b: 65 },
                { y: '3.1.', a: 50,  b: 40 },
                { y: '4.1.', a: 75,  b: 65 },
                { y: '5.1.', a: 50,  b: 40 },
                { y: '6.1.', a: 75,  b: 65 },
                { y: '7.1.', a: 100, b: 90 }
            ],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Series A', 'Series B']
        });

        Morris.Line({
            element: 'line-example',
            data: [
                {year: '2010', value: 20},
                {year: '2011', value: 10},
                {year: '2012', value: 5},
                {year: '2013', value: 2},
                {year: '2014', value: 20}
            ],
            xkey: 'year',
            ykeys: ['value'],
            labels: ['Value']
        });

        Morris.Donut({
            element: 'donut-example',
            data: [
                {label: "Android", value: 12},
                {label: "iPhone", value: 30},
                {label: "Other", value: 20}
            ]
        });

        Morris.Bar({
            element: 'bar-example',
            data: [
                {y: 'Jan 2014', a: 100},
                {y: 'Feb 2014', a: 75},
                {y: 'Mar 2014', a: 50},
                {y: 'Apr 2014', a: 75},
                {y: 'May 2014', a: 50},
                {y: 'Jun 2014', a: 75}
            ],
            xkey: 'y',
            ykeys: ['a'],
            labels: ['Visitors', 'Conversions']
        });

    });
});

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