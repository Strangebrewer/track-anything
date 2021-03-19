import mongoose from 'mongoose';

// This defines the object you can pass in when creating a new document
//  (or updating one, I suppose, but that would require actual correct usage of PUT
//    i.e., replacing the whole document, not just some fields, which would be PATCH)
interface ITodo {
    title: string;
    description: string;
}

// This adds the schema fields to the mongoose Document interface, so each document will have
//  the appropriate mongoose methods (presumably instance methods, e.g. "save")
export interface TodoDoc extends mongoose.Document {
    title: string;
    description: string;
}

// This adds a build method to the mongoose Model interface, allowing "build" to be called
//  from the Todo schema exported from this file.
interface TodoModelInterface extends mongoose.Model<TodoDoc> {
    build(attr: ITodo): TodoDoc;
}

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

todoSchema.statics.build = (attr: ITodo): TodoDoc => {
    return new Todo(attr);
}

const Todo = mongoose.model<TodoDoc, TodoModelInterface>('Todo', todoSchema);

export default Todo;
