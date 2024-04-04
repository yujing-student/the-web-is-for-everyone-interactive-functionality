// Importeer het npm pakket express uit de node_modules map
import express, {json} from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Haal alle images uit de WHOIS API op

const app = express()

const allData_houses = await fetchJson('https://fdnd-agency.directus.app/items/f_houses')
// file:///D:/OneDrive%20-%20HvA/jaar1/periode3/sprint7/lesmatariaal/S07W2-02-Filteren-sorteren.pdf
const favorite_houses = await fetchJson('https://fdnd-agency.directus.app/items/f_list')
const favorite_hous_id_1 = await fetchJson(`https://fdnd-agency.directus.app/items/f_list?filter={%22id%22:1}`)
const favorite_hous_id_2 = await fetchJson(`https://fdnd-agency.directus.app/items/f_list?filter={%22id%22:2}`)
const favorite_hous_id_3 = await fetchJson(`https://fdnd-agency.directus.app/items/f_list?filter={%22id%22:3}`)


const messages = []//dit is voor de detailpage


// Stel ejs in als template engine
app.set('view engine', 'ejs')
// gebruik ejs voor het tonen van de informatie aan de gebruiker
// Stel de map met ejs templates in
app.set('views', './views')
// hierdoor word gezegt dat je in de views map moet kijken

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));//deze regel code gebruiken vanwege middelware zodat de data leesbaar gemaakt word




app.get('/', async function (request, response) {
    const url = `https://fdnd-agency.directus.app/items/f_list/?fields=*.*.*`;

    try {
        const favorite_houses = await fetchJson(url); // dit gebruiken vanwege meerdere arrays
        if (favorite_houses.data) {
            console.log(JSON.stringify(favorite_houses.data[1].houses[1].f_houses_id.poster_image));

            // 2 nested arrays
            const housedetails = favorite_houses.data.map(listItem => ({
                id: listItem.id,
                title: listItem.title,
                // houses arrya is de nummers van die huizen en de inhoud daarvan
                houses_array: listItem.houses.map(house => ({
                    id: house.id,
                    image: house.f_houses_id.poster_image
                }))
            }));

            response.render('index', { lists: housedetails });
        } else {
            console.error('No favorite houses data found');
            // Render an appropriate message or view if no data is found
        }
    } catch (error) {
        console.error('Error fetching house data:', error);
    }
});

app.get('/lijsten/:id', function (request, response) {
    const listId = request.params.id;
    // console.log('Fetching data for list ID:', listId);

    const url = `https://fdnd-agency.directus.app/items/f_list/${listId}?fields=*.*.*`;

// const specify_houses = `https://fdnd-agency.directus.app/items/f_houses/${houseID}/?fields=*.*.*`
    fetchJson(`https://fdnd-agency.directus.app/items/f_list/${listId}?fields=*.*.*`)

        .then((apiData) => {
            if (apiData.data && apiData.data.houses) { // Checken of deze 2 bestaan
                response.render('lijst.ejs', {
                    list: apiData.data,
                    // houses:specify_houses,
                    houses: apiData.data.houses
                });
            }
        })
        .catch((error) => {
            console.error('Error fetching house data:', error);
        });
});

app.post('/lijsten/:id', async function (request, response) {


    // todo als een gebruiker een getal invoert dan moet er ook een groen vinkje tevoorschijn komen vanuit de server

    response.redirect(303, '/lijsten/' + request.params.id)
})


app.get('/Detailpage/:id', function (request, response) {
    const id = request.params.id
    const linkedurl = `https://fdnd-agency.directus.app/items/f_houses/${id}/?fields=*.*.*`
    fetchJson(`https://fdnd-agency.directus.app/items/f_houses/${id}/?fields=*.*.*`)


        .then((apiData) => {
            // request.params.id gebruik je zodat je de exacte student kan weergeven dit si een routeparmater naar de route van die persoon
            if (apiData.data) {/*als data voer dan dit uit */
                // console.log('data bestaat u gaat nu naar de Detailpage page' + JSON.stringify(apiData))
                // info gebruiken om die te linken aan apidata.data

                console.log(JSON.stringify(favorite_houses.data));
                response.render('Detailpage', {
                    house: apiData.data,
                    images: favorite_houses.data,
                    messages: messages

                });
                //     messages moet uitgevoerd worden met de meegegeven array


            } else {
                console.log('No data found for house with id: ' + request.params.id);
                //     laat de error zien als de data al niet gevonden word
            }
        })
        .catch((error) => {
            console.error('Error fetching house data:', error);
        });
});


