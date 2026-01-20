/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DOMAIN } from "@/lib/constants";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { UploadThingButton } from "@/providers/uploadthing";

const MAX_IMAGES = 5;

const AddCarForm = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");
  const [carType, setCarType] = useState("");
  const [location, setLocation] = useState("");
  const [mileage, setMileage] = useState("");
  const [cylinder, setCylinder] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageUrls.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${DOMAIN}/api/cars`, {
        brand,
        year: Number(year),
        price: Number(price),
        mileage: Number(mileage),
        cylinder: Number(cylinder),
        contactNumber,
        description,
        fuel,
        transmission,
        status,
        carType,
        location,
        images: imageUrls,
      });
      toast.success("Car added successfully!");
      setBrand("");
      setYear("");
      setPrice("");
      setDescription("");
      setFuel("");
      setCarType("");
      setContactNumber("");
      setLocation("");
      setMileage("");
      setTransmission("");
      setTransmission("");
      setCylinder("");
      setImageUrls([]);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b p-6">
          <h2 className="text-2xl font-semibold">Add New Car</h2>
          <p className="text-sm text-gray-500">
            Fill in the details below to list your car
          </p>
        </div>

        <form className="p-6 space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2">Car Images</label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 hover:bg-gray-50">
              <UploadThingButton
                currentImages={imageUrls}
                maxImages={MAX_IMAGES}
                onUploaded={(urls) => {
                  if (urls.length > MAX_IMAGES) {
                    toast.error(`You can only upload ${MAX_IMAGES} images`);
                  }

                  setImageUrls(urls.slice(0, MAX_IMAGES));
                }}
              />

              <span className="text-sm text-gray-500">
                Click to upload or drag & drop
              </span>
            </label>

            {imageUrls.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {imageUrls.map((url, i) => (
                  <div key={i} className="relative group">
                    <Image
                      src={url}
                      width={150}
                      height={150}
                      alt="Car image"
                      className="h-28 w-full object-cover rounded-lg"
                    />

                    <button
                      onClick={() =>
                        setImageUrls((prev) =>
                          prev.filter((_, index) => index !== i)
                        )
                      }
                      className="absolute top-1 right-1 bg-black text-white p-1 rounded-full text-xs transition opacity-100 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Brand">
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                name="brand"
                required
                placeholder="Mercedes Benz"
                className="w-full border-none focus:outline-none capitalize"
              />
            </Field>
            <Field label="Year">
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                type="number"
                name="year"
                required
                placeholder="2014"
                className="w-full border-none focus:outline-none"
              />
            </Field>

            <Field label="Contact Number">
              <input
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                type="number"
                name="contactNumber"
                required
                placeholder="+964"
                className="w-full border-none focus:outline-none"
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              rows={10}
              placeholder="Clean title, well maintained..."
              className="w-full border-none focus:outline-none resize-none"
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Mileage (KM)">
              <input
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                type="number"
                name="mileage"
                required
                placeholder="120000"
                className="w-full border-none focus:outline-none"
              />
            </Field>

            <Field label="Price ($)">
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                name="price"
                required
                placeholder="240000"
                className="w-full border-none focus:outline-none"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField
              label="Cylinders"
              name="cylinder"
              value={cylinder}
              onChange={(e) => setCylinder(e.target.value)}
            >
              <option value="">Cylinders</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="16">16</option>
            </SelectField>

            <SelectField
              label="Fuel"
              name="fuel"
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
            >
              <option value="">Fuel</option>
              <option value="PETROL">Petrol</option>
              <option value="DIESEL">Diesel</option>
              <option value="ELECTRIC">Electric</option>
              <option value="HYBRID">Hybrid</option>
            </SelectField>

            <SelectField
              label="Transmission"
              name="transmission"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
            >
              <option value="">Transmission</option>
              <option value="AUTOMATIC">Automatic</option>
              <option value="MANUAL">Manual</option>
            </SelectField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField
              label="Car Type"
              name="carType"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
            >
              <option value="">Cay Type</option>
              <option value="SEDAN">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="HATCHBACK">Hatchback</option>
              <option value="COUPE">Coupe</option>
              <option value="PICKUP">Pickup</option>
              <option value="CONVERTIBLE">Convertible</option>
              <option value="VAN">Van</option>
              <option value="MINIVAN">Minivan</option>
              <option value="WAGON">Wagon</option>
              <option value="CROSSOVER">Crossover</option>
              <option value="SPORT">Sport</option>
            </SelectField>

            <SelectField
              label="Status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Car Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="SOLD">Sold</option>
            </SelectField>

            <SelectField
              label="Location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Location</option>
              <option value="ERBIL">Erbil</option>
              <option value="DUHOK">Duhok</option>
              <option value="SULAYMANIYAH">Sulaymaniyah</option>
              <option value="KIRKUK">Kirkuk</option>
              <option value="HALABJA">Halabja</option>
              <option value="BAGHDAD">Baghdad</option>
              <option value="BASRA">Basra</option>
              <option value="NINEVEH">Nineveh</option>
              <option value="ANBAR">Anbar</option>
              <option value="NAJAF">Najaf</option>
              <option value="KARBALA">Karbala</option>
              <option value="BABYLON">Babylon</option>
              <option value="DIYALA">Diyala</option>
              <option value="DHI_QAR">Dhi-qar</option>
              <option value="MAYSAN">Maysan</option>
              <option value="MUTHANNA">Muthanna</option>
              <option value="QADISIYAH">Qadisiyah</option>
              <option value="SALAHALDIN">Salahaldin</option>
              <option value="WASIT">Wasit</option>
            </SelectField>
          </div>

          <div className="flex justify-end">
            <button
              disabled={loading}
              type="submit"
              className="rounded-xl bg-red-600 px-6 py-3 text-white font-medium hover:bg-red-700 transition-all disabled:opacity-50 w-full cursor-pointer "
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                  Adding Car...
                </span>
              ) : (
                "Add Car"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="rounded-xl border px-3 py-2 focus-within:ring-1 focus-within:ring-black">
        {children}
      </div>
    </div>
  );
}

function SelectField({
  label,
  name,
  children,
  value,
  onChange,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <Field label={label}>
      <select
        name={name}
        required
        className="w-full bg-transparent outline-none"
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </Field>
  );
}

export default AddCarForm;
