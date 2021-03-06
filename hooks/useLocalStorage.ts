import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(key: string, defaultValue?: T): [T|null|undefined, typeof setValue, typeof clearValue] {
    const [storedValue, setStoredValue] = useState<T|null>();

    useEffect(() => {
        let value = localStorage.getItem(key);
        if (value !== null && isJson(value)) {
            setStoredValue(JSON.parse(value) as T);
        } else {
            if (value === null && defaultValue) {
                setValue(defaultValue);
            } else {
                setStoredValue(value as unknown as T);
            }
        }
    }, []);

    const setValue = (value: T) => {
        setStoredValue(value);
        if (typeof value === 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value as unknown as string);
        }
    }

    const clearValue = () => {
        localStorage.removeItem(key);
        setStoredValue(null);
    }

    return [storedValue, setValue, clearValue];
}

function isJson(value: string): boolean {
    try {
        JSON.parse(value);
    } catch(e) {
        return false;
    }

    return true;
}