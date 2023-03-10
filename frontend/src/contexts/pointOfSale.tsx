// Le  Contexte offre un moyen de faire passer des données à travers l’arborescence 
// du composant sans avoir à passer manuellement les props à chaque niveau.
// -> https://fr.reactjs.org/docs/context.html

import { createContext, useContext } from "react";

import useLocalStorage from '../hooks/useLocalStorage';

import { PointOfSaleLSType } from '../types';

const emptyPointOfSale: PointOfSaleLSType = {
    pointOfSale: null,
    expire: ''
};

// typage du contexte que l'on définit
export type PointOfSaleContextType = {
    storedPointOfSale: PointOfSaleLSType,
    setStoredPointOfSale: (newValue: PointOfSaleLSType) => void
};

// valeur initiale de notre contexte
const initialContext: PointOfSaleContextType = {
    storedPointOfSale: emptyPointOfSale,
    setStoredPointOfSale: (newValue: PointOfSaleLSType) => { },
};

export const PointOfSaleContext = createContext<PointOfSaleContextType>(initialContext);

// Le composant PointOfSaleContextProvider permet de nous brancher sur le Contexte PointOfSaleContext
export const PointOfSaleContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [storedPointOfSale, setStoredPointOfSale] = useLocalStorage('point-of-sale', emptyPointOfSale);

    const contextValue = {
        storedPointOfSale,
        setStoredPointOfSale,
    };

    return <PointOfSaleContext.Provider value={contextValue}>{children}</PointOfSaleContext.Provider>;
};

// on prépare un hook custom qui nous permet de récupérer le contexte UserContext
export const usePointOfSaleContext = () => useContext<PointOfSaleContextType>(PointOfSaleContext); 