const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please provide a valid email address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought',
    }, ],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }, ],
}, {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
        virtuals: true,
    },
    id: false,
});

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
    .virtual('friendCount')
    // Getter
    .get(function() {
        return `${this.first} ${this.last}`;
    })
    // Setter to set the first and last name
    .set(function(v) {
        const first = v.split(' ')[0];
        const last = v.split(' ')[1];
        this.set({ first, last });
    });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;