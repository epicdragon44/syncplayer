import React from 'react';

import { withAuthorization } from '../Session';

class Home extends React.Component {
    constructor(props) {
        super(props);
        const usr = JSON.parse(localStorage.getItem('authUser'));
        this.state = {
            username: Object.values(usr).slice()[6], // big blob of user data, variable names self explainable
            email: Object.values(usr).slice()[1],
            photos: Object.values(usr).slice()[2],
            friends: Object.values(usr).slice()[3],
            points: Object.values(usr).slice()[4],
        }

    }
    componentDidMount() {
        const usr = JSON.parse(localStorage.getItem('authUser')); // user's personal data is stored in 'authUser'
        this.props.firebase.challenges().on('value', snapshot => {
            const chal = snapshot.val();
            const chalList = Object.keys(chal).map(key => ({ // stores list of challenges as well for ease of use
                ...chal[key],
                cid: key,
            }));
            localStorage.setItem('courses', JSON.stringify(chalList)); // list of challenges is stored in item 'courses'
            this.setState({
                username: Object.values(usr).slice()[6],  // this is repeated elsewhere because I momentarily forgot how to code.
                email: Object.values(usr).slice()[1],
                photos: Object.values(usr).slice()[2],
                friends: Object.values(usr).slice()[3],
                points: Object.values(usr).slice()[4],
                uid: Object.values(usr).slice()[4],
            });
        });
        this.props.firebase.users().on('value', snapshot => {
            const userObject = snapshot.val();
            const userList = Object.keys(userObject).map(key => ({
                ...userObject[key],
                uid: key,
            }));
            localStorage.setItem('users', JSON.stringify(userList));
        });
    }

    render() {
        return (
            <div>
                <div className="colorheader">
                    <h1>Add Masks</h1>
                </div>
                
                <Interactions name={this.state.username} photos={this.state.photos} firebase={this.props.firebase} points = {this.props.points}/>
            </div>
        );
    }
}
// here for temporary reading. Feel free to copy methods from here to other places. All functions will be documented.
class Interactions extends React.Component {
    constructor(props) {
        super(props);
        // bind stuff here temporarily

        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

        this.state = {
            username:  Object.values(JSON.parse(localStorage.getItem('authUser'))).slice()[6],
            image: null, // image reference
            url: '', // database url
            progress: 0, // progress of upload
            photos: [],

            numOfMasks: 0,
            checkBoxValue: false,
        }
    }

    handleChange = e => {
        const image = e.target.files[0];
        this.setState({image});
        console.log(this.state.username); // sets the state to include the current file upon adding one
    }

    handleUpload = e => {
        //upload this.state.numOfMasks (int) as points, and this.state.checkBoxValue (boolean) indicates whether the "donated" box is checked (if the masks have already been donated, we should use that as like a points multipler)
        //to help, this.props.name should store the current username, this.props.firebase should let you access firebase.
        // this.props.points should theoretically count the current number of points, but i literally don't touch it at all so its probably best not to use it and instead use the database point counter entirely
        const usr = JSON.parse(localStorage.getItem('authUser'));
        var newPoints = parseInt(Object.values(usr).slice()[4]);
        console.log('I have ' + newPoints);
        newPoints += Number(this.state.numOfMasks);
        if (this.state.checkBoxValue) {
            newPoints += Number(this.state.numOfMasks);
        }
        console.log('Now I have ' + newPoints);
        this.props.firebase.users().child(Object.values(usr).slice()[0]).update({
            points: newPoints,
        });
        //Below is image rendering, don't touch

        const image = this.state.image;
if ( image !== null) {
    const uploadTask = this.props.firebase.storage.ref(`images/${image.name}`).put(image); // uploads image to firebase
    uploadTask.on('state_changed',
        (snapshot) => { // stores
            const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({progress}); // gives a number between 1-100 for percent done uploading
        },
        (error) => {
            console.log(error); // if upload errored
        },
        () => { // finishes the function here, adds the url
            // get the uploaded image url back

            const link = uploadTask.snapshot.ref.getDownloadURL().then(url => {
                console.log(url);
                if (!(this.state.photos.includes(url))) {
                    var newArray = this.state.photos.slice();
                    newArray.push(url);
                    this.setState({
                        photos: newArray,
                    });
                }
                const newPhotos = Object.values(JSON.parse(localStorage.getItem('authUser'))).slice()[2];
                newPhotos.push(url); // adds the url of the photo to be associated with the user
                console.log(url);
                if (!(this.state.photos.includes(url))) {
                    var newArray = this.state.photos.slice();
                    newArray.push(url);
                    this.setState({
                        photos: newArray,
                    });
                }
                const usr = JSON.parse(localStorage.getItem('authUser'));
                this.props.firebase.users().child(Object.values(usr).slice()[0]).update({
                    photos: newPhotos.slice(),
                });
                this.render();
            });
        });
}
        window.location.reload();
    } // please ignore code repetitions. IDK how react works and asynchronous calls, so I just called the original everywhere.

    masksOnChange = event => {
        this.setState({ numOfMasks: event.target.value });
    };

    toggleCheckboxValue = () => {
        this.setState({checkBoxValue: !this.state.checkboxValue});
    };

    render () { // file button and upload button
        //images temporarily display
        const { numOfMasks, checkBoxValue } = this.state;
        console.log('rendered');
        return (
            <div>
                <center>
                    <div class="upload-btn-wrapper">
                        <button class="btn">Choose a photo</button>
                        <input type= "file" onChange={this.handleChange}/>
                    </div>
                    <br />
                    {/* <progress value = {this.state.progress} max = "100"/>  */}
                    <input
                        className="masksinput"
                        name="numOfMasks"
                        value={numOfMasks}
                        onChange={this.masksOnChange}
                        type="text"
                        placeholder=""
                    />
                    <div>
                        <input className="checkboxinput" type="checkbox" id="checkBoxValue" name="checkBoxValue" onChange={this.toggleCheckboxValue}/>
                        <label for="horns">Donated</label>
                    </div>
                    <br />
                    <button onClick = {this.handleUpload}>Upload</button>
                    <br />
                    
                    <br/><br/>
                    {/* <hr />
                    <br/> */}
                    {/* <img src={this.state.url} alt = "Uploaded Images" height = "300" width = "400" />  */}
                    {/* <center>Your Photo</center><br />
                    <center>
                        {this.state.photos.map(photo => <img src={photo} alt = "Uploaded Images" width = "90%" />)}
                    </center> */}
                    
                    <br/>
                    
                </center>
            </div>
        )
    }

}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);