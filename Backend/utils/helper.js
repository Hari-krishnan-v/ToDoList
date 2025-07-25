import jwt from "jsonwebtoken";

export const ValidateUserdata = (data) => {
    const { username, email, password, confirmPassword } = data;

    if (!username || typeof username !== 'string' || username.trim() === '') {
        throw new Error('Name is required and must be a non-empty string.');
    }

    if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Valid email is required.');
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
    }

    if (password !== confirmPassword) {
        throw new Error('Passwords do not match.');
    }
}

export const generateToken = (user) => {
    return jwt.sign(
        {id: user._id, email: user.email, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );
}

export const setCookie = (res, name, value) => {
    res.cookie(name, value, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export const ValidateTodoData = (data) => {
    const {title,description, status} = data;
    if(!title || !description){
        throw new Error('Title and description are required.');
    }


    if (!title || typeof title !== 'string' || title.trim() === '') {
        throw new Error('Title is required and must be a non-empty string.');
    }
    if (description && typeof description !== 'string') {
        throw new Error('Description must be a string if provided.');
    }

}

