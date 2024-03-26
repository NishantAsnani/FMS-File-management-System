const mongoose = require('mongoose');
const { Schema } = mongoose
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')



const userData = new Schema({
    Firstname: {
        type: String,
        required: true
    },
    Lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        validate: {
            validator: (password) => {
                return !password.includes('password')
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    pdf:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'pdf'
            }
        ]
})


userData.methods.generateAuthToken = async function () {
    const user = this;
    const payload = {
        id: user.id,
        email: user.email
    }
    const token = JWT.sign(payload,process.env.SECRET_KEY);
    user.tokens.push({ token })
    await user.save();
    return token;
}

userData.pre('save', async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 12);
    }

    next()
})

const User = mongoose.model('User', userData)





module.exports = User