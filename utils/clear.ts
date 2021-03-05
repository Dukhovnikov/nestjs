require('dotenv').config();
import * as mongoose from 'mongoose';

const clear = async () => {
  try {
    console.log('[clear] : running...');

    await mongoose.connect(process.env.MONGO_URL_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await mongoose.connection.db.dropCollection('containers');
    await mongoose.connection.db.dropCollection('users');
    await mongoose.connection.db.dropCollection('files');
    await mongoose.connection.db.dropCollection('userprofiles');
    await mongoose.connection.db.dropCollection('actions');
    await mongoose.connection.db.dropCollection('depos');
    await mongoose.connection.db.dropCollection('countries');
    await mongoose.connection.db.dropCollection('roles');
    await mongoose.connection.db.dropCollection('permissions');

    console.log('[clear] : success');
  } catch (e) {
    throw new Error('failed to clear database. Error: ' + e.message);
  } finally {
    await mongoose.connection.close();
  }
};

clear();
