import React from 'react'
import styles from './styles.module.scss'
import HeaderLeft from '../Header'
import HeaderMobile from '../HeaderMobile'
const Container: React.FC = ({ children }) => {

    return (
        <>

            <div className={styles.container}>
                <HeaderMobile styles={styles} />
                <HeaderLeft styles={styles} />
                <div className={styles.bodyContainer}>
                    {children}
                </div>
            </div>
        </>
    )
}
export default Container;