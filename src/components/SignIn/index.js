import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
// import YouTube from 'react-youtube';
import {useEffect, useState} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import "./signin.css"

// Hook

function useWindowSize() {

    // Initialize state with undefined width/height so server and client renders match
  
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  
    const [windowSize, setWindowSize] = useState({
  
      width: undefined,
  
      height: undefined,
  
    });
  
  
  
    useEffect(() => {
  
      // Handler to call on window resize
  
      function handleResize() {
  
        // Set window width/height to state
  
        setWindowSize({
  
          width: window.innerWidth,
  
          height: window.innerHeight,
  
        });
  
      }
  
      
  
      // Add event listener
  
      window.addEventListener("resize", handleResize);
  
      
  
      // Call handler right away so state gets updated with initial window size
  
      handleResize();
  
      
  
      // Remove event listener on cleanup
  
      return () => window.removeEventListener("resize", handleResize);
  
    }, []); // Empty array ensures that effect is only run on mount
  
  
  
    return windowSize;
  
  }

  function YouTube(props) {
      var src = "https://www.youtube.com/embed/" + props.videoId + "?autoplay=1&rel=0&controls=0" + "&start=" + props.opts.playerVars.start + "&end=" + props.opts.playerVars.end;
      return (
        <center><iframe id="ytplayer" type="text/html" width={props.opts.width} height={props.opts.height}
            src={src}
            frameborder="0" allow="autoplay"></iframe></center>
      );
  }

function VideoTile(props) { 

    let opts;
    opts = {
        height: ((parseInt(props.height))/2)+"",
        width: ((parseInt(props.width))/2)+"",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            start: props.start,
            end: props.end,
        },
    };

    if (props.visible===true) {
        return (
            <div class="videotile" id={props.vidid}>
                {/* x button */}
                <YouTube videoId={props.vidid} opts={opts}/>;
            </div>
        )
    } else {
        return (<></>);
    }
    
}

function MasterVideoTile(props) {

    const [src, setsrc] = useState("https://www.youtube.com/embed/" + props.vidid + "?rel=0&controls=0");
    
    // var myConfObj = {
    //     iframeMouseOver : false
    // }
    // window.addEventListener('blur',function(){
    // if(myConfObj.iframeMouseOver){
    //     console.log('Wow! Iframe Click!');
    //     props.clickedVid();
    // }
    // });
    
    // function thing1() {
    //     myConfObj.iframeMouseOver = true;
    // }
    // function thing2() {
    //     myConfObj.iframeMouseOver = false;
    // }

    //

    function startVideo(event) {
        setsrc(src + "&autoplay=1");
        props.clickedVid();
        event.preventDefault();
    }

    //

    let opts;
    opts = {
        height: ((parseInt(props.height))/1.8)+"",
        width: ((parseInt(props.width))/1.5)+"",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            start: 0,
            end: 0,
        },
    };
    
    // <div class="videotile" id={props.vidid} onMouseOver={thing1} onMouseOut={thing2}>
    return (
        <div class="mastervideotile" id={props.vidid}>
            {/* <h2>Once you begin playing the video, you can't pause it (or the videos will get out of sync!)</h2> */}
            {/* <h5>{props.seconds}</h5> */}
            {props.begun 
            ? 
            <> </>
            : 
            <center>
                <button id="play-video" onClick={startVideo}>Begin</button>
                <p class="notice">Don't Pause! (or videos will fail to sync)</p>
            </center>}
            <center><iframe id="ytplayer" type="text/html" width={opts.width} height={opts.height} src={src} frameborder="0" allow="autoplay"/></center>
        </div>
    )
}

