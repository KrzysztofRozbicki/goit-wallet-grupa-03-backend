import mongoose from 'mongoose';

const { Schema } = mongoose;

const user = new Schema({});

const User = mongoose.model('user', user);

export default User;
