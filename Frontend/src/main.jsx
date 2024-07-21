import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import NotFound from './components/NotFound';
import Layout from './components/Layout';
import ContactUs from './components/ContactUs';
import Feedback from './components/Feedback';
import UserSignup from './components/User/UserSignup';
import ArtistSignup from './components/Artist/ArtistSignup';
import ArtistLogin from './components/Artist/ArtistLogin';
import ArtistLayout from './components/Artist/ArtistLayout';
import ArtistProfile from './components/Artist/ArtistProfile';
import UploadArtworks from './components/Artist/UploadArtworks';
import AdminLayout from './components/Admin/AdminLayout';
import Adminlogin from './components/Admin/AdminLogin';
import ContactDetails from './components/Admin/ContactDetails';
import FeedbackDetails from './components/Admin/FeedbackDetails';
import UploadEvents from './components/Admin/UploadEvents';
import Events from './components/Events';
import AboutUs from './components/AboutUs';
import AdminHome from './components/Admin/AdminHome';
import UserLogin from './components/User/UserLogin';
import UserLayout from './components/User/UserLayout';
import UserProfile from './components/User/UserProfile';
import ArtistsList from './components/User/ArtistsList';
import ArtistsArtwork from './components/User/ArtistsArtwork';
import ArtworkList from './components/User/ArtworkList';
import UploadEventsByArtist from './components/Artist/UploadEvents';
import Checkout from './components/User/Checkout';
import OrderPlacedPage from './components/User/OrderPlacedPage';
import Myorders from './components/User/Myorders';
import ArtistPurchases from './components/Artist/ArtistPurchases';
import SearchResultsPage from './components/SearchResultsPage';
import HomePage from './components/Home';
import RecentArtworks from './components/RecentArtwork';
import PopularArtists from './components/PopularArtists';





const router = createBrowserRouter(
  createRoutesFromElements(

    <>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<HomePage/>}/>
        <Route path="/searchResults" element={<SearchResultsPage />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/events' element={<Events />} />
        <Route path='/usersignup' element={<UserSignup />} />
        <Route path='/artistsignup' element={<ArtistSignup />} />
        <Route path='/artistlogin' element={<ArtistLogin />} />
        <Route path='/adminlogin' element={<Adminlogin />} />
        <Route path='/userlogin' element={<UserLogin />} />
        <Route path='/recentartwork' element={<RecentArtworks />} />
        <Route path='/popularartist' element={<PopularArtists />} />
      </Route>

      <Route path='/artist' element={<ArtistLayout />}>
        <Route path='/artist' element={<ArtistProfile />} />
        <Route path='/artist/uploadartworks' element={<UploadArtworks />} />
        <Route path='/artist/uploadevents' element={<UploadEventsByArtist />} />
        <Route path='/artist/purchasesartworks' element={<ArtistPurchases />} />
      </Route>

      <Route path='/admin' element={<AdminLayout />}>
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/admin/contactdetails' element={<ContactDetails />} />
        <Route path='/admin/feedbackdetails' element={<FeedbackDetails />} />
        <Route path='/admin/uploadevents' element={<UploadEvents />} />
      </Route>

      <Route path='/user' element={<UserLayout />}>
        <Route path='/user' element={<UserProfile />} />
        <Route path='/user/artistlist' element={<ArtistsList />} />
        <Route path='/user/ArtistsArtwork/:id' element={<ArtistsArtwork />} />
        <Route path='/user/artworks' element={<ArtworkList />} />
        <Route path='/user/checkout/:artworkId' element={<Checkout />} />
        <Route path='/user/OrderPlaced' element={<OrderPlacedPage />} />
        <Route path='/user/myorders' element={<Myorders />} />
      </Route>

      {/* 404 Route */}
      <Route path='*' element={<NotFound />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
