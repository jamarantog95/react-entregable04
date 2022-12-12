import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import FormUser from './components/FormUser'
import UserCard from './components/UserCard'
import useCrud from './components/hooks/useCrud'

function App() {

    const [closeForm, setCloseForm] = useState(true)

    const { users, getAllUsers, createNewUser, deleteUserById, updateUserById } = useCrud()

    const [updateInfo, setUpdateInfo] = useState()

    useEffect(() => {
        getAllUsers()
    }, [])


    return (
        <div className="App">
            <div className="container_appheader">
                <h1>Users</h1>
                <button onClick={() => setCloseForm(false)} className='App_btn'><i className="fa-solid fa-user-plus"></i> Open Form</button>
            </div>

            <div className={`form-container ${closeForm && 'close_form'}`}>
                <FormUser
                    createNewUser={createNewUser}
                    updateInfo={updateInfo}
                    updateUserById={updateUserById}
                    setUpdateInfo={setUpdateInfo}
                    setCloseForm={setCloseForm}
                />
            </div>

            <div className="user-container">
                {
                    users?.map(user => (
                        <UserCard
                            key={user.id}
                            user={user}
                            deleteUserById={deleteUserById}
                            setUpdateInfo={setUpdateInfo}
                            setCloseForm={setCloseForm}
                        />
                    ))
                }
            </div>
        </div >
    )
}

export default App
