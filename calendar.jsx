import { css } from "uebersicht"

const text = css`
    font-color: black;
`

const wrapper = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const inner = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const bottom = css`
    margin-top: 0.5em;
`

export const render = () => (
    <div className={text}>
        <div className={wrapper}>
            01
            <div className={inner}>
                <p>Quartidi</p>
                <p className={bottom}>VI Ventose</p>
            </div>
        </div>
    </div>
)