import React from 'react'
import styles from "./global.module.scss"
import pagesNofound from '../../Assets/notfound.PNG'

function ErrorMessage({message}) {
    return (
        <div className={styles.errorsMessage}>
            <h1 color='primary'>¡Lo sentimos!</h1>
            <p><b>{message}</b></p>
            <img src={pagesNofound} alt="notFound" />
        </div>
    )
}

export default ErrorMessage
