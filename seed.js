const path = require('path');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const {sequelize} = require('./db');
const {User, Item} = require('./models');

const createUsers = async () => {

    let pw1 = await bcrypt.hash('1234', 2);
    let pw2 = await bcrypt.hash('password', 2);
    let pw3 = await bcrypt.hash('1password', 3);
    let pw4 = await bcrypt.hash('2password', 4);

    const users = [
        {name : 'Dan', password: pw1 },
        {name : 'Linda', password : pw2},
        {name : 'Antony', password: pw3},
        {name : 'Johnny', password: pw4}
    ];

    return users
}


const items = [
    {name : 'Gold'},
    {name : 'Silver'},
    {name : 'Paladium'}
];


const seed = async () => {

    await sequelize.sync({ force: true });

    const users = await createUsers(); // create users w/ encrypted passwords

    const userPromises = users.map(user => User.create(user))
    const itemPromises = items.map(item => Item.create(item))
    await Promise.all([...userPromises, ...itemPromises]);
    console.log("db populated!")
}

seed();