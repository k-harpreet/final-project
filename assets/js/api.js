const quotesCheckbox = document.getElementById('quotes-checkbox');
const animalsCheckbox = document.getElementById('animals-checkbox');

quotesCheckbox.addEventListener('change', () => {
    if (quotesCheckbox.checked) animalsCheckbox.checked = false;
})
animalsCheckbox.addEventListener('change', () => {
    if (animalsCheckbox.checked) quotesCheckbox.checked = false;
});
document.querySelector('.submit-button').addEventListener('click', function() {
    let apiUrl = '';

    // Handle the user input code Errors . when user did not selected any  checkbox  and user did not enter input after selecting the checkbox
    if (!quotesCheckbox.checked && !animalsCheckbox.checked) {
        document.getElementById('api-response').innerText = 'Please select one checkbox ( QUOTE or ANIMALS) option.';
        return;
    }
    const input = document.getElementById('section-input').value.trim();
    if (!input) {
        document.getElementById('api-response').innerText = quotesCheckbox.checked
            ? 'Please Input the Quote '
            : 'Please Input the  Animal Name ';
        return;
    }

    if (quotesCheckbox.checked) {
        apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${encodeURIComponent(input)}`;
    } else if (animalsCheckbox.checked) {
        apiUrl = `https://api.api-ninjas.com/v1/animals?name=${encodeURIComponent(input)}`;
    }
    document.getElementById('api-response').innerText = '';
    fetch(apiUrl, {
        method: 'GET',
        headers: { 'X-Api-Key': '7uUUN6V99wPM9GKybY99crlBekhJRxmjwuwocHrP' }
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP Error ! ${response.status}`);
            return response.text();
        })
        .then(textData => {
            console.log('API Response Data:', textData);
            if (quotesCheckbox.checked) {
                const quoteMatch = textData.match(/"quote":\s*"([^"]+)"/);
                if (quoteMatch && quoteMatch[1]) {
                    document.getElementById('api-response').innerText = `"${quoteMatch[1]}"`;
                }
                else {
                    document.getElementById('api-response').innerText = 'Please Try Again . No QUOTE found for this ......';
                }
            }
            else if (animalsCheckbox.checked) {
                if (textData.includes('[]')) {
                    document.getElementById('api-response').innerText = 'Please Try again ... another ANIMAL  name. No animal found ...........';
                } else {
                    const nameMatches = [...textData.matchAll(/"name":\s*"([^"]+)"/g)];

                    let animalDescriptions = [];
                    for (let i = 0; i < nameMatches.length; i++) {
                        const name = nameMatches[i] ? nameMatches[i][1] : '';

                        animalDescriptions.push(`Name: ${name}`);
                    }

                    document.getElementById('api-response').innerText = animalDescriptions.join(' \n');
                }
            }
            document.getElementById('section-input').value = '';
        })
        //API call Error : Example   when server respond false means 404 error then this catch block display a massage that request is not found and  Api key  or Wrong Api key or Expired api key
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('api-response').innerText = 'Please try again later..... Something went wrong  ....';
        });

});
