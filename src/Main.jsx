/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

import React, { Component } from 'react';
import Home from './Home';
import Menu from './API/Menu';
import Orders from './API/Order';
import AppRoute from './index';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Button, Card, Row, Col, Navbar, NavItem } from 'react-materialize';
import './css/general.css';
import awsmobile from './aws-exports';
import {Auth} from 'aws-amplify';

export default class Main extends Component {

    constructor(props)  {
        super(props);
    }

    getUser = async() => {
        console.log('name: ' + gapi.auth2.getAuthInstance().currentUser.Ab.w3.ig)
        console.log('Fetching Candidates......')

        // get request to api
        $.ajax({
            url: "https://l7mgnxwxd8.execute-api.us-east-1.amazonaws.com/api/candidates/page1",
            type: "GET",
            dataType: 'json',
            beforeSend: function(xhr){ 
                xhr.setRequestHeader('Authorization', 'Basic OTEyOGExNTkyOWM1YjI4Y2Q1ZDc0MzA4M2Y1Y2U5YTAtMQ==')
            ;},
            success: function (result) { 
                console.log(result);
            }
         });

        return gapi.auth2.getAuthInstance().currentUser.Ab.w3.ig;
    } 

    signOut = async(e) => {
        e.preventDefault();
        Auth.signOut()
        .then(
            console.log('signedOut')
        )
        .catch(err => console.log(err));    
    }

    render() {
        return (
            <div>
                { this.props.authState == 'signedIn' ?
                    (<BrowserRouter>
                        <div>
                            <Navbar className='nav-bar' brand='Whitehouse' right>
                                {/* <NavItem><Link to="/main/home">Home</Link></NavItem>
                                <NavItem><Link to="/main/menus">Menu</Link></NavItem>
                                <NavItem><Link to="/main/orders">Orders</Link></NavItem> */}
                                <NavItem onClick={this.googleSheets}>Google Sheets</NavItem>
                                <NavItem onClick={this.getUser}>Get User</NavItem>
                                <NavItem onClick={this.signOut}>Logout</NavItem>
                            </Navbar>
           
                            <div className="content">

                                {/* Grab User */}
                                <h2>Welcome {[this.getUser]}</h2>
                            </div>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/main/home" component={Home} />
                                <Route exact path="/main/menus/:id" component={Menu} />
                                <Route exact path="/main/menus" component={Menu} />
                                <Route exact path="/main/orders" component={Orders} />
                            </Switch>
                        </div>
                    </BrowserRouter>) : null
                }
            </div>
        );
    }
}
