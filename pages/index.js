'use strict'

/* global fetch, sessionStorage, alert */

import React from 'react'
import Router from 'next/router'
import PageLayout from '../components/PageLayout.js'
import PageHeader from '../components/PageHeader.js'
import Home from '../components/Home.js'
import Create from '../components/Create.js'
import Join from '../components/Join.js'
import { auth } from './firebase';
import { signInWithPopup, GoogleAuthProvider } from '@firebase/auth';
import { async } from '@firebase/util';

export default function Home1(){
  const googleAuth=new GoogleAuthProvider();
  const login= async() =>{
    const result= await signInWithPopup(auth, googleAuth);
  };
  return(
    <div>
      <h1> Login In Please </h1>
      <button onClick={login}>LOGIN</button>
    </div>
  );
}


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