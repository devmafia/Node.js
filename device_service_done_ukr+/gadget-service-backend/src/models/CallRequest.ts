import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Import uuid function
interface ICallRequest extends Document {
  id: string;
  name: string;
  phone: string;
  createdAt: Date;
}

const callRequestSchema: Schema = new Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,  
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function(v: string) {
        return /^\d+$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid phone number!`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICallRequest>('CallRequest', callRequestSchema);
