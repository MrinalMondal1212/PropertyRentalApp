// import React from 'react'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsList } from "../store/adminproducts/adminproducts.thunk";
import BuyPropertySection from "../component/BuyPropertySection";

const Properties = () => {
  // this is the code where property type will be add in different palces !!!!
  const { properties, loading, error } = useSelector(
    (state: any) => state.adminproducts,
  );
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(productsList());
  }, [dispatch]);
  const villas = properties.filter(
    (p: any) => p.type?.toLowerCase() === "villa",
  );

  const apartments = properties.filter(
    (p: any) => p.type?.toLowerCase() === "apartment",
  );

  const bungalows = properties.filter(
    (p: any) => p.type?.toLowerCase() === "bungalow",
  );
  return (
    <>
    {loading && <p>loading......</p>}
    {error && <p>{error}</p>}
      <div className="mt-[150px] flex  flex-col justify-center items-center">
        {/* this  is the apratments section  here !!!!! */}
        <div className="w-[1250px] h-[100vh]  mb-[125px]">
          <BuyPropertySection title="Apartments" data={apartments} />
        </div>
        {/* this is the bunglow section !!!!!!! */}
        <div className="w-[1250px] h-[100vh] mb-[125px]">
          <BuyPropertySection title="Bungalows" data={bungalows} />
        </div>
        <div className="w-[1250px] h-[100vh] mb-[125px]">
          <BuyPropertySection title="Villas" data={villas} />
        </div>

      </div>
    </>
  );
};

export default Properties;
