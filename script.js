window.onload = function () {
    let colorChangers = document.querySelectorAll('.buttons input');
    for (let i = 0; i < colorChangers.length; i++) {
        colorChangers[i].addEventListener('change', colorChange);
        colorChangers[i].addEventListener('mouseenter', elementHoverAdd);
        colorChangers[i].addEventListener('mouseleave', elementHoverRemove);
    }
};

function colorChange() {
    let blockId = this.getAttribute('data-block');
    let block = document.getElementById(blockId);
    block.style.backgroundColor = this.value;
}

function elementHoverAdd() {
    let blockId = this.getAttribute('data-block');
    let block = document.getElementById(blockId);
    block.classList.add('block-hover');
}

function elementHoverRemove() {
    let blockId = this.getAttribute('data-block');
    let block = document.getElementById(blockId);
    block.classList.remove('block-hover');
}

function sliderTestJS(setting) {
    let i = this.slideStart || 0;
    let gallery = document.querySelectorAll(setting.gallery) || document.querySelectorAll('.gallery .gallery_img');
    let previous = document.getElementById(setting.prevSlideID) || document.getElementById('previous');
    let next = document.getElementById(setting.nextSlideID) || document.getElementById('next');
    let radioThumbs = document.getElementById(setting.radioThumbsID) || document.getElementById('radio-thumbs');
    let isPause = false;
    if (setting.auto) {
        this.speed = setting.speed || 5000;
        this.reverse = setting.reverse || false;
    }
    let slidePrevious = function () {
        gallery[i].classList.remove(setting.visibleClass);
        if (i === 0) i = gallery.length - 1;
        else i--;
        thumbnailSelect(radioThumbs);
        gallery[i].classList.add(setting.visibleClass);
    };

    let slideNext = function () {
        gallery[i].classList.remove(setting.visibleClass);
        if (i === gallery.length - 1) i = 0;
        else i++;
        thumbnailSelect(radioThumbs);
        gallery[i].classList.add(setting.visibleClass);
    };

    thumbnailRadioAdd(radioThumbs);

    function setTimer(speed) {
        let timerId = 0;
        if (setting.auto && setting.reverse) {
            timerId = setInterval(() => {
                if (!isPause) slidePrevious();
            }, speed);
        } else if (setting.auto) {
            timerId = setInterval(() => {
                if (!isPause) slideNext();
            }, speed);
        }
        return timerId;
    }

    function slideSwitchTimeOut(timeOutId = 0) {
        isPause = true;
        if (timeOutId !== 0) clearTimeout(timeOutId);
        timeOutId = setTimeout(function () {
            isPause = false;
        }, 5000);
        return timeOutId;
    }

    setTimer(this.speed);
    let timeOutId = 0;
    previous.onclick = () => {
        slidePrevious();
        timeOutId = slideSwitchTimeOut(timeOutId);
    };
    next.onclick = () => {
        slideNext();
        timeOutId = slideSwitchTimeOut(timeOutId);
    };

    function thumbnailRadioAdd(thumbSelector) {
        gallery.forEach(function () {
            thumbSelector.innerHTML += '<input name="thumbnail" type="radio">';
        });

        let thumbInputs = thumbSelector.querySelectorAll('input');
        thumbInputs[i].checked = true;
        thumbInputs.forEach(function (element, index) {
            element.addEventListener('click',function () {
                slideSwitcher(index)
                timeOutId = slideSwitchTimeOut(timeOutId);
            })
        })
    }

    function slideSwitcher(index) {
        gallery[i].classList.remove(setting.visibleClass);
        i = index;
        thumbnailSelect(radioThumbs);
        gallery[i].classList.add(setting.visibleClass);
    }

    function thumbnailSelect(thumbSelector){
        let thumbInputs = thumbSelector.querySelectorAll('input');
        thumbInputs[i].checked = true;
    }
}
