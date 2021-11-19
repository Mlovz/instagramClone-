import React, { useEffect } from "react";
import CardBody from "../components/home/postCard/CardBody";
import CardHeader from "../components/home/postCard/CardHeader";
import CardFooter from "../components/home/postCard/CardFooter";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../redux/actions/postAction";
import { useParams } from "react-router-dom";
import CommentCard from "../components/home/comments/CommentCard";
import InputComment from "../components/home/comments/InputComment";
import { getProfilePost } from "../redux/actions/profileAction";
import PostThumb from "../components/PostThumb";
import Avatar from "../components/Avatar";

const Post = () => {
  const dispatch = useDispatch();
  const { auth, detail, profile } = useSelector((state) => state);
  const postId = detail.posts[0]?.user._id;

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost({ id, auth }));
    if (detail.result > 0) {
      dispatch(getProfilePost({ id: postId, auth }));
    }
  }, [dispatch, auth, id, postId, detail.result]);

  return (
    <div className="post">
      <div className="container">
        {detail.loading ? (
          <div className="w-100 d-flex justify-content-center mt-3">
            <div className="spinner-border" role="status"></div>
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-12">
                <div className="post__box">
                  {detail.posts.map((post) => (
                    <div key={post._id} className="post__card">
                      <CardBody post={post} />
                      <div className="post__card__detail">
                        <CardHeader post={post} />
                        <div className="card__header">
                          <div className="card__header__content d-flex">
                            <Avatar
                              src={post.user.avatar}
                              size="middle__avatar"
                              border={true}
                            />
                            <p>
                              <span>{post.user.username}</span> {post.content}
                            </p>
                          </div>
                        </div>
                        <div className="post__card__detail__body w-100">
                          {post.comments
                            .filter((cm) => !cm.reply)
                            .map((comment) => (
                              <div
                                key={comment._id}
                                style={{ padding: "0 5px 0 20px" }}
                              >
                                <CommentCard
                                  commentId={comment._id}
                                  comment={comment}
                                  post={post}
                                  displayLike={true}
                                >
                                  <div style={{ padding: "0 10px 0 20px" }}>
                                    {post.comments
                                      .filter((cm) => cm.reply)
                                      .filter(
                                        (item) => item.reply === comment._id
                                      )
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
                              </div>
                            ))}
                        </div>
                        <CardFooter post={post} />
                        <InputComment post={post} />
                      </div>
                      <div className='post__card__footer__window'>
                            <CardFooter post={post}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="post__user__posts">
                {profile?.user_posts?.filter((item) => item._id !== id)
                  .map((post) => (
                    <PostThumb key={post._id} post={post} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
