import React from 'react'

const TTS = () => {
  return (
    <div>
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-6 mt-5">
            <img src="/assets/t2.jpg" alt="Contact" className="w-75"/>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">Turn Your Text To Speech</h1>
            <div class="mb-3 row">
              <textarea></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TTS;
