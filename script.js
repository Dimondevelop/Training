function sayHi() {
    alert('Hi from git!')
}

function sayBye() {
    alert('Goodbye from Git!')
}

window.onload = function (e) {
    let buttons = document.querySelectorAll('.buttons input');

    for (let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', btnClick);
    }
};
function btnClick(e) {
    let status = document.querySelector('#status');
    let color = this.getAttribute('data-color');
    // for(var k in status){
    //     document.body.innerHTML += '<b>' + k + '</b> ' + status[k] + '<br>';
    // }
    status.style.backgroundColor = color;
    console.log();

}