import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import PropTypes from 'prop-types';
import { Stack } from "react-bootstrap";
import avatar1 from '../../assets/images/avatar1.jpg'

const UserChat = ({chat, user}) => {
    const {recipientUser} = useFetchRecipientUser(chat, user)

    return ( 
        <Stack 
            direction="horizontal" 
            gap={3} 
            className="user-card align-items-center p-2 justify-content-between"
            role="button"
        >
            <div className="d-flex">
                <div className="me-2">
                <img src={avatar1} style={{ height: "35px", width: "35px", borderRadius: "50%" }} />
                </div>
                <div className="text-content">
                    <div className="name">
                        {recipientUser?.name}
                    </div>
                    <div className="text">
                        Text Message
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">
                    13/11/2024
                </div>
                <div className="this-user-notifications">
                    2
                </div>
                <span className="user-online"></span>
            </div>
        </Stack>
     );
}

UserChat.propTypes = {
    chat: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default UserChat;