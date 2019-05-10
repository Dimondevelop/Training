window.onload = function () {
    let colorChangers = document.querySelectorAll('.buttons input');
    for (let i = 0; i < colorChangers.length; i++){
        colorChangers[i].addEventListener('change', colorChange);
    }
};
function colorChange() {
    let blockId = this.getAttribute('data-block');
    let block = document.getElementById(blockId);
    block.style.backgroundColor = this.value;
}