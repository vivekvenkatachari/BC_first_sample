/**
 * Created by vivekvenkatachari on 8/22/17.
 */
const sha = require('sha256');

class Block {
    constructor(index,data,timestamp, previousHash = '') {
        this.index = index;
        this.data = data;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = this.getHash();
    }

    getHash() {
        return sha(this.index+this.timestamp+this.previousHash+JSON.stringify(this.data));
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.genesisBlock()];
    }
    genesisBlock() {
        return new Block(0,{count:1},new Date(),0);
    }
    addBlock(block) {
        block.previousHash = this.chain[this.chain.length-1].hash;
        block.hash = block.getHash();
        this.chain.push(block);
    }

}

let firstSample = new BlockChain();
firstSample.addBlock(new Block(1, {count:2}, new Date()));
firstSample.addBlock(new Block(2, {count:3}, new Date()));
console.log(firstSample);