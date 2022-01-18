import React from 'react'

export default function ErrorNotFound() {
    return (
        <div style={{
            padding: "1.5rem"
        }}>
            <div className={styles.errorsMessage}>
                <h1 color='primary'>¡Lo sentimos!</h1>
                <p><b>{message}</b></p>
                <img src={pagesNofound} alt="notFound" />
            </div>
        </div>
    )
}
