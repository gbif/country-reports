
function getAccessAndUsageData(year) {
    let res = {
        countryDownloads: 842,
        totalDownloads: 100000,
        occRecordByMonth: {
            categories: [],
            data: []
        }
    };
    for (let i = 1; i < 13; i++) {
        res.occRecordByMonth.categories.push(year + '-' + i);
        res.occRecordByMonth.data.push(Math.round(Math.random() * 1000));
    }
    return res;
}

function getPublishedOccRecords(year) {
    return {
        countryOccRecords: 5647123,
        globalOccRecords: 76987345
    };
}

module.exports = {
    getAccessAndUsageData: getAccessAndUsageData,
    getPublishedOccRecords: getPublishedOccRecords
};
