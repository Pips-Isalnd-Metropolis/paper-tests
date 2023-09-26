import { PaperEmbeddedWalletSdk } from '@paperxyz/embedded-wallet-service-sdk';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react';
import { parseEther } from 'ethers';

export default function Paper() {
	const [paper, setPaper] = useState();
	const [email, setEmail] = useState();
	const [walletAddress, setWalletAddress] = useState();

	useEffect(() => {
		const paper = new PaperEmbeddedWalletSdk({
			clientId: process.env.NEXT_PUBLIC_PAPER_CLIENT_ID,
			chain: 'Mumbai',
		});
		setPaper(paper);
	}, []);

	const handleLogin = async () => {
		try {
			const user = await paper.auth.loginWithPaperModal();
			if (user !== null) {
				setEmail(user?.user?.authDetails?.email);
				setWalletAddress(user?.user?.walletAddress);
			}
			console.log(user);
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogout = async () => {
		try {
			await paper.auth.logout();
			setEmail(null);
		} catch (error) {
			console.log(error);
		}
	};

	const handleMintAvatar = async () => {
		try {
			const params = {
				contractAddress: '0x72975704D51163F46ecF8e959Db08A2c0bE0347f',
				methodInterface:
					'function customisedPublicMint(uint256[] _baseIds, uint256[] _accessoryIds, address _to) external payable',
				methodArgs: [
					[2635, 2636, 308, 2637, 167, 169],
					[34, 3],
					walletAddress,
				],
				value: 201530000000000000,
			};

			const { transactionHash } = await paper.wallet.gasless.callContract(
				params
			);
			console.log(transactionHash);
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditAvatar = async () => {
		try {
			const params = {
				contractAddress: '0x72975704D51163F46ecF8e959Db08A2c0bE0347f',
				methodInterface:
					'function editAvatar(uint256 avatarId, uint256[] calldata accessoryIdsToDetach, uint256[] calldata accessoryIdsToAttach) external',
				methodArgs: [16, [34], []],
			};

			const { transactionHash } = await paper.wallet.gasless.callContract(
				params
			);
			console.log(transactionHash);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='m-10 text-center'>
			<h1 className='text-4xl mx-auto font-bold'>
				Paper X Metropolis Wallet Test
			</h1>
			{email && email ? (
				<>
					<p className='text-2xl mt-5'>Logged in as {email}</p>
					<div className='flex flex-row gap-4'>
						<button
							className='bg-red-400 text-white p-2 rounded-md mx-auto mt-5 flex-1'
							onClick={() => handleLogout()}
						>
							Logout
						</button>

						<button
							className='bg-green-400 text-white p-2 rounded-md mx-auto mt-5 flex-1'
							onClick={() => handleMintAvatar()}
						>
							Mint Avatar
						</button>

						<button
							className='bg-blue-400 text-white p-2 rounded-md mx-auto mt-5 flex-1'
							onClick={() => handleEditAvatar()}
						>
							Edit Avatar
						</button>
					</div>
				</>
			) : (
				<button
					className='bg-blue-400 text-white p-2 rounded-md mx-auto mt-5'
					onClick={() => handleLogin()}
				>
					Authenticate
				</button>
			)}
		</div>
	);
}
