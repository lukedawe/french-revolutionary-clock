import { Global, css } from "uebersicht"
import font from './@Resources/Folio-Bold.otf'

const fontStyle = css`
    *
`

const text = css`
    font-color: black;
    font-size: 20px;
`

const wrapper = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const inner = css`
    font-size: 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0.1em;
`

const bottom = css`
    margin-top: -0.1em;
`
const bigText = css`
    font-size: 3.3em;
`

const DAYNAMES = [
    "Décadi", "Primidi", "Duodi", "Tridi", "Quartidi", "Quintidi", "Sextidi", "Septidi", "Octidi", "Nonidi"
]
const MONTHNAMES = ["Les jours complémentaires", "I Vendémiaire", "II Brumaire", "III Frimaire", "IV Nivôse", "V Pluviôse", "VI Ventôse", "VII Germinal", "VIII Floréal", "IX Prairial", "X Messidor", "XI Thermidor", "XII Fructidor",
]


export const updateState = (event, previousState) => {
    let date = new Date();

    let leapYear = date.getFullYear() % 4 == 0 && date.getFullYear() % 100 > 0;

    var start = new Date(date.getFullYear(), 0, 0);
    var diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var dayOfyear = Math.floor(diff / oneDay);

    let offset = 11;
    if (dayOfyear > 259 && !leapYear) {
        offset = 6;
    } else if (dayOfyear > 259 && leapYear) {
        offset = 5;
    }
    // offset += 4;

    var dayOfTheMonth = (dayOfyear + offset) % 30;

    if (dayOfTheMonth == 0) {
        dayOfTheMonth = 30
    }
    let monthNumber = Math.ceil(((dayOfyear + 101) / 30) % 13);

    var dayoftheweek = dayOfTheMonth % 10;
    var dayName = DAYNAMES[dayoftheweek];
    var monthName = MONTHNAMES[monthNumber]
    return {
        day: dayOfTheMonth,
        dayName: dayName,
        monthName: monthName
    }
}

export const initialState = {
    day: '01',
    dayName: 'Day name',
    monthName: 'A month'
};

export const refreshFrequency = 1000;


export const command = (dispatch) => {
    dispatch(null, null)
}

export const render = ({ day, dayName, monthName, }) => {

    return <div className={text}>
        <Global styles={css`
            * {
                color: red !important;
            }
        `} />
        <div className={wrapper}>
            <h1 className={bigText}>{day}</h1>
            <div className={inner}>
                <p>{dayName}</p>
                <p className={bottom}>{monthName}</p>
            </div>
        </div>
    </div>
}


// export const render = ({ day, dayName, monthName }, dispatch) => {

// </div >
// }