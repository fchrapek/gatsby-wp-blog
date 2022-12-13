import { useState } from "react";

export default function useDummy({ dummy, inputs }) {
  const [order, setOrder] = useState([]);

  function addToOrder(orderedDummy) {
    setOrder([...order, orderedDummy]);
  }

  function removeFromOrder(index) {
    setOrder([
      ...order.slice(0, index),
      ...order.slice(index + 1),
    ]);
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}