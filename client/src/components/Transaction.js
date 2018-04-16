import React from "react";
import * as transactionData from "../actions/projectActions";
import * as checkLoggedSession from "../actions/signupAction";
import * as userData from "../actions/userDataActions";
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import PieChart from 'react-simple-pie-chart';
import feelancer from '../feelancer-LOGO.svg';

class Transaction extends React.Component{

    state={
        redirect:false,
        transactionDetails:{
            paymentType:"",
            amount:0
        },
        addMessage:"",
        withdrawMessage:"",
        errors:"",
        totalFund:0,
        transList:[],
        addMoney:"",
        withdrawMoney:"",
        crDrlist : []
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.userData) {
            if (nextProps.userData.data.sessionActive == true) {
                this.setState({
                    redirect: false
                })
            } else {
                this.setState({
                    redirect: true
                })
            }
        }
        if (nextProps.transData.userData) {
            this.setState({
                totalFund: nextProps.transData.userData.total_balance,
                transList: nextProps.transData.userData.listOfTrans
            })
            //this.state.transList = nextProps.transData.data.listOfTrans;

            /*this.setState({
                transList: this.state.transList
            });*/
        }
    }

    componentWillMount(){
        this.props.checkSession();
        this.props.getBalance();
        this.props.getTransactionsList();
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    logout(){
        this.props.logout();
    }

    addMoney(e){
        e.preventDefault();
        var aMoneyData = {};
        aMoneyData.money = this.state.addMoney;
        this.setState({
            addMoney : ""
        })
        this.props.addMoney(aMoneyData).then(
            (data) => {
                this.props.getBalance();
                this.props.getTransactionsList();
                this.setState({
                    totalFund: this.props.transData.userData.total_balance
                });
                this.state.transList = this.props.transData.userData.listOfTrans;
                this.setState({
                    transList: this.state.transList
                });
                this.setState({
                    addMessage: this.props.transData.userData.message
                });
            },
            (err) => {
                this.setState({errors : err.response.data.error});
                console.log(JSON.stringify(err.response));
            });
    }

    withdrawMoney(e){
        e.preventDefault();
        var wMoneyData = {};
        wMoneyData.money = this.state.withdrawMoney;
        this.setState({
            withdrawMoney : ""
        })
        this.props.withdrawMoney(wMoneyData).then(
            (data) => {
                this.props.getBalance();
                this.props.getTransactionsList();

                this.setState({
                    totalFund: this.props.transData.userData.total_balance
                });
                this.setState({
                    transList: this.props.transData.userData.listOfTrans
                });
                this.setState({
                    withdrawMessage: this.props.transData.userData.message
                });
            },
            (err) => {
                this.setState({errors : err.response.data.error});
                console.log(JSON.stringify(err.response));
            });
    }

    render(){
        const {redirect,crDrlist}  = this.state;
        const {errors}  = this.state;
        const {message}  = this.state;
        const { userData } = this.props;

        if(this.state.redirect || userData.data.logout === true)
            return (<Redirect to={{
                pathname: '/login'
            }} />)
        console.log("message : ",this.state.transList);
        var crDr = {};
        crDr = {color:'red',value:0};
        crDrlist[0] = crDr;
        crDr = {color:'blue',value:0};
        crDrlist[1] = crDr;
        for(let i=0;i<this.state.transList.length;i++){
            if(this.state.transList[i].payment_type == 'Db'){
                crDrlist[0].value+=Number(this.state.transList[i].amount);
            }
            else if(this.state.transList[i].payment_type == 'Cr'){
                crDrlist[1].value+=Number(this.state.transList[i].amount);
            }
        }
        console.log(JSON.stringify(this.state.crDrlist));
        return(
            <div>
                <div className="App-header">
                    <img src={feelancer} className="App-logo" alt="logo" />
                    <button className="btn btn-primary logout-btn" onClick={this.logout.bind(this)}>Logout</button>
                </div>
                <nav className="bar nav-black">
                    <Link to="/home" className="item-button bar-item ml75">Home</Link>
                    <Link to="/dashboard" className="item-button bar-item">Dashboard</Link>
                    <Link to="/profile" className="item-button bar-item">User Profile</Link>
                    <Link to="/transaction" className="item-button bar-item">My Transaction</Link>
                    <button className="btn-warning btn post-project-btn" onClick={() => this.nextPath('/post-project')}>Post Project</button>
                </nav>
                <div className="display-flex justify-content-md-center mt40">
                    <div className="col-md-8  justify-content-md-center form-border mt30">
                        <h3 className="mb30 mt50">Transaction Details</h3>
                        <div className="row">
                            <div className="col-md-7">
                        <div className="mt50">
                            <label className="font-bold">Total Available Funds : </label>
                            <label className="font-bold">{JSON.stringify(this.state.totalFund)} </label>
                        </div>
                        {errors && <div className="help-block">{errors}</div>}
                        {this.state.addMessage && <div className="success-block">{this.state.addMessage}</div>}
                        <div className="mt20">
                            <input type="text" value={this.state.addMoney} className="col-md-3" onChange={(event)=>this.setState({addMoney  : event.target.value})}/>
                            <button type="button" className="btn btn-primary fx-wd ml10" onClick={this.addMoney.bind(this)}> Add Money </button>
                        </div>
                        {errors && <div className="help-block">{errors}</div>}
                        {this.state.withdrawMessage && <div className="success-block">{this.state.withdrawMessage}</div>}
                        <div className="mt20">
                            <input type="text" value={this.state.withdrawMoney} className="col-md-3" onChange={(event)=>this.setState({withdrawMoney : event.target.value})}/>
                            <button type="button" className="btn btn-primary fx-wd ml10" onClick={this.withdrawMoney.bind(this)}> Withdraw Money </button>
                        </div>
                        </div>
                            <div className="col-md-5">
                                <PieChart
                                    slices={crDrlist}
                                />
                                <div className="row">
                                    <button style={{backgroundColor:'blue', padding:'7px'}}></button> <label className="fs14">: Money Added</label></div><br/>
                                    <div className="row"><button style={{backgroundColor:'red', padding:'7px'}}></button> <label className="fs14">: Money Withdrawn</label>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <div className="mt30">
                                <nav className="row bar nav-black">
                                    <div className="col-md-2 mt10 mb10">Serial #</div>
                                    <div className="col-md-4 mt10 mb10">Date</div>
                                    <div className="col-md-3 mt10 mb10">Transaction Type</div>
                                    <div className="col-md-3 mt10 mb10">Amount</div>
                                    <br/>
                                </nav>
                                <div className="mt20"></div>
                            </div>
                            <div>
                                {this.state.transList.map((transaction,i) =>
                                    <h5 key={i}>
                                        <div className="row row-border mt20 ml7 mr7 fs14">
                                            <div className="col-md-2 mt10 mb10">{i+1}</div>
                                            <div className="col-md-4 mt10 mb10">20-02-1994</div>
                                            <div className="col-md-3 mt10 mb10">{transaction.payment_type}</div>
                                            <div className="col-md-3 mt10 mb10">{transaction.amount}</div>
                                        </div>
                                    </h5>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        transData : state.UserReducer,
        userData : state.LoginReducer
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Object.assign({}, transactionData,checkLoggedSession,userData),dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Transaction);

