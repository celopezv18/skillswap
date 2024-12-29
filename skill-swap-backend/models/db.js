const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Configuración de la conexión con la base de datos
const sequelize = new Sequelize(
  'skill_swap',      // Nombre de la base de datos
  'root',      // Usuario
  '',  // Contraseña
  {
    host: 'localhost', // Dirección del host
    dialect: 'mysql',          // Tipo de base de datos
    logging: false             // Desactiva los logs de Sequelize
  }
);

// Probar la conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection successfully established with the database.');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
})();

// Definición de modelos
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  availability: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, { timestamps: true });

const Skill = sequelize.define('Skill', {
  skill_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('teach', 'learn'),
    allowNull: false,
  },
}, { timestamps: true });

const Match = sequelize.define('Match', {
  status: {
    type: DataTypes.ENUM('pending', 'accepted'),
    defaultValue: 'pending',
  },
}, { timestamps: true });

const Messages = sequelize.define('Messages', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users', // Nombre de la tabla relacionada
      key: 'id',
    }
  },
  recipient_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users', // Nombre de la tabla relacionada
      key: 'id',
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, { timestamps: true });



// Relaciones entre modelos
User.hasMany(Skill, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Skill.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Messages, { foreignKey: 'sender_id', as: 'sentMessages' });
Messages.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });

User.belongsToMany(User, {
  as: 'Matches',
  through: Match,
  foreignKey: 'user_id',
  otherKey: 'match_id',
});

// Sincronización con la base de datos
(async () => {
  try {
    await sequelize.sync({ force: false }); // Usa `force: true` solo en desarrollo para recrear tablas
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error sincronizando los modelos:', error);
  }
})();

module.exports = { sequelize, User, Skill, Match, Messages };