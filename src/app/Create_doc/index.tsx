import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { Button } from 'antd';
import * as anchor from '@coral-xyz/anchor';
import Blog_IDL from '@/types/blog_test.json';
import DSC_IDL from '@/types/digital_signatures_contract.json';

export default function CreateDocs() {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const provider = new anchor.AnchorProvider(connection, wallet!, {});
  anchor.setProvider(provider);
  const program = new anchor.Program(DSC_IDL as anchor.Idl, Blog_IDL.metadata.address);

  const new_blog = async () => {
    if (!wallet) return;
    const [blogPDA, _blogBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('blog'), wallet?.publicKey.toBuffer()],
      program.programId,
    );
    console.log(blogPDA.toString());

    const txhash = await program.methods
      .initialize()
      .accounts({
        authority: wallet!.publicKey,
        blog: blogPDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log(`https://explorer.solana.com/tx/${txhash}?cluster=devnet`);

    const blog = await program.account.blog.fetch(blogPDA);
    console.log('Blog: ', blog);
  };

  const create_post = async () => {
    if (!wallet) return;

    const data = {
      title: 'Hello World',
      content: 'This is a test post',
      slug: 'hello-world',
    };

    const [blogPDA, _blogBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('blog'), wallet?.publicKey.toBuffer()],
      program.programId,
    );

    const [postPDA, _postBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('post'), Buffer.from(data.slug), wallet?.publicKey.toBuffer()],
      program.programId,
    );

    console.log(blogPDA.toString(), postPDA.toString());

    const txHash = await program.methods
      .createPost(data)
      .accounts({
        authority: wallet.publicKey,
        blog: blogPDA,
        post: postPDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log(`https://explorer.solana.com/tx/${txHash}?cluster=devnet`);

    const post = await program.account.post.fetch(postPDA);
    console.log('Post: ', post);
  };

  const get_blog = async () => {
    if (!wallet) return;
    const data = await connection.getProgramAccounts(program.programId);
    console.log(data);
  };

  const init_storage = async () => {
    if (!wallet) return;
    const data_init = {
      id: '0',
      name_storage: 'Digital_Signatures_Contract',
    };
    const [storePDA, _storeBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('storage'), Buffer.from(data_init.id)],
      program.programId,
    );

    const txHash = await program.methods
      .initialize(data_init)
      .accounts({
        authority: wallet.publicKey,
        initStorage: storePDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log(`https://solscan.io/account/${txHash}?cluster=devnet`);
  };

  return (
    <div className='flex space-x-1'>
      <Button onClick={init_storage}>Create Storage</Button>
      {/* <Button onClick={create_post}>Create POST</Button>
      <Button onClick={get_blog}>GET BLOG</Button> */}
    </div>
  );
}
