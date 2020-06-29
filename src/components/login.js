import React, { Component } from 'react';
import '../App.css';
import Input from '../Input';
import { connect } from 'react-redux';
import axios from "axios";
import Loading from './loading';



const mapStateToProps = (state) => {
    return {
        globallogin: state.login,
        globalloginmessage: state.loginmessage,
        globalloading: state.loading
    }
}
const mapDispachToProps = (dispach) => {
    return {
        login: (enteredusername, enteredpassword, url) => dispach((dispach) => {
            dispach({ type: "loading" });
            axios.get(url)
                .then((response) => {
                    let logindata = response.data;
                    let username = logindata["identity"]["login"];
                    let password = logindata["identity"]["password"];
                    let id = logindata["identity"]["id"];
                    let role = logindata["permissions"]["roles"][0];
                    if (enteredpassword == password && enteredusername == username) {
                        sessionStorage.setItem("username",enteredusername);
                        sessionStorage.setItem("role",role);
                        dispach({ type: "login", username: enteredusername, role: role })
                    }
                    else {
                        dispach({ type: "wrongpassword" })
                    }


                });


        })
    }
}

class Login extends Component {
    state = { guest: true }

    login = () => {
        let url;
        if (this.state.guest) {
            url = 'https://run.mocky.io/v3/d686c947-03b5-4f69-9d78-e00f62102f2a'
        }
        else {
            url = "https://run.mocky.io/v3/6845bfc8-9857-47cc-91d5-86ab157f3a76"
        }


        this.props.login(this.username.value, this.password.value, url);
        this.username.value = "";
        this.password.value = "";

    }
    render() {
        return (

            <div className="guestlogin">
                <div id="login_page" >
                    
                        {this.props.globalloading ?
                            (<>
                                <Loading></Loading>
                            </>) : (
                                <div id="inner_logincomponent">
                                    <div className="logintag loginelement"> LOG IN </div>
                                    <div className="space loginelement"></div>
                                    <div className="logincredential loginelement">
                                        <span className="credential">Username</span>
                                        <div className="space"></div>
                                        <input id="username" defaultValue="Elon Musk" ref={(input) => this.username = input} type="text" />
                                    </div>
                                    <div className="space loginelement"></div>
                                    <div className="logincredential loginelement">
                                        <span className="credential">Password</span>
                                        <div className="space"></div>
                                        <input id="Password" defaultValue="@spacexemployee12" ref={(input) => this.password = input} type="password" />
                                    </div>
                                    <div className="space"></div>
                                    <Input val="LOG IN" onclickfunction={this.login} />
                                    <div className="space"></div>
                                    <label className="loginelement">{this.props.globalloginmessage}</label>
                                    {this.state.guest
                                        ? (<div className="loginelement">To login as employee <a className="loginchange" onClick={() => this.setState({ guest: false })}>Click Here</a></div>)
                                        : (<div className="loginelement">To login as guest <a className="loginchange" onClick={() => this.setState({ guest: true })}>Click Here</a></div>)
                                    }
                               </div>)}
                    
                </div>

            </div>



        );


    }
}

export default connect(mapStateToProps, mapDispachToProps)(Login);
