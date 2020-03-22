import React, { Component } from 'react';
import Axios from 'axios';
import { APIURL } from '../support/ApiUrl';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { LoginSuccessAction, Login_error } from './../redux/actions'

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { FaUserCircle, FaLock } from 'react-icons/fa';


const MySwal = withReactContent(Swal)

class Register extends Component {
    state = {
        error: '',
        loading: false,
        toHomePage:false
    }

onRegisterClick = () => {
    // e.preventDefault()
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    var repassword = this.refs.repassword.value;
    var role = "user";
    var newUser = { username, password, role };
    if (username === "" || password === "" || repassword === "") {
        MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "Data Gaboleh Ada Yang Kosong!"
        });
    } else {
        Axios.get(`${APIURL}/users?username=${username}`)
            .then(res1 => {
                console.log(res1);
                if (res1.data.length === 0) {
                    if (password !== repassword) {
                        MySwal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Both password didn't match"
                        });
                    } else {
                        Axios.post(`${APIURL}/users`, newUser)
                            .then(res => {
                                MySwal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: "You have been registered, please login"
                                });
                                this.setState({ toHomePage: true });

                            })
                            .catch(err1 => {
                                console.log(err1);
                            });
                    }
                } else {
                    MySwal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `"${username}" is not Available, Try Using Another Username :`
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
}

    render() {
        if (this.state.toHomePage) {
            return <Redirect to={'/'} />
        }
        return (
            <div>
                <div className="mt-5 d-flex justify-content-center">
                    <div style={{ width: '500px',  border: '2px inset blue'}} className='rounded p-4'>
                        <h1><center>Register</center></h1>

                        <h3><FaUserCircle/></h3>
                        <div className='p-1' style={{border:'2px outset blue'}}>
                            <input type='text' className='username' style={{ border: 'transparent', width: '100%', fontsize: '20px' }} ref='username' placeholder='Username' />
                        </div>

                        <div className='mt-3'></div>

                        <h3><FaLock/></h3>
                        <div className='p-1' style={{border:'2px outset blue'}}>
                            <input type='password' className='username' style={{ border: 'transparent', width: '100%', fontsize: '20px' }} ref='password' placeholder='Password' />
                        </div>

                        <div className='mt-4'></div>

                        <div className='p-1' style={{border:'2px outset blue'}}>
                            <input type='password' className='username' style={{ border: 'transparent', width: '100%', fontsize: '20px' }} ref='repassword' placeholder='Re-enter Password' />
                        </div>
 
                        <div className='mt-4'>
                                <button className='btn btn-primary' onClick={this.onRegisterClick}>Register</button>
                        </div>
                        <div className='mt-2'>
                            sudah punya akun? <Link to='/login'>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        AuthLog: state.Auth.login,
        Auth: state.Auth
    }
}

export default connect(mapStateToProps, { LoginSuccessAction, Login_error })(Register);





// onClickRegister = (e) => {
//     e.preventDefault()
//     var username = this.refs.username.value;
//     var password = this.refs.password.value;
//     var repassword = this.refs.repassword.value;
//     var role = "user";
//     var newUser = { username, password, role };
//     if (username === "" || password === "" || repassword === "") {
//         MySwal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Data Gaboleh Ada Yang Kosong!"
//         });
//     } else {
//         Axios.get(`${url}users?username=${username}`)
//             .then(res1 => {
//                 console.log(res1);
//                 if (res1.data.length === 0) {
//                     if (password !== repassword) {
//                         MySwal.fire({
//                             icon: "error",
//                             title: "Oops...",
//                             text: "Password must match"
//                         });
//                     } else {
//                         Axios.post(`${url}users`, newUser)
//                             .then(res => {
//                                 MySwal.fire({
//                                     icon: "success",
//                                     title: "Success!",
//                                     text: "Your are success Registered! Please Login"
//                                 });
//                                 this.setState({ toHomePage: true });

//                             })
//                             .catch(err1 => {
//                                 console.log(err1);
//                             });
//                     }
//                 } else {
//                     MySwal.fire({
//                         icon: "error",
//                         title: "Oops...",
//                         text: `"${username}" is not Available, Try Using Another Username :`
//                     });
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }
// }