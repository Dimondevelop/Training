var setting = {
    gallery: '.gallery .img',
    nextSlide: 'next',
    prevSlide: 'previous',
    auto: true,
    speed: 1000,
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
    let gallery = document.querySelectorAll(setting.gallery);
    let previous = document.getElementById(setting.prevSlide);
    let next = document.getElementById(setting.nextSlide);

    let i = 0;
    previous.onclick = function (e) {
        gallery[i].classList.remove(setting.visibleClass);
        if (i===0) i = gallery.length-1;
        else i--;
        gallery[i].classList.add(setting.visibleClass);

    };
    next.onclick = function (e) {
        gallery[i].classList.remove(setting.visibleClass);
        if (i === gallery.length-1) i = 0;
        else i++;
        gallery[i].classList.add(setting.visibleClass);
    };
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