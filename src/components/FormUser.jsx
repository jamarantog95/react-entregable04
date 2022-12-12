import React from 'react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './styles/FormUser.css'

const FormUser = ({ createNewUser, updateInfo, updateUserById, setUpdateInfo, setCloseForm }) => {

    useEffect(() => {
        reset(updateInfo)
    }, [updateInfo])


    const { register, reset, handleSubmit, formState: { errors } } = useForm()


    const submit = data => {
        if (updateInfo) {
            // Actualizar 
            updateUserById(updateInfo.id, data)
            setUpdateInfo()
        } else {
            // Crear
            createNewUser(data)
        }

        setCloseForm(true)

        reset({
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            birthday: ""
        })
    }

    return (
        <form className='form' onSubmit={handleSubmit(submit)}>
            <div className="form_x" onClick={() => setCloseForm(true)}>X</div>
            <h2 className='form_title'>{updateInfo ? 'Update User' : 'Create User'}</h2>

            <div className='form_div'>
                <label className='form_label' htmlFor="email">Email</label>

                <input className='form_input' type="email" id="email" {...register("email",
                    {
                        required: "Debe ingresar un email", maxLength: 80,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Direccion de email invalida"
                        }
                    }
                )}
                    aria-invalid={errors.email ? "true" : "false"} />
                {errors.email && <p role="alert">{errors.email?.message}</p>}

            </div>

            <div className='form_div'>
                <label className='form_label' htmlFor="password">Password</label>
                <input className='form_input' type="password" id="password" {...register("password",
                    { required: "Debe ingresar una contraseña", maxLength: { value: 12, message: "La contraseña solo debe tener 12 caracteres" } }
                )} aria-invalid={errors.password ? "true" : "false"} />
                {errors.password && <p role="alert">{errors.password?.message}</p>}
            </div>

            <div className='form_div'>
                <label className='form_label' htmlFor="first_name">First Name</label>
                <input className='form_input' type="first_name" id="first_name" {...register("first_name",
                    {
                        required: "Debe ingresar un nombre",
                        maxLength: { value: 50, message: "Demasiados datos" },
                        pattern: { value: /^[a-zA-Z ]*$/, message: "Ingresar caracteres validos" },
                    }
                )}
                    aria-invalid={errors.first_name ? "true" : "false"} />
                {errors.first_name && <p role="alert">{errors.first_name?.message}</p>}
            </div>
            <div className='form_div'>
                <label className='form_label' htmlFor="last_name">Last Name</label>
                <input className='form_input' type="last_name" id="last_name" {...register("last_name",
                    {
                        required: "Debe ingresar los apellidos",
                        maxLength: { value: 50, message: "Demasiados datos" },
                        pattern: { value: /^[a-zA-Z ]*$/, message: "Ingresar caracteres validos" },
                    })}
                    aria-invalid={errors.last_name ? "true" : "false"} />
                {errors.last_name && <p role="alert">{errors.last_name?.message}</p>}
            </div>
            <div className='form_div'>
                <label className='form_label' htmlFor="birthday">Birthday</label>
                <input className='form_input' type="date" id="birthday" {...register("birthday", { required: "Coloca la fecha" })} aria-invalid={errors.last_name ? "true" : "false"} />
                {errors.birthday && <p role="alert">{errors.birthday?.message}</p>}
            </div>
            <button className='form_btn'>Submit</button>
        </form>
    )
}

export default FormUser