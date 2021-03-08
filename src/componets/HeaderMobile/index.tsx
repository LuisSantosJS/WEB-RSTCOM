import React, { useState } from 'react';
import LogoIcon from '../../assets/logo-rstcom-ok-.png'
import { useHistory } from 'react-router-dom'
import MenuIcon from '../../assets/menu.png'
import styles from './styles.module.scss'
import { useUserData, useUserSaved } from '../../context/auth'
interface Props {

}
const HeaderMobile: React.FC<Props> = () => {
    const { userData } = useUserData()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const history = useHistory()
    const { setUserSaved } = useUserSaved()
    const onExit = () => {
        localStorage.removeItem('@userData')
        setUserSaved(false)
    }
    const handleHistory = (name: string) => {
        history.push(name)
        setIsOpen(false)
    }
    return (
        <>
            <div className={styles.headerMobile} >
                <img onClick={() => setIsOpen(true)} className={styles.menu} src={MenuIcon} alt='imagem' />
                <div style={{ padding: 10 }} />
                <img className={styles.logo} src={LogoIcon} alt='imagem' />
                <div className={styles.collumn}>
                    <span className={styles.nameUser}>{userData.name}</span>
                    <span className={styles.emailUser}>{userData.email}</span>
                </div>
                <div className={styles.rowExitView}>
                    <span onClick={onExit}>SAIR</span>
                </div>
            </div>

            <div style={{ width: isOpen ? 250 : 0 }} className={styles.sidenav}>
                <div className={styles.rowExitView2}>
                    <span onClick={() => setIsOpen(false)}>X</span>
                </div>
                <img className={styles.logo2} src={LogoIcon} alt='imagem' />
                <div className={styles.collumn2}>
                <span onClick={() => handleHistory('profile')} className={styles.textmenu}>Dados Pessoais</span>
                <span onClick={() => handleHistory('list')} className={styles.textmenu}>Todo List</span>
                </div>
                <br />
            </div>
        </>
    )
}
export default HeaderMobile;