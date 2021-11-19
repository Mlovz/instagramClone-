import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import UserCard from "../UserCard";
import MessageDisplay from "./MessageDisplay";
import Smile from "../Smile";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import {motion} from 'framer-motion'


const RighteSidebar = () => {
  const dispatch = useDispatch();
  const { auth, message } = useSelector((state) => state);
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [smile, setSmile] = useState(false);
  const [media, setMedia] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const newUser = message.users.find((user) => user._id === id);
    if (newUser) {
      setUser(newUser);
    }
  }, [message.users, id]);

  const handleChange = (e) => {
    const files = [...e.target.files];
    let newMedia = [];
    let err = "";

    if (files.length > 4)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Максимум 4 фото!" },
      });

    files.forEach((file) => {
      if (!file) return (err = "Вы не выбрали файла!");

      if (file.size > 1024 * 1024 * 10)
        // 1mb
        return (err = "Объем файла больше чем 10mb!");

      newMedia.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });

    setMedia([...media, ...newMedia]);
  };

  const handleDelete = (index) => {
      const newMedia = [...media]
      newMedia.splice(index, 1)
      setMedia(newMedia)
  }
  

  return (
    <div className="right">
      <div className="right__header">
        <UserCard user={user} />
      </div>

      <div className="right__wrap">
        <div className="right__chat">
          <div className="right__chat__display user__message">
            <MessageDisplay user={user} />
          </div>
          <div className="right__chat__display auth__message">
            <MessageDisplay user={auth.user} />
          </div>
        </div>

        {media.length > 0 && (
          <motion.div 
          initial={{y: '110px'}}
          animate={{y: '0'}}
          exit={{y: '110px'}}
          transition={{
              duration: .5
          }}
          className="show__images">
            {media.map((img, index) => (
              <div key={index}>
                <img src={URL.createObjectURL(img)} alt="" />
                <i onClick={() => handleDelete(index)} className="fal fa-times"></i>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <form>
        <i onClick={() => setSmile(!smile)} className="fal fa-smile"></i>
        <input
          type="text"
          value={text}
          placeholder="Отправить сообщение..."
          onChange={(e) => setText(e.target.value)}
        />
        <div className='file__upload'>
          <i class="fal fa-image"></i>
          <input
            type="file"
            accept="image/*, video/*"
            multiple
            onChange={handleChange}
          />
        </div>
        <button>
          <i class="fal fa-paper-plane"></i>
        </button>

        {smile && <Smile change={setText} content={text} />}
      </form>
    </div>
  );
};

export default RighteSidebar;
