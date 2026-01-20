"use client";
import Image from "next/image";
import { FaSave } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/lib/constants";
import { User } from "@/generated/prisma/client";
import { UploadThingButton } from "@/providers/uploadthing";

interface EditProfileFormProps {
  user: User;
}
const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [img, setImage] = useState(user.img);

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
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      <form
        onSubmit={handleFormSubmit}
        className="bg-white rounded-2xl shadow p-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="h-24 w-24 relative rounded-full overflow-hidden border shadow">
            {img ? (
              <Image src={img} alt="Profile" fill className="object-cover" />
            ) : (
              <Image
                src={"/Images/user.png"}
                alt="Profile"
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold text-lg">Profile Picture</p>
            <p className="text-sm text-gray-500">
              Upload a clear and recent photo
            </p>

            <div className="bg-gray-100 text-black rounded-full ">
              <UploadThingButton
                currentImages={img ? [img] : []}
                maxImages={1}
                onUploaded={(urls) => {
                  if (urls.length > 0) setImage(urls[0]);
                }}
              />
            </div>
          </div>
        </div>

        <hr className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Username">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Mohammed"
              className="w-full outline-none bg-transparent"
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mohammed@email.com"
              className="w-full outline-none bg-transparent"
            />
          </Field>

          <Field label="Phone Number">
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
          <button className="flex items-center space-x-2 px-5 py-3 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <MdOutlineCancelPresentation size={18} /> <span>Cancel</span>
          </button>

          <button
            type="submit"
            className=" flex items-center space-x-2 px-5 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition cursor-pointer"
          >
            <FaSave size={18} />
            <span>Save Changes</span>
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
