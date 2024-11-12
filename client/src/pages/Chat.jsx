import { useContext } from 'react';
import Navbar from '../components/Navbar'
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
    const {userChats, isUserChatsLoading, userChatsError} = useContext(ChatContext)

    console.log('UserChats: ', userChats)
    return ( 
        <>
            <Navbar>
                <h1>Chat app</h1>
            </Navbar>
        </>
     );
}
 
export default Chat;