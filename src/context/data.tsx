import React, { createContext, useState, useContext, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios'
import { useUserData } from './auth';
import { useToasts } from 'react-toast-notifications'
import api from '../service/api'

interface ListData {
    id: string;
    title: string;
    description?: string;
    isComplete: boolean;
}

type ContextType = {
    data: ListData[];
    setData: (value: ListData[]) => void;
};

const ContextApp = createContext<ContextType>({
    data: [],
    setData: (Value: ListData[]) => { },
});

export type { ListData }

const ProviderData: React.FC = ({ children }) => {
    const [data, setData] = useState<ListData[]>([])
    const { userData } = useUserData()
    const { addToast } = useToasts()
    const options: AxiosRequestConfig = {
        headers: {
            'x-access-token': userData.token
        }
    }

    const load = () => {
        api.get(`/api/list/${userData.id}`, options).then(res => {
            if (res.data.message === 'error') {
                addToast(res.data.value, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            } else {
                setData(res.data.value)
            }
        }).catch(err => {
            addToast(err, {
                appearance: 'error',
                autoDismiss: true,
            })
        })
    }

    useEffect(() => {
        load()
    })


    return (
        <ContextApp.Provider value={{
            data, setData,

        }}>
            {children}
        </ContextApp.Provider>
    );
}
export default ProviderData;

export function useData() {
    const infoUser: ContextType = useContext(ContextApp);
    const { data, setData } = infoUser;
    return { data, setData };
}
