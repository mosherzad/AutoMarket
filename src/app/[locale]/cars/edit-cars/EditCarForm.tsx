/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Prisma } from "@/generated/prisma/client";
import { DOMAIN } from "@/lib/constants";
import { UploadThingButton } from "@/providers/uploadthing";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useTranslations } from "next-intl";

type CarWithImages = Prisma.CarGetPayload<{
  include: {
    images: true;
  };
}>;

interface EditCarFormProps {
  car: CarWithImages;
  id: string;
}

type CarType =
  | "SEDAN"
  | "SUV"
  | "HATCHBACK"
  | "COUPE"
  | "CONVERTIBLE"
  | "PICKUP"
  | "VAN"
  | "MINIVAN"
  | "WAGON"
  | "CROSSOVER"
  | "SPORT";

type Fuel = "PETROL" | "DIESEL" | "ELECTRIC" | "HYBRID";

type Transmission = "AUTOMATIC" | "MANUAL";

type Cylinder = "2" | "3" | "4" | "6" | "8" | "10" | "12" | "16";

type Location =
  | "ERBIL"
  | "DUHOK"
  | "SULAYMANIYAH"
  | "KIRKUK"
  | "HALABJA"
  | "BAGHDAD"
  | "BASRA"
  | "NINEVEH"
  | "ANBAR"
  | "NAJAF"
  | "KARBALA"
  | "BABYLON"
  | "DIYALA"
  | "DHI_QAR"
  | "MAYSAN"
  | "MUTHANNA"
  | "QADISIYAH"
  | "SALAHALDIN"
  | "WASIT";

type Status = "AVAILABLE" | "SOLD";

