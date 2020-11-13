import axios from 'axios';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/reducer'

class Auth extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            newUser: false
        }
    }

    toggleNewUser = () => {
        this.setState({
            newUser: !this.state.newUser
        })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = async (e) => {
        e.preventDefault();
        const {username, password} = this.state
        try {
            const user = await axios.post('/auth/login', {username, password})
            this.props.loginUser(user.data)
						this.props.history.push('/dashboard')
        } 
        catch(err){ 
                alert(err.response.request.response)
        }
    }

    register = async (e) => {
        e.preventDefault();
        const {username, password} = this.state
        try {
            const user = await axios.post('/auth/register', {username, password})
            this.props.loginUser(user.data)
            this.props.history.push('/dashboard')
        } 
        catch(err){ 
                alert(err.response.request.response)
        }
    }

    render(){
        const {username, password} = this.state;
        return(<div>
            {this.state.newUser ? 
            <div>
                <h3>Register</h3>
                <form onSubmit={e => this.register(e)}>
                    <input 
												name="username" 
												type="username"
                        value={username} 
                        placeholder="Username" 
                        onChange={ e => this.changeHandler(e)}
                    />
                    <input 
                        name="password" 
                        type="password"
                        value={password} 
                        placeholder="Password" 
                        onChange={ e => this.changeHandler(e)}
                    />
                    <button>Submit</button>
                </form>
            </div>
            :
            <div>
                <h3>Login</h3>
                <form onSubmit={e => this.login(e)}>
                    <input 
                        name="username" 
                        value={username} 
                        placeholder="Username" 
                        onChange={ e => this.changeHandler(e)}
                    />
                    <input 
                        name="password" 
                        type="password"
                        value={password} 
                        placeholder="Password" 
                        onChange={ e => this.changeHandler(e)}
                    />
                </form>
                    <button>Submit</button>
                <button onClick={this.toggleNewUser}>Register</button>
            </div>}
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {loginUser})(Auth)