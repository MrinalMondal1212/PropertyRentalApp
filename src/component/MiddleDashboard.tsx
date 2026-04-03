import { MoveLeft, MoveRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { PieChart } from "@mui/x-charts/PieChart";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "swiper/css";
import "swiper/css/navigation";
import { BarChart } from "@mui/x-charts";
import { productsList } from "../store/adminproducts/adminproducts.thunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { BUCKET_ID, DATABASE_ID, databases, storage, USERS_COLLECTION_ID } from "../lib/appwriteConfig";
// import Skeleton from "@mui/material/Skeleton";

const MiddleDashboard = () => {
  const [count, setCount] = useState(0);
  const { properties, loading, error } = useSelector(
    (state: any) => state.adminproducts,
  );
  // showing total property
  const totalProperty = properties.length;
  //showing individual property
  const villasCount = properties.filter(
    (p: any) => p.type?.toLowerCase() === "villa",
  ).length;

  const apartmentsCount = properties.filter(
    (p: any) => p.type?.toLowerCase() === "apartment",
  ).length;

  const bungalowCount = properties.filter(
    (p: any) => p.type?.toLowerCase() === "bungalow",
  ).length;

  // showing city and apratment via pie chart and bar chart
  const locationData = properties.reduce((acc: any, curr: any) => {
    const location = curr.location; // from Appwrite

    if (!acc[location]) {
      acc[location] = 0;
    }

    acc[location]++;

    return acc;
  }, {});
  const chartData = Object.keys(locationData).map((loc) => ({
    location: loc,
    count: locationData[loc],
  }));

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(productsList());
  }, [dispatch]);

  const getUsersCount = async () => {
    try {
      const res = await databases.listDocuments(
        DATABASE_ID,
        USERS_COLLECTION_ID
      );

      setCount(res.total); // 🔥 important
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsersCount();
  }, []);

  return (
    <div className=" flex justify-center bg-[#F5F7FB]">
      <div className="flex flex-col  justify-center w-[1400px]">
        {/* how many property is live !!!!!! */}
        <div className="flex mt-[50px] justify-between bg-white rounded-xl shadow-md px-6 py-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{count}</p>
            <p className="text-sm text-gray-500">Total Users</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{totalProperty}</p>
            <p className="text-sm text-gray-500">Live Properties</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{bungalowCount}</p>
            <p className="text-sm text-gray-500">Bungalow</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {apartmentsCount}
            </p>
            <p className="text-sm text-gray-500">Apartment</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{villasCount}</p>
            <p className="text-sm text-gray-500">Villa</p>
          </div>
        </div>
        <div>
          <p className="text-[33px] mt-7 font-medium">All Properties </p>
        </div>

        {/* ! carousel is here !!!!!! */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress size={100} />
          </Box>
        )}
        {error && <p>{error}</p>}
        <div className="w-[1400px]  mx-auto mt-3 relative">
          {/* Buttons OUTSIDE */}
          <button
            ref={prevRef}
            className="prev-btn absolute  w-[60px] h-[60px] bg-black rounded-full flex justify-center items-center left-[-60px] top-1/2 px-4 py-2"
          >
            <MoveLeft color="#FFA400" size={45} />
          </button>

          <button
            ref={nextRef}
            className="next-btn absolute w-[60px] h-[60px] bg-black rounded-full flex justify-center items-center right-[-60px] top-1/2 px-4 py-2"
          >
            <MoveRight color="#FFA400" size={45} />
          </button>

          <Swiper
            modules={[Navigation , Autoplay]}
            spaceBetween={20}
            slidesPerView={4}
            loop={true}
            speed={800}
            autoplay={{
              delay: 2000, // ⏱️ time between slides
              disableOnInteraction: false,
               pauseOnMouseEnter: true, // keeps autoplay even after click
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper: any) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
          >
            {properties?.map((property: any) => (
              <SwiperSlide key={property.$id}>
                <div
                  className="h-[600px] border p-3 border-[#FFA400] flex flex-col  mb-[65px] text-black
             text-xl rounded-[40px]"
                >
                  <img
                    src={
                      property.image.startsWith("http")
                        ? property.image // use external URL
                        : storage.getFileView(BUCKET_ID, property.image) // use Appwrite file
                    }
                    alt={property.name}
                    className="w-[400px] rounded-[40px] h-[350px] object-cover"
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
        <div className="flex justify-between items-center  mb-[256px]">
          <div>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: apartmentsCount, label: "Apartment" },
                    { id: 1, value: villasCount, label: "Villa" },
                    { id: 2, value: bungalowCount, label: "Bungalow" },
                  ],
                },
              ]}
              width={500}
              height={400}
            />
          </div>
          {/* barchart is here  */}
          <div>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: chartData.map((item) => item.location),
                },
              ]}
              series={[
                {
                  data: chartData.map((item) => item.count),
                  label: "Properties",
                },
              ]}
              width={700}
              height={500}
            />
          </div>
        </div>

        {/* here is the appwrite data or backend data  */}
      </div>
    </div>
  );
};

export default MiddleDashboard;
