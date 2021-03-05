import React, { useState } from 'react';
import { useUserData } from '../../context/auth';
import styles from './styles.module.scss'
import { useToasts } from 'react-toast-notifications'
import api from '../../service/api';


const Profile: React.FC = () => {
    const { userData, setUserData } = useUserData()
    const [name, setName] = useState<string>(userData.name)
    const [email, setEmail] = useState<string>(userData.email)
    const [loading, setLoading] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const { addToast } = useToasts()
    const options = {
        headers: {
            'x-access-token': userData.token
        }
    }

    const onSubmit = () => {
        if (password !== password2) {
            return addToast('different passwords', {
                appearance: 'error',
                autoDismiss: true,
            })
        }
        if (loading) {
            return;
        }
        setLoading(true)
        api.put('/api/users', {
            id: userData.id,
            email: String(email).toLowerCase(),
            name: name,
            password: password
        }, options).then(res => {
            if (res.data.message === 'success') {
                addToast('data updated successfully', {
                    appearance: 'success',
                    autoDismiss: true,
                })
                const newVal = { ...userData, name: name, email: email }
                setUserData(newVal)
                localStorage.setItem('@userData', JSON.stringify(newVal))

            } else {
                addToast(res.data.value, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            }
        }).catch(err => {
            addToast(err, {
                appearance: 'error',
                autoDismiss: true,
            })
        }).finally(() => setLoading(false))
    }
    return (
        <>
            <div className={styles.container}>
                <span className={styles.title}>/Dados Pessoais</span>
                <br />
                <input className={styles.inputs}
                    placeholder={'Nome'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <input className={styles.inputs}
                    placeholder={'Email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input className={styles.inputs}
                    placeholder={'Nova Senha'}
                    value={password}
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <input className={styles.inputs}
                    placeholder={'Repetir nova Senha'}
                    type='password'
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <br />
                <div className={styles.row}>
                    <button onClick={onSubmit} className={styles.submit}>
                        <span>{loading ? 'AGUARDE' : 'ATUALIZAR'}</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Profile;