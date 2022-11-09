import axios from 'axios';
//TODO: Add this in properly
//TODO: Test whether this works

export async function authenticate(socket, next) {
    const token = socket.handshake.auth.token;
    const verifyURL = 'http://localhost:8000/api/verify'

    if (!token) {
        next(new Error('No cookie found!'));
    }
    try {
        const tokenObject = {
            token: token
        }
        const resp = await axios.post(verifyURL,tokenObject)
        const data = resp.data.user
        console.log(data)
        socket.data.username = data.username; //TODO: Check if this get's set properly

        //We don't bother to check role

        return next();
    } catch(err) {
        next(new Error("You are not allowed to access the question service!"))
    }
}