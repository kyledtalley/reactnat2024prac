import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useMemo,
} from "react"

import { getCurrentUser } from "../lib/appwrite"

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
	const [isLogged, setIsLogged] = useState(false)
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getCurrentUser()
			.then((res) => {
				if (res) {
					setIsLogged(true)
					setUser(res)
				} else {
					setIsLogged(false)
					setUser(null)
				}
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])

	const contextValue = useMemo(
		() => ({
			isLogged,
			setIsLogged,
			user,
			setUser,
			loading,
		}),
		[isLogged, user, loading]
	)

	return (
		<GlobalContext.Provider value={contextValue}>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider
