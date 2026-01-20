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
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/lib/constants";
import { IoEye } from "react-icons/io5";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  // const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "") return toast.error("Email is required");
    if (password === "") return toast.error("Password is required");
    try {
      await axios.post(`${DOMAIN}/api/users/login`, {
        email,
        password,
      });
      router.replace("/");
      router.refresh();
    } catch (error: any) {
      const message = error?.response?.data?.message;

      if (message?.toLowerCase().includes("email")) {
        setErrors({ email: message });
      } else if (message?.toLowerCase().includes("password")) {
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
          Login to your account
        </CardTitle>
        <CardAction>
          <Link href={"/register"} className="hover:underline text-sm">
            Sign Up
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-10 relative">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                id="email"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="m@example.com"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
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
                  placeholder="******"
                  className="pr-10"
                />

                <IoEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
                />
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
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
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
