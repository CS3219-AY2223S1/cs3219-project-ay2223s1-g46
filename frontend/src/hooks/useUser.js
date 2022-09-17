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

  return {
    user,
    saveUser,
  }
}

export default useUser