import {  createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Es un component
export const AuthContext = createContext()

//Necesitamos crear el componente proveedor

export const AuthProvider = ({children}) =>{
    //children es una prop para pasar el contenido hijo de nuestro componente

    //Si hay token en el session o localstorage entonces esta authentificado

    const navigate = useNavigate()
    const [is_authenticated_state, setIsAuthenticatedState] = useState(Boolean(sessionStorage.getItem('access_token')))
    useEffect(
        () =>{
            Boolean(sessionStorage.getItem('access_token')) && setIsAuthenticatedState(true)
        },
        []
    )

    const login = (auth_token) => {
        sessionStorage.setItem('access_token', auth_token)
        setIsAuthenticatedState(true)
        navigate('/home')
    }

    const logout = () => {
        sessionStorage.removeItem('access_token')
        setIsAuthenticatedState(false)
        navigate('/login')
    }
    return (
        <AuthContext.Provider 
            value={
                {
                    is_authenticated_state,
                    login,
                    logout
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}