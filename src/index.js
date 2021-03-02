#!/usr/bin/env node
const initializeData = require('./initializeData');
const addCompHours = require('./addCompHours');
const generateFile = require('./generateFile');
const { monthName } = require('./helpers/months');
const chalk = require('chalk');

// Get initial data object
let data = initializeData();

// Add the comp hours for every day
data = addCompHours(data);

// Generate the file
const fileName = `komptidsrapport-${data.name}-${data.year}-${monthName(data.month)}.pdf`
generateFile(data, fileName);

console.log(chalk.green('Färdigt!'));