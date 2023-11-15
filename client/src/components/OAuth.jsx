import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import {useNavigate} from 'react-router-dom'
const OAuth = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await axios.post(
        "http://localhost:3000/api/auth/google",
        {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check the response from the server if needed
      console.log("Response from server:", res.data);
      navigate('/')
      dispatch(signInSuccess(res.data));
      
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <button
        onClick={handleGoogleClick}
        type="button"
        className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-80"
      >
        Continue with google
      </button>
    </>
  );
};

export default OAuth;
