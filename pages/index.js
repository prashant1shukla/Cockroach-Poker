'use strict'
/* global fetch, sessionStorage, alert */

import React from 'react'
import { useState , useEffect} from 'react';
// import '../components/App.css';
import Router from 'next/router'
import Head from 'next/head'
// import PageLayout from '../components/PageLayout.js'
// import PageHeader from '../components/PageHeader.js'
// import Home from '../components/Home.js'
// import Create from '../components/Create.js'
// import Join from '../components/Join.js'
import CreateOrJoin from '../components/CreateOrJoin'
import WaitandQueue from '../components/WaitandQueue'
import Game from '../components/Game'
import GameOver from '../components/GameOver'
import IntrotoGame from '../components/IntrotoGame'
import chatlogo from '../components/logos/chat.png'
import closeimg from '../components/logos/close.png'
import sendimg from '../components/logos/sendimg.png'
import useJSON from './useJSON';
import useJSON_single from './useJSON_single'
import { auth } from './firebase';
import { database } from './firebase';
import { firestore } from './firebase';
// import { functions } from './firebase';
import { signInWithPopup, GoogleAuthProvider } from '@firebase/auth';
import { async } from '@firebase/util';
import { useAuthState } from 'react-firebase-hooks/auth';
import {storage} from './firebase';
import { ref } from 'firebase/database'
import firebase from "firebase/app"

// const storage = firebase.storage();

// const auth = firebase.auth();
// const database=firebase.database();


function App() {
  const [user]=useAuthState(auth);
  return (
    <div className="App">
      <section>
        {user ? <Intro user={user}/> : <SignIn/>}
      </section>
    </div>
  );
}

function Intro({user}){
  const [togame,settogame]=useState(false);

  return (
    <div>
      {togame?
        <GameView user={user} back={()=>{settogame(false)}}/>
      :
        <div>
          <Topbar user={user}/>
          <IntrotoGame play={()=>{settogame(true)}}/>
        </div>
      }
    </div>
  );
}
// export default function Home1(){
//   const [user,setuser]=useAuthState(auth); 
//   const googleAuth=new GoogleAuthProvider();
  // const login= async() =>{
  //   const result= await signInWithPopup(auth, googleAuth);
  // };

//   useEffect(()=>{
//     console.log(user);
//   },[user]);

