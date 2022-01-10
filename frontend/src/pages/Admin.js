import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import { Grid, GridItem, Text, Container, Button } from '@chakra-ui/react'

const Admin = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await fetch('http://localhost:5000/admin', {
      credentials: "include"
    })

    const data = await response.json()

    if (data.error) {
      navigate('/login')
    } else {
      setUsers(data)
    }
  }

  const handleLogoutClick = () => {
    fetch('http://localhost:5000/auth/logout', {
      method: 'delete',
      credentials: 'include'
    })
      .then(response => {
        navigate('/login')
      })
  }

  return (
    <Container>
      <Text as="h1" fontWeight={800} fontSize={'54px'} pb={5}>Admin</Text>
      <Grid templateColumns='repeat(2, 1fr)' gap={5}>
        {users.map(user => (
          <GridItem key={user.username} p={3} border='1px' borderColor='gray.400' borderRadius={5}>
            <Link to={`/users/${user.id}`}>
              <img src={user.profilePicture} />
              <Text as='h2' fontSize={30} fontWeight={500}>{user.username}</Text>
              <Text as='p'>{user.email}</Text>
              <Text as='p'>{user.age}</Text>
            </Link>
          </GridItem>
        ))}
      </Grid>

      <Button
        mt={5}
        bg='salmon'
        color='white'
        onClick={handleLogoutClick}
      >
        Logout
      </Button>
    </Container>
  )
}

export default Admin