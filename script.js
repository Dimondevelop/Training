const setting = {
    slideStart: 0,
    gallery: '.gallery .img',
    nextSlide: 'next',
    prevSlide: 'previous',
    auto: true,
    speed: 3000,
    reverse:true,
    visibleClass: 'img_active'
};

window.onload = function () {
    let colorChangers = document.querySelectorAll('.buttons input');
    for (let i = 0; i < colorChangers.length; i++) {
        colorChangers[i].addEventListener('change', colorChange);
        colorChangers[i].addEventListener('mouseenter', elementHoverAdd);
        colorChangers[i].addEventListener('mouseleave', elementHoverRemove);
    }
    sliderTestJS(setting);
};

function sliderTestJS(setting) {
    let i = this.slideStart || 0;
    let gallery = document.querySelectorAll(setting.gallery);
    let previous = document.getElementById(setting.prevSlide) || 'previous';
    let next = document.getElementById(setting.nextSlide) || 'next';
    if (setting.auto) {
        this.speed = setting.speed || 5000;
        this.reverse = setting.reverse || false;
    }
    let slidePrevious = function(){
        gallery[i].classList.remove(setting.visibleClass);
        if (i===0) i = gallery.length-1;
        else i--;
        gallery[i].classList.add(setting.visibleClass);
    };

    let slideNext = function(){
        gallery[i].classList.remove(setting.visibleClass);
        if (i === gallery.length-1) i = 0;
        else i++;
        gallery[i].classList.add(setting.visibleClass);
    };
    previous.onclick = slidePrevious;
    next.onclick = slideNext;

    if (setting.auto && setting.reverse) {
        setInterval(slidePrevious, this.speed);
    } else if(setting.auto){
        setInterval(slideNext, this.speed);
    }
}

function colorChange(e) {
    let blockId = this.getAttribute('data-block');
    let block = document.getElementById(blockId);
    block.style.backgroundColor = this.value;
}

function elementHoverAdd(e) {
    let blockId = this.getAttribute('data-block');
    let block = document.getElementById(blockId);
    block.classList.add('block-hover');
}
function elementHoverRemove(e) {
    let blockId = this.getAttribute('data-block');
    let block = document.getElementById(blockId);
    block.classList.remove('block-hover');
}