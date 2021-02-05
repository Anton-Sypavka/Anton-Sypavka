
const buttonOpen = document.querySelector('.button-open');
const buttonClose = document.querySelector('.button-close');

buttonOpen.addEventListener('click', toggleClass );
buttonClose.addEventListener('click', toggleClass );


//Function toggle class name once button Open/Close clicked
function toggleClass() {
    const sideMenuActive = document.querySelector('.side-menu-active');
    const sideMenuDefault = document.querySelector('.side-menu-default');

    sideMenuActive.classList.toggle('active');
    sideMenuDefault.classList.toggle('disabled');
}