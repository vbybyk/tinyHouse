import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Listings, Home, Host, Listing, User, NotFound} from './sections'; 
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import reportWebVitals from './reportWebVitals';
import './styles/index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache()
})

const App = () => {
  return(
    <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/host" element={<Host/>}/>
            <Route path="/listing/:id" element={<Listing/>}/>
            <Route path="/listings/:location" element={<Listings/>}/>
            <Route path="/user/:id" element={<User/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </Router>
  )
}

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
