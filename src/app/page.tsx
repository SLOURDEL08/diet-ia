import type { NextPage } from 'next';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-center mt-10">Bienvenue sur DietIA</h1>
    </Layout>
  );
};

export default Home;