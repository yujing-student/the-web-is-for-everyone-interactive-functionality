function ShowHamburgerMenu () {/*hamburger menu*/
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



const value = document.querySelector("#value");
const input = document.querySelector("#pi_input");
value.textContent = input.value;
input.addEventListener("input", (event) => {
    value.textContent = event.target.value;
});