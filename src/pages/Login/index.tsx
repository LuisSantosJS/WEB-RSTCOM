import React, { useState } from 'react';
import styles from './styles.module.scss'
import { useToasts } from 'react-toast-notifications'
import { UserData, useUserData, useUserSaved } from '../../context/auth'
import api from '../../service/api'
import { useHistory } from 'react-router-dom'
import LogoIcon from '../../assets/logo-rstcom-ok-.png'


const Login: React.FC = () => {
    const history = useHistory()
    const { addToast } = useToasts()
    const { setUserData } = useUserData()
    const { setUserSaved } = useUserSaved()
    const [loading, setLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleRegister = () => {
        history.replace('/')
    }

    const handleSubmit = () => {
        if (loading) {
            return;
        }
        setLoading(true)
        api.post('/api/users/login', {
            email: email,
            password: password
        }).then(res => {
            if (res.data.message === 'error') {
                addToast(res.data.value, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            } else {
                const value = res.data.value;
                const data: UserData = {
                    id: value.id,
                    email: value.email,
                    name: value.name,
                    token: res.data.token
                }
                return onSaveFinish(data)
            }

        }).catch(err => {
            addToast(err, {
                appearance: 'error',
                autoDismiss: true,
            })
        }).finally(() => setLoading(false))
    }

    const onSaveFinish = (data: UserData) => {
        localStorage.setItem('@userData', JSON.stringify(data))
        setUserData(data)
        setUserSaved(true)
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.imageBackground} >
                    <img className={styles.logo} src={LogoIcon} alt='imagem' />
                </div>
                <div className={styles.containerForm}>
                    <span className={styles.title}>Faça seu login</span>
                    <br />
                    <input className={styles.inputs}
                        placeholder={'E-mail'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <input type='password' className={styles.inputs}
                        placeholder={'Senha'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button onClick={handleSubmit} className={styles.submit}>

                        <span className={styles.textSubmit}>{loading ? 'AGUARDE...' : 'ENTRAR'}</span>

                    </button>
                    <br />
                    <span onClick={handleRegister} className={styles.textLogin}>Não possuo cadastro</span>
                </div>
            </div>
        </>
    )
}
export default Login;