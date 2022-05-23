import { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  const [walletAddress, setWalletAddress] = useState(null)

  //Function to check if wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      const {solana} = window

      if (solana && solana.isPhantom) {
        console.log('Phantom wallet found!')


        //This function allows us to connect directy with users wallet
        //onlyIfTrusted checks if wallet is already connected
        const response = await solana.connect({onlyIfTrusted: true})

        console.log('Connected with public key: ', response.publicKey.toString())

        //set users public key to be used later

        setWalletAddress(response.publicKey.toString())
      } else {
        alert('Solana object not found. Get a Phantom Wallet 👻')
      }
    }catch(error) {
      console.log(error)
    }
  }

  const connectWallet = async () => {
    const {solana} = window

    if (solana) {
      const response = await solana.connect()
      console.log('Conntcted with Public Key: ', response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    }
  }

  const renderNotConnectedContainer = () => (
    <button className='cta-button connect-wallet-button' onClick={connectWallet}>
     Connect to Wallet
    </button>
  )

  useEffect(() => {

    //It is recommended to wait for the window to fully load before checking for solana object
    const onLoad = async () => {
      await checkIfWalletIsConnected()
    }

    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)

  }, [])
  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨ 
          </p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
