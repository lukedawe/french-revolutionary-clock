import { css } from "uebersicht"

const fontStyle = css`
    *
`

const menu = css`
    position: absolute;
    visibility: hidden;
    `;
// display: none;

const text = css`
    font-color: black;
    font-size: 30px;
    position: absolute;
    top: 0;
    left: 0;
`

const wrapper = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 1.25em;
    margin-top: -1.4em;
`

const inner = css`
    font-size: 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0.4em;
    margin-top: -0.3em;
`

const bottom = css`
    margin-top: -0.7em;
`
const bigText = css`
    letter-spacing: -0.1ch;
    font-size: 3.3em;
    `


const DAYNAMES = [
    "Décadi", "Primidi", "Duodi", "Tridi", "Quartidi", "Quintidi", "Sextidi", "Septidi", "Octidi", "Nonidi"
]
const MONTHNAMES = ["Les jours complémentaires", "I Vendémiaire", "II Brumaire", "III Frimaire", "IV Nivôse", "V Pluviôse", "VI Ventôse", "VII Germinal", "VIII Floréal", "IX Prairial", "X Messidor", "XI Thermidor", "XII Fructidor",
]

const button = css`
    width: max-content;
`;


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
    const openContextMenu = (e) => {
        let menu = document.getElementById("menu");
        menu.style.top = e.clientY;
        menu.style.left = e.clientX;
        menu.style.visibility = 'visible';
    }

    const hideMenu = () => {
        menu.style.visibility = 'hidden';
    }

    const moveToTopLeft = (e) => {
        let calendar = document.getElementById("calendar");
        calendar.style.marginTop = '2vh';
        calendar.style.marginLeft = '2vw';
        hideMenu();

    }
    const moveToBottomLeft = (e) => {
        let calendar = document.getElementById("calendar");
        calendar.style.marginTop = '80vh';
        calendar.style.marginLeft = '2vw';
        hideMenu();
    }
    const moveToTopRight = (e) => {
        let calendar = document.getElementById("calendar");
        calendar.style.marginTop = '2vh';
        calendar.style.marginLeft = '70vw';
        hideMenu();
    }
    const moveToBottomRight = (e) => {
        let calendar = document.getElementById("calendar");
        calendar.style.marginTop = '80vh';
        calendar.style.marginLeft = '70vw';
        hideMenu();
    }

    return <div>
        <div className={text} id="calendar"
            onContextMenu={openContextMenu}
        // onClick={openContextMenu}
        >
            <link rel="stylesheet" type="text/css" href="./calendar.css" />
            <div className={wrapper}>
                <h1 className={bigText}>{day}</h1>
                <div className={inner}>
                    <span>{dayName}</span>
                    <span className={bottom}>{monthName}</span>
                </div>
            </div>
        </div>
        <div id="menu" className="menu" className={menu} >
            <button className={button} onClick={moveToTopLeft}>Move To Top Left</button>
            <button className={button} onClick={moveToBottomLeft}>Move To Bottom Left</button>
            <button className={button} onClick={moveToTopRight}>Move To Top Right</button>
            <button className={button} onClick={moveToBottomRight}>Move To Bottom Right</button>
        </div>
    </div>
}


// export const render = ({ day, dayName, monthName }, dispatch) => {

// </div >
// }