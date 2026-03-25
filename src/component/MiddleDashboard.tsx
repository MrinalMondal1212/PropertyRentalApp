import { MoveLeft, MoveRight, Search } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { PieChart } from "@mui/x-charts/PieChart";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "swiper/css";
import "swiper/css/navigation";
import { BarChart } from "@mui/x-charts";
import { productsList } from "../store/adminproducts/adminproducts.thunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BUCKET_ID, storage } from "../lib/appwriteConfig";

const MiddleDashboard = () => {
  const data = [
    { city: "Kolkata", properties: 30 },
    { city: "Mumbai", properties: 20 },
    { city: "Bangalore", properties: 35 },
    { city: "Delhi", properties: 25 },
    { city: "Hydrabad", properties: 8 },
    { city: "Pune", properties: 12 },
    { city: "chennai", properties: 5 },
  ];
  const { properties, loading, error } = useSelector(
    (state: any) => state.adminproducts,
  );
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(productsList());
  }, [dispatch]);

  return (
    <div className=" flex justify-center bg-[#F5F7FB]">
      <div className="flex flex-col  justify-center w-[1000px]">
        <div className="flex items-center mt-[50px]   h-[66px] gap-5 bg-white rounded-[40px] px-4 py-2 w-[440px]">
          <Search size={30} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none flex-1"
          />
        </div>

        {/* how many property is live !!!!!! */}
        <div className="flex mt-[50px] justify-between bg-white rounded-xl shadow-md px-6 py-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">125</p>
            <p className="text-sm text-gray-500">Live Properties</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">45</p>
            <p className="text-sm text-gray-500">For Sale</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">30</p>
            <p className="text-sm text-gray-500">For Rent</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-500">New Listings</p>
          </div>
        </div>
        <div>
          <p className="text-[33px] mt-7 font-medium">All Properties </p>
        </div>

        {/* ! carousel is here !!!!!! */}
        {loading && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
        {error && <p>{error}</p>}
        <div className="w-[1000px]  mx-auto mt-10 relative">
          {/* Buttons OUTSIDE */}
          <button className="prev-btn absolute  w-[60px] h-[60px] bg-black rounded-full flex justify-center items-center left-[-60px] top-1/2 px-4 py-2">
            <MoveLeft color="#FFA400" size={45} />
          </button>

          <button className="next-btn absolute w-[60px] h-[60px] bg-black rounded-full flex justify-center items-center right-[-60px] top-1/2 px-4 py-2">
            <MoveRight color="#FFA400" size={45} />
          </button>

          <Swiper
            className="mb-[50px] mt-[50px]"
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            loop={true}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn",
            }}
          >
            {properties?.map((property: any) => (
              <SwiperSlide key={property.$id}>
                <div
                  className="h-[650px] border p-3 border-[#FFA400] flex flex-col  text-black
             text-xl rounded-[40px]"
                >
                  <img
                    src={
                      property.image.startsWith("http")
                        ? property.image // use external URL
                        : storage.getFileView(BUCKET_ID, property.image) // use Appwrite file
                    }
                    alt={property.name}
                    className="w-[500px] rounded-[40px] h-[350px] object-cover"
                  />
                  <div className="flex mt-3 justify-between">
                    <div>
                      <p className=" mb-3 mt-3 text-[37px] font-semibold text-indigo-600 text-lg">
                        {property.name}
                      </p>
                      <p className=" mb-3 mt-3 text-[37px] text-lg">
                        {" "}
                        <span className="font-semibold">Price :</span>{" "}
                        {property.price}$
                      </p>
                      <p className=" mb-3 mt-3 text-[37px] text-lg">
                        <span className="font-semibold">Location : </span>{" "}
                        {property.location}
                      </p>
                      <hr className="border-t mb-3 border-[#E7A837]" />
                      <p className="font-light text-[15px] ">
                        <span className="font-extrabold">
                          Property Details :
                        </span>{" "}
                        {property.description}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* pie chart is here !!!!!! */}
        <p className="text-[33px] font-medium mb-[25px] mt-[25px]">
          Property Type Distribution
        </p>
        <div className="flex ">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "Apartment" },
                  { id: 1, value: 15, label: "Pg" },
                  { id: 2, value: 20, label: "House" },
                ],
              },
            ]}
            width={300}
            height={400}
          />
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: data.map((item) => item.city),
              },
            ]}
            series={[
              {
                data: data.map((item) => item.properties),
                label: "Properties",
              },
            ]}
            width={600}
            height={500}
          />
        </div>

        {/* here is the appwrite data or backend data  */}
      </div>
    </div>
  );
};

export default MiddleDashboard;
