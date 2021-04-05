import mongoose from 'mongoose';

export interface ITracker {
    user: string;
    title: string;
    subtitle?: string;
    notes?: string;
    fields: string[];
    createdAt: Date;
}

export interface TrackerDoc extends mongoose.Document {
    title: string;
    subtitle: string;
    notes: string;
    fields: string[];
}

export interface TrackerModelInterface extends mongoose.Model<TrackerDoc> { }

const trackerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    subtitle: String,
    notes: String,
    fields: [],
    createdAt: Date
}, { timestamps: true });

const Tracker = mongoose.model<TrackerDoc, TrackerModelInterface>('Tracker', trackerSchema);

// userSchema.statics.build = (attr: IUser): UserDoc => {
//   return new User(attr);
// };

export default Tracker;
