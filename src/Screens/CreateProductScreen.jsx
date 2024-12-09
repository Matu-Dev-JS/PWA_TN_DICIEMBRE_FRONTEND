import React from 'react'
import useForm from '../Hooks/useForm'
import { getAuthenticatedHeaders } from '../utils/fetching'

const CreateProductScreen = () => {
    const { formState, handleChange, handleChangeImage} = useForm({
		title: '',
		price: '',
        stock: '',
        description: '',
        category: '',
        image_base64: ''
	})
    const handleSubmitNewProduct = async (event) => {
        event.preventDefault()
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/products', {
            method: 'POST',
            body: JSON.stringify({new_product: formState}),
            headers: getAuthenticatedHeaders()
        })
        const data = await response.json()
        console.log(data)
    }

  return (
    <div>
        <h1>Crear producto</h1>
        <form onSubmit={handleSubmitNewProduct}>
            <div>
                <label htmlFor='title'>Ingrese el titulo:</label>
                <input type="text" name="title" id="title" placeholder='Ingrese el titulo' onChange={handleChange}/>
            </div>
            <div>
                    <label htmlFor="price"> Ingrese el precio:</label>
                    <input type="text" name="price" id="price" placeholder='Ingrese el precio' onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="stock">Ingrese el stock:</label>
                <input type="text" name="stock" id="stock" placeholder='Ingrese el stock' onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="description">Ingrese la descripcion:</label>
                <input type="text" name="description" id="description" placeholder='Ingrese la descripcion' onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="category">Ingrese la categoria:</label>
                <input type="text" name="category" id="category" placeholder='Ingrese la categoria' onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="image">Seleccione una imagen:</label>
                {formState.image_base64 && <img src={formState.image_base64} alt="" width={200}/>}
                <input type='file' name="image_base64" id="image" onChange={(evento) => handleChangeImage(evento, 'image_base64')}/>
            </div>
            <button type="submit">Crear producto</button>
        </form>
    </div>
  )
}

export default CreateProductScreen