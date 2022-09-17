import { useState } from "react"

const useUser = () => {
  const STORAGE_KEY = "loggedUser"

  const getUser = () => {
    const user = window.localStorage.getItem(STORAGE_KEY)
    return user
  }

  const [user, setUser] = useState(getUser())

  const saveUser = (username) => {
    window.localStorage.setItem(STORAGE_KEY, username)
    setUser(username)
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
