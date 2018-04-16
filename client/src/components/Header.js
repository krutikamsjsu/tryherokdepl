import React from "react";
import * as checkLoggedSession from "../actions/signupAction";
import {userData} from "../reducers/reducer-login";
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import * as postData from "../actions/projectActions";
import {Redirect,withRouter} from 'react-router-dom';

class Header extends React.Component{

    state={
        loggedIn:false
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.userData){
            if(nextProps.userData.data.sessionActive == true){
                this.setState ({
                    loggedIn : true
                })
            }else {
                this.setState({
                    loggedIn: false
                })
            }
        }
    }


    componentWillMount(){
        this.props.checkSession();
    }

    logout(){
        this.props.logout();
        this.setState({
            loggedIn: false
        })
    }
    viewProfile(path){
        this.props.history.push(path);
    }
    login(path){
        this.props.history.push(path);
    }
    signup(path){
        this.props.history.push(path);
    }

    render(){
        const loggedIn = this.state;
        const { userData } = this.props;
        if(userData.data.logout === true)
            return (<Redirect to={{
                pathname: '/login'
            }} />)
        console.log(loggedIn);
        return(
            <div className="qwerty">
                <h1>Hire expert freelancers for any job, online</h1>
                <h4>Millions of small businesses use Freelancer to turn their ideas into reality.</h4>
            </div>
        );
    }
}


function mapStateToProps(state){
    return{
        projectData : state.ProjectReducer,
        userData : state.LoginReducer
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Object.assign({}, postData,checkLoggedSession),dispatch)

}
export default connect(mapStateToProps,mapDispatchToProps)(Header);
