import React from "react";
import { useSelector } from "react-redux";
import FollowBtn from "../FollowBtn";
import UserCard from "../UserCard";

const GlobalModal = ({ title, data, setState, onUser }) => {
  const {auth} = useSelector(state => state)
  
  return (
    <div className="global__modal" onClick={() => setState(false)}>
      <div className="global__modal__box" onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="global__modal__header">
            <div>
                <h3>{title}</h3>
                <i onClick={() => setState(false)} className="fal fa-times"></i>
            </div>
          </div>
        )}
        <div className="global__modal__body">
          {data.map((user) => (
                onUser ? <UserCard key={user._id} user={user}>
                  {
                    auth.user._id !== user._id && <FollowBtn user={user} />
                  }
              </UserCard>
              :
              <div>
                  
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;
