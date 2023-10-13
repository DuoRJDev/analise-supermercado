export const getLocalStorage = (key: string) => JSON.parse(localStorage.getItem(key) as string);

export const saveLocalStorage = (key: string, object: object) => localStorage.setItem(key, JSON.stringify(object));
