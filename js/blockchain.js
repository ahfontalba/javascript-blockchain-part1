const Block = require('./block.js');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        let genesisBlock = new Block(0, new Date(), 'Genesis Block', '#');
        genesisBlock.hash = genesisBlock.calculateHash();
        return genesisBlock;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        let newBlock = new Block(this.chain.length, new Date(), data, this.getLatestBlock().hash);
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            
            console.log('\nChecking block ' + i + ' hash');

            if(currentBlock.hash != currentBlock.calculateHash()) {
                console.log('hash for block ' + i + ': INvalid');
                return false;
            }
            
            console.log('hash for block ' + i + ': valid');

            console.log('\nChecking link to previous block hash');
            if(currentBlock.previousHash != previousBlock.hash) {
                console.log('previous hash for block ' + i + ': does NOT link correctly to hash of block ' + (i -1));
                return false;
            }
            console.log('previous hash for block ' + i + ': links correctly to hash of block ' + (i -1));
        }
        return true;
    }
}

module.exports = Blockchain;