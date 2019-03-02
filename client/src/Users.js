import React from 'react';

// stateless function
const Users = ({users, deleteUserFn}) => {

// if method is used below
        const userList = users.map(user => {
            return (
            <div className="user" key={user.id}>
                {/* // below uses an anonymous function to control firing only onCLick */}
                <button onClick={() => {deleteUserFn(user.id)}}>Rmv</button>
                { " " + user.username } - { user.useremail }
            </div>
            )
        })
        return(
            <div className="user-list">
                {userList}
                <hr/>
            </div>
            )
}

export default Users