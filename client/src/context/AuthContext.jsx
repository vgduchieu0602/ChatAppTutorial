import { createContext, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { postRequest } from '../utils/services'
import { baseUrl } from '../utils/services'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)  //khởi tạo state User với giá trị khởi tạo là null
    const [registerError, setRegisterError] = useState(null)    //Khởi tạo state Error của register với giá trị khởi tạo là null
    const [isRegisterLoading, setIsRegisterLoading] = useState(null)    //Khởi tạo state trạng thái xử lý của Register với giá trị khởi tạo là null
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    console.log("User:", user)

    //Sau khi đăng ký xong lưu dữ liệu của User đã đăng ký vào localStorage
    //và lấy dữ liệu User từ storage ra trong lần đầu tải trang
    useEffect(() => {
        //Lấy dữ liệu User vừa đăng ký từ localStorage
        const user = localStorage.getItem('User')

        //localStorage sẽ trả về giá trị là 1 JSON nên phải dùng hàm parse để chuyển nó về Object và lưu vào state User
        setUser(JSON.parse(user))
    }, [])

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])

    const registerUser = useCallback(async (e) => {
        //ngăn hành động tải lại trang khi thực hiện đăng ký
        e.preventDefault()

        //cần thời gian để xử lý 
        setIsRegisterLoading(true)
        //set cho lỗi gây ra của phần đăng ký là chưa có
        setRegisterError(null)
        
        const response = await postRequest(`${baseUrl}/auth/register`, JSON.stringify(registerInfo))

        //kết thúc quá trình xử lý
        setIsRegisterLoading(false)

        //nếu response trả về lỗi thì set lỗi vào state Error
        if(response.error) {
            return setRegisterError(response)
        }

        //lưu trữ dữ liệu vào localstorage
        localStorage.setItem('User', JSON.stringify(response))

        //set response vào state User
        setUser(response)
    }, [registerInfo])

    const logoutUser = useCallback(async () => {
        //xóa dữ liệu User trong localStorage
        localStorage.removeItem('User')
        //set state User về null
        setUser(null)
    }, [])

    return (
        <AuthContext.Provider 
            value={{
                user, 
                registerInfo, 
                updateRegisterInfo, 
                registerUser,
                registerError,
                isRegisterLoading,
                logoutUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}
