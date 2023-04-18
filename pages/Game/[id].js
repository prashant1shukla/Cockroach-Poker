import { useRouter } from 'next/router'
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image"
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand

}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Game = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
    
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden' style = {{height:"100vh", width:'100%' ,display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
      }} >
        

      <MDBRow>
      <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
            Welcome 
          </h1>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
            To your Room:  <br />
            <span style={{color: 'hsl(218, 81%, 75%)'}}>{id}</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
          This much code I've implemented for the Cockroach Poker. I learned a lot while creating this game. I came across new tech stacks like Next.js and Firebase I learnt about them and started implementing them also.  I've faced several difficulties (regarding firebase, rendering, newer syntax and even more) regarding that also which even took more than a day for me. Further the code for the game will be implemented later on.
          </p>

        </MDBCol>

        <MDBCol md='6' className='position-relative'>

          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
            <p className='px-3' style={{color: 'black'}}>
            It was great learning new Technology like Next.js and Firebase.
            </p>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>
      

    </MDBContainer>
    
    </>
  
    
  );
}

export default Game

