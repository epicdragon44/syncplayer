import React from 'react';

import { withAuthorization } from '../Session';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.getFriends = this.getFriends.bind(this);
        this.addCourse = this.addCourse.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {    this.setState({value: event.target.value});  }

    // handleSubmit(event) { 
        
    //     event.preventDefault();
    // }

    addCourse(nameOfCourse) { //Writes correctly, albeit infinitely
        console.log('hi');

        const usr = JSON.parse(localStorage.getItem('authUser'));
        var newCourses = Object.values(usr).slice()[2];
        newCourses.push(nameOfCourse);

        this.setState({
            arrCourses: newCourses.slice(),
        });

        // console.log(Object.values(usr).slice()[2]);
        localStorage.setItem('authUser', JSON.stringify(usr));
        // console.log(Object.values(usr).slice()[2]);
        this.props.firebase.users().child(Object.values(usr).slice()[0]).update({
            friends: newCourses.slice(),
        });
    }

    getFriends() { 

        //to help, use something similar to lines 48-49 to get current user username/uid or whatever
        //in the output, each object should contain a name, which corresponds to a string, and a pointCount, which corresponds to an int
        //{ name: "Bob", pointCount: 15 }
        //the return statement below is just dummy code. pls remove

        const usr = JSON.parse(localStorage.getItem('authUser'));
        const usrList = Object.values(usr).slice()[2];
        const arrFriends = [];
        for (var i = 0; i < usrList.length; i++) {
            arrFriends.push({
                name: "",
                pointCount: 0
            });
        }
        const allUsers = JSON.parse(localStorage.getItem('users'));
        for ( var i = 1; i < usrList.length; i++) {
            for ( var j = 0; j < allUsers.length; j++) {
                if (usrList[i] == null) {}

                else {
                    const curFriend = usrList[i];
                    const curUser = allUsers[j];
                    if ( curUser.uid === curFriend) {
                        const friendUSer = Object.values(curUser.username);
                        const friendPts = Object.values(curUser.points);
                        console.log(friendPts);
                        console.log(friendUSer);
                        arrFriends[i].name = friendUSer.join("");
                        arrFriends[i].pointCount = curUser.points;
                    }
                }

            }
        }
        console.log(arrFriends);
        return arrFriends; // TODO: filter entries with name as "" (empty string)
    }

    render() {
        const usr = JSON.parse(localStorage.getItem('authUser')); // user's personal data is stored in 'authUser'
        var username = Object.values(usr).slice()[6];
        
        var betterList = [];
        for (let i = 0; i<this.getFriends().slice().length; i++) {
            if (!(this.getFriends().slice()[i].name==="")) {
                betterList.push(this.getFriends().slice()[i]);
            }
        }
        var msg = (<div />);
        if (this.getFriends().slice().length===1) {
            msg = (<p>You don't have any friends yet.</p>);
        }
        else if (betterList.length===0) {
            msg = (<p>You don't have any friends yet.</p>);
        }
        
        return (
            <div>
                <CopyToClipboard text={""} onCopy={() => window.location.reload()}>
                    <center>
                        <p><br />(Refresh &#8634;)</p>
                    </center>
                </CopyToClipboard>
                <div className="colorheader">
                    <h1>Friends</h1>
                </div>
                <hr />
                <div className="colorheader">
                    <h2>Add a Friend</h2>
                </div>
                <center>
                    {/* <form onSubmit={this.handleSubmit}>
                        <label>
                            Enter the Friend's ID:<br />
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <br />
                        <input className = "nicesubmit" type="submit" value="Submit" />
                    </form> */}
                    <NameForm addCourse={this.addCourse} firebase = {this.props.firebase}/>
                </center>
                <hr />
                <div className="colorheader">
                    <h2>Friend Activity</h2>
                </div>
                <div className="colorheader">{msg}</div>
                {this.getFriends().slice().map(
                    friend =>
                    <Friend 
                        name={friend.name}
                        pointCount={friend.pointCount}
                        currentUser={username}
                    />
                )}
            </div>
        );
    }
}

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {    this.setState({value: event.target.value});  }

    handleSubmit(event) { 
        this.props.addCourse(this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Enter Friend ID below:<br /><br />
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <br /><br />
                <input className = "nicesubmit" type="submit" value="Submit" />
            </form>
        );
    }
}

function Friend(props) {
    const usr = JSON.parse(localStorage.getItem('authUser')); // user's personal data is stored in 'authUser'

    if (props.name==="") {
        return (<div />);
    }

    var msg = "";
    var diff = 0;
    var attribute = "friend";
    var myPts = Object.values(usr).slice()[4];
    if (myPts > props.pointCount) {
        diff = myPts - props.pointCount;
        attribute+="green";
        msg = (
        <h4>Congrats!<br /> You have {diff} more points!</h4>
        );
    }
    else if (myPts < props.pointCount) {
        diff = props.pointCount - myPts;
        attribute+="red";
        msg = (
        <h4>You're behind!<br /> Your friend has {diff} more points!</h4>
        );
    }
    else {
        msg = (
            <h4>You're tied for {myPts} points!<br /> See if you can pull ahead!</h4>
        );
    }

    return (
        <div className={attribute}>
            <div className="colorheadernospace">
                <h2>{props.name}</h2>
                <h3>{props.pointCount} points</h3>
                {msg}
            </div>
        </div>
    );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Landing);