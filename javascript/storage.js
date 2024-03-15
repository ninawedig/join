const STORAGE_TOKEN = '18V6T427F9J979LQSD4Q64LO076HV6BKGWDHT628';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => res.data.value); // habe den letzten Teil ab .then noch eingefügt als "kosmetische Funktion", um nur den Value zu bekommen
}