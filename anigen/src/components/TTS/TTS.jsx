import axios from 'axios';
import React, { useState, useEffect } from 'react';

const TTS = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [filenameValue, setFilenameValue] = useState('');
  const [filenames, setFilenames] = useState([]);
  const [filename, setFilename] = useState([]);
  const [showFields, setShowFields] = useState(false);
  const [showbuttons, setShowbuttons] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [script, setScript] = useState('');
  const [textValue, setTextValue] = useState("");
  const [textValue2, setTextValue2] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
const handlePlay = () => {
  const audio = new Audio(audioUrl);
  audio.play();
  setIsPlaying(true);
};

const handlePause = () => {
  const audio = new Audio(audioUrl);
  audio.pause();
  setIsPlaying(false);
};

const handleReplay = () => {
  const audio = new Audio(audioUrl);
  audio.currentTime = 0;
  audio.play();
  setIsPlaying(true);
};



  useEffect(() => {
    const fetchFilenames = async () => {
      try {
        const email = localStorage.getItem('name');
        const response = await axios.get(`http://localhost:4000/TTS/${email}/filenames`);
        setFilenames(response.data.filenames);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFilenames();
  }, []);
  const handleAudioDisplay= ()=>{
    setShowbuttons(true);
    setShowFields(false);
  }
  const handleAudioUpload = async (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const response = await fetch(url);
    const blob = await response.blob();
    console.log(blob);
    const formData = new FormData();
    const time = new Date().getTime();
    const email = localStorage.getItem('name');
    const filenamme = `${email}${time}.wav`;
    setFilename(filenamme);
    const voicename=document.getElementById("voicename").value;
    console.log(voicename);
           try {
           const response = await axios.post(`http://localhost:4000/TTS/${email}`,{filename:voicename});
           } catch (error) {
             console.error(error);
           }
     const blobb = new Blob([blob], { type: 'audio/wav' });
     formData.append('audio_file', blob, filenamme);
    try {
      const res = await axios.post(`http://localhost:5000/addVoice?email=${email}&voicename=${voicename}`, formData); // Do something with the response
    } catch (error) {
      console.error(error);
    }
    setAudioUrl(url);
  };

  useEffect(() => {
  if (filenameValue) {
    handleGenerateAudio();
  }
}, [filenameValue]);

  const handleVideoDisplay= ()=>{
    setShowFields(true);
    setShowbuttons(false);
    setShowButton(false);

  }

  const handleGenerateAudio = async (event) => {
    setLoading(false);
    setMessage("Loading...");
    let audioUrl;
    const email=localStorage.getItem("name");
    if(filenameValue=="default"){
    try {
       const res = await axios.get(`http://localhost:5000/generateaudio?text=${script}&speaker=VCTK_old_20I-2440@nu.edu.pk`,{ responseType: 'blob'} );
                let blob = new Blob([res.data], { type: 'audio/wav' });
                console.log(blob);
                audioUrl = URL.createObjectURL(blob);
                setAudioUrl(audioUrl);
                setLoading(true);
                setMessage("Generated Successfully");


  }catch (error) {
      console.error(error);
      setLoading(false);
      setMessage("Network error. Please check your connection.");
    }
  }
  else
  {
    if(filenameValue!=""){
    try {
       const res = await axios.get(`http://localhost:5000/generateaudio?text=${script}&voicename=${filenameValue}&email=${email}`,{ responseType: 'blob'} );
                let blob = new Blob([res.data], { type: 'audio/wav' });
                console.log(blob);
                audioUrl = URL.createObjectURL(blob);
                setAudioUrl(audioUrl);
                setLoading(true);
                setMessage("Generated Successfully");
  }catch (error) {
      console.error(error);
      setLoading(false);
      setMessage("Network error. Please check your connection.");
    }
  }
  }
  };


  const handleScriptChange = (event) => {
    const value = event.target.value;
    setScript(value);
  };



  const handleFilenameChange = (event) => {
    setFilenameValue(event.target.value);
  };


  return (
    <div>
        <div className="container shadow my-5">
          <div className="row">
            <div className="col-md-6 mt-5">
              <img src="/assets/tt.jpg" alt="Contact" className="w-75" style={{marginLeft:"30px", marginTop: "-50px"}}/>
            </div>
            <div className="col-md-6 p-5">
              <h1 className="display-6 fw-bolder mb-5">Turn Your Text To Speech</h1>
              <div className="mb-3 row">
              {message && <div className={`alert alert-${loading ? 'success' : 'danger'}`} role="alert">{message}</div>}
              <textarea id="text-box" placeholder="Enter your script (minimum 20 characters)" value={textValue} onChange={e=>setTextValue(e.target.value)}></textarea>

              { showbuttons && (
  <div>
    <textarea style={{width:"30vh", height:"7vh",marginTop:"1vh", marginLeft:"-1.75vh"}} id="voicename" placeholder="Enter a voicename" value={textValue2} onChange={e=>setTextValue2(e.target.value)} ></textarea>

    <button className="btn btn-secondary mx-2" style={{marginTop:"-6vh"}} disabled={!textValue2.trim()} onClick={() => document.querySelector('input[type="file"]').click()}>
  Upload Audio
  <input type="file" hidden accept=".wav,.audio" onChange={handleAudioUpload} />
</button>

  </div>
)}

                {showFields && (
                  <>
                    <hr />
                    <select
                      className="form-select"
                      style={{ width: "32%", height: "40px" }}
                      value={filenameValue}
                      onChange={handleFilenameChange}
                    >
                      <option value="">Select a voicename</option>
                      {filenames.map((filename, index) => (
                        <option key={index} value={filename}>
                          {filename}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                <hr />
                <div className="col-sm-12 d-flex">
                  {showButton && (
                  <button  type="submit" className="btn btn-primary" onClick={handleVideoDisplay} disabled={textValue.trim().length < 20} style={{marginRight:"4vh", marginLeft:"-2vh"}}>
                    Generate Audio
                  </button>)}
                  <button type="submit" className="btn btn-primary" onClick={handleAudioDisplay} style={{marginLeft:"-2vh"}}>
                  Audio Upload
                  </button>
                </div>
                {audioUrl && <audio controls src={audioUrl}  style={{marginTop:"5%"}}/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default TTS;
