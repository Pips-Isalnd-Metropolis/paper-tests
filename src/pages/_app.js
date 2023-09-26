import '@/styles/globals.css'

import { PaperEmbeddedWalletSdk } from '@paperxyz/embedded-wallet-service-sdk'

// initialize the SDK
// const sdk = new PaperEmbeddedWalletSdk({
//   clientId: process.env.NEXT_PUBLIC_PAPER_CLIENT_ID,
//   chain: 'Mumbai',
// })

// log the user in
// const user = await sdk.auth.loginWithPaperModal()

// // Execute a transaction without the user wallet needing gas money
// const { transactionHash } = await user.wallet.gasless.callContract({
//   methodInterface: 'function mintFreeNft(uint256 quantity) external',
//   methodArgs: [1],
//   contractAddress: '0x...',
// })

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
