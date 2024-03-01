import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetUser, setUser, updateUser } from "../redux/slice/userSlice";

export const useControlUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const url = "https://invoicesdatabase.vercel.app/users";
  //Register User
  const registerUser = async () => {
    const { name, email, password, confirmPassword, address } = user;
    if (password === confirmPassword) {
      try {
        const res = await Axios.post(`${url}/register`, {
          name,
          email,
          password,
          address,
        });
        if (res.data === "Email already exists") {
          console.log(res.data);
        } else {
          navigate("/login");
          dispatch(resetUser());
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    } else {
      console.log("Passwords don't match");
    }
  };

  //Login User
  const loginUser = async () => {
    const { email, password } = user;
    try {
      const res = await Axios.post(`${url}/login`, {
        email,
        password,
      });
      const { token } = res.data;
      if (res.data === "Invalid credentials") {
        console.log(res.data);
      } else {
        localStorage.setItem("token", token);
        navigate("/");
        dispatch(resetUser());
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Logout User
  const logoutUser = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  //get User
  const getUser = () => {
    if (user.id === "") {
      const token = localStorage.getItem("token");
      if (token) {
        Axios.get(`${url}/get`, {
          headers: {
            Authorization: token, // Pass the token in the Authorization header
          },
        })
          .then((response) => {
            dispatch(setUser(response.data));
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            localStorage.removeItem("token");
          });
      }
    }
  };
  return { registerUser, loginUser, logoutUser, getUser };
};
