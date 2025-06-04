import mongoose, { Date, Schema, model } from "mongoose";


//TS interface
export interface IIncedent {
    title: string,
    description: string,
    photoPath: string,
    reportedBy: mongoose.Schema.Types.ObjectId,
    workplaceId: mongoose.Schema.Types.ObjectId,
    status: string,
    //NOTE: THIS IS THE MONGOOSE DATE TYPE
    createdAt: Date,
    riskLevel: string
};


const IncedentSchema = new Schema<IIncedent>({

    title: { type: String, required: true },

    description: { type: String, required: true },

    photoPath: { type: String },

    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    workplaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workplace',
        required: true
    },

    status: {
        type: String,
        default: 'Open'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    riskLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    }

})

//ES TS export default
export const Incident = model<IIncedent>('Incident', IncedentSchema)
