import { useState } from 'react';

// ma fonction renvoie un tableau
// avec 2 cases : la valeur de type T, et la fonction de modif qui prend en param un T
function useLocalStorage<T>(key: string, initialValue: T): [T, (newValue: T) => void] {
    const [data, setData] = useState<T>(() => {
        const itemInLocalStorage = window.localStorage.getItem(key);

        // si  l'élement existe...
        if (itemInLocalStorage) {
            // a ce  stade, je ne sais pas si itemInLocalStorage est du JSON ou pas...
            // bon je vais quand meme essayer de le JSON.parse
            try {
                return JSON.parse(itemInLocalStorage);
            } catch (error) {
                // zut le parse a pas marché
                // bon ca doit pas etre du json, je vais le renvoyer tel quel
                return itemInLocalStorage;
            }
        } else {
            // si y'a rien dans notre local storage...
            // je renvoie la valeur initiale
            return initialValue;
        }
    });

    // une fonction pour modifier notre état ET le local storage
    const setValueAndPersist = (newValue: T) => {
        // je range dans useState notre nouvelle valeur
        setData(newValue);

        // ET je la recopie aussi dans le local storage

        // oula petit piege, si newValue est un objet => je le stringify
        if (typeof newValue === 'object') {
            window.localStorage.setItem(key, JSON.stringify(newValue));
        } else {
            // sinon => je le range tel quel
            // un peu bizarre. T ne peut pas devenir un string directement
            // https://stackoverflow.com/a/53813384
            window.localStorage.setItem(key, newValue as unknown as string);
        }
    }

    // notre hook renvoie quoi ?
    // un tableau qui contiendra la valeur, et la fonction de modification
    return [data, setValueAndPersist];
}

export default useLocalStorage;