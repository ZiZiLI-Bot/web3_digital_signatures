import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { Button } from 'antd';
import * as anchor from '@coral-xyz/anchor';
import Blog_IDL from '@/types/blog_test.json';
import { PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';

export default function CreateDocs() {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const provider = new anchor.AnchorProvider(connection, wallet!, {});
  anchor.setProvider(provider);
  const program = new anchor.Program(Blog_IDL as anchor.Idl, Blog_IDL.metadata.address);

  const token_program_id = new PublicKey('DKc1k886G6ZQgS4zZRZzLhJinQ7C3DBfw9sFcZwzhYXh');

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
      title: 'This is new post',
      content: 'This is a test post',
      slug: 'new-post',
    };

    const [blogPDA, _blogBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('blog'), wallet?.publicKey.toBuffer()],
      program.programId,
    );

    const [postPDA, _postBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('post'), blogPDA.toBuffer(), Buffer.from(data.slug)],
      program.programId,
    );

    console.log(blogPDA.toString(), postPDA.toString());

    const txHash = await program.methods
      .createPost(data)
      .accounts({
        authority: wallet.publicKey,
        blog: blogPDA,
        postAccount: postPDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log(`https://explorer.solana.com/tx/${txHash}?cluster=devnet`);

    const post = await program.account.post.fetch(postPDA);
    console.log('Post: ', post);
  };

  const get_blog = async () => {
    if (!wallet) return;
    const [blogPDA, _bump] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('blog'), wallet?.publicKey.toBuffer()],
      program.programId,
    );

    console.log('PDA: ', blogPDA.toString());

    const blog = await program.account.blog.fetch(blogPDA);
    console.log('Blog: ', blog);

    const authority: anchor.web3.PublicKey = blog.authority;

    console.log('Authority: ', authority.toString() === wallet.publicKey.toString());
  };

  const get_ata = async () => {
    if (!wallet) return;
    const ata = getAssociatedTokenAddressSync(token_program_id, wallet.publicKey);
    console.log('ATA: ', ata.toString());
  };

  return (
    <div className='flex space-x-1'>
      <Button onClick={new_blog}>Create Blog</Button>
      <Button onClick={create_post}>Create POST</Button>
      <Button onClick={get_blog}>GET BLOG</Button>
      <Button onClick={get_ata}>GET ATA My Address</Button>
    </div>
  );
}
