import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const User = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [user, setUser] = useState(null)
  const [file, setFile] = useState(null)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${id}`, {
      credentials: "include"
    })
    
    const user = await response.json()

    if (user.error) {
      navigate('/login')
      return
    }

    setUser(user)
  }

  const handleFileChange = e => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const formdata = new FormData()
    formdata.append('profilePicture', file, file.name)

    await fetch(`http://localhost:5000/users/${id}`, {
      method: 'post',
      credentials: 'include',
      body: formdata
    })

    getUser()
  }

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <p>{user.age}</p>
      <img style={{ width: '300px' }} src={user.profilePicture} alt={user.name} />

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default User