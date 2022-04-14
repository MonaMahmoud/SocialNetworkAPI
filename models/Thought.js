const { Schema, model, Types } = require('mongoose');
const User = require('./User');


//Schema to create reaction subdocument
const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        required: true,
        default: Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: getCreatedAt,
    },
});

// Schema to create Thought model
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: getCreatedAt,
    },

    username: {
        type: String,
        required: true,
        ref: User,
    },

    // This will include an array that holds all the thought's reactions
    reactions: [reactionSchema],

}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});

// Create a virtual property `reactionCount` that gets the amount of reactions per post
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


function getCreatedAt(createdAt) {
    return new Date(createdAt).toLocaleDateString();
}

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;