const EditCarForm = ({ car, id }: EditCarFormProps) => {
  const MAX_IMAGES = 5;
  const [imageUrls, setImageUrls] = useState<string[]>(
    car.images?.map((img: { url: string }) => img.url) || [],
  );
  const [cylinder, setCylinder] = useState<Cylinder | "">(
    car.cylinder ? (String(car.cylinder) as Cylinder) : "",
  );
  const [brand, setBrand] = useState(car.brand);
  const [year, setYear] = useState(car.year.toString());
  const [price, setPrice] = useState(car.price.toString());
  const [mileage, setMileage] = useState(car.mileage.toString());
  const [description, setDescription] = useState(car.description);
  const [status, setStatus] = useState<Status>(car.status);
  const [transmission, setTransmission] = useState(car.transmission);
  const [fuel, setFuel] = useState<Fuel>(car.fuel);
  const [carType, setCarType] = useState<CarType>(car.carType);
  const [location, setLocation] = useState<Location>(car.location);
  const [contactNumber, setContactNumber] = useState(car.contactNumber);
  const [loading, setLoading] = useState(false);

  const t = useTranslations("editAndAddCarForm");
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageUrls.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`${DOMAIN}/api/cars/${id}`, {
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
          <h2 className="text-2xl font-semibold">{t("editListedCar")}</h2>
          <p className="text-sm text-gray-500">{t("editSubtitle")}</p>
        </div>

        <form className="p-6 space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("carImages")}
            </label>

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

              <span className="text-sm text-gray-500">{t("uploadHint")}</span>
            </label>

            {imageUrls.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
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
                          prev.filter((_, index) => index !== i),
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
            <Field label={t("brand")}>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                name="brand"
                required
                placeholder="Mercedes Benz"
                className="w-full border-none focus:outline-none capitalize"
              />
            </Field>
            <Field label={t("year")}>
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                type="number"
                name="year"
                required
                placeholder="2014"
                className="w-full no-spinner border-none focus:outline-none"
              />
            </Field>

            <Field label={t("contactNumber")}>
              <input
                value={contactNumber || ""}
                onChange={(e) => setContactNumber(e.target.value)}
                type="number"
                name="contactNumber"
                required
                placeholder="+964"
                className="w-full no-spinner border-none focus:outline-none"
              />
            </Field>
          </div>

          <Field label={t("description")}>
            <textarea
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              rows={10}
              placeholder="Clean title, well maintained..."
              className="w-full border-none focus:outline-none resize-none"
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={t("mileage")}>
              <input
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                type="number"
                name="mileage"
                required
                placeholder="120000"
                className="w-full no-spinner border-none focus:outline-none"
              />
            </Field>

            <Field label={t("price")}>
              <input
                value={price.toString()}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                name="price"
                required
                placeholder="240000"
                className="w-full no-spinner border-none focus:outline-none"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField
              label={t("cylinders")}
              name="cylinder"
              value={cylinder}
              onChange={(e) => setCylinder(e.target.value as Cylinder)}
            >
              <option value="">{t("cylinders")}</option>
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
              label={t("fuel")}
              name="fuel"
              value={fuel}
              onChange={(e) => setFuel(e.target.value as Fuel)}
            >
              <option value="">{t("fuel")}</option>
              <option value="PETROL">{t("fuel_petrol")}</option>
              <option value="DIESEL">{t("fuel_diesel")}</option>
              <option value="ELECTRIC">{t("fuel_electric")}</option>
              <option value="HYBRID">{t("fuel_hybrid")}</option>
            </SelectField>

            <SelectField
              label={t("transmission")}
              name="transmission"
              value={car.transmission}
              onChange={(e) => setTransmission(e.target.value as Transmission)}
            >
              <option value="">{t("transmission")}</option>
              <option value="AUTOMATIC">{t("transmission_automatic")}</option>
              <option value="MANUAL">{t("transmission_manual")}</option>
            </SelectField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField
              label={t("carType")}
              name="carType"
              value={carType}
              onChange={(e) => setCarType(e.target.value as CarType)}
            >
              <option value="">{t("carType")}</option>
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
              label={t("status")}
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
            >
              <option value="">{t("status")}</option>
              <option value="AVAILABLE">{t("status_available")}</option>
              <option value="SOLD">{t("status_sold")}</option>
            </SelectField>

            <SelectField
              label={t("location")}
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value as Location)}
            >
              <option value="">{t("location")}</option>
              <option value="ERBIL">{t(`locations.${`ERBIL`}`)}</option>
              <option value="DUHOK">{t(`locations.${`DUHOK`}`)}</option>
              <option value="SULAYMANIYAH">
                {t(`locations.${`SULAYMANIYAH`}`)}
              </option>
              <option value="KIRKUK">{t(`locations.${`KIRKUK`}`)}</option>
              <option value="HALABJA">{t(`locations.${`HALABJA`}`)}</option>
              <option value="BAGHDAD">{t(`locations.${`BAGHDAD`}`)}</option>
              <option value="BASRA">{t(`locations.${`BASRA`}`)}</option>
              <option value="NINEVEH">{t(`locations.${`NINEVEH`}`)}</option>
              <option value="ANBAR">{t(`locations.${`ANBAR`}`)}</option>
              <option value="NAJAF">{t(`locations.${`NAJAF`}`)}</option>
              <option value="KARBALA">{t(`locations.${`KARBALA`}`)}</option>
              <option value="BABYLON">{t(`locations.${`BABYLON`}`)}</option>
              <option value="DIYALA">{t(`locations.${`DIYALA`}`)}</option>
              <option value="DHI_QAR">{t(`locations.${`DHI_QAR`}`)}</option>
              <option value="MAYSAN">{t(`locations.${`MAYSAN`}`)}</option>
              <option value="MUTHANNA">{t(`locations.${`MUTHANNA`}`)}</option>
              <option value="QADISIYAH">{t(`locations.${`QADISIYAH`}`)}</option>
              <option value="SALAHALDIN">
                {t(`locations.${`SALAHALDIN`}`)}
              </option>
              <option value="WASIT">{t(`locations.${`WASIT`}`)}</option>
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
                  {t("updatingCar")}
                </span>
              ) : (
                t("updateCar")
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
      <div className="rounded-xl border px-3 py-2 focus-within:ring-2 focus-within:ring-black">
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

export default EditCarForm;
