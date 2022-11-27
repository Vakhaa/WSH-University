import {useState} from 'react'
import axios from 'axios'

function Mailer() {

  let [mail, setMail] = useState("");
  let [message, setMessage] = useState("");

  let sendMail = () => {
    axios.post("http://localhost:5000/email/send", {
      to: mail,
      message
    },{
      headers:{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      }
    });
  }

  return (
    <>
    <div>
      <input  type="text" value={mail} onChange={(e)=>setMail(e.currentTarget.value)} placeholder="email"/>
    </div>
    <div>
      <textarea name="message" value={message} onChange={(e)=>setMessage(e.currentTarget.value)} placeholder="Message..." cols='40' rows='5' />
    </div>
    <div>
      <button onClick={sendMail}>Send </button>
    </div>
    </>
  );
}

export default Mailer;
