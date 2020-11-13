import React, {Component} from 'react'
import {logout} from '../../redux/reducer';
import axios from 'axios'
class Dashboard extends Component {
  constructor(){
    super()
    this.state = {
      posts: [{title: 'Mark Wahlberg', username: "Bergmister", profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-1SsN5bmc-kAfNiflhBzIQt9Wy717Y8C5RA&usqp=CAU'}],
    }
  }
	

  handleSearch = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheck = () => {
    this.setState({
      searchMyPosts: !this.state.searchMyPosts
    })
	}
	
	logout = () => {
		axios.post('/auth/logout')
		this.props.logoutUser();
	}

  render(){
    let mappedPosts = this.state.posts.map((element, index) => {
      return(
        <div key={index}>
          <h4>{element.title}</h4>
          <h4>{element.username}</h4>
          <img src={element.profilePicture} alt=''/>
        </div>
      )
    })

    return(
    <div>
      <div>
        <h1>Dashboard</h1>
        <input
          type='text'
          name='searchTerm'
          placeholder='Search'
          onChange={this.handleSearch}
        />
      </div>

      <div>
        {mappedPosts}
      </div>
    </div>
    )
  }
	}

export default Dashboard 