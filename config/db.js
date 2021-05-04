import mongoose from 'mongoose';
import config from 'config';

const db = config.get('mongoURI');

export const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('MongoDB connected....');
  } catch (error) {
    console.log(err.message);
    process.exit(1);
  }
};
