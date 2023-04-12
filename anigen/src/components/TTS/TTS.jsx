//
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
//
// const TTS = () => {
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [filenameValue, setFilenameValue] = useState('');
//
//   useEffect(() => {
//   const fetchFilenames = async () => {
//     try {
//       const email= localStorage.getItem('name');
//       const response = await axios.get(`http://localhost:4000/${email}/filenames`);
//       setFilenameValue(response.data.filenames);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   fetchFilenames();
// });
//     const handleAudioUpload = async(event) => {
//     const file = event.target.files[0];
//     const url = URL.createObjectURL(file);
//     const response = await fetch(url);
//     const blob = await response.blob();
//     const formData = new FormData();
//     formData.append('audio', blob);
//     alert(formData);
//     try {
//       const res = await axios.post('localhost:5000/addVoice', formData);
//       alert(res.data); // Do something with the response
//       alert("Hi");
//     } catch (error) {
//       console.error(error);
//       alert(error);
//       alert("error");
//     }
//     setAudioUrl(url);
//   };
//
//   return (
//     <div>
//       <div className="container shadow my-5">
//         <div className="row">
//           <div className="col-md-6 mt-5">
//             <img src="/assets/t2.jpg" alt="Contact" className="w-75"/>
//           </div>
//           <div className="col-md-6 p-5">
//             <h1 className="display-6 fw-bolder mb-5">Turn Your Text To Speech</h1>
//             <div className="mb-3 row">
//               <textarea></textarea>
//               <hr/>
//               <textarea className="Filename" style={{ width: '20%', height: '30px' }} value={filenameValue} ></textarea>
//               <hr/>
//               <div className="col-sm-12 d-flex justify-content-between">
//                 <button type="submit" className="btn btn-primary">Submit</button>
//                 <label className="btn btn-secondary mx-2">
//                   Upload Audio
//                   <input type="file" hidden accept=".wav,.audio" onChange={handleAudioUpload} />
//                 </label>
//                 <button type="button" className="btn btn-secondary">Record Audio</button>
//               </div>
//               {audioUrl && <audio controls src={audioUrl} />}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default TTS;


import axios from 'axios';
import React, { useState, useEffect } from 'react';

const TTS = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [filenameValue, setFilenameValue] = useState('');
  const [filenames, setFilenames] = useState([]);

  useEffect(() => {
    const fetchFilenames = async () => {
      try {
        const email = localStorage.getItem('name');
        const response = await axios.get(`http://localhost:4000/${email}/filenames`);
        setFilenames(response.data.filenames);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFilenames();
  }, []);

  const handleAudioUpload = async (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const response = await fetch(url);
    const blob = await response.blob();
    console.log(blob);
    const formData = new FormData();
    const time = new Date().getTime();

          // const filename = `${voicename}.wav`;
          //send to db
          const blobb = new Blob([blob], { type: 'audio/wav' });
    // formData.append('audio', blob,filename);
    alert(formData);
    try {
      // const res = await axios.post('http://localhost:5000/addVoice?id=${email,filename}?', formData);
      // alert(res.data); // Do something with the response
      alert('Hi');
    } catch (error) {
      console.error(error);
      alert(error);
      alert('error');
    }
    setAudioUrl(url);
  };

  const handleGenerateAudio = async (event) => {
    alert("Hi");
    // const file = event.target.files[0];
    // const url = URL.createObjectURL(file);
    // const response = await fetch(url);
    // const blob = await response.blob();
    // console.log(blob);
    // const formData = new FormData();
    // const time = new Date().getTime();

          // const filename = `${voicename}.wav`;
          //send to db
          // const blobb = new Blob([blob], { type: 'audio/wav' });
    // formData.append('audio', blob,filename);
    // alert(formData);
    try {
      alert("Hello");
       const res = await axios.post('http://localhost:5000/?text=لاہور(ڈیلی پاکستان آن لائن) لاہور الیکٹرک سپلائی کمپنی نے زمان پارک انتظامیہ کو نوٹس جاری کیا گیا ہے&speaker=VCTK_old_20I-0407@nu.edu.pk');
       alert(res.data); // Do something with the response
      alert('Hi');
    } catch (error) {
      console.error(error);
      alert(error);
      alert('error');
    }
    // setAudioUrl(url);
  };




  const handleFilenameChange = (event) => {
    setFilenameValue(event.target.value);
  };

  return (
    <div>
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-6 mt-5">
            <img src="/assets/t2.jpg" alt="Contact" className="w-75" />
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">Turn Your Text To Speech</h1>
            <div className="mb-3 row">
              <textarea></textarea>
              <hr />
              <select className="form-select" style={{ width: '30%', height: '40px' }} value={filenameValue} onChange={handleFilenameChange}>
                <option value="">Select a filename</option>
                {filenames.map((filename, index) => (
                  <option key={index} value={filename}>
                    {filename}
                  </option>
                ))}
              </select>
              //textbox for voice name
              <hr />
              <div className="col-sm-12 d-flex justify-content-between">
                <button type="submit" className="btn btn-primary" onClick={handleGenerateAudio} >
                  Submit
                </button>
                <label className="btn btn-secondary mx-2">
                  Upload Audio
                  <input type="file" hidden accept=".wav,.audio" onChange={handleAudioUpload} />
                </label>
                <button type="button" className="btn btn-secondary">
                  Record Audio
                </button>
              </div>
              {audioUrl && <audio controls src={audioUrl} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TTS;
