function getTokenFromUNPW(username, password) {

    const PostData = new FormData()
    PostData.append('username', username)
    PostData.append('password', password)

    axios.post('https://api.glowmarkt.com/v0-1/auth', PostData)
      .then(response => {
        return (response.data)
      })
}

export default {
    getTokenFromUNPW
}