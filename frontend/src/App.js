import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import RoleSelectionPage from './components/RoleSlectionPage';
import DashboardPage from "./components/DashboardPage";
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import UserProfileForm from './components/UserProfileForm';
import ExplorePage from './components/ExplorePage';
import UploadContentPage from './components/UploadContentPage';
import Leaderboard from './components/Leaderboard';
import ChallengePage from './components/ChallengePage';
import AddFriendsPage from './components/AddFriendsPage';
import AdminSignIn from './components/AdminSignin';
import AdminDashboard from './components/AdminDashboard';
import AddCategory from "./components/AddCategory"
import Category from './components/Category';
import FetchCategory from './components/FetchCategory';
import Post from './components/Post';
import AddPostAdmin from "./components/AddPostAdmin"
import User from "./components/AdminUser"
import Aipage from "./components/AiPage"
import AdminChallengePage from "./components/AdminChallengePage"
import AdminAddChallenge from "./components/AdminAddChallenge"
import AdminGetChallenge from "./components/AdminGetChallenge"
import AdminGetPost from "./components/AdminGetPost";
import Photos from "./components/FetchPhoto"
import Videos from './components/FetchVideo';
import Events from './components/FetchEvent';
import AdminLeaderBoard from "./components/AdminLeaderboard"
import SettingPage from "./components/SettingPage"
import GoogleSignIn from "./components/GoogleSignIn";
import ForgotPassword from './components/ForgotPassword';
import AdminProtectedRoute from "./components/AdminProtectedRoute";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
         <Route path="/select-role" element={<RoleSelectionPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
        <Route path="/admin-dashboard/category" element={<Category />} />
        <Route path="/admin-dashboard/post" element={<AdminProtectedRoute><Post /></AdminProtectedRoute>} />
        <Route path ="/admin/add-post" element={<AdminProtectedRoute><AddPostAdmin/></AdminProtectedRoute>} />   
        <Route path="/admin-dashboard/user" element={<AdminProtectedRoute><User /></AdminProtectedRoute>} />
        <Route path ="/admin-dashboard/category/add" element={<AdminProtectedRoute><AddCategory/></AdminProtectedRoute>} />   
        <Route path ="/admin-dashboard/category/fetch" element={<AdminProtectedRoute><FetchCategory/></AdminProtectedRoute>} />   
         <Route path="/admin-login" element={<AdminSignIn />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/profile" element={<UserProfileForm />} />      
        <Route path="/explore" element={<ExplorePage />} />      
        <Route path="/upload-content" element={<UploadContentPage />} />      
        <Route path="/leaderboard" element={<Leaderboard />} />      
        <Route path="/challenge" element={<ChallengePage />} />      
        <Route path="/add-friends" element={<AddFriendsPage />} /> 
        <Route path="/ask-ai" element={<Aipage />} />    
        <Route path="/admin-dashboard/challenge" element={<AdminProtectedRoute><AdminChallengePage /></AdminProtectedRoute>} />    
        <Route path="/admin-dashboard/challenge/create" element={<AdminProtectedRoute><AdminAddChallenge /></AdminProtectedRoute>} />                
        <Route path="/admin-dashboard/challenge/fetch" element={<AdminProtectedRoute><AdminGetChallenge /></AdminProtectedRoute>} />    
        <Route path="/admin/fetch-posts" element={<AdminGetPost />} />    
        <Route path="/photos" element={<Photos />} />    
        <Route path="/videos" element={<Videos />} />    
        <Route path="/events" element={<Events />} />    
        <Route path="/admin-dashboard/leaderboard" element={<AdminProtectedRoute><AdminLeaderBoard /></AdminProtectedRoute>} />    
        <Route path="/history" element={<SettingPage />} />    
        <Route path="/google-signin" element={<GoogleSignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />



      </Routes>
 
  );
}

export default App;
