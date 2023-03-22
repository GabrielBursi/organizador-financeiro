export const useLocalStorage = (key) => JSON.parse(localStorage.getItem(key))

export const removerLocalStorage = ({key}) => localStorage.removeItem(key)