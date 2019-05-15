window.onload = function () {
    const setting = {
        slideStart: 0,
        prevSlideID: 'previous',
        nextSlideID: 'next',
        speed: 4000,
        visibleClass: 'img_active',
        radioThumbsID: 'radio-thumbs',
        reverse: false
    };
    new SliderTestJS(setting);

    let colorChangers = document.querySelectorAll('.buttons input');
    for (let i = 0; i < colorChangers.length; i++) {
        colorChangers[i].addEventListener('change', colorChange);
        colorChangers[i].addEventListener('mouseenter', elementHoverAdd);
        colorChangers[i].addEventListener('mouseleave', elementHoverRemove);
    }
};

function SliderTestJS(setting) {
    //конструктор
    let slider = this; //SliderTestJS Context
    let i = slider.slideStart || 0;
    slider.gallery = setting.gallery ? document.querySelectorAll(setting.gallery) : document.querySelectorAll('.gallery .gallery_img');
    slider.previous = setting.prevSlideID ? document.getElementById(setting.prevSlideID) : document.getElementById('previous');
    slider.next = setting.nextSlideID ? document.getElementById(setting.nextSlideID) : document.getElementById('next');
    slider.radioThumbs = setting.radioThumbsID ? document.getElementById(setting.radioThumbsID) : document.getElementById('radio-thumbs');
    slider.auto = setting.auto || false;
    slider.visibleClass = setting.visibleClass || 'img_active';
    slider.isPause = false;
    slider.switchTimeOut = setting.switchTimeOut || 5000;
    if (slider.auto) {
        slider.speed = setting.speed || 5000;
        slider.reverse = setting.reverse || false;
    }

    //переключатель назад
    slider.slidePrevious = function () {
        slider.gallery[i].classList.remove(slider.visibleClass);
        if (i === 0) i = slider.gallery.length - 1;
        else i--;
        thumbnailSelect(slider.radioThumbs);
        slider.gallery[i].classList.add(slider.visibleClass);
    };

    //переключатель вперел
    slider.slideNext = function () {
        slider.gallery[i].classList.remove(slider.visibleClass);
        if (i === slider.gallery.length - 1) i = 0;
        else i++;
        thumbnailSelect(slider.radioThumbs);
        slider.gallery[i].classList.add(slider.visibleClass);
    };

    //переключатель по index
    slider.slideSwitcher = function (index) {
        slider.gallery[i].classList.remove(slider.visibleClass);
        i = index;
        thumbnailSelect(slider.radioThumbs);
        slider.gallery[i].classList.add(slider.visibleClass);
    };

    //додати до слайдера переключателі (радіо)
    slider.thumbnailRadioAdd = function (thumbSelector) {
        slider.gallery.forEach(function () {
            thumbSelector.innerHTML += '<input name="thumbnail" type="radio">';
        });
        slider.thumbInputs = thumbSelector.querySelectorAll('input');
        slider.thumbInputs[i].checked = true;
        slider.thumbInputs.forEach(function (element, index) {
            element.addEventListener('click', function () {
                slider.slideSwitcher(index);
                timeOutId = slider.slideSwitchTimeOut(timeOutId);
            })
        })
    };

    //обрати всі інпути в селекторі thumbInputs та відмічати номер відповідний до номеру показаного слайду
    function thumbnailSelect(thumbSelector) {
        let thumbInputs = thumbSelector.querySelectorAll('input');
        thumbInputs[i].checked = true;
    }
    slider.thumbnailRadioAdd(slider.radioThumbs);

    /*f приймає на вхід швидкість автопереключення слайдів та в залежності від обраного користувачем параметру reverse
    встановлює таймер на функцію переключення слайдеру. Автопереключення відбувається тільки якщо не пауза.
    Повертає ID встановленого таймеру*/
    slider.setTimer = function (speed) {
        let timerId = 0;
        if (slider.auto && slider.reverse) {
            timerId = setInterval(() => {
                if (!slider.isPause) slider.slidePrevious();
            }, speed);
        } else if (slider.auto) {
            timerId = setInterval(() => {
                if (!slider.isPause) slider.slideNext();
            }, speed);
        }
        return timerId;
    };

    /*міняє значення isPause на true (ставить на паузу автопереключення слайдів) та
    ставить таймер на обраний час (за замовчуванням 5 сек), після чого його назад на false.
    Якщо таймер вже був встановлений, спочатку видаляється старий таймер, після чого встановлюється новий.
    повертає id встановленого таймеру*/
    slider.slideSwitchTimeOut = function (timeOutId = 0) {
        slider.isPause = true;
        if (timeOutId !== 0) clearTimeout(timeOutId);
        timeOutId = setTimeout(function () {
            slider.isPause = false;
        }, slider.switchTimeOut);
        return timeOutId;
    };

    slider.setTimer(slider.speed);
    
    let timeOutId = 0;
    previous.onclick = () => {
        slider.slidePrevious();
        timeOutId = slider.slideSwitchTimeOut(timeOutId);
    };
    next.onclick = () => {
        slider.slideNext();
        timeOutId = slider.slideSwitchTimeOut(timeOutId);
    };
}

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