function ViewVideoPage() {
    const size = useWindowSize();
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [formattedtime, setformattedtime] = useState("00:00");
    const [begun, setbegun] = useState(false);

    var sessionid = window.location.href.substring((window.location.href.indexOf("?")+4));

    var masteryoutubelinkid = "k0EJ0Lk3dT8"; //temp fill
    var arrayOfDelayStartSeconds = [15, 20]; //temp fill
    var arrayOfDelayEndSeconds = [222, 275]; //temp fill
    var arrayOfClipStartSeconds = [0, 7]; //temp fill
    var arrayOfClipLinkIDs = ["-5q5mZbe3V8", "-5q5mZbe3V8"]; //temp fill
    //note to self: clipend time is clipstart+delayend-delaystart, so no need to ask user for it or store it
    //TODO: using sessionid
    //  get master youtube link id
    //  fill arrays: arrayOfDelayStartSeconds, arrayOfDelayEndSeconds, arrayOfClipStartSeconds, arrayOfClipLinkIDs. ( just pull the corresponding string from database and do string.split(",") )

    function toggle() {
        setIsActive(!isActive);
    }

    function clickedVid() {
        toggle();
        setbegun(true);
    }

    function updateTime() {
        let mins = Math.floor((seconds+1)/60);
        let secs = (seconds+1)%60;

        if ((mins+"").length===1) {
            mins = "0"+mins;
        }
        if ((secs+"").length===1) {
            secs = "0"+secs;
        }

        setformattedtime(mins + ":" + secs)

        setSeconds(seconds => seconds + 1);
    }

    function pausetime(event) {
        setIsActive(false);
        setformattedtime("");
        event.preventDefault();
    }

    function changetime(event) {
        let userinput = event.target.value+"";
         if (userinput.length===2) {
            let newthing = userinput+=":";
            setformattedtime(newthing);
        } else if (userinput.length===5) {
            let newseconds = parseInt(userinput.split(":")[1]) + (parseInt(userinput.split(":")[0])*60);
            setSeconds(newseconds);
            setbegun(true);
            setIsActive(true);
        } else {
            setformattedtime(userinput);
        }
        event.preventDefault();
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
        interval = setInterval(() => {
            updateTime();
        }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    var indexarray = [];
    for (let i = 0, len = arrayOfClipLinkIDs.length; i < len; i++) {
        indexarray[i] = i;
    }

    // <form class="timeform">
    //     <input type="text" value={formattedtime} onFocus={pausetime} onChange={changetime}/>
    // </form>
    return (
        <div class="viewvideopage">
            {begun 
            ?
            <center><h2 className="time">{formattedtime}</h2></center>
            :
            <> </>}
            <MasterVideoTile clickedVid={clickedVid} begun={begun} seconds={seconds} vidid={masteryoutubelinkid} width={size.width} height={size.height} />
            <div class="rowofvids">
            {
                indexarray.map(
                    index => (
                        <VideoTile 
                            vidid={arrayOfClipLinkIDs[index]} 
                            start={arrayOfClipStartSeconds[index]} 
                            end={arrayOfClipStartSeconds[index] + arrayOfDelayEndSeconds[index] - arrayOfDelayStartSeconds[index]} 
                            width={size.width / 2} 
                            height={size.height / 2}
                            visible={seconds >= arrayOfDelayStartSeconds[index] && seconds <= arrayOfDelayEndSeconds[index]}
                        />
                    )
                )
            }
            </div>
        </div>
    );
}


function CreateVideoPage() {
    const [alldone, setalldone] = useState(false);
    const [finallink, setfinallink] = useState("");

    const [mastersaved, setmastersaved] = useState(false);
    const [masterlink, setmasterlink] = useState("");

    const [cliplink, setcliplink] = useState("");
    const [delaystarttime, setdelaystarttime] = useState("00:00");
    const [delayendtime, setdelayendtime] = useState("00:00");
    const [clipstarttime, setclipstarttime] = useState("00:00");

    const [indexarray, setindexarray] = useState([]);
    const [arrayOfClipLinks, setarrayOfClipLinks] = useState([]);
    const [arrayOfDelayStartTimes, setarrayOfDelayStartTimes] = useState([]);
    const [arrayOfDelayEndTimes, setarrayOfDelayEndTimes] = useState([]);
    const [arrayOfClipStartTimes, setarrayOfClipStartTimes] = useState([]);

    //

    function savemasterlink(event) {
        event.preventDefault();
        if (!(masterlink.includes("youtube") || masterlink.includes("youtu.be"))) {
            alert('Not a YouTube link!')
        } else {
            setmastersaved(true);
        }
    }

    function saveclip(event) {
        event.preventDefault();

        if (!(cliplink.includes("youtube") || cliplink.includes("youtu.be"))) {
            alert('Not a YouTube link!')
        } else {
        
            let newarray = [];
            var newarrayOfClipLinks = [];
            var newarrayOfDelayStartTimes = []; 
            var newarrayOfDelayEndTimes = []; 
            var newarrayOfClipStartTimes = []; 
            
            for (let i = 0, len = arrayOfClipLinks.length; i < len; i++) {
                newarrayOfClipLinks.push(arrayOfClipLinks[i]);
                newarrayOfDelayStartTimes.push(arrayOfDelayStartTimes[i]);
                newarrayOfDelayEndTimes.push(arrayOfDelayEndTimes[i]);
                newarrayOfClipStartTimes.push(arrayOfClipStartTimes[i]);
            }
            newarrayOfClipLinks.push(cliplink);
            newarrayOfDelayStartTimes.push(delaystarttime);
            newarrayOfDelayEndTimes.push(delayendtime);
            newarrayOfClipStartTimes.push(clipstarttime);
            for (let i = 0, len = newarrayOfClipLinks.length; i < len; i++) {
                newarray.push(i);
            }

            console.log(newarrayOfClipLinks);
            console.log(newarrayOfDelayStartTimes);
            console.log(newarrayOfDelayEndTimes);
            console.log(newarrayOfClipStartTimes);
            console.log(newarray);
            setarrayOfClipLinks(newarrayOfClipLinks);
            setarrayOfDelayStartTimes(newarrayOfDelayStartTimes);
            setarrayOfDelayEndTimes(newarrayOfDelayEndTimes);
            setarrayOfClipStartTimes(newarrayOfClipStartTimes);
            setindexarray(newarray);

            setcliplink("");
            setdelaystarttime("00:00");
            setdelayendtime("00:00");
            setclipstarttime("00:00");

        }
    }

    function saveeverything(event) {
        event.preventDefault();

        if (indexarray.length===0) {
            alert("You didn't attach any links!");
            return;
        }

        setalldone(true);
        //compile stuff into computer data
        var masteryoutubelinkid = masterlink.substring(masterlink.length-11); //
        var stringOfDelayStartSeconds = ""; //
        for (let i = 0, len = arrayOfDelayStartTimes.length; i < len; i++) {
            stringOfDelayStartSeconds+=((parseInt(arrayOfDelayStartTimes[i].split(":")[0])*60) + (parseInt(arrayOfDelayStartTimes[i].split(":")[1])));
            if (i<len-1) {
                stringOfDelayStartSeconds+=","
            }
        }
        var stringOfDelayEndSeconds = ""; //
        for (let i = 0, len = arrayOfDelayEndTimes.length; i < len; i++) {
            stringOfDelayEndSeconds+=((parseInt(arrayOfDelayEndTimes[i].split(":")[0])*60) + (parseInt(arrayOfDelayEndTimes[i].split(":")[1])));
            if (i<len-1) {
                stringOfDelayEndSeconds+=","
            }
        }
        var stringOfClipStartSeconds = ""; //
        for (let i = 0, len = arrayOfClipStartTimes.length; i < len; i++) {
            stringOfClipStartSeconds+=((parseInt(arrayOfClipStartTimes[i].split(":")[0])*60) + (parseInt(arrayOfClipStartTimes[i].split(":")[1])));
            if (i<len-1) {
                stringOfClipStartSeconds+=","
            }
        }
        var stringOfClipLinkIDs = ""; //
        for (let i = 0, len = arrayOfClipLinks.length; i < len; i++) {
            stringOfClipLinkIDs+=arrayOfClipLinks[i].substring(arrayOfClipLinks[i].length-11);
            if (i<len-1) {
                stringOfClipLinkIDs+=","
            }
        }

        var theirid = Date.now();

        //TODO: upload the following to firebase in this db structure
    //     [theirid]
	//          -> mainyt: [masteryoutubelinkid]
	//          -> DelayStartSeconds: [stringOfDelayStartSeconds]
    //          -> DelayEndSeconds: [stringOfDelayEndSeconds]
    //          -> ClipStartSeconds: [stringOfClipStartSeconds]
    //          -> ClipLinkIDs: [stringOfClipLinkIDs]
    
        setfinallink(window.location.href + "?id=" + theirid);
    }

    function changedelaystarttime(event) {
        let userinput = event.target.value+"";
        if (userinput.length===2) {
            let newthing = userinput+=":";
            setdelaystarttime(newthing);
        } else {
            setdelaystarttime(userinput);
        }
        event.preventDefault();
    }
    function changedelayendtime(event) {
        let userinput = event.target.value+"";
        if (userinput.length===2) {
            let newthing = userinput+=":";
            setdelayendtime(newthing);
        } else {
            setdelayendtime(userinput);
        }
        event.preventDefault();
    }
    function changeclipstarttime(event) {
        let userinput = event.target.value+"";
        if (userinput.length===2) {
            let newthing = userinput+=":";
            setclipstarttime(newthing);
        } else {
            setclipstarttime(userinput);
        }
        event.preventDefault();
    }

    if (alldone) {
        return (
            <div class="createvideopage">
                <center>
                    <br /><br /><br />
                    <div className="introbox">
                        <center>
                            <h1>Here's your SyncPlay link!</h1>
                            
                            <p><a className="whitelink" target="_blank" href={finallink}>{finallink}</a></p>

                            <CopyToClipboard text={finallink}>
                                <p id="copybutton">Click to copy</p>
                            </CopyToClipboard>
                        </center>
                    </div>
                </center>
            </div>
        )
    } else {
        console.log('rendered!');
        console.log(arrayOfClipLinks);
        console.log(arrayOfDelayStartTimes);
        console.log(arrayOfDelayEndTimes);
        console.log(arrayOfClipStartTimes);
        console.log(indexarray);
        return (
            <div class="createvideopage">
                <center>                    

                    { mastersaved ?
                        <>
                            <h1>Now Creating a SyncPlay</h1>
                            <h3>Master Video Link: </h3>
                            <p><a className="whitelink" target="_blank" href={masterlink}>{masterlink}</a></p>
                        </>
                    :
                        <>
                            <h1>Welcome to SyncPlay</h1>
                            <div className="introbox">
                                SyncPlay lets you create a synchronous viewing experience that involves multiple YouTube videos playing in tandem. 
                                Using SyncPlay, you can sync smaller clips to appear and reappear below your main video at specified times.
                                <br /><br />
                                This simple tool was created specifically for YouTube reaction channels to share reactions to YouTube videos without getting copyright striked. SyncPlay contributes to views on both the reactor's channel and the video being reacted to.
                                <br />
                            </div>
                            <div className="introbox">
                                <h2>Create a SyncPlay</h2>
                                <form onSubmit={savemasterlink}>
                                    <label className="label">Enter the link to your "master" YouTube Video</label>
                                    <p className="descr">For reactors, this is your reaction video.</p>
                                    <input className="textinput" type="text" value={masterlink} onChange={(event) => setmasterlink(event.target.value)}/>
                                    <input className="savebutton" id="savebuttoninput"  type="submit" value="Save" />
                                </form>
                            </div>
                        </>
                    }
                </center>
    
                    { mastersaved ?
                    <>
                        <div className="bisplit">
                            <div className="leftcolumn">
                            {indexarray.length===0 ? <><p>No synced clips yet.</p></> : <></>}
                            {
                                indexarray.map(
                                    index => (
                                        <div className="clipinfo">
                                            <p><b>Clip Link: </b><a className="whitelink"  target="_blank" href={arrayOfClipLinks[index]}> {arrayOfClipLinks[index]} </a></p>
                                            <p><b>Master Start Time: </b> {arrayOfDelayStartTimes[index]}</p>
                                            <p><b>Master End Time: </b> {arrayOfDelayEndTimes[index]}</p>
                                            <p><b>Clip Start Time: </b> {arrayOfClipStartTimes[index]}</p>
                                        </div>
                                    )
                                )
                            }
                            </div>

                            <div className="divider" />

                            <div className="rightcolumn">
                                <form onSubmit={saveclip}>
                                    <label className="label">Enter the link for a clip to sync up</label>
                                    <p className="descr">For reactors, this is a video you're reacting to.</p>
                                    <input  className="textinput" type="text" value={cliplink} onChange={(event) => setcliplink(event.target.value)}/>
                                    <br /><br />
                                    <label className="label">At what time in the master video should the clip appear?</label><br />
                                    <p className="descr">Format: MM:SS</p>
                                    <input  className="textinput" type="text" value={delaystarttime} onFocus={() => setdelaystarttime("")} onChange={(event) => changedelaystarttime(event)} />
                                    <br />
                                    <label className="label">At what time in the master video should the clip disappear?</label><br />
                                    <p className="descr">Format: MM:SS</p>
                                    <input  className="textinput" type="text" value={delayendtime} onFocus={() => setdelayendtime("")} onChange={(event) => changedelayendtime(event)} />
                                    <br />
                                    <label className="label">From timestamp within the clip should the clip begin playing? </label>
                                    <p className="descr">(Normally 00:00, to start playing the clip from the beginning)</p>
                                    <input  className="textinput" type="text" value={clipstarttime} onFocus={() => setclipstarttime("")} onChange={(event) => changeclipstarttime(event)} />
                                    <br />
                                    <input className="savebutton" id="savebuttoninput" type="submit" value="Save" />
                                </form>
                            </div>
                        </div>
                        
                        <center><button className="generatebutton" onClick={saveeverything}>Generate SyncPlay</button></center>
                        <br /><br /><br />
                    </>
                    : <></> }
                
            </div>
        );
    }
}

function SignInPage() {
    
    if (window.location.href.includes("?id=")) {
        return (
            <ViewVideoPage />
        );
    } else {
        return (
            <CreateVideoPage />
        );
    }
    
}

//NONE OF THE CODE BELOW MATTERS OR SHOULD BE TOUCHED BECAUSE SOMETHING WILL BREAK

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                /><br />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                /><br />
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>
                <br /><br />
                {error && <p>{error.message}</p>}
                <br /><br />
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };