import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Homepage from './components/Homepage';
import CreatePost from './components/CreatePost';
import PostDetails from './components/PostDetails';
import EditPost from './components/EditPost';
import ProfilePage from './components/ProfilePage';
import CreateSubreddit from './components/CreateSubreddit';
import SubredditPage from './components/SubredditPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar isLoaded = {loaded}/>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/' exact={true} >
          <Homepage/>
        </Route>
        <Route path='/posts/:postId' exact={true} >
          <PostDetails />
        </Route>
        <Route path='/subreddits/:subredditId' exact={true} >
          <SubredditPage />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/user/:userId' exact={true} >
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path='/submit' exact={true}>
          <CreatePost/>
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId/edit' exact={true} >
          <EditPost/>
        </ProtectedRoute>
        <ProtectedRoute path='/create-subreddit' exact={true} >
          <CreateSubreddit/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
