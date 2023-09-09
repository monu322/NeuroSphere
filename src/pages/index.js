import dynamic from "next/dynamic";
import HomeMain from "./home1";

const index = () => {
  return (
    <>
      <HomeMain />
    </>
  );
};

//export default dynamic(() => Promise.resolve(index), { ssr: false });
export default index;


