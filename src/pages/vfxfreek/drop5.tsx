import type { NextPage } from "next";
import Head from "next/head";
import { Drop5Vfxfreek } from "../../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>DRiP TRACKER</title>
        <meta
          name="description"
          content="DRiP tracker allows you to visualize which DRiP NFTs you miss. It also provides information about the artist and the drop in particular."
        />
      </Head>
      <Drop5Vfxfreek />
    </div>
  );
};

export default Home;