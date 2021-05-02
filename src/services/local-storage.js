export default function localStorageService() {
    return {
        get(itemName) {
            if(!itemName) throw new Error;
            try {
                return JSON.parse(localStorage.getItem(itemName));
            }
            catch {
                return null;
            }

        },

        set(itemName, item) {
            if(!itemName) throw new Error;
            try {
                return localStorage.setItem(itemName, JSON.stringify(item));
            }
            catch {
                return null;
            }
        },

        remove(itemName) {
            if(!itemName) throw new Error;
            return localStorage.removeItem(itemName);
        }
    }
}