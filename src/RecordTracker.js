const localStorageKey = 'records;'

export function updateRecordForLevel(levelNum, newRecord) {
    var records = getRecords();
    if (typeof records.levels[levelNum] === 'undefined' || records.levels[levelNum] === null) {
        records.levels[levelNum] = newRecord;
    } else {
        if (newRecord < records.levels[levelNum]) {
            records.levels[levelNum] = newRecord;
        } 
    }
    setRecords(records);
}

export function getRecordForLevel(levelNum) {
    return getRecords().levels[levelNum];
}

export function updateRecordForRapidFire(difficultyNum, newRecord) {
    var records = getRecords();
    if (typeof records.rapidFire[difficultyNum] === 'undefined' || records.rapidFire[difficultyNum] === null) {
        records.rapidFire[difficultyNum] = newRecord;
    } else {
        if (newRecord > records.rapidFire[difficultyNum]) {
            records.rapidFire[difficultyNum] = newRecord;
        }
    }
    setRecords(records);
}

export function getRecordForRapidFire(difficultyNum) {
    return getRecords().rapidFire[difficultyNum];
}

function getRecords() {
    return JSON.parse(localStorage.getItem(localStorageKey)) ?? { 
        levels: [],
        rapidFire: []
    };
}

function setRecords(newRecords) {
    localStorage.setItem(localStorageKey, JSON.stringify(newRecords));
}