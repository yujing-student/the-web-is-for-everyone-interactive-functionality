// Importeer het npm pakket express uit de node_modules map
import express, {json} from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Haal alle images uit de WHOIS API op
const messages = []


const allData_houses = await fetchJson('https://fdnd-agency.directus.app/items/f_houses')
// file:///D:/OneDrive%20-%20HvA/jaar1/periode3/sprint7/lesmatariaal/S07W2-02-Filteren-sorteren.pdf
const favorite_houses = await fetchJson('https://fdnd-agency.directus.app/items/f_list')
const favorite_hous_id_1 = await fetchJson(`https://fdnd-agency.directus.app/items/f_list?filter={%22id%22:1}`)
const favorite_hous_id_2 = await fetchJson(`https://fdnd-agency.directus.app/items/f_list?filter={%22id%22:2}`)
const favorite_hous_id_3 = await fetchJson(`https://fdnd-agency.directus.app/items/f_list?filter={%22id%22:3}`)
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')
// gebruik ejs voor het tonen van de informatie aan de gebruiker
// Stel de map met ejs templates in
app.set('views', './views')
// hierdoor word gezegt dat je in de views map moet kijken

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));


// in deze code heb ik ebwust gekozen voor asyinc en await omdat de fetchjson een promise is
app.get("/", async (request, response) => {
    //     // data.data.custom = JSON.parse(data.data.custom);
    // in de request is de url /zoeken?id ingegeven nummer


    try {

        const userQuery = await request.query; /*dit is het id wat de gebruiker ingeeft bij het zoekvak*/
        const encodedUserQuery = encodeURIComponent(userQuery);//hier word de user query leesbaar gemaakt door er een string van te maken

        const cityName = userQuery.city; // het is onderdeel van city waar opg ezocht word
        const encodedCityName = encodeURIComponent(cityName);
        const search_houses_koop_heel_nederland = `https://fdnd-agency.directus.app/items/f_houses/?filter={%22city%22:{%22_icontains%22:%22${encodedCityName}%22}}`;
        const workign = 'https://fdnd-agency.directus.app/items/f_houses/?filter={%22city%22:{%22_icontains%22:%22amsterdam%22}}';
        const url = `https://fdnd-agency.directus.app/items/f_houses/?filter={%22city%22:{%22_icontains%22:%22` + encodedUserQuery + `%22}}`;



        const TitleName = userQuery.title; // het is onderdeel van city waar opg ezocht word
        const encodedTitleName = encodeURIComponent(TitleName);
        const flist = 'https://fdnd-agency.directus.app/items/f_list/?filter={%22title%22:{%22_icontains%22:%22Amsterdam%22}}';
        const url_filter_list_Title = `https://fdnd-agency.directus.app/items/f_list/?filter={%22title%22:{%22_icontains%22:%22${encodedTitleName}%22}}`;


        // todo checken waarom de huizen nu iniet worden weergegeven terwijl het wel een array is
        fetchJson(favorite_hous_id_1).then((favorite_hous_id_1) => {// voor nu worden alle huizen opgehaald die in de lijsten staan
            // request.params.id gebruik je zodat je de exacte student kan weergeven dit si een routeparmater naar de route van die persoon
            if (favorite_houses) {/*als data voer dan dit uit */
                // console.log('data bestaat u gaat nu naar de Detailpage page' + JSON.stringify(apiData))
                // info gebruiken om die te linken aan apidata.data
                response.render('favorite-list', {
                    house1:favorite_hous_id_1,
                    messages: messages,
                    favorite_houses: favorite_houses.data
                    // persons: allData_houses.data,filteredimagesfirst/*hier zeg ik dat iedereen getoond moet worden*/
                });
                //     messages moet uitgevoerd worden met de meegegeven array


            } else {
                console.log('No data found for house with id: ' + request.params.id);
                //     laat de error zien als de data al niet gevonden word
            }
        })

    } catch (err) {
        response.send(err.message)
    }


})


app.get('/test', async function (request, response) {
    const listId = request.params.id
    fetchJson(`https://fdnd-agency.directus.app/items/f_list/${listId}?fields=*.*.*`)
        // je kan geen 2x then met houses,favorite doen en niet 2x naast elkaar fetchjson dus dit moet met een promise all
        .then((favorite_houses) => {
            // console.log('data bestaat u gaat nu naar de favoreiten page'+JSON.stringify(favorite_houses))
            // request.params.id gebruik je zodat je de exacte student kan weergeven dit si een routeparmater naar de route van die persoon
            if (favorite_houses.data) {/*als data voer dan dit uit */
                // console.log(favorite_houses)
                response.render('test', {
                    houses: favorite_houses.data.map((house) => {
                        // Iterate over the houses array to get each house's details
                        return house.houses.map((houseDetail) => {
                            // Access street, house number, and city from houses_id object within each house in houses array
                            return {
                                id: houseDetail.f_houses_id.id,
                                image: houseDetail.f_houses_id.poster_image,
                                street: houseDetail.f_houses_id.street,
                                houseNumber: houseDetail.f_houses_id.house_nr,
                                city: houseDetail.f_houses_id.city,
                            };
                        });
                    }),
                });
            }
            //     todo er moet iets gebueren dat de images van de huizen zichtbaar is met de tekst zie lijsten:id


        })
        .catch((error) => {
            console.error('Error fetching house data:', error);
        });
});
// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})
