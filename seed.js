require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/savemyspot");

const db = require('./models');

const users = [
  { firstname: 'chris', lastname: 'gauthier', username: 'cgauthier14',
 password: 'test', email: 'example@gmail.com'},

  { firstname: 'jeff', lastname: 'bond', username: 'jbond007',
 password: 'test', email: 'jeffb@gmail.com'},

  { firstname: 'diane', lastname: 'schiavo', username: 'dschiavo',
 password: 'test', email: 'dschiavo@gmail.com'}
  
];

const businesses = [
  {
    businessName: "Taco Stand",
    numWaiting: 0
  },
  {
    businessName: "Taco Stand2",
    numWaiting: 4
  },
  
];

const seed = async () => {
  try {
    await db.User.remove();
    console.log('DROP ALL USERS');

    await db.Business.remove();
    console.log('DROP ALL BUSINESSES');

    await Promise.all(
      users.map(async user => {
        const data = await db.User.create(user);
        await data.save();
      }),
    );
    console.log('CREATED USERS', JSON.stringify(users));

    await Promise.all(
        businesses.map(async business => {
          const data = await db.Business.create(business);
          await data.save();
        }),
      );
  
    console.log('CREATED BUSINESSES', JSON.stringify(businesses));
  } catch (err) {
    console.error(err);
  }
};

seed();

//make collection business and user uppercase.
//make sure db.collectionname is correct.