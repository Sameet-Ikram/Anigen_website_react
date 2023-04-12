// import React from "react";
// import {Unity ,useUnityContext } from "react-unity-webgl";
// //import { UnityInstance } from "react-unity-webgl/typings/unity-instance";
// import { Fragment } from "react";
// import './WebGL.css'
//
//
//
// const WebGL=() => {
//
//   const { unityProvider , sendMessage , unload} = useUnityContext({
//     loaderUrl: "/build/WebGLBuilds.loader.js",
//     dataUrl: "/build/WebGLBuilds.data.unityweb",
//     frameworkUrl: "/build/WebGLBuilds.framework.js.unityweb",
//     codeUrl: "/build/WebGLBuilds.wasm.unityweb",
//   });
//
//
//  function GetUrl(){
//   sendMessage("Runtime Example","setString","https://api.readyplayer.me/v1/avatars/632d65e99b4c6a4352a9b8db.glb");
//   console.log("Hello World");
//
// }
//
//
// async function handleClickBack() {
//   await unload();
//   // Ready to navigate to another page.
// }
//
//
//   return (
//     <Fragment>
//
//     <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
//
//     <button className="spawn-button" onClick={GetUrl()}>Spawn Enemies</button>
//     <button className="back-button" onClick={handleClickBack}>Back</button>
//
//     </Fragment>
//   );
//
//
//
// //   const  unityProvider  = useUnityContext({
// //     loaderUrl: "/build/lightcheck.loader.js",
// //     dataUrl: "/build/lightcheck.data",
// //     frameworkUrl: "/build/lightcheck.framework.js",
// //     codeUrl: "/build/lightcheck.wasm",
// //   });
//
// //   //return <Unity unityProvider={unityProvider} />;
// //   return(
//
// //     <div>
// //       <Unity
// //       style={{
// //         width: "80%",
// //         justifySelf:"center",
// //         alignSelf:"center"
// //       }}
// //       UnityContext={unityProvider}
// //       />
// //     </div>
// // //   <Fragment>
// // //   {!isLoaded && (
// // //     <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
// // //   )}
// // //   <Unity
// // //     unityProvider={unityProvider}
// // //     style={{ visibility: isLoaded ? "visible" : "hidden" }}
// // //   />
// // // </Fragment>
// //   )
// }
//
// export default WebGL



import React, { startTransition, useEffect } from "react";
import {Unity ,useUnityContext } from "react-unity-webgl";
//import { UnityInstance } from "react-unity-webgl/typings/unity-instance";
import { Fragment } from "react";
import { useState } from "react";




const WebGL=() => {

  var [recorder, setRecorder] = useState(null);
  var [data, setData] = useState([]);

  const { unityProvider , sendMessage , unload, loadingProgression, isLoaded} = useUnityContext({
    loaderUrl: "/build/WebGLBuilds.loader.js",
    dataUrl: "/build/WebGLBuilds.data.unityweb",
    frameworkUrl: "/build/WebGLBuilds.framework.js.unityweb",
    codeUrl: "/build/WebGLBuilds.wasm.unityweb",
  });


 function GetUrl(){
  sendMessage("Runtime Example","setString","https://api.readyplayer.me/v1/avatars/632d65e99b4c6a4352a9b8db.glb");
}

  async function testrecord(){
    console.log("Hello World");
    const canvas = document.querySelector("canvas");
    const stream = canvas.captureStream(60);
    const newrecorder = new MediaRecorder(stream);
    newrecorder.ondataavailable = async (event) => {
      data.push(event.data);
    };
    newrecorder.start();
    console.log("recording started");
    setRecorder(newrecorder);
  }

  async function stopRecording() {
    recorder.stop();
    const blob = new Blob(data, { type: "video/mp4" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.mp4";
    a.click();
    console.log("recording stopped");
  }

async function handleClickBack() {

  await unload();
  // Ready to navigate to another page.
}


  return (
    <Fragment>
     {!isLoaded && (
        <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
      )}
    <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 ,visibility: isLoaded ? "visible" : "hidden"}} />

    <button onClick={GetUrl()}>Spawn Enemies</button>
    <button onClick={handleClickBack}>Back</button>
    <button onClick={testrecord}>Record</button>
    <button onClick={stopRecording}>Stop</button>
    </Fragment>
  );

}

export default WebGL
