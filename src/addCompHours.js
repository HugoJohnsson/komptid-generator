const readlineSync = require('readline-sync');

const addCompHoursHelper = (dataObj) => {
    // Display list of days in the choosen month
    // so that the user can choose a day to add hours to
    console.log('Tillgängliga dagar: \n');
    for (const day of dataObj.availableDays) {
        console.log(`${day} = ${dataObj.days[day]}`);
    }

    let choosenDay = readlineSync.question('Välj en dag: ');
    let numHours = readlineSync.questionInt( 'Antal timmar: ');
    dataObj.days[choosenDay] = numHours;

    if (!readlineSync.keyInYN('Är du klar?')) {
        addCompHoursHelper(dataObj);
    }

    return dataObj;
}

const addCompHours = (dataObj) => {
    if (!readlineSync.keyInYN('Behöver du registrera några kompensationstimmar?')) {
        return dataObj;
    }

    addCompHoursHelper(dataObj);

    console.log('');
    
    console.log('Dagar: \n');
    for (const day of dataObj.availableDays) {
        console.log(`${day} = ${dataObj.days[day]}`);
    }
    
    console.log('')
    
    if (!readlineSync.keyInYN('Ser detta rätt ut??')) {
        console.log('Avslutar...');
        process.exit(1);
    }
    
    console.log('')

    return dataObj;
}

module.exports = addCompHours;