import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import styles from './styles.module.scss'
import { useToasts } from 'react-toast-notifications'
import LogoIcon from '../../assets/logo-rstcom-ok-.png'
import { useUserData, useUserSaved, UserData } from '../../context/auth'
import api from '../../service/api';
const Auth: React.FC = () => {
    const history = useHistory()
    const handleLogin = () => {
        history.replace('login')
    }
    const { setUserData } = useUserData()
    const { addToast } = useToasts()
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const { setUserSaved } = useUserSaved()
    const handleSubmit = () => {
        if (password !== password2) {
            return addToast('Passwords do not match', {
                appearance: 'error',
                autoDismiss: true,
            })
        }
        if (loading) {
            return;
        }
        setLoading(true)
        api.post('/api/users', {
            name: name,
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
                    <span className={styles.title}>Faça seu cadastro</span>
                    <br />
                    <input className={styles.inputs}
                        placeholder={'Nome'}
                        value={name}
                        disabled={loading}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <input className={styles.inputs}
                        placeholder={'E-mail'}
                        value={email}
                        disabled={loading}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <input
                        type='password'
                        className={styles.inputs}
                        placeholder={'Senha'}
                        value={password}
                        disabled={loading}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <input
                        type='password'
                        className={styles.inputs}
                        value={password2}
                        disabled={loading}
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder={'Confirmar Senha'}
                    />
                    <br />
                    <button onClick={handleSubmit} className={styles.submit}>
                        <span className={styles.textSubmit}>{loading ? 'AGUARDE' : 'CADASTRAR'}</span>
                    </button>
                    <br />
                    <span onClick={handleLogin} className={styles.textLogin}>Eu já possuo cadastro</span>
                </div>
            </div>
        </>
    )
}
export default Auth;