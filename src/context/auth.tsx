import React, { createContext, useState, useContext, useEffect } from 'react';


interface UserData {
    id: string;
    name: string;
    email: string;
    token: string;
    avatar: string;
}

type ContextType = {
    userData: UserData;
    setUserData: (value: UserData) => void;
    userSaved: boolean | null;
    setUserSaved: (value: boolean) => void;
    onExit: (value: void) => void;
};

const ContextApp = createContext<ContextType>({
    userData: {} as UserData,
    setUserData: (Value: UserData) => { },
    userSaved: false,
    setUserSaved: (value: boolean | null) => { },
    onExit: (value: void) => { }
});

export type { UserData }

const ProviderAuth: React.FC = ({ children }) => {
    const [userSaved, setUserSaved] = useState<boolean | null>(null);
    const [userData, setUserData] = useState<UserData>({} as UserData)
    const loadData = () => {
        const value = localStorage.getItem('@userData')
        if (value) {
            setUserData(JSON.parse(value))
            setUserSaved(true)
        }
    }
    useEffect(() => {
        loadData()
    }, [])

    const onExit = () => {
        localStorage.removeItem('@userData')
        setUserSaved(false)
    }


    return (
        <ContextApp.Provider value={{
            userData, setUserData,
            userSaved, setUserSaved,
            onExit
        }}>
            {children}
        </ContextApp.Provider>
    );
}
export default ProviderAuth;

export function useUserData() {
    const infoUser: ContextType = useContext(ContextApp);
    const { userData, setUserData } = infoUser;
    return { userData, setUserData };
}

export function useUserSaved() {
    const infoUser: ContextType = useContext(ContextApp);
    const { userSaved, setUserSaved } = infoUser;
    return { userSaved, setUserSaved };
}

export function useOnExit() {
    const infoUser: ContextType = useContext(ContextApp);
    const { onExit } = infoUser;
    return { onExit };
}

