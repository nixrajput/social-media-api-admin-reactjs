const storage = {};

storage.set = function (key, value) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
}

storage.get = function (key) {
    const data = localStorage.getItem(key);

    if (data) return JSON.parse(data);
    return null;
}

storage.remove = function (key) {
    localStorage.removeItem(key);
}

storage.clear = function () {
    localStorage.clear();
}

export default storage;