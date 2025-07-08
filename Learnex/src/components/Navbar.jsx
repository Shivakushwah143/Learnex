// import { Button, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [Email, setUserEmail] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("http://localhost:8080/admin/me", {
//           method: "GET",
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         });

//         const data = await res.json();
//         console.log(data);
//         if (data.userName) {
//           setUserEmail(data.userName);
//         }

//         console.log(Email);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUserEmail(null);
//     navigate("/login");
//   };

//   return (
//     <div className="flex justify-between mt-5 p-4 bg-red-300">
//       <div>
//         <Typography variant="h4">Learnex</Typography>
//       </div>

//       <div className="flex items-center">
//         {Email ? (
//           <>
//             <Typography className="mr-3">{Email}</Typography>
//             <Button onClick={handleLogout} variant="contained">
//               Logout
//             </Button>
//             <Button
//               onClick={() => navigate("/cources")}
//               variant="contained"
//               className="mr-2"
//             >
//               Courses
//             </Button>
//           </>
//         ) : (
//           <>
//             <div className="mr-3">
//               <Button onClick={() => navigate("/signup")} variant="contained">
//                 Signup
//               </Button>
//             </div>
//             <div>
//               <Button onClick={() => navigate("/login")} variant="contained">
//                 Sign In
//               </Button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();


  return (
    <div className="flex justify-between mt-5 p-4 bg-red-300">
      <div>
        <Typography variant="h4">Learnex</Typography>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Typography className="mr-3 p-2 rounded-full bg-red-500">{user}</Typography>
            <Button onClick={logout} variant="contained">
              Logout
            </Button>
            <Button
              onClick={() => navigate("/cources")}
              variant="contained"
              className="mr-2"
            >
              Courses
            </Button>
          </>
        ) : (
          <>
            <div className="mr-3">
              <Button onClick={() => navigate("/signup")} variant="contained">
                Signup
              </Button>
            </div>
            <div>
              <Button onClick={() => navigate("/login")} variant="contained">
                Sign In
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;