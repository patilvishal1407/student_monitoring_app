import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import Analytics from "./components/Analytics";
import Layout from "./components/layout/Layout";

function ProtectedRoute({ children }) {
  const { token } = React.useContext(AuthContext);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected routes inside Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="students" element={<StudentList />} />
            <Route path="students/new" element={<StudentForm />} />
            <Route path="students/:id" element={<StudentForm />} />
            <Route path="analytics" element={<Analytics />} />
            <Route index element={<Navigate to="students" replace />} />
          </Route>

          <Route path="*" element={<div style={{ padding: 24 }}>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
