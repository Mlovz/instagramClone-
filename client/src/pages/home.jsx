import React, { useEffect } from "react";
// import Storis from "../components/home/Storis";
import PostCard from "../components/home/postCard/PostCard";
import UserCard from "../components/UserCard";
import FollowBtn from "../components/FollowBtn";
import { Link } from "react-router-dom";
import { getSugges } from "../redux/actions/suggesAction";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch()
  const { auth, homePosts, sugges } = useSelector((state) => state);


  useEffect(() => {
    if(auth.token && !sugges.firstLoad){
      dispatch(getSugges(auth.token))
    }
  },[dispatch, auth.token, sugges.firstLoad])
  
  return (
    <div className="home">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <div className="home__content">
              {/* {auth.user.following.length > 6 && <Storis auth={auth} />} */}
              {!homePosts.get_load && homePosts.posts.length === 0 && <h2 className='text-center'>Постов нет</h2>}
              {homePosts.get_load ? (
                <div className="w-100 d-flex justify-content-center mt-3">
                  <div className="spinner-border" role="status"></div>
                </div>
              ) : (
                <div className="home__posts">
                  {homePosts.posts.map((post) => (
                    <div key={post._id}>
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="col-4">
            <div className="home__sugges">
              <div className="home__sugges__auth">
                <UserCard user={auth.user} ava="medium__avatar" />
              </div>
              
              <div className="home__sugges__title">
                <h5>Рекомендации для вас</h5>
                <Link to="/explore/people">Все</Link>
              </div>
              
              {
                sugges.loading
                ? <div className="w-100 d-flex justify-content-center mt-3">
                <div className="spinner-border" role="status"></div>
              </div>
              :<div className="home__sugges__users">
                {
                  sugges.users.map((user) => (
                    <UserCard key={user._id} user={user}>
                      <FollowBtn user={user} bg="transparent" color="#0095F6" />
                    </UserCard>
                  ))}
                  </div>
                }
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
