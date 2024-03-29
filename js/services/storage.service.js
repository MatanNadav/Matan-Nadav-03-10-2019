
function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return (val)? JSON.parse(val) : null;
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}


export default {
    loadFromStorage,
    saveToStorage

}