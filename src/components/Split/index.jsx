import { useEffect, useRef } from "react";

const Split = ({ className, children }) => {
  const target = useRef(null);

  const split = () => {
    if (target.current) Splitting({ target: target.current });
  }

  useEffect(() => {
    split();
  }, []);

  return (
    <div ref={target} className={className || ''}>{children}</div>
  )
}

export default Split;
