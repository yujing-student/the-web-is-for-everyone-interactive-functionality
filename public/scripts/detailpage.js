function ShowHamburgerMenu () {/*hamburger menu*/
    let button = document.querySelector('.hamburger-icon');/*select icon hamburger*/
    let menu = document.querySelector('.menu-ul');

    button.addEventListener('click', () => {/*clickfunction*/
        menu.classList.toggle('menu-ul-open');/*open the menue*/

    });
}
ShowHamburgerMenu();
shownotes();
function shownotes () {
    let button = document.querySelector('.button-notes');
    let menu = document.querySelector('.detailpage-hide-notes');
    let targetElement = document.querySelector('.algemeen'); // Select the target element

    button.addEventListener('click', () => {
        menu.classList.toggle('hide-notes-open');
        targetElement.scrollIntoView({/*sroll to the queryselector*/
            behavior: "smooth"/*https://developer.mozilla.org/en-US/docs/web/api/element/scrollintoview*/
        });
    });
}



slider()
sliderkeuken()
sliderbadkmaer()

function slider( ){
    let slider = document.getElementById("myRange");
    let output = document.getElementById("demo");
    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;}
}
function sliderkeuken(){
    let slider = document.getElementById("keuken");
    let output = document.getElementById("keukenvalue");
    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;}
}

function sliderbadkmaer(){
    let slider = document.getElementById("badkamer");
    let output = document.getElementById("badkamervalue");
    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;}



}

function slidertuin(){

    let tuinslider = document.getElementById("tuin");
    let tuinoutput = document.getElementById("tuinvalue");
    tuinoutput.innerHTML = tuinslider.value;

    tuinslider.oninput = function() {
        tuinoutput.innerHTML = this.value;}
}
slidertuin()
function sliderprijs(){

    let prijsslider = document.getElementById("prijs");
    let prijsoutput = document.getElementById("prijsvalue");
    prijsoutput.innerHTML = prijsslider.value;

    prijsslider.oninput = function() {
        prijsoutput.innerHTML = this.value;}
}
sliderprijs()
function sliderligging(){

    let prijsslider = document.getElementById("ligging");
    let prijsoutput = document.getElementById("liggingvalue");
    prijsoutput.innerHTML = prijsslider.value;

    prijsslider.oninput = function() {
        prijsoutput.innerHTML = this.value;}
}
sliderligging()
function slideroppervlakte(){

    let prijsslider = document.getElementById("oppervlakte");
    let prijsoutput = document.getElementById("oppervlaktevalue");
    prijsoutput.innerHTML = prijsslider.value;

    prijsslider.oninput = function() {
        prijsoutput.innerHTML = this.value;}
}
slideroppervlakte()