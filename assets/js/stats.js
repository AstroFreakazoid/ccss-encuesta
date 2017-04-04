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

