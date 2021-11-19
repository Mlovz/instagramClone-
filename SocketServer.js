let users = []

const SocketServer = (socket) => {
    socket.on('joinUser', id => {
        users.push({id, socketId: socket.id})
    })
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id)
    })

    socket.on('likePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))
        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('likePostClient', newPost)
            })
        }
    })
    socket.on('unlikePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))
        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('unlikePostClient', newPost)
            })
        }
    })
    socket.on('createComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))
        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createCommentClient', newPost)
            })
        }
    })
    socket.on('follow', newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit('followClient', newUser)
    })

    socket.on('unfollow', newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit('unfollowClient', newUser)
    })

    socket.on('createNotify', newData => {
        const clients = users.filter(user => newData.recipients.includes(user.id))
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createNotifytClient', newData)
            })
        }
    })

    socket.on('removeNotify', msg => {
        const clients = users.filter(user => msg.recipients.includes(user.id))
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('removeNotifytClient', msg)
            })
        }
     })
    
}


module.exports = SocketServer