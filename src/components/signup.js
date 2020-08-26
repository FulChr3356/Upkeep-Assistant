import React, { Component } from "react";
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./login";
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


export default class Registration extends Component {
    render() {
        return (
            <form method="post" action="/form" autoComplete = "off">
            <div>
                <div className="split left">
                    <div className="centered">
                        <h1>
                            Sign up
                </h1>
                        <hr id="hr2" />
                        <div><input   type="text" name="name" placeholder="Enter Full Name"></input></div>
                        <div><input type="email" name="email" placeholder="Enter Email"></input></div>
                        <div><input type="password" name="password" placeholder="Enter Password"></input></div>
                        <div><input type="password" name="Cpassword" placeholder="Confirm Password"></input></div>
                        <div style = {{paddingTop: 75 +'px'}}><Button style = {{backgroundColor: "#2196f3"}} type="submit"> Register</Button></div>
                        <p>
                            Once you click Register you agree with our Terms and Condtions
                        </p>
                    </div>
                </div>
                <hr id="vl" />
                <div className="split right">
                    <div className="centered">
                        <h1>
                            Already have an account?
                    </h1>
                        <Link className="nav-link" to={"/"}>
                            <Button style = {{backgroundColor: "#2196f3"}}>
                                Login
                    </Button>
                        </Link>
                    </div>
                </div>
            </div>
            </form>
        );
    }
}