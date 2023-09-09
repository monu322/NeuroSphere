import { useEffect } from "react";
import mouseEffect from "../../common/mouseEffect";

const Cursor = () => {
  useEffect(() => {
    mouseEffect();
  }, []);

  return (
    <>
      <div className="mouse-cursor cursor-outer"></div>
      <div className="mouse-cursor cursor-inner"></div>
    </>
  );
};

export default Cursor;
