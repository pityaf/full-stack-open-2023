const Country = ({ country }) => {
    if(Object.keys(country).length === 0 && country.constructor === Object) {
        return;
    }

    const langs = Object.keys(country.languages);

    const singular = 'Language:';
    const plural = 'Languages:';

    return(
        <div>
            <h2>{ country.name.common }</h2>
            <p>Capital: { country.capital[0] }</p>
            <p>Area: { country.area }</p>
            <h3>
                { langs.length === 1 ? singular : plural}
            </h3>
            <ul>
                { 
                    langs.map(key => <li key={ key }>{ country.languages[key] }</li>)
                }
            </ul>
            <p>Timezone: { country.timezones[0] }</p>
            <img src={ country.flags.png } alt='coutry-flag' height={200} width={300}/>
        </div>
    )
}

export default Country;