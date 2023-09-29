import {
  ConnectWallet,
  useConnectionStatus,
  useWallet,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const CONTRACT_ADDR = "0x72975704D51163F46ecF8e959Db08A2c0bE0347f";
export default function Paper() {
  const connectionStatus = useConnectionStatus();
  const wallet = useWallet();
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (connectionStatus === "connected") {
      const personalWallet = wallet.getPersonalWallet();

      // this is a signer if you need it
      wallet.getSigner().then((signer) => console.log("signer", signer));

      // you need to cast to "as EmbeddedWallet" in typescript to get the getEmail function EmbeddedWallet from "@thirdweb-dev/wallets"
      personalWallet?.getEmail().then((email) => setEmail(email));
    }
  }, [connectionStatus, wallet]);

  const handleWrapMatic = async () => {
    try {
      const signer = await wallet.getSigner();
      console.log("await signer.getAddress()", await signer.getAddress());
      const contract = new ethers.Contract(
        // wrapped matic
        "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
        ["function deposit() public payable"],
        signer
      );

      // ethers response
      const result = await contract.deposit({
        value: ethers.utils.parseUnits("10000", "wei"),
      });
      console.log("result", result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditAvatar = async () => {
    try {
      const signer = await wallet.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDR,
        [
          "function editAvatar(uint256 avatarId, uint256[] calldata accessoryIdsToDetach, uint256[] calldata accessoryIdsToAttach) external",
        ],
        signer
      );
      const result = await contract.editAvatar(16, [34], []);
      // ethers response
      console.log("result", result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-10 text-center">
      <h1 className="text-4xl mx-auto font-bold">
        Paper X Metropolis Wallet Test
      </h1>
      {connectionStatus === "connected" ? (
        <>
          <p className="text-2xl mt-5">Logged in as {email}</p>
          <div className="flex flex-row gap-4">
            <ConnectWallet
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
            />
            {/* If you don't verify your contract */}

            <button
              className="bg-green-400 text-white p-2 rounded-md mx-auto mt-5 flex-1"
              onClick={() => handleWrapMatic()}
            >
              Wrap Matic
            </button>

            <button
              className="bg-blue-400 text-white p-2 rounded-md mx-auto mt-5 flex-1"
              onClick={() => handleEditAvatar()}
            >
              Edit Avatar
            </button>

            {/* If you verify your contract */}
            {/* <Web3Button
              className="bg-green-400 text-white p-2 rounded-md mx-auto mt-5 flex-1"
              contractAddress={CONTRACT_ADDR}
              action={async (contract) =>
                contract.call(
                  "customisedPublicMint",
                  [
                    [2635, 2636, 308, 2637, 167, 169],
                    [34, 3],
                    await wallet.getAddress(),
                  ],
                  {
                    value: ethers.utils.parseEther("0.2"),
                  }
                )
              }
              onError={(error) => console.log("error", error)}
              onSubmit={() => console.log("submitted")}
              onSuccess={(result) => console.log("SUCCESS", result)}
            >
              Mint Avatar
            </Web3Button>
            <Web3Button
              className="bg-green-400 text-white p-2 rounded-md mx-auto mt-5 flex-1"
              contractAddress={CONTRACT_ADDR}
              action={
                ((contract) => contract.call("editAvatar"), [16, [34], []])
              }
              onError={(error) => console.log("error", error)}
              onSubmit={() => console.log("submitted")}
              onSuccess={(result) => console.log("SUCCESS", result)}
            >
              Edit Avatar
            </Web3Button> */}
          </div>
        </>
      ) : (
        <ConnectWallet
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
        />
      )}
    </div>
  );
}
