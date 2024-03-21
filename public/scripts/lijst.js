function range() {
    const value = document.querySelector(".value");
    const input = document.querySelector(".number_input");
    value.textContent = input.value;
    input.addEventListener("input", (event) => {
        value.textContent = event.target.value;
    });
}

// range()
// dit word niet gebruikt omddat ik vanuit proressive engancemetn te werk wil gaan

function showicon() {
    const button = document.querySelector('.submit-score');
    const iconlogo = document.querySelector('.green_icon');

    button.addEventListener('click', () => {
        iconlogo.src = "../images/green-checkmark.png"; // Set image path
        iconlogo.classList.add('green_icon-open'); // Apply styles
    });
}

showicon();
