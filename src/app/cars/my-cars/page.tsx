import Link from "next/link";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";
import { Car } from "@/generated/prisma/client";
import { getMyCars } from "@/apiCalls/carApiCall";

const MyCarsPage = async () => {
  const myCars: Car[] = await getMyCars();
  return (
    <section className="max-w-7xl container mx-auto max-sm:px-6 overflow-hidden">
      {myCars.length > 0 && (
        <h1 className="font-bold text-2xl my-3">My Cars</h1>
      )}
      <div className="grid lg:grid-cols-4 gap-5 grid-cols-1 md:grid-cols-3 mb-8">
        {myCars.length === 0 ? (
          <h1 className=" text-xl md:text-4xl text-gray-500 flex items-center justify-center h-100 max-w-7xl md:w-7xl mx-auto container">
            You haven’t listed any cars for sale yet.{" "}
          </h1>
        ) : (
          myCars.map((myCar) => (
            <div
              key={myCar.id}
              className="flex flex-col border border-gray-300 container mx-auto max-sm:w-sm bg-white hover:shadow-lg transition-all duration-200 hover:scale-99 rounded-lg"
            >
              <div className=" relative flex items-center justify-center w-full h-50 overflow-hidden">
                <Image
                  src={myCar.images[0]?.url || "/images/1.jpg"}
                  fill
                  alt="car image"
                  className="hover:scale-105 transition-all duration-300 w-full rounded-t-lg  object-cover"
                />
              </div>
              <div className="p-2">
                <Link
                  href={`/car/${myCar.id}`}
                  className="text-sm lg:text-xl font-bold line-clamp-1 hover:underline"
                >
                  {myCar.brand}
                </Link>
                <p className="line-clamp-1">{myCar.description}</p>
                <span className="font-bold ">${myCar.price.toString()}</span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={""}
                      className=" px-1 py-1 text-xl rounded-md hover:bg-red-600 hover:text-white text-neutral-800 cursor-pointer font-semibold transition-all duration-300"
                    >
                      <MdDelete />
                    </Link>
                    <Link
                      href={`/cars/edit-cars/${myCar.id}`}
                      className=" px-1 py-1 text-xl rounded-md hover:bg-cyan-500 hover:text-white text-neutral-800 cursor-pointer font-semibold transition-all duration-300"
                    >
                      <MdEdit />
                    </Link>
                  </div>
                  <Link
                    href={`/cars/${myCar.id}`}
                    className="float-right px-3 py-1 rounded-lg bg-gray-100 text-neutral-800 font-semibold my-3 hover:bg-gray-200 transition-all duration-200"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default MyCarsPage;
