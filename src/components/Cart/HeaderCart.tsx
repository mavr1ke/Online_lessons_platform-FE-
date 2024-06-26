import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../../slices/cartSlice";
import "./HeaderCart.css";

const HeaderCart: React.FC = () => {
  const { items } = useSelector(selectCart);
  const totalCount = items.reduce(
    (acc: number, item: { count: number }) => acc + item.count,
    0
  );

  useEffect(() => {
  }, [totalCount]);


  return (
    <>


    </>
  );
};

export default HeaderCart;
