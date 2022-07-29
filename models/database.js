const { SQL_USER, SQL_PASS } = require('../config.json');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', SQL_USER, SQL_PASS, {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite'
})

const vnc_ratings = sequelize.define('vnc_ratings', {
  vncid:{
    type: Sequelize.STRING,
  },
  like:{
    type: Sequelize.INTEGER,
  },
  dislike:{
    type: Sequelize.INTEGER,
  },
  dead:{
    type: Sequelize.INTEGER,
  },
  honeypot:{
    type: Sequelize.INTEGER,
  },
  blacklisted:{
    type: Sequelize.BOOLEAN,
  }
});

module.exports = { vnc_ratings }