import React, { useEffect, useState } from "react";
import CardHeader from "../postCard/CardHeader";
import CardBody from "../postCard/CardBody";
import CommentCard from "./CommentCard";
import InputComment from "./InputComment";
import Avatar from "../../Avatar";

const CommentModal = ({ setOpen, post }) => {
  const [replyComment, setReplyComment] = useState([]);

  useEffect(() => {
    const newRep = post.comments.filter((cm) => cm.reply);
    setReplyComment(newRep);
  }, [post.comments]);

  return (
    <div className="post__modal" onClick={() => setOpen(false)}>
      <div className="post__modal__box" onClick={(e) => e.stopPropagation()}>
        <CardBody post={post} />
        <div className="post__modal__comments">
          <CardHeader post={post} />
          <div className="card__header">
            <div className="card__header__content d-flex">
              <Avatar
                src={post.user.avatar}
                size="middle__avatar"
                border={true}
              />
              <p><span>{post.user.username}</span> {post.content}</p>
            </div>
            
          </div>
          <div className="post__modal__comments__card">
            {post.comments
              .filter((cm) => !cm.reply)
              .map((comment) => (
                <CommentCard
                  key={comment._id}
                  commentId={comment._id}
                  comment={comment}
                  post={post}
                  displayLike={true}
                >
                  <div className="px-4">
                    {replyComment
                      .filter((item) => item.reply === comment._id)
                      .map((item) => (
                        <CommentCard
                          key={item._id}
                          comment={item}
                          post={post}
                          commentId={comment._id}
                          displayLike={true}
                        />
                      ))}
                  </div>
                </CommentCard>
              ))}
          </div>
          <InputComment post={post} />
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
