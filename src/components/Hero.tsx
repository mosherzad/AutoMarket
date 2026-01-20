"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const images = [
    {
      src: "1.jpg",
      title: "Discover the Latest Trends",
      subtitle: "Shop our new arrivals today",
    },
    {
      src: "2.jpg",
      title: "Exclusive Deals Just for You",
      subtitle: "Save big on your favorite products",
    },
    {
      src: "3.jpg",
      title: "Exclusive Deals Just for You",
      subtitle: "Save big on your favorite products",
    },
  ];

  return (
    <div className="mx-auto px-2 max-w-7xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000 }}
        loop
        className="rounded-xl w-full"
      >
        {images.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-100">
              <Image
                src={`/images/${s.src}`}
                className="w-full object-cover rounded-xl h-full"
                alt={s.title}
                width={1920}
                height={400}
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
                <h2 className="lg:text-4xl text-xl font-bold">{s.title}</h2>
                <p className="mt-2 lg:text-lg text-sm max-w-2xl">
                  {s.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
