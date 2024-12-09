import { useState } from "react"

const useForm =  (initialForm) => {
    console.log(initialForm)
    const [formState, setFormState] = useState(initialForm)
    

    const handleChange = (evento) => {
        evento.target// que es? Es el elemento HTML que emitio el evento
        evento.target.value//Que es? El valor del elemento HTML (el input)
        
        const field_name = evento.target.name
        const field_value = evento.target.value


        //La funcion setter de mi estado me permite modificar mi estado y re renderizar mi componente
        //Opcionalmente yo le puedo pasar una callback, la misma sera invocada y el valor de retorno de la callback sera el nuevo valor de mi estado
        //El parametro de la callback es el prevState o el estado previo de ese estado (osea el valor actual)
        setFormState((prevFormState) => {
            return {...prevFormState, [field_name]: field_value}
        })
        
    }

    const handleChangeImage = (evento, field_name) => {
        const FILE_MB_LIMIT = 2
        //Llamo a la primera imagen cargada en este input
        const file = evento.target.files[0]
        if(file && file.size > FILE_MB_LIMIT * 1024 * 1024) {
            alert('El archivo es muy pesado')
        }


        const reader = new FileReader()

        //Primero cargo el evento
        //es un evento que se va activar cuando se termine de cargar el archivo
        reader.onloadend = () => {
            const image_base64 = reader.result
            setFormState(
                (prevFormState) => {
                    return {...prevFormState, [field_name]: image_base64}
                }
            ) 
        }

        if(file) {
            //Read as data URL lee el archivo y transforma a base64
            reader.readAsDataURL(file)
        }


    }

    //logica de formulario y estados
    return {
        formState,
        handleChange,
        handleChangeImage
    }
}

export default useForm