//   return(
//     <div>
//       <h1> Login In Please </h1>
//       <button onClick={login}>LOGIN</button>
//       <div onClick={()=> auth.signOut()}>
//       </div>
//         {user? " Welcome, "+ user.displayName: ""}
//       </div>    
//   );
// }
function SignIn(){
  const SignInWithGoogle=()=>{
    const provider= new GoogleAuthProvider();
    // auth.signInWithPopup(provider);
    // const login= async() =>{
      const result= signInWithPopup(auth, provider);
    // };
  }
  const googlelogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Qtkd_EC4KjMapVmMqlvpVkGQkkqYumPmw8GHla9MKtZIMaIPRZey6dqnHbo3FTMfDBw&usqp=CAU";
  return(
    <div className="SignIn">
      <div>
        <div>
          <h2 className="gname">Set</h2>
          <h1 style={{color:"#0f0"}}>Sign In</h1>
          <br/>
        </div>
        <div className="auth google" onClick={SignInWithGoogle} style={{marginBottom:"100px"}}>
          <img src={googlelogo} alt="Can't be rendered"/>
          <div style={{padding:"0px 10px",fontWeight:"600"}}>Sign in with Google</div>
        </div>
      </div>
    </div>
  )
}
function SignOut(){
  return auth.currentUser && (
    <button onClick={()=>auth.signOut()}>Sign Out</button>
  )
}
function Topbar({user}){
  return(
    <div className="topbar">
      <img src={user.photoURL} alt="Can't be rendered"/>
      <h4>{user.displayName}</h4>
      {/* <Chat user={user}  room="" _public={true}/> */}
      <SignOut/>
    </div>
  )
}
function Chat({room,user,_public}){
  const [height,setheight]=useState("0px");
  const [message,setmessage]=useState("");
  const [senderr,setsenderr]=useState(" ");
  const ref=firebase?.database().ref(_public?"msgs":"Rooms/"+room+"/msgs");
  const [msgs] = useJSON(ref);
  const [highlight,sethighlight]=useState(false);
  const [len,setlen]=useState(0);
  const [unread,setunread]=useState(0);
  const [lastlen,setlastlen]=useState(0);
  useEffect(()=>{
    if(height==="0px"){
      sethighlight(true);
      console.log("highlight");
    }
    // eslint-disable-next-line
  },[len])
  useEffect(()=>{
    if(len!==msgs.length){
      const val=(msgs.length-lastlen>0)?msgs.length-lastlen:0;
      setunread(val);
      setlen(msgs.length);
      if(unread<0)
        setunread(0);
    } 
    if(height!=="0px"){
      sethighlight(false);
      setunread(0);
      setlastlen(len);
    }
    var msgsdiv=document.getElementById("chatsdiv");
    msgsdiv.scrollTop=msgsdiv.scrollHeight;
      // eslint-disable-next-line
  },[msgs,height,len])
  function checkmsg(e){
    if(e.keyCode===13){
      send();
      return;
    }
    const msg=e.target.value;
    setmessage(msg);
    if(msg.length!==0)
      setsenderr("");
  }
  function send(){
    if(message.length===0){
      setsenderr("Can't send a empty message.")
      return;
    }
    setsenderr("")
    var path="msgs";
    if(!_public)
      path="Rooms/"+room+"/msgs";
    console.log(message);
    database.ref(path).push({
      uid : user.uid,
      msg : message,
      time : new Date().getTime(),
      name : user.displayName,
      img : user.photoURL
    });
    document.getElementById("sendmsg").value="";
  }
  function processtime(_time){
    const diff=(new Date().getTime()-Number(_time))/1000;
    const mins=Math.floor(diff/60);
    if(mins===0)
      return "just now";
    if(mins===1)
        return mins+" minute ago";
    if(mins<60)
      return mins+" minutes ago";
    const hrs=Math.floor(diff/(60*60));
    if(hrs===1)
      return hrs+" hour ago";
    if(hrs<24)
      return hrs+" hours ago";
    const days=Math.floor(diff/(60*60*24));
    if(days===1)
      return "yesterday";
    if(days<7)
      return days+" days ago";
    const weeks=Math.floor(diff/(60*60*24*7));
    if(weeks===1)
      return weeks+" week ago";
    if(weeks<5)
      return weeks+" weeks ago";
    const months=Math.floor(diff/(60*60*24*7*30));
    if(months===1)
      return months+" month ago";
    if(months<12)
      return months+" months ago";
    const years=Math.floor(diff/(60*60*24*7*365));
    if(years===1)
      return years+" year ago";
    return years+" years ago";
    
  }
  return(
    <>
      <img src={chatlogo} style={{height:"50px",width:"50px",position:"fixed",zIndex:5,bottom:"40px",right:"40px",cursor:"pointer"}} onClick={()=>{setheight("100vh")}} alt="error loading.."/>
      <div style={{position:"fixed",width:"100%",bottom:"0px",height:height,background:"#000000af",zIndex:7}} onClick={()=>{setheight("0px")}}></div>
      <div style={{background:"#0f0",color:"#000",fontWeight:"bold",width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",bottom:"70px",right:"70px",position:"fixed",zIndex:6,cursor:"pointer"}} onClick={()=>{setheight("100vh")}}>{unread}</div>
      <div style={{position:"fixed",bottom:"0px",width:"100%",maxWidth:"500px",background:"#000",overflow:"hidden",maxHeight:height,transition:"all 0.5s",zIndex:8,left:"50%",transform:"translateX(-50%)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <img src={chatlogo} style={{height:"50px",width:"50px",marginLeft:"20px"}} alt="error loading.."/>
            <h2 style={{flexGrow:1,padding:"20px"}}>{_public?"Global Chat":"Messages"}</h2>
            <img src={closeimg} style={{height:"50px",width:"50px",marginRight:"20px",cursor:"pointer"}} onClick={()=>{setheight("0px")}} alt="error loading.."/>
          </div>
          {
            console.log(highlight)
          }
          <div style={{marginBottom:"10px",borderTop:"2px solid #ffffff8f",height:"60vh",overflowY:"scroll"}} id="chatsdiv">
            {
              msgs.map( _msg =>{
                return ( 
                  <div style={{padding:"5px",margin:"0px 10px",borderBottom:"2px solid #ffffff4f"}} key={_msg.key}>
                    <div style={{display:"flex",marginTop:"5px"}}>
                      <img src={_msg.val.img} style={{height:"30px",width:"30px",margin:"0px 5px",borderRadius:"50%"}} alt="error loading.."/>
                      <div style={{fontSize:"0.8rem",textAlign:"left",flexGrow:1}}>
                        <div style={{opacity:0.6,marginLeft:"20px",marginTop:"2px",display:"flex"}}>
                          <div style={{flexGrow:1}}>{user.uid===_msg.val.uid?"You":_msg.val.name}</div>
                          <div>{processtime(_msg.val.time)}</div>
                        </div>
                        <div style={{marginLeft:"20px",marginBottom:"10px"}}>{_msg.val.msg}</div>
                      </div>
                    </div>
                  </div>
                )
            })
            }
          </div>
          <div style={{margin:"10px"}}>
            <div style={{display:"flex"}}>
              <input type="text" placeholder="Type Someting ..." onKeyUp={checkmsg} id="sendmsg"/>
              <img src={sendimg} style={{height:"40px",width:"40px",marginRight:"20px",cursor:"pointer"}} onClick={send} alt="error loading.."/>
            </div>
            <div className="error" style={{color:"#f00"}}>{senderr}</div>
          </div>
      </div>
    </>
  )
}
function GameView({user,back}){
  const [status,setstatus]=useState(null);
  const [room,setroom]=useState(null);
  const [isallready,setallready]=useState(0);
  const[data,setdata] = useState();
  const [players] = []

  console.log("The room is : ",room);
  console.log("The status is : ",status);
  // setdata(room);
  const [playerkey , setplayerkey] = useState(" ");  

  useEffect(()=>{
    setstatus("not entered");
  },[]);
  // useEffect(()=>{
  //   console.log(data);
  //   if(data?.status){
  //     const _status=data.status;
  //     if(status!==_status){
  //       setstatus(data.status);
  //       if(_status==="isallready")
  //         setallready(1);
  //     }
  //   }
  // },[data,status]);
  function NewGame(){
    setstatus("not entered");
    setroom(" ");
  }
  function DeleteRoom(){
    database.ref("RoomNames/"+room).remove();
    database.ref("Rooms/"+room).remove();
    setstatus("not entered");
  }
  return(
    <div>
      {status==="not entered"?
        <div className="gamebox" style={{display:"block"}}>
          <Topbar user={user}/>
          <CreateOrJoin Setstatus={setstatus} database={database} SetRoom={setroom} user={user} setplayerkey={setplayerkey}/>
          <button onClick={back}>Home</button>
        </div>
      :
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}} className="gamebox">
          <div>
            {(status==="queuing" || status==="isallready")?
            <WaitandQueue database={ database } playerkey={playerkey} room={room} players={room?.players} data={data} isallready={isallready}/>
            :""}
            {
              status==="started"?
              <Game database={database} user={user} data={data} playerkey={playerkey} room={room} players={room?.players}/>
              :""
              }
            {
              status==="gameover"?
              <GameOver  database={database} data={data} players={room?.players} room={room} playerkey={playerkey} deleteroom={DeleteRoom} newgame={NewGame}/>
              :""
            }
            <Chat user={user}  room={room} _public={false}/>
          </div>
        </div>
      } 
      {
        console.log("rerendering")
      }
    </div>
  )
}
export default App;










// //new end

// export default function Home1(){
//   const [user,setuser]=useAuthState(auth); 
//   const googleAuth=new GoogleAuthProvider();
//   const login= async() =>{
//     const result= await signInWithPopup(auth, googleAuth);
//   };

//   useEffect(()=>{
//     console.log(user);
//   },[user]);

//   return(
//     <div>
//       <h1> Login In Please </h1>
//       <button onClick={login}>LOGIN</button>
//       <div onClick={()=> auth.signOut()}>
//       </div>
//         {user? " Welcome, "+ user.displayName: ""}
//       </div>    
//   );
// }



// new 
// export default class Index extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       header: 'Cockroach Poker',
//       show: ['home']
//     }
//     this.handleCreate = this.handleCreate.bind(this)
//     this.handleJoin = this.handleJoin.bind(this)
//     this.backToHome = this.backToHome.bind(this)
//   }
//   showing (componentName) {
//     return this.state.show.includes(componentName)
//   }
//   handleCreate () {
//     this.setState({
//       show: ['create'],
//       header: 'Create Game'
//     })
//   }
//   handleJoin () {
//     this.setState({
//       show: ['join'],
//       header: 'Join Game'
//     })
//   }
//   async handleCreateJoinSubmit (event) {
//     try {
//       event.preventDefault()
//       const form = event.target
//       const data = { playerName: form.name.value }
//       if (form.code && (form.code.value >= 1000000 || form.code.value < 0)) {
//         throw new Error(
//           'Game must be 6 digits or less, and cannot be negative.'
//         )
//       } else if (form.code) {
//         data.gameCode = form.code.value
//       }
//       const response = await fetch('/join', {
//         method: 'post',
//         headers: {
//           'Content-type': 'application/json; charset=UTF-8'
//         },
//         body: JSON.stringify(data)
//       })
//       const responseData = await response.json()

//       if (responseData.error) {
//         throw responseData.error
//       }
//       sessionStorage.authKey = JSON.stringify(responseData)
//       Router.push('/game')
//       return true
//     } catch (e) {
//       alert('Error: ' + e.message)
//       if (e.name !== 'UserException') {
//         console.error(e)
//       }
//       return false
//     }
//   }
//   backToHome () {
//     this.setState({
//       header: 'Cockroach Poker',
//       show: ['home']
//     })
//   }
//   render () {
//     return (
//       <PageLayout title='Cockroach Poker'>
//         <PageHeader>
//           <h1 className='display-4'>{ this.state.header }</h1>
//         </PageHeader>
//         { this.showing('home') &&
//           <Home onClickCreate={this.handleCreate}
//             onClickJoin={this.handleJoin} /> }

//         { this.showing('create') &&
//           <Create onSubmit={this.handleCreateJoinSubmit}
//             onClickBack={this.backToHome} /> }

//         { this.showing('join') &&
//           <Join onSubmit={this.handleCreateJoinSubmit}
//             onClickBack={this.backToHome} /> }

//         <style jsx>{`
//           .hidden {
//             display: none;
//           }
//         `}</style>
//       </PageLayout>
//     )
//   }
// }

// import Head from 'next/head'
// import test from './test';
// //---third attempt--
// export default function Home1 () {
//   return (
//     <div>
//     <p>yo</p>
      
//       <test />
//     </div>
//   );
// }