import { PinataSDK } from 'pinata-web3';

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}`,
});

export const fetchFromIPFS = async (cid: string) => {
  try {
    const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching IPFS data for CID ${cid}:`);
  }
};
