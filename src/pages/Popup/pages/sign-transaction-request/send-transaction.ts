import { ethers } from "ethers";
import { GelatoRelayPack } from "@safe-global/relay-kit";
import Safe, {
  EthersAdapter,
  getSafeContract,
} from "@safe-global/protocol-kit";
import {
  MetaTransactionData,
  MetaTransactionOptions,
  OperationType,
  RelayTransaction,
} from "@safe-global/safe-core-sdk-types";

const sendTransactionCustom = async (signer: any, safeAddress: any) => {
  // https://chainlist.org
  const chainId = 5;

  // Any address can be used for destination. In this example, we use vitalik.eth
  const destinationAddress = "0xD8821C13491E020e4817D0fa1477d4667bB2dA4a";
  const withdrawAmount = ethers.utils.parseUnits("0.005", "ether").toString();

  // Usually a limit of 21000 is used but for smart contract interactions, you can increase to 100000 because of the more complex interactions.
  const gasLimit = "500000";

  // Create a transaction object
  const safeTransactionData: MetaTransactionData = {
    to: destinationAddress,
    data: "0x", // leave blank for native token transfers
    value: withdrawAmount,
    operation: OperationType.Call,
  };
  const options: MetaTransactionOptions = {
    gasLimit,
    isSponsored: true,
  };

  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  });

  const safeSDK = await Safe.create({
    ethAdapter,
    safeAddress,
  });

  const relayKit = new GelatoRelayPack('3g61OpPl9vqpxzZID6zqLIf3E9DPNS2HDMOx39JX74k_');

  const safeTransaction = await safeSDK.createTransaction({
    safeTransactionData,
  });

  const signedSafeTx = await safeSDK.signTransaction(safeTransaction);
  const safeSingletonContract = await getSafeContract({
    ethAdapter,
    safeVersion: await safeSDK.getContractVersion(),
  });

  const encodedTx = safeSingletonContract.encode("execTransaction", [
    signedSafeTx.data.to,
    signedSafeTx.data.value,
    signedSafeTx.data.data,
    signedSafeTx.data.operation,
    signedSafeTx.data.safeTxGas,
    signedSafeTx.data.baseGas,
    signedSafeTx.data.gasPrice,
    signedSafeTx.data.gasToken,
    signedSafeTx.data.refundReceiver,
    signedSafeTx.encodedSignatures(),
  ]);

  const relayTransaction: RelayTransaction = {
    target: safeAddress,
    encodedTransaction: encodedTx,
    chainId,
    options,
  };
  const response = await relayKit.relayTransaction(relayTransaction);

  console.log(
    `Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`
  );
};

export default sendTransactionCustom;