app.post('/Detailpage/:id/', function (request, response) {
    // Stap 1: Haal de huidige data op, zodat we altijd up-to-date zijn, en niks weggooien van anderen
    // Haal eerst de huidige gegevens voor deze persoon op, uit de WHOIS API
    const id = request.params.id
    messages.push(request.body.bericht);
    fetchJson(`https://fdnd-agency.directus.app/items/f_houses/Detailpage/${id}`)
        .then((patchresponse) => {
            // voer dit uit
            console.log(patchresponse);
            response.redirect(303, '/Detailpage/' + request.params.id)
        })

})

const algemeen = []//dit is voor huizenlijsten
const keuken = []//dit is voor huizenlijsten
const badkamer = []//dit is voor huizenlijsten
const tuin = []//dit is voor huizenlijsten
const prijs = []//dit is voor huizenlijsten
const ligging = []//dit is voor huizenlijsten
const oppervlakte = []//dit is voor huizenlijsten
const message_score_page_data = [];

app.get('/score/:id', async function (request, response) {
    const listId = request.params.id;
    // console.log('Fetching data for list ID:', listId);

    const url = `https://fdnd-agency.directus.app/items/f_houses/${listId}/?fields=*.*.*`;
    try {
        const house_details = await fetchJson(url); // Assuming fetchJson fetches data

        if (house_details.data) { // Check if house_details.data exists
            response.render('score', {
                house: house_details.data,
                // Assuming these variables are defined elsewhere
                algemeen: algemeen,
                keuken: keuken,
                badkamer: badkamer,
                tuin: tuin,
                prijs: prijs,
                ligging: ligging,
                oppervlakte: oppervlakte,
                notities: message_score_page_data
            });
        }
    } catch (error) { // Handle errors with descriptive message
        console.error('Error fetching house data:', error);
        // Render an error message or view if fetching fails (add logic here)
    }
});


app.post('/score/:id', async function (request, response) {
    try {
        // ophalen van de data en opslaan in een const
        const message_score_page = request.body.test;
        const algemeenNumber = request.body.algemeenNumber;
        const keukenNumber = request.body.keukenNumber;
        const badkamerNumber = request.body.badkamerNumber;
        const tuinNumber = request.body.tuinNumber;

        // data toeveogen aan de array
        algemeen.push(algemeenNumber);
        keuken.push(keukenNumber);
        badkamer.push(badkamerNumber);
        tuin.push(tuinNumber);
        message_score_page_data.push(message_score_page);

        // Redirect the user to the score page
        response.redirect(303, '/score/' + request.params.id);
    } catch (error) {
        // Log the error
        console.error('Error saving score:', error);

        // Redirect the user back to the score page with an error message
        response.redirect(303, '/score/' + request.params.id);
    }
});


app.get('/test/', async function (request, response) {

// const specify_houses = `https://fdnd-agency.directus.app/items/f_houses/${houseID}/?fields=*.*.*`
    fetchJson(`https://fdnd-agency.directus.app/items/f_list/?fields=*.*.*`)

    try {
        const apiData = await fetchJson(`https://fdnd-agency.directus.app/items/f_list/?fields=*.*.*`);
        if (apiData.data) {
            response.render('test', {
                list: apiData.data,
            });
        } else {
            // Handle the case where no data is found
            response.status(404).send('List not found'); // Or a custom error message
        }
    } catch (error) {
        console.error('Error fetching house data:', error);
        response.status(500).send('Internal Server Error'); // Or a custom error message
    }
});

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)


// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})


