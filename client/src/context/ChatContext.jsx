import { createContext, useState, useEffect } from "react"
import { baseUrl, getRequest, postRequest } from "../utils/services"
import PropTypes from 'prop-types'

export const ChatContext = createContext()

export const ChatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
    const [userChatsError, setUserChatsError] = useState(null)

    useEffect(() => {
        const getUserChats = async() => {
            if(user?._id) {
                setIsUserChatsLoading(true)
                setUserChatsError(null)

                const response = await getRequest(`${baseUrl}/chat/${user?._id}`)

                setIsUserChatsLoading(false)

                if(response.error) {
                    return setUserChatsError(response)
                }

                setUserChats(response)
            }
        }

        getUserChats()
    }, [user])

    return (
        <ChatContext.Provider value={{
            userChats, 
            isUserChatsLoading, 
            userChatsError
        }}>
            {children}
        </ChatContext.Provider>
    )
}

ChatContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    user: PropTypes.object.isRequired,
}