export const formatAddress = (value) => {
    
    return value.substring(0,10) + "..." + value.substring(value.length -3,);
  }
  export const formatString = (value) => {
   
    return value.substring(0,28) + "..." + value.substring(value.length -14,);
  }
  export const formatMString = (value) => {
   
    return value.substring(0,15) + "..." + value.substring(value.length -8,);
  }
  export const truncate = (value) => {
    return value.trim(0,5)
  }
  export const handleCopy = (value) => {
    navigator.clipboard.writeText(value).then(
      () => {
       
        alert('Copied to clip Board')
      },
      (err) => {
        // Failed to copy to clipboard
        console.error('Could not copy: ', err);
      }
    );
  }

  export const chains = [
    {
        name: 'Sepolia',
        providerUrl: 'https://ethereum-sepolia-rpc.publicnode.com',
        imgUrl: './assets/chain1.svg',
        Tick: 'ETH',
        scan: 'https://sepolia.etherscan.io/',
        faucet: 'https://www.alchemy.com/faucets/ethereum-sepolia'
    },
    {
        name: 'Arb Sepolia',
        providerUrl: 'https://endpoints.omniatech.io/v1/arbitrum/sepolia/public',
        imgUrl: './assets/arb.png',
        Tick: 'ETH',
        scan: 'https://sepolia.arbiscan.io/',
        faucet: 'https://t.me/ArbitrumFaucetBot'
    },
    {
      name: 'Base Sepolia',
      providerUrl: 'https://sepolia.base.org',
      imgUrl: './assets/ba.png',
      Tick: 'ETH',
      scan: 'https://sepolia.basescan.org/',
      faucet: 'https://t.me/BaseFaucetBot'
  },
    
]