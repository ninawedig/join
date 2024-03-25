const STORAGE_TOKEN = '18V6T427F9J979LQSD4Q64LO076HV6BKGWDHT628';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Saves an item to the remote storage.
 * @param {string} key is the name under which the item will be saved.
 * @param {*} value is the item to be saved.
 * @returns A Promise resolving to the response from the storage service.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

/**
 * Loads an item from the remote storage
 * @param {*} key is the name under which the item is saved
 * @returns A Promise resolving to the value of the item fetched from storage.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => res.data.value); 
}