/**
 * An asynchronous helper function that wraps the standard node.js fetch API.
 * This function calls an API url passed as the first and mandatory parameter,
 * there is an optional payload parameter to send a json object, eg. a filter.
 * It then calls the API and returns the response body parsed  as a json object.
 * @example <caption>fetchJson as returning function using the await keyword</caption>
 * const data = await fetchJson('https://api-url.com/endpoint/')
 * @example <caption>fetchJson as oneliner using the then() structure.</caption>
 * fetchJson('https://api-url.com/endpoint/').then((data)=>{
 *  // use data...
 * })
 * @param {string} url the api endpoint to address
 * @param {object} [payload] the payload to send to the API
 * @returns the response from the API endpoint parsed as a json object
 */


//fetchson is the function and url and playload zijn de optionele parameters die meegegeven worden
export default async function fetchJson(url, payload = {}) {
  try{//de reden voor een try and catch is zotat er een betere error adhandeling is en dat ik de error in de console log kan zien
    //en de then als die niet reageert dan gaat die automatisch naar de catch
    return await fetch(url, payload)
        .then((response) => response.json())//reageeer op de aanroep en pas de informatie aan aar een json

  }catch (error){
    console.error('Error:', error);
  }

}
