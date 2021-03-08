import React, { useState } from 'react';
import { useUserData, useOnExit } from '../../context/auth';
import styles from './styles.module.scss'
import { useToasts } from 'react-toast-notifications'
import api from '../../service/api';


const Profile: React.FC = () => {
    const { userData, setUserData } = useUserData()
    const { onExit } = useOnExit()
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
            avatar: String(userData.avatar),
            password: password
        }, options).then(res => {
            if (res.data.message === 'success') {
                addToast('data updated successfully', {
                    appearance: 'success',
                    autoDismiss: true,
                })
                const newVal = { ...userData, name: name, email: email, token: res.data.token }
                setUserData(newVal)
                localStorage.setItem('@userData', JSON.stringify(newVal))

            } else {
                if (res.data.value === 'Invalid token') {
                    return onExit()
                }
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
    const onChangeImage = (e: any) => {
        e.preventDefault()
        const a: any = e.target.files;
        if (String(a[0].name).length !== 0) {
            var reader = new FileReader();
            var file = a[0];
            reader.onload = function (upload: any) {
                setUserData({...userData, avatar: upload.target.result})
                console.log(upload.target.result)
            };
            reader.readAsDataURL(file);
        }
    }
    return (
        <>
            <div className={styles.container}>
                <span className={styles.title}>/Dados Pessoais</span>
                <br />
                <br />
                <div className={styles.rowProfile}>
                    <div className={styles.itemProfile}>
                        <img className={styles.profileLogo} src={userData.avatar} />
                        <label className={styles.textProfileLabel} htmlFor={styles.textProfile}>Alterar Imagem</label>
                        <input onChange={(e) => onChangeImage(e)} type='file' id={styles.textProfile} />
                    </div>
                </div>
                <br />
                <input className={styles.inputs}
                    placeholder={'Nome'}
                    value={name}
                    disabled={loading}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <input className={styles.inputs}
                    placeholder={'Email'}
                    value={email}
                    disabled={loading}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input className={styles.inputs}
                    placeholder={'Nova Senha'}
                    value={password}
                    type='password'
                    disabled={loading}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <input className={styles.inputs}
                    placeholder={'Repetir nova Senha'}
                    type='password'
                    value={password2}
                    disabled={loading}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <br />
                <div className={styles.row}>
                    <button onClick={onSubmit} className={styles.submit}>
                        <span>{loading ? 'AGUARDE...' : 'EDITAR'}</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Profile;