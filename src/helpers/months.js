// Month number to name map
const months = {
    1: 'Januari',
    2: 'Februari',
    3: 'Mars',
    4: 'April',
    5: 'Maj',
    6: 'Juni',
    7: 'Juli',
    8: 'Augusti',
    9: 'September',
    10: 'Oktober',
    11: 'November',
    12: 'December'
}

// Month name by month number
const monthName = (monthNum) => {
    return months[monthNum];
}

// Number of days for the provided month and year
const numDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}

module.exports = {
    monthName,
    numDaysInMonth
}