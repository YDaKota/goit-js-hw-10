export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if (!response.ok) {
            throw new Error();
        }
        return response.json();
    })
}

// export function fetchCountries(name) {
//     return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//             throw new Error(response.statusText);
//         });
// }
