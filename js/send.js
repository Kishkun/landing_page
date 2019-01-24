$(document).ready(function () {
    let cookieName = "good";
    
    
    function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}
    
    
    function getCookie(name) {   //Получение куки после отправки формы
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }
    
    function delete_cookie( name ) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    if(typeof getCookie(cookieName) !== "undefined"){
        $(".accepted_wrapper.accept-js").show();
        $(".bg_modal_window.bg_modal-js").show();
        eraseCookie(cookieName);
    }
    
    
    $("#contact").submit(function (e) { //устанавливаем событие отправки для формы с id=form
        var hidden = $("#catch").val();
        e.preventDefault();


        if(hidden!= "")
            return false;
        var form_data = $(this).serialize(); //собераем все данные из формы
        $.ajax({
            type: "POST", //Метод отправки
            url: "/php/send.php", //путь до php фаила отправителя
            data: form_data,
            success: function (e) {
                console.log($('.modal-block-button'));
                $(".modal-js").css({ display: "none" });
                $(".accept-js").css({ display: "block" });
                $("#name").val("");
                $("#phone").val("");
                //код в этом блоке выполняется при успешной отправке сообщения
               // alert("Ваше сообщение отпрвлено!");
            }
        });
    });
})