import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {
  AppHeader, 
  Home, 
  Host, 
  Listing, 
  Listings,
  Login,
  Stripe,
  User,  
  NotFound} from './sections'; 
import {ApolloClient, InMemoryCache, ApolloProvider, useMutation} from "@apollo/client";
import { LOG_IN } from './lib/graphql/mutations';
import { LogIn as LogInData, LogInVariables } from './lib/graphql/mutations/LogIn/__generated__/LogIn';
import { AppHeaderSkeleton, ErrorBanner } from './lib/components';
import { Viewer } from './lib/types';
import { Layout, Affix, Spin } from 'antd';
import reportWebVitals from './reportWebVitals';
import './styles/index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache(),
  headers: {
    "X-CSRF-TOKEN": sessionStorage.getItem("token") || "",
}
});

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  
  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: data => {
      if (data && data.logIn) {
        setViewer(data.logIn);
        
        if (data.logIn.token) {
          sessionStorage.setItem("token", data.logIn.token);
        } else {
          sessionStorage.removeItem("token");
        }
      }
    }
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, []);

  if (!viewer.didRequest && !error) {

    return(
        <Layout className="app-skeleton">
              <AppHeaderSkeleton />
              <div className="app-skeleton__spin-section">
                <Spin size="large" tip="Launching Tinyhouse" />
              </div>
        </Layout>
    )
  }

  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We weren't able to verify if you were logged in. Please try again later!" />
  ) : null;
  
  return(
    <Router>
        <Layout id='app'>
          {logInErrorBannerElement}
          <Affix className='app__affix-header' offsetTop={0}>
            <AppHeader viewer={viewer} setViewer={setViewer}/>
          </Affix>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/host" element={<Host viewer={viewer}/>}/>
            <Route path="/listing/:id" element={<Listing viewer={viewer}/>}/>
            <Route path="/listings/:location" element={<Listings/>}/>
            <Route path="/listings/" element={<Listings/>}/>
            <Route path="/login" element={<Login setViewer={setViewer}/>}/>
            <Route path="/stripe" element={<Stripe viewer={viewer} setViewer={setViewer} />}/>
            <Route path="/user/:id" element={<User viewer={viewer} setViewer={setViewer}/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
        </Layout>
    </Router>
  )
};

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
