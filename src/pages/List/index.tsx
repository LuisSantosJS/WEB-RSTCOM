import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import api from '../../service/api'
import { useToasts } from 'react-toast-notifications'
import { useUserData } from '../../context/auth'
import { AxiosRequestConfig } from 'axios';
import produce from 'immer'

interface ListData {
    id: string;
    title: string;
    description?: string;
    isComplete: boolean;
}
const List: React.FC = () => {
    const { userData } = useUserData()
    const { addToast } = useToasts()
    const [list, setList] = useState<ListData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [sendText, setSendText] = useState<string>('');
    const options: AxiosRequestConfig = {
        headers: {
            'x-access-token': userData.token
        }
    }
    useEffect(() => {
        load()
        // eslint-disable-next-line
    }, [])

    const load = () => {
        api.get(`/api/list/${userData.id}`, options).then(res => {
            if (res.data.message === 'error') {
                addToast(res.data.value, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            } else {
                setList(res.data.value)
            }
        }).catch(err => {
            addToast(err, {
                appearance: 'error',
                autoDismiss: true,
            })
        })
    }
    const onCheck = (id: string, index: number) => {
        const newState = produce(list, draftState => {
            draftState[index].isComplete = !Boolean(draftState[index].isComplete)
        })
        setList(newState)
        api.put('/api/list', {
            id: id,
            isComplete: !list[index].isComplete
        }, options).then(res => {
            if (res.data.message === 'error') {
                addToast(res.data.value, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            }
        }).catch((err) => {
            addToast(err, {
                appearance: 'error',
                autoDismiss: true,
            })
        })

    }

    const onDelete = (id: string) => {
        const newList = produce(list, draftState => {
            draftState.forEach((res: ListData, index: number) => {
                if (res.id === id) {
                    delete draftState[index]
                }
            })
        })
        setList(newList)
        api.delete(`/api/list/${id}`, options).then(res => {
            if (res.data.message === 'error') {
                addToast(res.data.value, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            }
        }).catch((err) => {
            addToast(err, {
                appearance: 'error',
                autoDismiss: true,
            })
        })
    }

    const onCreate = () => {
        if (loading) {
            return;
        }
        setLoading(true)
        api.post('/api/list', {
            userID: userData.id,
            title: sendText
        }, options).then(res => {
            if (res.data.message === 'error') {
                addToast(res.data.value, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            } else {
                setList([...list, res.data.value])
                setSendText('')
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
                <span className={styles.title}>/Todo List</span>
                <span className={styles.subTitle}>Lista de Tarefas</span>
                <br />

                {list.map((res: ListData, index: number) => {
                    if (res) {
                        return (
                            <>
                                <div key={String(res.id)} className={styles.itemView}>
                                    <input
                                        type="checkbox"
                                        defaultChecked={Boolean(res.isComplete)}
                                        checked={Boolean(res.isComplete)}
                                        value={String(Boolean(res.isComplete))}
                                        onChange={(e) => onCheck(res.id, index)}
                                    />
                                    <div style={{ padding: 5 }} />
                                    <div className={styles.collums}>
                                        <span className={styles.titleItem}>{res.title}</span>
                                        {/* <span className={styles.descriptionItem}>{res.description}</span> */}
                                    </div>
                                    <span onClick={() => onDelete(res.id)} className={styles.remove}>Remover</span>
                                </div>
                                <br />
                            </>
                        )
                    }
                })}
            </div>
            <div style={{ padding: 40 }} />
            <div className={styles.viewInputsEnd}>
                <input
                    value={sendText}
                    disabled={loading}
                    onChange={(e) => setSendText(e.target.value)}
                    className={styles.input}
                />
                <button onClick={onCreate} className={styles.submit}>
                    <span>
                        {loading ? 'AGUARDE' : 'ENVIAR'}
                    </span>
                </button>
            </div>
        </>
    )
}

export default List;