function ShowHamburgerMenu() {/*hamburger menu*/
    const button = document.querySelector('.hamburger-icon');/*select icon hamburger*/
    const menu = document.querySelector('.menu-ul');
    const mobilelogo = document.querySelector('.mobile-logo')

    button.addEventListener('click', () => {/*clickfunction*/
        menu.classList.toggle('menu-ul-open');/*open the menue*/
        mobilelogo.classList.toggle('mobile-logo-open');
        button.classList.toggle('hamburger-icon-open')

    });
}

ShowHamburgerMenu();




