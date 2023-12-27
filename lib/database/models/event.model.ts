import { Document, Schema, models, model } from "mongoose";

export interface IEvent extends Document {
    _id: string;
    title: string;
    imageUrl: string;
    createdAt?: Date;
    startDateTime?: Date;
    endDateTime?: Date;
    description?: string;
    location?: string;
    price?: string;
    url?: string;
    isFree?: boolean;
    category?: { _id: string, name: string };
    organizer?: { _id: string, firstName: string, lastName: string };
}


const EventSchema = new Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, defaul: Date.now },
    startDateTime: { type: Date, defaul: Date.now },
    endDateTime: { type: Date, defaul: Date.now },
    description: { type: String },
    location: { type: String },
    price: { type: String },
    url: { type: String },
    isFree: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    organizer: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Event = models.Event || model('Event', EventSchema)

export default Event