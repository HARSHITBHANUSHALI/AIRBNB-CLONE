import './App.css'
import {Route,Routes, useParams} from 'react-router-dom'
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import { useEffect, useState } from 'react';
import AccountPage from './pages/AccountPage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacesFromIndexPage from './pages/PlaceFromIndexPage';
import MyBookingsPage from './pages/MyBookingsPage';
import BookedPlace from './pages/BookedPlace';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials=true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/account' element={<AccountPage/>}/>
          <Route path='/account/places' element={<PlacesPage />}/>
          <Route path='/account/places/new' element={<PlacesFormPage />}/>
          <Route path='/account/places/:id' element={<PlacesFormPage />}/>
          <Route path='/place/:id' element={<PlacesFromIndexPage/>}/>
          <Route path='/account/bookings' element={<MyBookingsPage/>}/>
          <Route path='/account/bookings/:id' element={<BookedPlace/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
