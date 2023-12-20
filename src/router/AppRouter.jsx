import { Navigate, Route, Routes } from "react-router-dom";
import { DCPage, MarvelPage } from "../heroes/pages";
import { LoginPage } from "../auth/pages";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/marvel' element={<MarvelPage />} />
      <Route path='/dc' element={<DCPage />} />
      <Route path='/' element={<Navigate to={"/login"} />} />
    </Routes>
  );
};
