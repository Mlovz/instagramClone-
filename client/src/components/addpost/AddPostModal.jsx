import React, { useState, useEffect } from "react";
import StartContent from "./StartContent";
import ImageContent from "./ImageContent";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import SuccesPost from "./SuccesPost";

const stepsComponents = {
  0: StartContent,
  1: ImageContent,
  2: SuccesPost,
};

const AddPostModal = ({ setAddPost, addPost }) => {
  const [step, setStep] = useState(0);
  const [images, setImages] = useState([]);
  const Step = stepsComponents[step];
  const { homePosts } = useSelector((state) => state);

  const handleImage = (e) => {
    const files = [...e.target.files];
    setImages([...images, ...files]);

    if (files.length > 0) {
      setStep((next) => next + 1);
    }
  };


  useEffect(() => {
    if (!homePosts.loading) {
      setStep(2);
    }
  }, [homePosts.loading]);

  useEffect(() => {
    setStep(0);
  }, [addPost]);

  return (
    <div className="addpost__modal" onClick={() => setAddPost(false)}>
      <motion.div
        initial={{ y: "-80px" }}
        animate={{ y: "0px" }}
        exit={{ y: "-80px" }}
        style={{ maxWidth: step === 1 && "900px" }}
        className={`addpost__modal__box ${step === 1 && "active"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="addpost__modal__header">
          <h3>
            {step === 2 ? "Вы поделились публикацией" : "Создание публикации"}
          </h3>
        </div>

        <Step images={images} handleImage={handleImage} />
      </motion.div>
      <div onClick={() => setAddPost(false)} className="addpost__modal__close">
        <i className="fal fa-times"></i>
      </div>
    </div>
  );
};

export default AddPostModal;
