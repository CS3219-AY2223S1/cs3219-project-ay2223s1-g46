import { ormCreateUser as _createUser, 
    ormCheckUserExist as _checkUserExist,
    ormCompareHash as _compareHash,
    ormCreateJWT as _createJWT,
    ormGetUser as _getUser } from '../model/user-orm.js'

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            
            const userExists = await _checkUserExist(username);
            if (userExists) {
                return res.status(409).json({message: 'This username is already in use!'})
            }

            const resp = await _createUser(username, password);
            console.log(resp);
            if (resp.err) {
                return res.status(400).json({message: 'Could not create a new user!'});
            } else {
                console.log(`Created new user ${username} successfully!`)
                return res.status(201).json({message: `Created new user ${username} successfully!`});
            }
        } else {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}

export async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            
            const userExists = await _checkUserExist(username);
            if (!userExists) {
                return res.status(401).json({title:'Invalid username', message: 'This username does not exist!'})
            }

            const validHash = await _compareHash(username, password);
            if (!validHash) {
                return res.status(401).json({title:'Invalid password', message: 'The password does not match this user!'})
            }

            const user = await _getUser(username)
            const token = await _createJWT(user)

            console.log(`Logged in with username ${username} successfully!`)
            return res.status(200).send({ token, username: user.username});
            
        } else {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Database failure when logging in user!'})
    }
}