// Le  Contexte offre un moyen de faire passer des données à travers l’arborescence 
// du composant sans avoir à passer manuellement les props à chaque niveau.
// -> https://fr.reactjs.org/docs/context.html

import { createContext, useContext } from "react";

import useLocalStorage from '../hooks/useLocalStorage';

import { PointOfSale } from '../types';

const emptyPointOfSale: PointOfSale = {
    label: ''
};

// typage du contexte que l'on définit
export type PointOfSaleContextType = {
    pointOfSale: PointOfSale,
    setPointOfSale: (newValue: PointOfSale) => void
};

// valeur initiale de notre contexte
const initialContext: PointOfSaleContextType = {
    pointOfSale: emptyPointOfSale,
    setPointOfSale: (newValue: PointOfSale) => { },
};

export const PointOfSaleContext = createContext<PointOfSaleContextType>(initialContext);

// Le composant ContextProvider permet de nous brancher sur le Contexte UserContext
// i.e : le contexte UserContext sera accessible dans les composants enfant de ContextProvider
export const ContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [pointOfSale, setPointOfSale] = useLocalStorage('pointofsale', emptyPointOfSale);

    const contextValue = {
        pointOfSale,
        setPointOfSale,
    };

    return <PointOfSaleContext.Provider value={contextValue}>{children}</PointOfSaleContext.Provider>;
};

// on prépare un hook custom qui nous permet de récupérer le contexte UserContext
export const usePointOfSaleContext = () => useContext<PointOfSaleContextType>(PointOfSaleContext); 