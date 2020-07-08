import { Schema, model, Document } from "mongoose";

interface TopicFields extends Document {
    url: string;
    topic: string;
}

const topicSchema = new Schema({
    topic: {
        type: String,
        index: true
    },
    url: String,
});

export const Topic = model<TopicFields>('topic', topicSchema);