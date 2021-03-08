import React from 'react'
import styles from './styles.module.scss'
import HeaderLeft from '../Header'
import HeaderMobile from '../HeaderMobile'
const Container: React.FC = ({ children }) => {

    return (
        <>

            <div className={styles.container}>
                <HeaderMobile  />
                <HeaderLeft  />
                <div className={styles.bodyContainer}>
                    {children}
                </div>
            </div>
        </>
    )
}
export default Container;