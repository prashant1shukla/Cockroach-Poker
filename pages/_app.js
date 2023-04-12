import '@/styles/globals.css'
// new 
// import './App.css';
// import Rules from '../Components/Rules';
// import Game from '../Components/Game';
// import Home from '../Components/Home';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

// new

// const App = () => {
//   return (
//     <div className="App">
  //     <Routes>
  //     <Route path='/' element={<Home />} />
  //     <Route path='/rules' element={<Rules />} />
  //     <Route path='/game1' element={<Game2 />} />
  //     <Route path='/rules2' element={<Rules2 />} />
  //     <Route path='/game2' element={<Game />} />
  //     <Route path='/rules3' element={<Rules3 />} />
  //     <Route path='/game3' element={<Game3 />} />
  //   </Routes>
  // </div>
//   )
// }

// export default App