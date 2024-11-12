import { Routes, Route, Navigate } from "react-router-dom"
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import "bootstrap/dist/css/bootstrap.min.css"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
// import { Container } from 'react-bootstrap'
// import Navbar from './components/Navbar'

function App() {
  const { user } = useContext(AuthContext)

  return (
    <>
      {/* <Navbar /> */}
      {/* <Container className="text-secondary"> */}
        <Routes>
          <Route path="/" element={user ? <Chat /> : <Login />} /> {/* Nếu có dữ liệu user thì trả về gdChat không thì trả về gdLogin */}
          <Route path="/register" element={user ? <Chat /> : <Register />} /> {/* Nếu có dữ liệu user thì trả về gdChat không thì trả về gdRegister */}
          <Route path="/login" element={user ? <Chat /> : <Login />} /> {/* Nếu có dữ liệu user thì trả về gdChat không thì trả về gdLogin */}
          <Route path="*" element={<Navigate to="/" />} />  {/* các đường dẫn khác sẽ đến lại trang chủ */}
        </Routes>
      {/* </Container> */}
    </>
  )
}

export default App
