const Blockchain = require('./js/blockchain.js');
const Block = require('./js/block.js');


let myJSCoin = new Blockchain();
myJSCoin.addBlock({amount: 10});
myJSCoin.addBlock({amount: 40});
myJSCoin.addBlock({amount: 40});

//console.log(JSON.stringify(myJSCoin, null, 4));
//console.log('\nIs blockchain valid? ' + myJSCoin.isChainValid() + '\n');

myJSCoin.chain[2].data = {amount:100};


myJSCoin.chain[2].hash = myJSCoin.chain[2].calculateHash();

console.log('\nIs blockchain valid? ' + myJSCoin.isChainValid() + '\n');

let chain = myJSCoin.chain;

for (let j=2, x = chain.length; j<x; j++) {
    console.log(chain[j].index + '-' + chain[j].data.amount);
    
    // set this node previous hash
    chain[j].previousHash = chain[j-1].hash;
    
    //recalculate hash
    let hash = chain[j].calculateHash();
    chain[j].hash = hash;
}
console.log('\nIs blockchain valid? ' + myJSCoin.isChainValid() + '\n');