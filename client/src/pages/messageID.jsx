import React from "react";
import LeftSidebar from "../components/message/LeftSidebar";
import RighteSidebar from "../components/message/RighteSidebar";

const MessageID = () => {

  return (
    <div className="message">
          <div className="col-4 ">
            <LeftSidebar />
          </div>
          
          <div className='col-8'>
            <RighteSidebar/>
          </div>
          
          
          {/* <div className="col-8">
            <RighteSidebar />
          </div> */}
    </div>
  );
};

export default MessageID;
