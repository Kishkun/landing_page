let linkNav = document.querySelectorAll('[href^="#page-"]'),
    V = 0.2;
for (let i = 0; i < linkNav.length; i++) {
    linkNav[i].onclick = function(){
        let w = window.pageYOffset,
            hash = this.href.replace(/[^#]*(.*)/, '$1');
        let t = document.querySelector(hash).getBoundingClientRect().top,
            start = null;
        requestAnimationFrame(step);
        function step(time) {
            if (start === null) start = time;
            let progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r !== w + t) {requestAnimationFrame(step)} else {location.hash = hash}
        }
        return false;
    }
}


window.addEventListener('scroll', function(e) {
    let nav = document.querySelectorAll('div[id^="page-"]');
    for (let i = 0; i < nav.length; i++) {
        var dotsMainEl = document.querySelector('a[href="#' + nav[i].id + '"]');
        dotsMainEl.className=((1 >= nav[i].getBoundingClientRect().top && nav[i].getBoundingClientRect().top >= 1-nav[i].offsetHeight) ? 'white' : '');
        var navMainTitle = dotsMainEl.parentNode.querySelector('.navigation-name-page');
        if(dotsMainEl.classList.contains('white')) {
            navMainTitle.classList.add('navigation-name-page-active');
        } else {
            navMainTitle.classList.remove('navigation-name-page-active');
        }
    }

}, false);
// -----------------------------------------------------------------------------

let formInputsEl = document.querySelectorAll('.form-block-drop_menu-wrapper');
let formArrowsEl = document.querySelectorAll('.form-block-content-input-arrow');
let dropMenuEl = document.querySelectorAll('.form-block-content-drop_menu-wrapper');
let sourceMenuEl = document.querySelector('.source-js');
let destMenuEl = document.querySelector('.destinations-js');
let inputsEl = document.querySelectorAll('input');

function openDropMenuClick(e) {
    e.stopPropagation();
    let currentFirstEl = e.currentTarget;
    for (let i = 0; i < formArrowsEl.length; i++) {
        formArrowsEl[i].classList.toggle('form-block-drop_menu-wrapper-active');
    }
    currentFirstEl.classList.toggle('form-block-drop_menu-wrapper-active');
    for (let i = 0; i < formInputsEl.length; i++) {
        if (formInputsEl[i] !== currentFirstEl) {
            formInputsEl[i].classList.remove('form-block-drop_menu-wrapper-active');
        }
    }
}

document.addEventListener('click', function () {
    for (let i = 0; i < formInputsEl.length; i++) {
        formInputsEl[i].classList.remove('form-block-drop_menu-wrapper-active');
    }
});

let destinationsArray = {
    'Москва': ['Минск'],
    'Санкт-Петербург': ['Минск'],
    'Минск': ['Санкт-Петербург', 'Москва']
};
function getSelectValue(e) {
    let formInputEl = e.currentTarget.parentNode.parentNode.querySelector('.form-block-content-select');
    formInputEl.value = e.target.innerHTML;
}

function getChangeValueFromWhereClick(e) {
    let formInputEl = e.currentTarget.parentNode.parentNode.querySelector('.form-block-content-select');
    let menuListUl = null;
    if(e.currentTarget.classList.contains('source-js')) {
        menuListUl = document.querySelector('.destinations-js');
    } else {
        menuListUl = document.querySelector('.source-js');
    }
    let source = formInputEl.value;
    let destinations = destinationsArray[source];
    let newDestinationsHtml = '';
    destinations.forEach(function (item) {
        newDestinationsHtml += '<li class="form-block-content-drop_menu-list">'+item+'</li>';
    });
    menuListUl.innerHTML = newDestinationsHtml;
}
for (let i = 0; i < formInputsEl.length; i++) {
    formInputsEl[i].addEventListener('click', openDropMenuClick);
}

for (let i = 0; i < dropMenuEl.length; i++) {
    dropMenuEl[i].addEventListener('click', getSelectValue);
}
sourceMenuEl.addEventListener('click', getChangeValueFromWhereClick);
destMenuEl.addEventListener('click', getChangeValueFromWhereClick);

// -----------------------------------------------------------------------------
let sourceSecondMenuEl = document.querySelector('.source-second-js');
let destSecondMenuEl = document.querySelector('.destinations-second-js');

let destinationsSecondArray = {
    'Москва': ['Минск'],
    'Санкт-Петербург': ['Минск'],
    'Минск': ['Санкт-Петербург', 'Москва']
};

function getChangeValueFromWhereSecondClick(e) {
    let formInputEl = e.currentTarget.parentNode.parentNode.querySelector('.form-block-content-select');
    let menuListUl = null;
    if(e.currentTarget.classList.contains('source-second-js')) {
        menuListUl = document.querySelector('.destinations-second-js');
    } else {
        menuListUl = document.querySelector('.source-second-js');
    }
    let source = formInputEl.value;
    let destinations = destinationsSecondArray[source];
    let newDestinationsHtml = '';
    destinations.forEach(function (item) {
        newDestinationsHtml += '<li class="form-block-content-drop_menu-list">'+item+'</li>';
    });
    menuListUl.innerHTML = newDestinationsHtml;
}

sourceSecondMenuEl.addEventListener('click', getChangeValueFromWhereSecondClick);
destSecondMenuEl.addEventListener('click', getChangeValueFromWhereSecondClick);

// -----------------------------------------------------------------------------

//scroll_numbers
(function() {
    let goTopNumbers = document.querySelector('.scroll-numbers-wrapper');
    if(goTopNumbers){
        window.addEventListener('scroll', trackScroll);
    }
    function trackScroll() {
        let scrolled = window.pageYOffset;

        if (scrolled > '100') {
            goTopNumbers.classList.add('scroll-number-show');
        }
        if (scrolled < '100') {
            goTopNumbers.classList.remove('scroll-number-show');
        }
    }
})();

let buttonFormOpen = document.querySelector('.button-form-open');
let footerForm = document.querySelector('.footer-wrapper-form-body');
let footerFormCloseButton = document.querySelector('.footer-wrapper-form-close');
let windowBackground = document.querySelector('.window-background');

function clickButtonFormOpen(){
    footerForm.classList.add('footer-wrapper-form-body-active');
    windowBackground.style.display = 'block';
}
function clickFooterFormCloseButton(){
    footerForm.classList.remove('footer-wrapper-form-body-active');
    windowBackground.style.display = 'none';
        inputsEl.forEach( (item) => {
        item.value = '';
    });
}
if(footerForm){
    buttonFormOpen.addEventListener('click', clickButtonFormOpen);
    footerFormCloseButton.addEventListener('click', clickFooterFormCloseButton);
}

let navigationButton = document.querySelector('.navigation-wrapper-button');
let navigationWrapper = document.querySelector('.navigation-wrapper');

function clickNavigationButton(){
    navigationButton.classList.toggle('navigation-wrapper-button-active');
    navigationWrapper.classList.toggle('navigation-wrapper-active');
}
if(navigationButton){
    navigationButton.addEventListener('click', clickNavigationButton);
}
// -----------------------------------------------------------------
let modalOpenButton = document.querySelectorAll('.modal-button-js');
let modalCloseButton = document.querySelector('.close_modal-js');
let modalPopupEl = document.querySelector('.modal-window-container');
let bgWindowEl = document.querySelector('.window-background');
let acceptWindowEl = document.querySelector('.accept-js');
let acceptBtnEl = document.querySelector('.close_accept-js');

function onOpenModalWindowClick() {
    modalPopupEl.classList.add('modal-window-container-active');
    bgWindowEl.style.display = 'block';
}

function onCloseModalWindowClick() {
    modalPopupEl.classList.remove('modal-window-container-active');
    bgWindowEl.style.display = 'none';
}
function onCloseAcceptWindowClick() {
    bgWindowEl.style.display = 'none';
    acceptWindowEl.style.display = 'none';
}

modalOpenButton.forEach( (item) => {
    item.addEventListener('click', onOpenModalWindowClick);
});

modalCloseButton.addEventListener('click', onCloseModalWindowClick);
acceptBtnEl.addEventListener('click', onCloseAcceptWindowClick);
//-----------------------------------------------------------------
let policeConfidentialityMainLinkEl = document.querySelector('.form-block-link-confidentiality');
let policeConfidentialityFooterLinkEl = document.querySelector('.form-block-bottom-link-confidentiality');
let policeConfidentialityEl = document.querySelector('.police-confidentiality-wrapper');
let policeConfidentialityCloseButton = document.querySelector('.close-police-js');

function onOpenpoliceConfidentialityMainClick(e) {
    e.preventDefault();
    policeConfidentialityEl.style.display = 'block';
    bgWindowEl.style.display = 'block';
}

function onOpenpoliceConfidentialityFooterClick(e) {
    e.preventDefault();
    policeConfidentialityEl.style.display = 'block';
    bgWindowEl.style.display = 'block';
}

function onClosepoliceConfidentialityClick() {
    policeConfidentialityEl.style.display = 'none';
    bgWindowEl.style.display = 'none';
}

policeConfidentialityMainLinkEl.addEventListener('click', onOpenpoliceConfidentialityMainClick);
policeConfidentialityFooterLinkEl.addEventListener('click', onOpenpoliceConfidentialityFooterClick);
policeConfidentialityCloseButton.addEventListener('click', onClosepoliceConfidentialityClick);
//-----------------------------------------------------------------
$(function() {
    $.scrollify({
        section : "section",
        easing: "easeOutExpo",
        scrollSpeed: 1100,
        touchScroll: false
    });
});
//------------------------------------------------------------------
AOS.init();
//------------------------------------------------------------------
$(function(){
    $("#contact").submit(function(e){
        e.preventDefault();
        var name = $(this[0]).val();
        var phone = $(this[1]).val();
        // $.post(
        //     "/php/send.php",
        //     {name: name,phone: phone},
        //     console.log('1233')
        // );
        $.post("/php/send.php", { name: name, phone: phone })
            .done(function(data) {
                console.log(data);
                $(".accept-js").css({ display: "block" });
                $(".modal-window-container").removeClass("modal-window-container-active");
                $("input").val("");
        });


    });

    $("#form1").submit(function(e){
        e.preventDefault();
        var from = $(this[0]).val();
        var type = $(this[1]).val();
        var forpl = $(this[2]).val();
        var phone = $(this[3]).val();
        var descr = $(this[4]).val();
        // $.post(
        //     "/php/sendInfo.php",
        //     {
        //         from: from,
        //         type: type,
        //         forpl: forpl,
        //         phone: phone,
        //         descr: descr
        //     }
        // );
            $.post("/php/sendInfo.php", { from: from, type: type, forpl: forpl, phone: phone, descr: descr})
                .done(function(data) {
                console.log(data);
                $(".accept-js").css({ display: "block" });
                $(".window-background").css({ display: "block" });
                $("input").val("");
        });
    });



    $("#form2").submit(function(e){
        e.preventDefault();
        var from = $(this[0]).val();
        var type = $(this[1]).val();
        var forpl = $(this[2]).val();
        var phone = $(this[3]).val();
        // $.post(
        //     "/php/sendInfo.php",
        //     {
        //         from: from,
        //         type: type,
        //         forpl: forpl,
        //         phone: phone,

        //     }
        // );
        $.post("/php/sendInfo.php", { from: from, type: type, forpl: forpl, phone: phone})
                .done(function(data) {
                console.log(data);
                $(".accept-js").css({ display: "block" });
                $(".window-background").css({ display: "block" });
                $("input").val("");
        });
    });
});
//----------------------------------------------------------------
let dataContentBtn = document.querySelector('.form-block-content-reset');
let dataContentFooterBtn = document.querySelector('.form-block-content-footer-reset');
let dataContentWrapper = document.querySelector('.data_content-js');
let dataContentCloseBtn = document.querySelector('.close_data_content-js');
console.log(destMenuEl);
function onOpenDataContentClick(e) {
    bgWindowEl.style.display = 'block';
    dataContentWrapper.style.display = 'block';
    destMenuEl.innerHTML = '<ul class="form-block-content-drop_menu-wrapper destinations-js">\n' +
                                '<li class="form-block-content-drop_menu-list">Москва</li>\n' +
                                '<li class="form-block-content-drop_menu-list">Санкт-Петербург</li>\n' +
                                '<li class="form-block-content-drop_menu-list">Минск</li>\n' +
                            '</ul>';

    sourceMenuEl.innerHTML = '<ul class="form-block-content-drop_menu-wrapper source-js">\n' +
                                '<li class="form-block-content-drop_menu-list">Москва</li>\n' +
                                '<li class="form-block-content-drop_menu-list">Санкт-Петербург</li>\n' +
                                '<li class="form-block-content-drop_menu-list">Минск</li>\n' +
                             '</ul>';

    destSecondMenuEl.innerHTML = '<ul class="form-block-content-drop_menu-wrapper destinations-second-js">\n' +
                                    '<li class="form-block-content-drop_menu-list">Москва</li>\n' +
                                    '<li class="form-block-content-drop_menu-list">Санкт-Петербург</li>\n' +
                                    '<li class="form-block-content-drop_menu-list">Минск</li>\n' +
                                 '</ul>';

    sourceSecondMenuEl.innerHTML = '<ul class="form-block-content-drop_menu-wrapper source-second-js">\n' +
                                      '<li class="form-block-content-drop_menu-list">Москва</li>\n' +
                                      '<li class="form-block-content-drop_menu-list">Санкт-Петербург</li>\n' +
                                      '<li class="form-block-content-drop_menu-list">Минск</li>\n' +
                                   '</ul>';
}
function onCloseDataContentClick() {
    bgWindowEl.style.display = 'none';
    dataContentWrapper.style.display = 'none';
}
dataContentBtn.addEventListener('click', onOpenDataContentClick);
dataContentFooterBtn.addEventListener('click', onOpenDataContentClick);
dataContentCloseBtn.addEventListener('click', onCloseDataContentClick);