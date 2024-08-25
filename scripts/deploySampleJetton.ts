import { Address, toNano } from '@ton/core';
import { SampleJetton } from '../wrappers/SampleJetton';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../utils/jetton-helpers';

export async function run(provider: NetworkProvider) {
    const jettonParams = {
        name: 'Mayur token',
        description: 'Ready to give rewards as token',
        symbol: 'REWARDS',
        image: 'https://violet-chemical-kingfisher-18.mypinata.cloud/ipfs/QmVPiEFpi5VPSf2FJ4oY7B15Ni7Pqa4zxFXXqPZ6juhinn',
    };

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);

    const sampleJetton = provider.open(
        await SampleJetton.fromInit(provider.sender().address as Address, content, 1000000000000000000n),
    );

    await sampleJetton.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Mint',
            amount: 100000000000000000n,
            receiver: provider.sender().address as Address,
        },
    );

    await provider.waitForDeploy(sampleJetton.address);

    // run methods on `sampleJetton`
}
