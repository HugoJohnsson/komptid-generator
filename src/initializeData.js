const readlineSync = require('readline-sync');
const chalk = require('chalk');
const { monthName, numDaysInMonth } = require('./helpers/months');

// Returns a data object holds all data needed to
// generate the report, will get values from user
const initializeData = () => {
    let data = {
        name: null, // First and lastname
        year: null, // 2021, 2022 ...
        month: null, // 1, 2, 3 ...
        days: {}, // { '1': 4, '2': 0, '3': 0, '4': 2 }
        daysInMonth: null,
        availableDays: null
    };


    // Get initial values needed from the user
    // and setup the data object for use later
    data.name = readlineSync.question('Ditt namn (för och efternamn): ');
    data.year = readlineSync.question('År: ');
    data.month = readlineSync.question('Månad (1 = Januari, 2 = Februari, ...): ');
    data.daysInMonth = numDaysInMonth(data.month, data.year);
    data.availableDays = Array.from({length: data.daysInMonth}, (_, i) => i + 1)

    // Initialize the "days" on the data object that holds the number of compensation hours per day
    for (const day of data.availableDays) {
        data.days[day] = 0;
    }

    console.log('');


    // Check if the provided initial values are correct, if not, exit the program
    console.log(chalk.blue(`Ditt namn är ${data.name}, denna komptidsrapport gäller år ${data.year}, månad ${monthName(data.month)}`));

    if (!readlineSync.keyInYN('Är detta korrekt?')) {
        console.log('Avslutar...');
        process.exit(1);
    }

    return data;
}

module.exports = initializeData;