import React, {  useState } from "react";
import ReactPlayer from "react-player";

const VideoSrc = ({ src, width, height }) => {
  const [isVolume, setIsVolume] = useState(0);
  const [isPlay, setIsPlay] = useState(false)
  const [seconds, setSeconds] = useState(0)

  
  
  
  return (
    <div className="video__show h-100" onClick={() => setIsPlay(!isPlay)}>
      <ReactPlayer
        url={src}
        width={width}
        height={height}
        playing={isPlay}
        volume={isVolume}
        
        onProgress={(progress) => setSeconds(progress)}
      />
      <div className="video__show__pos video__show__volume" onClick={e => e.stopPropagation()}>
          {
              isVolume === 1 
              ?<i onClick={() => setIsVolume(0)} className="far fa-volume-up"></i>
              :<i onClick={() => setIsVolume(1)}  className="fal fa-volume-slash"></i>
          }
        
      </div>

      <div className="video__show__pos video__show__play">
        {
            !isPlay && <i onClick={(e) => {
                setIsPlay(true)
                e.stopPropagation()
            }} className="fas fa-play"></i> 
        }
      </div>

      <div className="video__show__pos video__show__times">
        {
          `${Math.floor(seconds.playedSeconds)} / ${Math.floor(seconds.loadedSeconds)}s`
        }
      </div>
    </div>
  );
};

export default VideoSrc;
