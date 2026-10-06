import Image from "next/image";
import { ImagePlus, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import manImage from "../../../../assets/images/man.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProfileFormData, profileSchema } from "../schema/profile.schema";
import { useState } from "react";

interface ProfileSettingsProps {
  isActive: boolean;
}

const ProfileSettings = ({ isActive }: ProfileSettingsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
  };

  return (
    <div className={isActive ? "flex w-full min-w-0 gap-8" : "hidden"}>
      <div className="relative h-24 w-24 shrink-0">
        <Image
          src={manImage}
          alt="Profile"
          className="h-full w-full rounded-full object-cover"
        />
        <button
          type="button"
          aria-label="Change profile image"
          className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-white p-1 text-black"
        >
          <ImagePlus className="h-5 w-5" />
        </button>
      </div>

      <form
        className="flex min-w-0 flex-1 flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* ---name & email------------------------------------------- */}
        <div className="flex w-full gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              className="w-full"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-app-error">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="w-full"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-app-error">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        {/* ---phone & id----------------------------------------- */}
        <div className="flex w-full gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label htmlFor="phone">Phone</label>
            <Input
              id="phone"
              type="text"
              {...register("phone")}
              className="w-full"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-app-error">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label htmlFor="identity">Your Id</label>
            <Input
              id="identity"
              type="text"
              {...register("identity")}
              className="w-full"
            />
            {errors.identity && (
              <p className="mt-1 text-sm text-app-error">
                {errors.identity.message}
              </p>
            )}
          </div>
        </div>
        {/* ---password------------------------------------------- */}
        <div className="flex w-full gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-app-error">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className="w-full"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-app-error">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-42 bg-app-primary text-white hover:bg-app-primary/90"
        >
          Save & Continue
        </Button>
      </form>
    </div>
  );
};

export default ProfileSettings;
