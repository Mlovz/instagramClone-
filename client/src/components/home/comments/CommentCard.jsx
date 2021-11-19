import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../Avatar";
import IsLikeBtn from "../../IsLikeBtn";

import moment from "moment";
import "moment/locale/ru";
import InputComment from "./InputComment";
import { useDispatch, useSelector } from "react-redux";
import { likeComment, unlikeComment } from "../../../redux/actions/commentAction";

const CommentCard = ({
  comment,
  children,
  post,
  commentId,
  displayLike,
}) => {
  const [isLike, setIslike] = useState(false);
  const dispatch = useDispatch()
  const {auth} = useSelector(state => state)
  const [onReply, setOnReply] = useState(false)

  const handleLike = () => {
    setIslike(true);
    dispatch(likeComment({comment, post, auth}))
  };

  const handleUnLike = () => {
    setIslike(false);
    dispatch(unlikeComment({comment, post, auth}))
  };

  useEffect(() => {
    if(comment.likes.find(item => item._id === auth.user._id)){
        setIslike(true)
    }else{
        setIslike(false)
    }
  },[comment.likes,  auth.user._id])
  
  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };

  return (
    <div className="comment__card" style={styleCard}>
      <div className="comment__card__header">
        <Link to={`/profile/${comment.user._id}`}>
          <Avatar src={comment.user.avatar} size="small__avatar" />
        </Link>
        <p className="comment__card__content">
          <span>
              {comment.user.username}
            </span>
            {
                comment.tag && comment.tag._id !== comment.user._id &&
                <Link to={`/profile/${comment.tag._id}`} className="mr-1">
                    @{comment.tag.username}
                </Link>
            }
          {comment.content}
        </p>
        <div className="comment__card__like">
          <IsLikeBtn
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </div>
      </div>
      <div className="comment__card__footer">
        <strong className="comment__card__footer__date">
          {moment(comment.createdAt).fromNow()}
        </strong>
        <span className="comment__card__footer__likes">
          Нравится: {comment.likes.length}
        </span>
        {displayLike && (
          <span
            onClick={handleReply}
            className="comment__card__footer__likes comment__card__footer__reply"
          >
            {onReply ? "отмена" : "ответить"}
          </span>
        )}
      </div>

      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`}>
            @{onReply.user.username}
          </Link>
        </InputComment>
      )}

      {children}
    </div>
  );
};

export default CommentCard;
