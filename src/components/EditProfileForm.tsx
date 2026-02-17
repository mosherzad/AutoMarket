"use client";
import Image from "next/image";
import { FaSave } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/lib/constants";
import { User } from "@/generated/prisma/client";
import { UploadThingButton } from "@/providers/uploadthing";
import { useTranslations } from "next-intl";

interface EditProfileFormProps {
  user: User;
}
const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(
    user.phoneNumber || null,
  );
  const [img, setImage] = useState(user.img);

  const t = useTranslations("editProfilePage");
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${DOMAIN}/api/users/profile/${user.id}`, {
        email,
        username,
        phoneNumber,
        img,
      });
      toast.success("Your profile updated successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{t("editProfileTitle")}</h1>

      <form
        onSubmit={handleFormSubmit}
        className="bg-white rounded-2xl shadow p-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="h-24 w-24 relative rounded-full overflow-hidden border shadow pointer-events-none">
            <Image
              src={img || "/Images/user.png"}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold text-lg">{t("profilePicture")}</p>
            <p className="text-sm text-gray-500">{t("uploadHint")}</p>

            <label className="bg-gray-50 text-black p-3 rounded-lg cursor-pointer inline-block hover:bg-gray-100 border ">
              <UploadThingButton
                currentImages={img ? [img] : []}
                maxImages={1}
                onUploaded={(urls) => {
                  if (urls.length > 0) setImage(urls[0]);
                }}
              />
            </label>
          </div>
        </div>

        <hr className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label={t("username")}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Mohammed"
              className="w-full outline-none bg-transparent"
            />
          </Field>

          <Field label={t("email")}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mohammed@email.com"
              className="w-full outline-none bg-transparent"
            />
          </Field>

          <Field label={t("phoneNumber")}>
            <input
              type="number"
              value={phoneNumber ?? ""}
              onChange={(e) => setPhoneNumber(e.target.value || null)}
              placeholder="+964"
              className="w-full outline-none bg-transparent no-spinner"
            />
          </Field>
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="submit"
            className=" flex items-center space-x-2 px-5 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition cursor-pointer"
          >
            <FaSave size={18} />
            <span>{t("saveChanges")}</span>
          </button>
        </div>
      </form>
    </section>
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
    <div>
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <div className="mt-1 border rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-black">
        {children}
      </div>
    </div>
  );
}
export default EditProfileForm;
