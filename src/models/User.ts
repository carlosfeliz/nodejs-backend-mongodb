import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcryptjs';
export interface IUser extends Document {
    _id: string
    createdDate?: Date
    email?: string
    firstName?: string
    lastName?: string
    password: string
    role?: string
    encryptPassword(password: string): Promise<string> 
}
const userSchema = new Schema ({
    firstName: {
        type: String,
        sparse: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        required: true
    },
    lastName: {
        type: String,
        sparse: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    role: {
        type: String
    },
    createdDate: {
        type: Date
    }
})

userSchema.methods.encryptPassword = async(password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt);
};

export default model<IUser>("User", userSchema);