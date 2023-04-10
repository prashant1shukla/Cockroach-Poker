import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      
      <Head>
        <title>
          WedDev Ayo!
        </title>
      </Head>
      
      <h1>Welcome to next </h1>
    </div>
    )
}
