import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteNotify, isReadNotify } from "../../redux/actions/notifyAction";
import Avatar from "../Avatar";

const NotifyModal = ({ setNotifyModal }) => {
  const dispatch = useDispatch();
  const { auth, notify } = useSelector((state) => state);

  const handleIsRead = (notify) => {
    dispatch(isReadNotify({notify, auth}))
    setNotifyModal(false)
  }

  const handleDeleteNotify = () => {
    const newData = notify.data.filter(item => !item.isRead)
    if(newData.length === 0) return dispatch(deleteNotify(auth.token))
    
    if(window.confirm(`У вас ${newData.length} непросмотренных уведомлений. Удалить все?`)){
      return dispatch(deleteNotify(auth.token))
    }
    
  }
  
  return (
    <div className="notify__modal" onClick={() => setNotifyModal(false)}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className='d-flex align-items-center justify-content-between px-2'>
          <h6>Уведомления</h6>
          <span onClick={handleDeleteNotify}>Очистить</span>
        </div>
        <div className="notify__modal__list">
          {notify.data.map((noti) => (
            <div key={noti._id} className="notify__modal__item">
              <Link to={noti.url} className="d-flex align-items-center" onClick={() => handleIsRead(noti)}>
                {
                  !noti.isRead && <div className="notify__modal__item--read"></div>
                }
                <Avatar src={noti.user.avatar} size="middle__avatar" />
                <p>
                  <span>{noti.user.username}</span> {noti.text}
                </p>
              </Link>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default NotifyModal;
