// Importeer het npm pakket express uit de node_modules map
import express, {json} from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Haal alle images uit de WHOIS API op
const messages = []
const app = express()

const allData_houses = await fetchJson('https://fdnd-agency.directus.app/items/f_houses')
// file:///D:/OneDrive%20-%20HvA/jaar1/periode3/sprint7/lesmatariaal/S07W2-02-Filteren-sorteren.pdf
const favorite_houses = await fetchJson('https://fdnd-agency.directus.app/items/f_list')
const favorite_hous_id_1 = await fetchJson(`https://fdnd-agency.directus.app/items/f_list?filter={%22id%22:1}`)
const favorite_hous_id_2 = await fetchJson(`https://fdnd-agency.directus.app/items/f_list?filter={%22id%22:2}`)
const favorite_hous_id_3 = await fetchJson(`https://fdnd-agency.directus.app/items/f_list?filter={%22id%22:3}`)
const numbers = []


// Stel ejs in als template engine
app.set('view engine', 'ejs')
// gebruik ejs voor het tonen van de informatie aan de gebruiker
// Stel de map met ejs templates in
app.set('views', './views')
// hierdoor word gezegt dat je in de views map moet kijken

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));

app.get('/', async function (request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/f_list')
    // je kan geen 2x then met houses,favorite doen en niet 2x naast elkaar fetchjson dus dit moet met een promise all
        .then((favorite_houses) => {
            // console.log('data bestaat u gaat nu naar de favoreiten page'+JSON.stringify(favorite_houses))
            // request.params.id gebruik je zodat je de exacte student kan weergeven dit si een routeparmater naar de route van die persoon
            if (favorite_houses.data) {/*als data voer dan dit uit */
                // console.log(favorite_houses)
                response.render('index', {
                    houses:
                    favorite_houses.data

                });
            }
        //     todo er moet iets gebueren dat de images van de huizen zichtbaar is met de tekst zie lijsten:id


        })
        .catch((error) => {
            console.error('Error fetching house data:', error);
        });
});
// in deze code heb ik ebwust gekozen voor asyinc en await omdat de fetchjson een promise is

app.get('/lijsten/:id', function (request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/f_list/' + request.params.id + '?fields=*.*.*')
        //dat + ?fields is omdat dit gekoppelde velden zijn aan 3 andere tabellen dnek ik
    console.log('Fetching data for list ID:', request.params.id);
    const url = 'https://fdnd-agency.directus.app/items/f_list/' + request.params.id + '?fields=*.*.*';
    console.log('Constructed URL:', url);
    fetchJson(url)
        .then((apiData) => {
            if (apiData.data && apiData.data.houses) { // Checken of deze 2 bestaan

                // ... rest of your code using apiData.data.houses
                response.render('lijst.ejs', {
                    list: apiData.data,
                    numbers: numbers
                });
            }
        })
        .catch((error) => {
            console.error('Error fetching house data:', error);
        });
});

app.post('/lijsten/:id',async function (request,response){
    numbers.push(request.body.number)

    response.redirect('/lijsten/'+request.params.id)
})
// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})
