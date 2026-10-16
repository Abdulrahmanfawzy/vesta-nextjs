import Image from "next/image";
import { ImagePlus, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import anonymousPhoto from "../../../../../assets/images/known.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProfileFormData, profileSchema } from "../../../../../schemas/profile.schema";
import { useEffect, useRef, useState } from "react";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileSettingsProps {
  isActive?: boolean;
}

const ProfileFormSkeleton = () => {
  return (
    <>
      {/* Name & Email */}
      <div className="flex w-full gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Phone & ID */}
      <div className="flex w-full gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Passwords */}
      <div className="flex w-full gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Save Button */}
      <Skeleton className="h-10 w-42 rounded-md" />
    </>
  );
};

const ProfileSettings = ({ isActive }: ProfileSettingsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    data: profileResponse,
    isPending,
    isError,
    error,
  } = useGetProfile();
  const {
    mutateAsync: updateProfile,
    isPending: isUpdating,
  } = useUpdateProfile();
 

  const queryClient = useQueryClient();

  const user = profileResponse?.data?.user;
  const profileImage = previewImage || user?.avatar_url || null;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
  });
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        identity: String(user.id),
        password: "",
        confirmPassword: "",
      })
    }
  }, [user, reset])

  const onSubmit = async (data: ProfileFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("phone", data.phone);

    if (selectedImage) {
      formData.append("avatar", selectedImage);
    }

    if (data.password?.trim()) {
      formData.append("password", data.password);
    }

    try {
      const result = await updateProfile(formData);

      if (result.success) {
        reset({
          ...data,
          email: user?.email ?? data.email,
          identity: String(user?.id ?? data.identity),
          password: "",
          confirmPassword: "",
        });

        setSelectedImage(null);

        if (previewImage) {
          URL.revokeObjectURL(previewImage);
          setPreviewImage(null);
        }

        await queryClient.invalidateQueries({
          queryKey: ["profile"],
        });
      }
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };



  if (isError) {
    return (
      <p role="alert">
        {error instanceof Error
          ? error.message
          : "Failed to load profile"}
      </p>
    );
  }
  return (
    <div className={isActive ? "flex w-full min-w-0 gap-8" : "hidden"}>
      <div className="relative h-24 w-24 shrink-0">
        <Image
          src={profileImage || anonymousPhoto}
          alt="Profile"
          width={96}
          height={96}
          className="h-full w-full rounded-full object-cover"
          unoptimized
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (!file) return;

            setSelectedImage(file);

            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
          }}
        />
        <button
          type="button"
          aria-label="Change profile image"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-white p-1 text-black"
        >
          <ImagePlus className="h-5 w-5" />
        </button>
      </div>

      <form
        className="flex min-w-0 flex-1 flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isPending ? (
          <ProfileFormSkeleton />
        ) : (
          <>
            {/* ---name & email------------------------------------------- */}
            <div className="flex w-full gap-4">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
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
                  placeholder="Enter your email"
                  {...register("email")}
                  readOnly
                  className="w-full cursor-not-allowed bg-muted"
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
                  type="phone"
                  placeholder="010 1234 5678"

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
                  type="number"
                  placeholder="Enter your Id"
                  {...register("identity")}
                  readOnly
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
                    placeholder="Enter your password.."
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
                    placeholder="Repeat your password.."
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
              disabled={isUpdating}
              className="w-42 bg-app-primary text-white hover:bg-app-primary/90"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default ProfileSettings;
