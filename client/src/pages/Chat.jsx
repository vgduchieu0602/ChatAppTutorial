import { useContext } from 'react';
import Navbar from '../components/Navbar'
import { ChatContext } from '../context/ChatContext';
import { Container, Stack } from 'react-bootstrap';
import UserChat from '../components/chat/UserChat';
import { AuthContext } from '../context/AuthContext';
import PotentialChats from '../components/chat/PotentialChats';

const Chat = () => {
    const { user } = useContext(AuthContext)
    const {
        userChats, 
        isUserChatsLoading, 
        userChatsError
    } = useContext(ChatContext)

    return ( 
        <>
            <Navbar />
            <Container>
                <PotentialChats />
                {userChats?.length < 1 ? null : (
                    <Stack direction="horizontal" gap={4} className="message-box align-items-start">
                        <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                            {isUserChatsLoading && <p>Loading chats...</p>}
                            {userChats?.map((chat, index) => {
                                return (
                                    <div key={index}>
                                        <UserChat chat={chat} user={user}/>
                                    </div>
                                )
                            })}
                        </Stack>
                        <p>Chat Box</p>
                    </Stack>
                )}
            </Container>
        </>
     );
}
 
export default Chat;