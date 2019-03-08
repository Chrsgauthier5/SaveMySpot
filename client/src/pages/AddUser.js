import React, { Component } from 'react'

// stateful container
class AddUser extends Component {
    state = {
        username: null,
        useremail: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // below is passing the new object back to the parent
        this.props.addUserFn(this.state)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">User Name:</label>
                    <input type="text" id="username" onChange={this.handleChange} /><br/>

                    <label htmlFor="name">User Email:</label>
                    <input type="text" id="useremail" onChange={this.handleChange} /><br/>

                    <button>Add</button> 
                    <hr/>

                </form>
            </div>
        )
    }
}

export default AddUser