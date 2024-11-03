// Importeer het npm pakket express uit de node_modules map
import express, {json} from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Haal alle images uit de WHOIS API op

const app = express()

// file:///D:/OneDrive%20-%20HvA/jaar1/periode3/sprint7/lesmatariaal/S07W2-02-Filteren-sorteren.pdf
const favorite_houses = await fetchJson('https://fdnd-agency.directus.app/items/f_list')


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
    const image_house = `https://fdnd-agency.directus.app/items/f_houses`

    try {
        const favorite_houses = await fetchJson(url); // dit gebruiken vanwege meerdere arrays
        const image_houses = await fetchJson(image_house);
        if (favorite_houses.data && image_houses.data ) {
            // console.log(JSON.stringify(favorite_houses.data[1].houses[1].f_houses_id.poster_image));

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
            const show_images = image_houses.data.map(listItem => ({
                img: listItem.poster_image,
            }));

            response.render('index', {lists: housedetails, images: show_images});
        } else {
            console.error('No favorite houses data found');
        }
    } catch (error) {
        console.error('Error fetching house data:', error);
    }
});

app.get('/lijsten/:id', function (request, response) {
    const listId = request.params.id;
    // console.log('Fetching data for list ID:', listId);


    fetchJson(`https://fdnd-agency.directus.app/items/f_list/${listId}?fields=*.*.*`)
        .then((apiData) => {
            if (apiData.data && apiData.data.houses) { // Checken of deze 2 bestaan
                response.render('lijst.ejs',
                    {
                        list: apiData.data,
                        houses: apiData.data.houses
                    });
            }
        })
        .catch((error) => {
            console.error('Error fetching house data:', error);
        });
});

app.get('/Detailpage/:id', function (request, response) {
    const id = request.params.id

    fetchJson(`https://fdnd-agency.directus.app/items/f_houses/${id}/?fields=*.*.*`)


        .then((apiData) => {
            // request.params.id gebruik je zodat je de exacte student kan weergeven dit is
            // een routeparmater naar de route van die  specifieke persoon
            if (apiData.data) {/*als data voer dan dit uit */
                // console.log('data bestaat u gaat nu naar de Detailpage page' + JSON.stringify(apiData))
                // info gebruiken om die te linken aan apidata.data

                // console.log(JSON.stringify(favorite_houses.data));
                response.render('Detailpage', {
                    house: apiData.data,
                    images: favorite_houses.data

                });

            } else {
                console.log('No data found for house with id: ' + request.params.id);
                //     laat de error zien als de data al niet gevonden word
            }
        })
        .catch((error) => {
            console.error('Error fetching house data:', error);
        });
});

const algemeen = []
const keuken = []
const badkamer = []
const tuin = []
const prijs = []
const ligging = []
const oppervlakte = []
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
    } catch (error) {
        console.error('Error fetching house data:', error);
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

        response.redirect(303, '/score/' + request.params.id);
    } catch (error) {
        console.error('De errror is:', error);
        response.redirect(303, '/score/' + request.params.id);
    }
});


// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)


// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})


