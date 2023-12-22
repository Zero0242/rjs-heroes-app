import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { userLogin } = useContext(AuthContext);

  const onLogin = () => {
    userLogin("Pepino");
    navigate("/", { replace: true });
  };

  return (
    <div className='container mt-1'>
      <h1>LoginPage</h1>
      <hr />
      <button className='btn btn-primary' onClick={onLogin}>
        Login
      </button>
    </div>
  );
};
