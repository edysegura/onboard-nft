import Nullstack from 'nullstack'

class ResellNFT extends Nullstack {
  price
  image

  async hydrate({ params }) {
    console.log({ params })
  }

  async listNFTForSale({
    router,
    _ethers: ethers,
    marketplaceAddress,
    NFTMarketplace,
    Web3Modal,
  }) {
    if (!this.price) return
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const priceFormatted = ethers.utils.parseUnits(this.price, 'ether')
    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer,
    )
    const listingPrice = await contract.getListingPrice()
    const priceValue = listingPrice.toString()
    const transaction = await contract.resellToken(id, priceFormatted, {
      value: priceValue,
    })
    await transaction.wait()
    router.href = '/'
  }

  render() {
    return (
      <div class="flex justify-center">
        <div class="w-1/2 flex flex-col pb-12">
          <input
            placeholder="Asset Price in ETH"
            class="mt-2 border rounded p-4"
            bind={this.price}
          />
          {this.image && (
            <img class="rounded mt-4" width="350" src={this.image} />
          )}
          <button
            onclick={this.listNFTForSale}
            class="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
          >
            List NFT
          </button>
        </div>
      </div>
    )
  }
}

export default ResellNFT
