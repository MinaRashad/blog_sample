import react from 'react';
import { render } from 'react-dom';
import './App.css';


class Page extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'blogs',
      server_response:''
    };
  }

  handleSignup = (e) => {
    e.preventDefault();
    console.log(`user: ${e.target.username.value}`);
    let username = e.target.username.value;
    let password = e.target.password.value;
    let conf_password = e.target.conf_password.value;

    try {
     fetch('http://localhost:3001/signup', {
      method: 'POST',
      body: "username=" + username + "&password=" + password + "&conf_password=" + conf_password,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => res.text())
    .then(res => {this.setState({server_response:res})});
    } catch (err) {
      console.log("error!");
      console.log(err);
    }
  }

  handleLogin = (e) => {
    e.preventDefault();
    console.log(`user: ${e.target.username.value}`);
    let username = e.target.username.value;
    let password = e.target.password.value;

    try {
     fetch('http://localhost:3001/login', {
      method: 'POST',
      body: "username=" + username + "&password=" + password,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => res.text())
    .then(res => {this.setState({server_response:res})});
    } catch (err) {
      console.log("error!");
      console.log(err);
    }
  }


  render() {
    return (
      <div>
        <nav>
          <ul>
            {/* <li><a href="#">Create blog</a></li> */}
            <li><span onClick={(e)=>this.setState({page:'login', server_response:''})}>Login</span></li>
            <li><span onClick={(e)=>this.setState({page:'signup', server_response:''})}>Signup</span></li>
            <li><span onClick={(e)=>this.setState({page:'about_me', server_response:''})}>About Me</span></li>
            <li><span onClick={(e)=>this.setState({page:'blogs', server_response:''})}>Blogs</span></li>
            <li><span onClick={(e)=>this.setState({page:'merch', server_response:''})}>Merchs</span></li>

          </ul>
        </nav>
        <div className="content">
          {this.state.page === 'login' && 
          <Login res={this.state.server_response} handleLogin={this.handleLogin} />}
          {this.state.page === 'signup' && 
          <Signup res={this.state.server_response} handleSubmit={this.handleSignup} />}
          {this.state.page === 'about_me' && <AboutMe />}
          {this.state.page === 'blogs' && <Blogs blogs={[]} />}
          {this.state.page === 'merch' && <Merch />}
        </div>
      </div>
    );
  }
}




function Login (props){
    return (
      <form onSubmit={props.handleLogin}>
      <h1>Login</h1>
      <table>
        <tr>
          <td>Username</td>
          <td><input type="text" name="username" /></td>
        </tr>
        <tr>
          <td>Password</td>
          <td><input type="password" name="password" /></td>
        </tr>
      </table>  
      <div className={props.res === "Login successful"?"success":"error"}>
        {props.res}
      </div>
      <input type="submit"/>

      </form>
    );
}

function Signup (props){
    return (
      <form onSubmit={props.handleSubmit}>
      <table>
        <h1>Signup</h1>
        <tbody>
        <tr>
          <td>Username</td>
          <td><input type="text" name="username" /></td>
        </tr>
        <tr>
          <td>Password</td>
          <td><input type="password" name="password" /></td>
        </tr>
        <tr>
          <td>Confirm Password</td>
          <td><input type="password" name="conf_password" /></td>
        </tr>
        </tbody>
      </table>
      <div className={props.res === "Account created"?"success":"error"}>
        {props.res}
      </div>
      <input type="submit"/>
      </form>
    );
  }


function AboutMe(props){
  return (
    <div>
    <div className='aboutme'>
      <img src='./aboutme.jpg' alt='Me'></img>
      <p>Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem Ipsum dolor</p>
    </div>
    <center>  <a href="#" class="fa fa-facebook"></a>
        <a href="#" class="fa fa-twitter"></a>
        </center>
    </div>

  );
}

function Blogs(props){
  return (
    <div>
      <h1>Blogs</h1>
      <p className='blog_quote'>Read about the latest books</p>
      <img className='blogsImage' src='https://whytoread.com/wp-content/uploads/2014/05/philosophy_books.jpg'></img>
      <ul>
        {props.blogs && props.blogs.map((blog) => <li><h3>{blog.title}</h3><p>{blog.content.slice(0,30)} ... <a href='#'>Read more</a> </p></li>)}
      </ul>
    </div>

  );
}

function Merch(props){
  return (
    <div>
      <h1>Merch</h1>
      <ul>
        <li><a href='#'>T-Shirt</a></li>
        <li><a href='#'>Hoodie</a></li>
        <li><a href='#'>Mug</a></li>
      </ul>
    </div>

  );
}

export default Page;
