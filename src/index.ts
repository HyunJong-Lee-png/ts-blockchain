import crypto from 'crypto';

interface BlockShape {
  hash: string
  prevHash: string
  height: number
  data: string
}

class Block implements BlockShape {
  hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string,
  ) {
    this.hash = Block.calculateHash(prevHash, height, data)
  }
  static calculateHash(prevHash: string, height: number, data: string): string {
    // const toHash = `${prevHash}${height}${data}`;
    // const salt = crypto.randomBytes(16);
    // const hash = crypto.pbkdf2Sync(toHash,salt,100000,32,'sha512');
    // return hash.toString('hex');

    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash('sha256').update(toHash).digest('hex')
  }
}

class BlockChain {
  private blocks: Block[]
  constructor() {
    this.blocks = [];
  }
  private getPrevHash(): string {
    if (this.blocks.length === 0) {
      return '';
    }
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
    this.blocks.push(newBlock);
  }
  public getBlocks(){
    return   structuredClone(this.blocks);
  }
};

const block = new BlockChain()
block.addBlock('ss');
block.addBlock('ss1');
block.getBlocks()[0].hash = '31faw2'
console.log(block.getBlocks())
