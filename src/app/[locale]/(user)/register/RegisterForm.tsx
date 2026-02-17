/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DOMAIN } from "@/lib/constants";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { toast } from "react-toastify";
import { Link } from "@/i18n/navigation";

export function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations("signUp");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const router = useRouter();
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "") return toast.error("Name is required");
    if (email === "") return toast.error("Email is required");
    if (password === "") return toast.error("Password is required");

    try {
      await axios.post(`${DOMAIN}/api/users/register`, {
        username,
        email,
        password,
      });
      router.replace("/");
      router.refresh();
    } catch (error: any) {
      const message = error?.response?.data?.message;
      if (message?.toLowerCase().includes("email")) {
        setErrors({ email: message });
      } else if (message?.toLowerCase().includes("contain")) {
        setErrors({ password: message });
      } else if (message?.toLowerCase().includes("too small")) {
        setErrors({ password: message });
      } else {
        toast.error(message);
      }
    }
  };
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-bold text-xl lg:text-2xl">
          {t("createAccount")}
        </CardTitle>
        <CardAction>
          <Link href={"/login"} className=" text-sm hover:underline">
            {t("alreadyAccount")}
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-6 relative">
            <div className="grid gap-2">
              <Label htmlFor="username">{t("name")}</Label>
              <Input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                id="name"
                type="text"
                placeholder={t("enterName")}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">{t("password")}</Label>
              </div>
              <div className="relative">
                <Input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="********"
                  className="pr-10"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                <IoEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          onClick={handleFormSubmit}
          type="submit"
          className="w-full cursor-pointer"
        >
          {t("signUp")}
        </Button>
      </CardFooter>
    </Card>
  );
}
