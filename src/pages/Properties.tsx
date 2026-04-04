import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsList } from "../store/adminproducts/adminproducts.thunk";
import AllProperties from "../component/BuyPropertySection";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const Properties = () => {
  const { properties, loading, error } = useSelector(
    (state: any) => state.adminproducts,
  );

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(productsList());
  }, [dispatch]);

  if (loading)
    return (
      <div className="mt-[150px] flex justify-center">
        <Box sx={{ width: 700 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-10">
      <AllProperties data={properties} />
    </div>
  );
};

export default Properties;
