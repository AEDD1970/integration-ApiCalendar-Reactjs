import React from 'react'
import pagesNofound from '../../Assets/notfound.PNG'
import styles from "./errorNotFound.module.scss"

export default function ErrorNotFound() {
    return (
        <div style={{
            padding: "1.5rem"
        }}>
            <div className={styles.errorsMessage}>
                <h1 color='primary'>¡Lo sentimos!</h1>
                <p><b>Pagina no encontrada</b></p>
                <img src={pagesNofound} alt="notFound" />
            </div>
        </div>
    )
}
