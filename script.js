window.onload = function () {
    // приклад об'єкту з налаштуваннями
    const setting = {
        slideStart: 0,
        auto: true,
        speed: 4000,
        prevSlideID: 'previous',
        nextSlideID: 'next',
        visibleClass: 'img_active',
        radioThumbsID: 'radio-thumbs',
        reverse: false
    };

    const slider = new SliderTestJS(setting);
    slider.changeTimer(true, 2000);

    //const slider = new SliderTestJS();

    let colorChangers = document.querySelectorAll('.buttons input');
    for (let i = 0; i < colorChangers.length; i++) {
        colorChangers[i].addEventListener('change', colorChange);
        colorChangers[i].addEventListener('mouseenter', elementHoverAdd);
        colorChangers[i].addEventListener('mouseleave', elementHoverRemove);
    }
};

function SliderTestJS(settingLocal = {}) {
    // конструктор
    const sliderContext = this; // SliderTestJS Context
    let i = sliderContext.slideStart || 0;
    sliderContext.gallery = settingLocal.gallery ?
        document.querySelectorAll(settingLocal.gallery) : document.querySelectorAll('.gallery .gallery_img');
    sliderContext.previous = settingLocal.prevSlideID ?
        document.getElementById(settingLocal.prevSlideID) : document.getElementById('previous');
    sliderContext.next = settingLocal.nextSlideID ?
        document.getElementById(settingLocal.nextSlideID) : document.getElementById('next');
    sliderContext.radioThumbs = settingLocal.radioThumbsID ?
        document.getElementById(settingLocal.radioThumbsID) : document.getElementById('radio-thumbs');
    sliderContext.visibleClass = settingLocal.visibleClass || 'img_active';
    sliderContext.isPause = false;
    sliderContext.switchTimeOut = settingLocal.switchTimeOut || 5000;
    settingLocal.auto = settingLocal.auto || false;
    if (settingLocal.auto) {
        settingLocal.speed = settingLocal.speed || 5000;
        settingLocal.reverse = settingLocal.reverse || false;
    }

    // метод міняє налаштування таймера або виключає його.
    let timerId;
    sliderContext.changeTimer = (auto, speed = 5000, reverse = false) => {
        sliderContext.auto = auto;
        settingLocal.speed = speed;
        settingLocal.reverse = reverse;
        sliderContext.setTimer(settingLocal.speed);
    };

    // переключатель назад
    sliderContext.slidePrevious = () => {
        sliderContext.gallery[i].classList.remove(sliderContext.visibleClass);
        if (i === 0) {
            i = sliderContext.gallery.length - 1;
        } else {
            i--;
        }
        thumbnailSelect(sliderContext.radioThumbs);
        sliderContext.gallery[i].classList.add(sliderContext.visibleClass);
    };

    // переключатель вперед
    sliderContext.slideNext = () => {
        sliderContext.gallery[i].classList.remove(sliderContext.visibleClass);
        if (i === sliderContext.gallery.length - 1) {
            i = 0;
        } else {
            i++;
        }
        thumbnailSelect(sliderContext.radioThumbs);
        sliderContext.gallery[i].classList.add(sliderContext.visibleClass);
    };

    // переключатель по index
    sliderContext.slideSwitcher = index => {
        sliderContext.gallery[i].classList.remove(sliderContext.visibleClass);
        i = index;
        thumbnailSelect(sliderContext.radioThumbs);
        sliderContext.gallery[i].classList.add(sliderContext.visibleClass);
    };

    // додати до слайдера переключателі (радіо)
    sliderContext.thumbnailRadioAdd = thumbSelector => {
        sliderContext.gallery.forEach(() => {
            thumbSelector.innerHTML += '<input name="thumbnail" type="radio">';
        });
        sliderContext.thumbInputs = thumbSelector.querySelectorAll('input');
        sliderContext.thumbInputs[i].checked = true;
        sliderContext.thumbInputs.forEach((element, index) => {
            element.addEventListener('click', () => {
                sliderContext.slideSwitcher(index);
                timeOutId = sliderContext.slideSwitchTimeOut(timeOutId);
            });
        });
    };

    // обрати всі інпути в селекторі thumbInputs та відмічати номер відповідний до номеру показаного слайду
    function thumbnailSelect(thumbSelector) {
        const thumbInputs = thumbSelector.querySelectorAll('input');
        thumbInputs[i].checked = true;
    }

    sliderContext.thumbnailRadioAdd(sliderContext.radioThumbs);

    /* f приймає на вхід швидкість автопереключення слайдів та в залежності від обраного користувачем параметру reverse
    встановлює таймер на функцію переключення слайдеру, якщо таймер вже встановлений спочатку видаляє старий.
    Автопереключення відбувається тільки якщо не пауза. Повертає ID встановленого таймеру */
    sliderContext.setTimer = speed => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
        if (sliderContext.auto && settingLocal.reverse) {
            timerId = setInterval(() => {
                if (!sliderContext.isPause) {
                    sliderContext.slidePrevious();
                }
            }, speed);
        } else if (sliderContext.auto) {
            timerId = setInterval(() => {
                if (!sliderContext.isPause) {
                    sliderContext.slideNext();
                }
            }, speed);
        }
        return timerId;
    };

    /*міняє значення isPause на true (ставить на паузу автопереключення слайдів) та
    ставить таймер на обраний час (за замовчуванням 5 сек), після чого його назад на false.
    Якщо таймер вже був встановлений, спочатку видаляється старий таймер, після чого встановлюється новий.
    повертає id встановленого таймеру*/
    sliderContext.slideSwitchTimeOut = (timeOutIdLocal = null) => {
        sliderContext.isPause = true;
        if (timeOutIdLocal !== null) {
            clearTimeout(timeOutIdLocal);
        }
        timeOutIdLocal = setTimeout(() => {
            sliderContext.isPause = false;
        }, sliderContext.switchTimeOut);
        return timeOutIdLocal;
    };

    // запускається таймер автопрокрутки
    timerId = sliderContext.setTimer(settingLocal.speed);

    // на кнопки назад і вперед ставить EventListener на подію onclick для переключення слайдів
    let timeOutId = 0;
    sliderContext.previous.onclick = () => {
        sliderContext.slidePrevious();
        timeOutId = sliderContext.slideSwitchTimeOut(timeOutId);
    };
    sliderContext.next.onclick = () => {
        sliderContext.slideNext();
        timeOutId = sliderContext.slideSwitchTimeOut(timeOutId);
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
