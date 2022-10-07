import { useState } from "react"

const useUser = () => {
  const STORAGE_KEY = "loggedUser"

  const getUser = () => {
    const object = window.localStorage.getItem(STORAGE_KEY)
    const user = JSON.parse(object)
    return user
  }

  const [user, setUser] = useState(getUser())

  const saveUser = (username, role) => {
    const userObject = { username, role }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userObject))
    setUser(userObject)
  }

  const removeUser = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  return {
    user,
    saveUser,
    removeUser,
  }
}

export default useUser
