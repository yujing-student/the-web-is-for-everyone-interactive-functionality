function ShowHamburgerMenu () {/*hamburger menu*/
    const button = document.querySelector('.hamburger-icon');/*select icon hamburger*/
    const menu = document.querySelector('.menu-ul');
    const header = document.querySelector('.header-menu');

    button.addEventListener('click', () => {/*clickfunction*/
        menu.classList.toggle('menu-ul-open');/*open the menue*/
        header.classList.toggle('header-menu-open')

    });
}
ShowHamburgerMenu();



function t () {/*hamburger menu*/
    const favoriteButton = document.getElementsByClassName("favoriteButton");
    if (favoriteButton.length > 0) {
        favoriteButton[0].addEventListener("click", () => {
            // ... your click event handling code
            window.location.href = "favorite-list/"; // Replace with your desired URL
        });
    } else {
        console.error("No elements with class 'favoriteButton' found.");
    }

}
t();