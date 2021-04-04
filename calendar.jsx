import { css } from "uebersicht"

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
    margin-top: 0.1em;
`
const bigText = css`
    font-size: 3em;
`

const DAYNAMES = [
    "Décadi", "Primidi", "Duodi", "Tridi", "Quartidi", "Quintidi", "Sextidi", "Septidi", "Octidi", "Nonidi"
]
const MONTHNAMES = ["Les jours complémentaires", "I Vendémiaire", "II Brumaire", "III Frimaire", "IV Nivôse", "V Pluviôse", "VI Ventôse", "VII Germinal", "VIII Floréal", "IX Prairial", "X Messidor", "XI Thermidor", "XII Fructidor",
]

const getData = () => {
    var date = new Date();

    var leapYear = date.getFullYear() % 4 == 0 && date.getFullYear() % 100 > 0;

    var start = new Date(date.getFullYear(), 0, 0);
    var diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var dayOfyear = Math.floor(diff / oneDay);

    var offset = 11;
    if (dayOfyear > 259 && !leapYear) {
        offset = 6;
    } else if (dayOfyear > 259 && leapYear) {
        offset = 5;
    }

    var dayOfTheMonth = (date.getDay() + offset) % 30;

    if (dayOfTheMonth == 0) {
        dayOfTheMonth = 30
    }
    var monthNumber = Math.ceil(((dayOfyear + 102) / 30) % 13);

    var dayoftheweek = dayofTheMonth % 10;
    var dayName = DAYNAMES[dayoftheweek];
    var monthName = MONTHNAMES[monthNumber]
    return {
        day: dayOfTheMonth,
        dayName: dayName,
        monthName: monthName
    }
}

export const initialState = getData();

export const render = ({ day, dayName, monthName }, dispatch) => {
    return <div className={text}>
        <div className={wrapper}>
            <h1 className={bigText}>{day}</h1>
            <div className={inner}>
                <p>{dayName}</p>
                <p className={bottom}>{monthName}</p>
            </div>
        </div>
    </div>
}