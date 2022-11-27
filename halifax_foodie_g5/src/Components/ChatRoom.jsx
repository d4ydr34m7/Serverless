import React, {useState, useRef} from 'react'
import db from "../firebase";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import ChatMessage from './ChatMessage'
import { Button, OutlinedInput } from '@mui/material';

export default function ChatRoom({currentUser, chatWith}) {

    const [formValue, setFormValue] = useState("");
    const sentBy = currentUser.role.toLowerCase() === 'customer' ? currentUser.email : 'restaurant'
    const sentTo = chatWith ? chatWith.email : 'restaurant'
    console.log("ccccccccccccc",sentTo)
    const messagesRef = db.collection("messages");
    const query = messagesRef.where('sentBy', 'in', [sentBy, sentTo]).orderBy('createdAt')
    const [messages] = useCollectionData(query, { idField: "id" });

    const dummy = useRef();

    function getFilteredMessages() {
        console.log(messages)
        if(!messages)return
        const usersSet = new Set([sentBy, sentTo]);
        console.log(usersSet)
        return messages.filter(message => usersSet.has(message.sentTo))
    }

    const sendMessage = async (e) => {
        e.preventDefault();

        try {
            await messagesRef.add({
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                sentBy,
                sentTo
            });

            setFormValue("");
            dummy.current.scrollIntoView({ behavior: "smooth" });
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <>
        <main>
            {getFilteredMessages() &&
            getFilteredMessages().map((msg) => <ChatMessage key={msg.id} message={msg} currentUser={currentUser} />)}

            <span ref={dummy}></span>
        </main>

        <form onSubmit={sendMessage} className="message-form">
            <OutlinedInput
                placeholder="Type message ..."
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}/>

                <Button style={{marginLeft:'10px'}} type="submit" variant="contained" color="success" disabled={!formValue}>
                    Send
                </Button>
        </form>
        </>
    );
}
