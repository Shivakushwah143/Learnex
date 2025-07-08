
import Navbar from './components/Navbar'
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddCource from "./components/AddCource";
import Courses from "./components/Courses";
import UpdateCourse from "./pages/UpdateCourse";
import PurchasedCourses from "./components/PurchasedCourses";
import Footer from "./components/Footer";
import CourseItem from './pages/CourseItem';
import User from './components/User';
const App = () => {

  return <>
    <Navbar/>
 
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/cource" element={<AddCource/>}/>
      <Route path="/cources" element={<Courses/>}/>
      <Route path="/purchasedCourses" element={<PurchasedCourses/>}/>
      <Route path="/cource/:courseId" element={<UpdateCourse/>}/>
      <Route path="/user" element={<User/>}/>
    </Routes>
    <Footer/>
  </>;
};

export default App;
