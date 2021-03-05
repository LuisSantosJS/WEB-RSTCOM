import React from 'react';
import { useHistory } from 'react-router-dom'
import LogoIcon from '../../../assets/logo-rstcom-ok-.png'
import { useUserData, useUserSaved } from '../../../context/auth'
interface Props {
    styles: any
}
const HeaderLeft: React.FC<Props> = ({ styles }) => {
    const { userData } = useUserData()
    const { setUserSaved } = useUserSaved()
    const history = useHistory()
    const onExit = () => {
        localStorage.removeItem('@userData')
        setUserSaved(false)
    }
    const handleHistory = (name: string) => {
        history.push(name)
    }
    return (
        <>
            <div className={styles.menuLeftContainer}>
                <div className={styles.header}>
                    <div className={styles.rowExitView}>
                        <span onClick={onExit}>SAIR</span>
                    </div>
                    <div className={styles.headerBody}>
                        <img className={styles.logo} src={LogoIcon} alt='imagem' />
                        <div className={styles.collumn}>
                            <span className={styles.nameUser}>{userData.name}</span>
                            <span className={styles.emailUser}>{userData.email}</span>
                        </div>
                    </div>
                </div>
                <br />
                <span onClick={() => handleHistory('profile')} className={styles.textmenu}>Dados Pessoais</span>
                <span onClick={() => handleHistory('list')} className={styles.textmenu}>Todo List</span>
                <br />
            </div>
        </>
    )
}

export default HeaderLeft;