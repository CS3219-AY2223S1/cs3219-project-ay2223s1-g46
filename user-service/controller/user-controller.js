import {
  ormCreateUser as _createUser,
  ormCheckUserExist as _checkUserExist,
  ormCompareHash as _compareHash,
  ormCreateJWT as _createJWT,
  ormGetUser as _getUser,
  ormDeleteUser as _deleteUser,
  ormUpdatePassword as _updatePassword,
  ormUpdateRole as _updateRole,
} from '../model/user/user-orm.js'

import { ormBlacklistToken as _blacklistToken } from '../model/token/token-orm.js'
import roles from '../utils/role.js'

export async function createUser(req, res) {
  try {
    const { username, password } = req.body
    if (username && password) {
      const userExists = await _checkUserExist(username)
      if (userExists) {
        return res
          .status(409)
          .json({ message: 'This username is already in use!' })
      }

      const resp = await _createUser(username, password)

      if (resp.err) {
        return res.status(400).json({ message: 'Could not create a new user!' })
      } else {
        console.log(`Created new user ${username} successfully!`)
        return res
          .status(201)
          .json({ message: `Created new user ${username} successfully!` })
      }
    } else {
      return res
        .status(400)
        .json({ message: 'Username and/or Password are missing!' })
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Database failure when creating new user!' })
  }
}

export async function loginUser(req, res) {
  try {
    const { username, password } = req.body
    if (username && password) {
      const userExists = await _checkUserExist(username)
      if (!userExists) {
        return res.status(401).json({
          title: 'Invalid username',
          message: 'This username does not exist!',
        })
      }

      const validHash = await _compareHash(username, password)
      if (!validHash) {
        return res.status(401).json({
          title: 'Invalid password',
          message: 'The password does not match this user!',
        })
      }

      const user = await _getUser(username)
      const token = await _createJWT(user)

      res.cookie('token', token, { httpOnly: true })
      res.json({ token, username: user.username, role: user.role })

      console.log(`Logged in with username ${username} successfully!`)
      return res.status(200)
    } else {
      return res
        .status(400)
        .json({ message: 'Username and/or Password are missing!' })
    }
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: 'Database failure when logging in user!' })
  }
}

export async function logoutUser(req, res) {
  try {
    console.log(`Logged out of ${req.username} successfully!`)
    // remove cookie if user logs out

    await _blacklistToken(req.cookies.token)

    return res
      .clearCookie('token')
      .status(200)
      .json({ message: 'Successfully logged out!' })
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: 'Database Failure when logging out user!' })
  }
}

export async function deleteUser(req, res) {
  try {
    const username = req.username

    if (username) {
      const userExists = await _checkUserExist(username)
      if (!userExists) {
        return res.status(401).json({
          title: 'Invalid username',
          message: 'This username does not exist!',
        })
      }

      await _deleteUser(username)

      await _blacklistToken(req.cookies.token)

      console.log(`Deleted account of ${req.username} successfully!`)

      // remove cookie since user logged out
      return res
        .clearCookie('token')
        .status(204)
        .json({ message: 'Successfully deleted account!' })
    } else {
      return res.status(400).json({ message: 'Username is missing!' })
    }
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: 'Database Failure when deleting user!' })
  }
}

export async function updatePassword(req, res) {
  try {
    // taking username from body, so i need to send
    // if taking from cookie, should be
    // const username = req.username
    // const { username, oldPassword, newPassword } = req.body
    const username = req.username
    const { oldPassword, newPassword } = req.body

    if (username && oldPassword && newPassword) {
      const userExists = await _checkUserExist(username)

      if (!userExists) {
        return res.status(401).json({
          title: 'Invalid username',
          message: 'This username does not exist!',
        })
      }

      // compare req.username from jwt in middleware to username in req.body
    //   if (req.username !== username) {
    //     return res.status(401).json({
    //       title: 'Unable to change password',
    //       message: 'This account does not belong to you!',
    //     })
    //   }

      const validHash = await _compareHash(username, oldPassword)
      if (!validHash) {
        return res.status(401).json({
          title: 'Unable to change password',
          message: 'The password does not match this user!',
        })
      }

      const sameHash = await _compareHash(username, newPassword)
      if (sameHash) {
        return res.status(401).json({
          title: 'Unable to change password',
          message: 'The new password is unchanged!',
        })
      }
      await _updatePassword(username, newPassword)

      console.log(`Changed password of user ${req.username} successfully!`)

      return res.status(200).json({ message: 'Successfully changed password!' })
    } else {
      return res.status(400).json({
        message: 'Username or old password or new password is missing!',
      })
    }
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: 'Database Failure when deleting user!' })
  }
}

export async function updateRole(req, res) {
    try {
        const username = req.username
        const { password, newRole } = req.body
    
        if (username && password && newRole) {
          const userExists = await _checkUserExist(username)
    
          if (!userExists) {
            return res.status(401).json({
              title: 'Invalid username',
              message: 'This username does not exist!',
            })
          }

          if (!(newRole in roles)) {
            return res.status(401).json({
                title: 'Invalid role',
                message: 'This role does not exist!',
              })
          }
    
          const validHash = await _compareHash(username, password)
          if (!validHash) {
            return res.status(401).json({
              title: 'Unable to change password',
              message: 'The password does not match this user!',
            })
          }

          const user = await _getUser(username)
          if (user.role === newRole) {
            return res.status(401).json({
                title: 'Unable to change role',
                message: 'The new role is same as the current role!',
            })
          }

          // get updated user with new role
          const updatedUser = await _updateRole(username, newRole)

          // update jwt in cookie with new role
          const token = await _createJWT(updatedUser)
          res.cookie('token', token, { httpOnly: true })
          res.json({ token, username: updatedUser.username, role: updatedUser.role, message: 'Successfully changed role!'  })
    
          console.log(`Changed role of user ${req.username} successfully!`)
    
          return res.status(200)
        } else {
          return res.status(400).json({
            message: 'Username or password or new role is missing!',
          })
        }
      } catch (err) {
        console.log(err)
        return res
          .status(500)
          .json({ message: 'Database Failure when updating role!' })
      }

}
