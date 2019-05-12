window.onload = function () {
    let colorChangers = document.querySelectorAll('.buttons input');
    for (let i = 0; i < colorChangers.length; i++) {
        colorChangers[i].addEventListener('change', colorChange);
        colorChangers[i].addEventListener('mouseenter', elementHoverAdd);
        colorChangers[i].addEventListener('mouseleave', elementHoverRemove);
    }

    let gallery = document.querySelectorAll('.gallery .img');
    let previous = document.getElementById('previous');
    let next = document.getElementById('next');


    let i = 0;
    previous.onclick = function () {
        gallery[i].classList.remove('img_active');
        if (i===0) i = gallery.length-1;
        else i--;
        gallery[i].classList.add('img_active');

    };
    next.onclick = function () {
        gallery[i].classList.remove('img_active');
        if (i === gallery.length-1) i = 0;
        else i++;
        gallery[i].classList.add('img_active');
    };


    gallery.forEach(function (element) {

    })
};

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