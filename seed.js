require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/savemyspot");

const db = require('./models');

const users = [
  { firstname: 'chris', lastname: 'gauthier',
 password: 'test', email: 'chris@gmail.com'},

  { firstname: 'jeff', lastname: 'bond',
 password: 'test', email: 'jeff@gmail.com'},

  { firstname: 'diane', lastname: 'schiavo',
 password: 'test', email: 'diane@gmail.com'},

  { firstname: 'admin', lastname: 'admin',
 password: 'test', email: 'admin@gmail.com', businessUser: true}
  
];

const businesses = [
  {
    businessName: "Chris's Hair Cut Palace",
    numWaiting: 5,
    waitTime: 50,
    waitlist: ['chris', 'jeff', 'diane', ' mason', 'blake'],
    waitlistUserInfo: [
      { firstname: 'chris', lastname: 'gauthier', email: 'chris@gmail.com'},
      { firstname: 'jeff', lastname: 'bond', email: 'jeff@gmail.com'},
      { firstname: 'diane', lastname: 'schiavo', email: 'diane@gmail.com'}
    ]
  }
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
  
    return console.log('CREATED BUSINESSES', JSON.stringify(businesses));
  } catch (err) {
    return console.error(err);
  }
};

seed();

//make collection business and user uppercase.
//make sure db.collectionname is correct.