import { GetStaticProps } from 'next';

import { stripe } from '../services/stripe';

import { FaReact } from 'react-icons/fa';

import { SubscribeButton } from '../components/SubscribeButton'

import Head from 'next/head';

import Image from 'next/image';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }) {
  return (
    <body className={styles.body}>
      <main className={styles.contentContainer}>
        <div className={styles.Hero}>
          <h1>News About <br /> <span>Programming</span></h1>
          <FaReact className={styles.reacticon} />
          <p> Get acess to all the publications <br /> <span>for {product.amount} month</span></p>
          <SubscribeButton priceId={product.priceId} />
        </div>
      </main>
    </body>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KdvsMCm3ows6X9JJtAni3UX')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours 
  }
}
