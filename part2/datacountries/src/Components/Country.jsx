import Weather from "./Weather";

const Country = ({ country }) => {

    const flag = {
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        marginRight: 5,
    };

    if(Object.keys(country).length === 0 && country.constructor === Object) {
        return;
    }

    const langs = Object.keys(country.languages);

    const singular = 'Language:';
    const plural = 'Languages:';

    return(
        <div style={{ display:'flex' }}>
            <div style={{display: 'flex', alignItems: 'center', backgroundColor: '#CDCDCD', paddingLeft: 20}}>
                <img style={ flag } src={ country.flags.png } alt='coutry-flag' height={210} width={300}/>
            </div>
            <div style={{paddingLeft: 20, backgroundColor: '#CDCDCD'}}>
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
            </div>
            <Weather capital={ country.capital[0] }/>
        </div>
    )
}

export default Country;