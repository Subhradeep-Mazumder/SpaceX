import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, BrowserRouter, NavLink } from 'react-router-dom';
import Input from './Input';
import { connect } from 'react-redux';
import Login from './components/login';
import Home from './components/home';
import Missions from './components/missions';
import Payloads from './components/payloads';
import Rockets from './components/rockets';
import Cores from './components/cores';
import Launches from './components/launches';
import Facebook from './facebook.png';
import Twitter from './twitter.png';
import Telegram from './telegram.jpg';
import Youtube from './youtube.png';
import logo from './spacex.png';
import history from './history';



const mapStateToProps = (state) => {
  return {
    globallogin: state.login,
    globalusername: state.username,
    globalrole: state.role,
    globalloading: state.loading
  }
}
const mapDispachToProps = (dispach) => {
  return {
    login: (enteredusername,role) =>  dispach({ type: "login", username: enteredusername, role: role }),
    logout: () => dispach({ type: 'logout' })
  }
}

class App extends Component {
  tabBackground = { backgroundColor: "red" }
  state = { tab: "Home" }
  componentWillMount(){
    if (sessionStorage.getItem("username")){
      this.props.login(sessionStorage.getItem("username"),sessionStorage.getItem("role"))
      // history.push("/Rockets/Elon%20Musk")
    }
  }
  
  logout = () => {
    this.setState({tab: "Home"})
    sessionStorage.clear();
    this.props.logout();
  }
  tabchange = (choosentab) => {
    this.setState({
      tab: choosentab
    })
    
  }

  routerConfig = () => {
    let path = "home";
    if(sessionStorage.getItem("username"))
    {
      this.props.login(sessionStorage.getItem("username"),sessionStorage.getItem("role"))

    if (window.location.pathname.indexOf("/home")!==-1) {
      path= "home";
    }
    else if (window.location.pathname.indexOf("/Launches")!==-1) {
      path = 'Launches';
    }
    else if (window.location.pathname.indexOf("/Rockets")!==-1) {
      path = "Rockets";
    }
    else if (window.location.pathname.indexOf("/Missions")!==-1) {
      path = "Missions";
    }
    else if (window.location.pathname.indexOf("/Cores")!==-1) {
      path = "Cores";
    }
    else if (window.location.pathname.indexOf("/Payloads")!==-1) {
      path = "Payloads";
    }
    return <Redirect to={`/${path}/${sessionStorage.getItem("username")}`} />
  }
  else
  {
    if(this.props.globallogin)
    {
      return <Redirect to={`/home/${this.props.globalusername}`} />
    }
    else
    {
      return <Redirect to="/" />
    }
   
  }

   
  }
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <div className="page-wrapper">
            {this.props.globallogin ?
              <>
                <div className="pageheader">
                 <div className="login-info">
                  <Input val="Log Out" onclickfunction={this.logout} />
                  <div className="loggedIn-user">{this.props.globalusername} logged in as {this.props.globalrole}</div>
                  </div>
                  <div className="pageheader-logo"></div>
                </div>
                <div id="menu">
                  <NavLink className="menu_button" style={this.state.tab === "Home" ? this.tabBackground : {}} onClick={() => { this.tabchange("Home") }} to ={`/Home/${this.props.globalusername}`}>Home</NavLink>
                  <NavLink className="menu_button" style={this.state.tab === "Missions" ? this.tabBackground : {}} onClick={() => { this.tabchange("Missions") }} to ={`/Missions/${this.props.globalusername}`}>Missions</NavLink>
                  <NavLink className="menu_button" style={this.state.tab === "Launches" ? this.tabBackground : {}} onClick={() => { this.tabchange("Launches") }} to ={`/Launches/${this.props.globalusername}`}>Launches</NavLink>
                  <NavLink className="menu_button" style={this.state.tab === "Rockets" ? this.tabBackground : {}} onClick={() => { this.tabchange("Rockets") }} to ={`/Rockets/${this.props.globalusername}`}>Rockets</NavLink>
                  {this.props.globalrole === 'Employee' ?
                    <>
                      <NavLink className="menu_button" style={this.state.tab === "Cores" ? this.tabBackground : {}} onClick={() => { this.tabchange("Cores") }} to ={`/Cores/${this.props.globalusername}`}>Cores</NavLink>
                      <NavLink className="menu_button" style={this.state.tab === "Payloads" ? this.tabBackground : {}} onClick={() => { this.tabchange("Payloads") }} to ={`/Payloads/${this.props.globalusername}`}>Payloads</NavLink>
                    </>
                    : null
                  }
                </div>
              </> : null
            }
            <Route path="/" exact strict render={
              () => {
                return this.props.globallogin ? (this.routerConfig()) :
                  (<Login></Login>)
              }
            } />
            <Route path="/home/:username" exact strict render={
              (match) => {
                return (!this.props.globallogin) ? (this.routerConfig()) : (

                  <Home ></Home>
                 

                );

              }
            } />

            <Route path="/Missions/:username" exact strict render={
              (match) => {
                return (!this.props.globallogin) ? (this.routerConfig()) : (

                   <Missions></Missions>
                  //<div>Testing</div>

                );

              }
            } />

            <Route path="/Launches/:username" exact strict render={
              (match) => {
                return (!this.props.globallogin) ? (this.routerConfig()) : (

                  <Launches></Launches>
                  //<div>Testing</div>

                );

              }
            } />

            <Route path="/Rockets/:username" exact strict render={
              (match) => {
                return (!this.props.globallogin||sessionStorage.getItem("username")==="") ? (this.routerConfig()) : (

                   <Rockets></Rockets>
                 

                );

              }
            } />
            {
            this.props.globalrole === 'Employee'?
            <>
                <Route path="/Cores/:username" exact strict render={
                  (match) => {
                    return (!this.props.globallogin  ) ? (this.routerConfig()) : (

                       <Cores></Cores>
                      //<div>Testing</div>

                    );

                  }
                } />
                <Route path="/Payloads/:username" exact strict render={
                  (match) => {
                    return (!this.props.globallogin) ? (this.routerConfig()) : (

                      <Payloads></Payloads>
                      //<div>Testing</div>

                    );

                  }
                } />
                </>
                :<Redirect to="/" />
                }
          </div>
          <div id="footer">
                    <div id="country">
                      <img className="logo" src={logo}/>
                        <span >FOLLOW US</span>
                        <a href="https://www.facebook.com/"><img className="follow_img" href="" src={Facebook}/></a>
                        <a href="https://twitter.com/Twitter"><img className="follow_img" src={Twitter}/></a>
                        <a href="https://telegram.org/"><img className="follow_img" src={Telegram}/></a>
                        <a href="https://www.youtube.com/"><img className="follow_img" src={Youtube}/></a>
                    </div>
                    <span id="footerright">
                        <a className="right">Privacy</a>
                        <a className="right">Terms</a>
                        <a className="right">Settings</a>
                    </span>
                    <span id="footleft">
                        <a className="left">Advertising</a>
                        <a className="left">Business</a>
                        <a className="left">About Us</a>
                        <a className="left">How Search works</a>
                    </span>
                </div>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispachToProps)(App);
