import axios from "axios"
import React, { useEffect, useRef, useState } from 'react';
import './avatar.css'
import Navbar from '../Navbar/Navbar';
const CreateAvatar = () => {
  const subdomain = 'anigen' // See section about becoming a partner
  const iFrameRef = useRef(null)
  var [avatarUrl, setAvatarUrl] = useState('')
  const [showIFrame, setShowIFrame] = useState(true)
  var [user, setUser] = useState({
    email: localStorage.getItem('name'),
    avatarUrl: ''
  })
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const email = localStorage.getItem("name");
  useEffect(() => {
    let iFrame = iFrameRef.current
    if(iFrame) {
       iFrame.src = `https://${subdomain}.readyplayer.me/en/avatar?frameApi`
    }
  })
  useEffect(() => {
    window.addEventListener('message', subscribe)
    document.addEventListener('message', subscribe)
    return () => {
      window.removeEventListener('message', subscribe)
      document.removeEventListener('message', subscribe)
    }
  },[]);


  function subscribe(event) {
    const json = parse(event)
    if (json?.source !== 'readyplayerme') {
      return;
    }
    // Subscribe to all events sent from Ready Player Me
    // once frame is ready
    if (json.eventName === 'v1.frame.ready') {
      let iFrame = iFrameRef.current
      if(iFrame && iFrame.contentWindow) {
        iFrame.contentWindow.postMessage(
          JSON.stringify({
            target: 'readyplayerme',
            type: 'subscribe',
            eventName: 'v1.**'
          }),
          '*'
        );
      }
    }
    // Get avatar GLB URL
    if (json.eventName === 'v1.avatar.exported') {

      avatarUrl = json.data.url;
      localStorage.setItem("avatar",avatarUrl);
      setShowIFrame(false);
      
      user = {
        ...user,
        email: email,
        avatarUrl: avatarUrl
      };

      console.log("data");
      console.log(user);
      
      axios.post(process.env.REACT_APP_BACKENDURL+"/avatar",user)
        .then(response => {
          if(response.data.message==="Avatar URL updated successfully")
          {
          setSuccess(true);
          setMessage("Avatar Created Successfully");
          console.log(response.data.message);
        }
        else if(response.data.message==="Avatar URL is empty"){
          setSuccess(false);
          setMessage("Avatar creation error. Please try again");
          console.log(response.data.message);}
          else{
            setSuccess(false);
            setMessage("Error");
            console.log(response.data.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
    // Get user id
    if (json.eventName === 'v1.user.set') {
      console.log(`User with id ${json.data.id} set:${JSON.stringify(json)}`);
      }
     
    }
    
    function parse(event) {
        try {
          return JSON.parse(event.data);
        } catch (error) {
          return null;
        }
    }


  return (
    <div>
    {message && <div className={`alert alert-${success ? 'success' : 'danger'}`} role="alert">{message}</div>}
    <div className="App">
  <div className="topBar">
    <input
      className="toggleButton"
      onClick={() => setShowIFrame(!showIFrame)}
      type="button"
      value={`${showIFrame ? 'Close': 'Open'} creator`}
    />

  </div>
  <iframe
    allow="camera *; microphone *"
    className="iFrame"
    id="frame"
    ref={iFrameRef}
    style={{
      display: `${showIFrame ? 'block': 'none'}`
    }}
    title={"Ready Player Me"}
  />
</div>
    </div>
  );
}

export default CreateAvatar;
