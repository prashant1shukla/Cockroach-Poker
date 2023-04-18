import React,{ useState } from 'react'
// import './IntroGame.css'
import instaimg from './logos/insta.png'
import githubimg from './logos/github.png'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon
  }
  from 'mdb-react-ui-kit';
  import 'mdb-react-ui-kit/dist/css/mdb.min.css';
  import "@fortawesome/fontawesome-free/css/all.min.css";
export default function IntrotoGame({ play }) {
    const [showresult, setshowresult] = useState(false)
    return (
        <div className="mainbox" style={{height:"100vh", margin:'0', maxWidth:'none', display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundImage: 'url(https://images.unsplash.com/photo-1518133120397-258d5eb470c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)'}}>
            {showresult?
                <div style={{paddingTop:'350px', paddingBottom:'30px'}}> 
                    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{'borderRadius':'15px'}}>
                    <div className='mask gradient-custom-3'></div>
                    <MDBCard className='m-5' >
                        <MDBCardBody className='px-5'>
                        
                        <h2 className="text-uppercase text-center mb-5">Cockroach Poker</h2>
                        <div className="rules">
                        <div>
                        1. The player going first picks a card from their hand, passes it over to another player of their choice, and states the name of the creature on the card, correctly or incorrectly. For example, "Cockroach".
                        </div>
                        <div>
                        2. The receiving player now has two options:
                        </div>
<div>Accept the Card - They decide to accept the card and say "True" if they believe that the card is indeed the creature the first player claimed, i.e. Cockroach in our example, or "False" if they believe that it is not. If they are correct, the first player has to take the card and keep in front of them. If they are incorrect, they have to take the card themselves.
</div>
<div>Pass the Card - They decide not to accept the card and pass it on to another player of their choice. In this case, they can peek at the card before passing it on. They must also confirm the first player's claim or make a new claim, eg. they can pass the card to another player claiming it is a Cockroach or making a new claim that it is a Frog. The next player then has the same two options, and so on.

                        </div>
                        <div>
                        3. A card can be passed on until it has been passed to every player once. The last player who receives the card has no choice but to accept it and must try to judge if the previous player's claim was true or false. The player who the card is "palmed off onto" takes it and places it face up on the table in front of them.
                        </div>
                        
                        <div>
                        4. This player starts the next round by offering a card from their hand. The game ends when a player gets four-of-a-kind, four cards with the same creature, e.g., four cockroaches, or when a player with no more cards in their hand has to start a round. 
                        </div>
                        
                    </div><br/>
                    <button onClick={()=>{setshowresult(false)}}>Back</button>
                        
                        </MDBCardBody>
                    </MDBCard>
                    </MDBContainer>
                </div>
            :
                
                <div>
                    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{'borderRadius':'15px'}}>
                    <div className='mask gradient-custom-3'></div>
                    <MDBCard className='m-5' style={{width:"vh"}}>
                        <MDBCardBody className='px-5'>
                        <h2 className="text-uppercase text-center mb-5">Cockroach Poker</h2>
                        
                        <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={play}>Play</MDBBtn>
                        <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={()=>{setshowresult(true)}}>How to Play</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                    </MDBContainer>
                    {/* <div className="gname">Set</div>
                    <button onClick={play}>Play</button>
                    <br/>
                    <button onClick={()=>{setshowresult(true)}}>How to play</button>
                    <div className="desc">
                        * Read 'How to Play' before playing . *
                    </div>
                    <div className="cne">
                        ©2023 Prashant Shukla
                    </div>
                    <div className="cne">
                        <a href="https://www.linkedin.com/in/prashant-shukla-6aa9441bb/">
                            <img src={instaimg} alt="Error" />
                        </a>
                        <a href="https://github.com/prashant1shukla">
                            <img src={githubimg} alt="Error" />
                        </a>
                    </div> */}
                </div>

            }
        </div>
    )
}