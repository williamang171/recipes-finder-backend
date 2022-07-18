import React, { useMemo, useState, createContext } from 'react'

interface GlobalLoadingContextInterface {
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<any>>,
}

export const GlobalLoadingContext = createContext<GlobalLoadingContextInterface>({
    loading: false,
    setLoading: () => { }
});

interface PropTypes {
    children: React.ReactNode
}

export function GlobalLoadingContextProvider(props: PropTypes) {
    const { children } = props;
    const [loading, setLoading] = useState(false);

    const providerValue = useMemo(() => {
        return {
            loading, setLoading
        }
    }, [loading, setLoading])

    return (
        <GlobalLoadingContext.Provider value={providerValue}>
            {children}
        </GlobalLoadingContext.Provider>
    )
}