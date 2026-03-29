import { Routes, Route } from "react-router-dom";

//Páginas públicas
import Home from "../pages/public/Home/Home";
import TerapeutaDetalhe from "../pages/public/TerapeutaDetalhe/TerapeutaDetalhe";

//Páginas admin
import Login from "../pages/admin/Login/Login";
import TerapeutasList from "../pages/admin/terapeutas/TerapeutasList";
import TerapeutaForm from "../pages/admin/terapeutas/TerapeutaForm";

//Rota de proteção
import AdminRoute from "./AdminRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/terapeutas/:id" element={<TerapeutaDetalhe />} />

      {/* Login de admin */}
      <Route path="/admin/login" element={<Login />} />

      {/* Rotas protegidas para admin */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route index element={<TerapeutasList />} />
        <Route path="terapeutas/novo" element={<TerapeutaForm />} />
        <Route path="terapeutas/editar/:id" element={<TerapeutaForm />} />
      </Route>

      {/* Rota não encontrada */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
