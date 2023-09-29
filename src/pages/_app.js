import { Mumbai } from "@thirdweb-dev/chains";
import {
  ThirdwebProvider,
  embeddedWallet,
  smartWallet,
} from "@thirdweb-dev/react";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
export const activeChain = Mumbai;

export const smartWalletConfig = smartWallet(embeddedWallet(), {
  // you'd have to update this to your own factory address when you go live
  factoryAddress: "0x9C1E8af2EebbabBa69ed56640FBB2DC353129635",
  gasless: true,
});

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={[smartWalletConfig]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
