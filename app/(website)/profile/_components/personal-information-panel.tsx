"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import PersonalInformationSkeleton from "./personal-information-skeleton";

const fieldClass =
  "h-[42px] w-full rounded-md border border-[#8A8A8A] bg-[#333333] px-3 text-sm font-light text-[#CFCFCF] outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25";

type UserProfile = {
  _id: string;
  fullName?: string;
  email?: string;
  gender?: string;
  address?: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
  postcode?: string;
  profilePicture?: string;
};

type ProfileResponse = {
  success?: boolean;
  message?: string;
  data?: UserProfile;
};

type ProfileFormData = {
  firstName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
};

const emptyFormData: ProfileFormData = {
  firstName: "",
  email: "",
  gender: "male",
  phoneNumber: "",
  address: "",
  city: "",
  country: "",
  postcode: "",
};

function splitName(fullName?: string) {
  const parts = fullName?.trim().split(/\s+/).filter(Boolean) ?? [];
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}

function getInitials(firstName?: string, lastName?: string, email?: string) {
  const name = [firstName, lastName].filter(Boolean).join(" ").trim();
  const value = name || email || "User";
  const parts = value.split(/\s+/);

  if (parts.length > 1) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return value.slice(0, 2).toUpperCase();
}

function createFormData(profile: UserProfile): ProfileFormData {
  const nameParts = splitName(profile.fullName);

  return {
    firstName: [nameParts.firstName, nameParts.lastName].filter(Boolean).join(" "),
    email: profile.email || "",
    gender: profile.gender || "male",
    phoneNumber: profile.phoneNumber || "",
    address: profile.address || "",
    city: profile.city || "",
    country: profile.country || "",
    postcode: profile.postcode || "",
  };
}

function ProfileField({
  label,
  name,
  value,
  onChange,
  className,
}: {
  label: string;
  name: keyof ProfileFormData;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-normal text-white">{label}</span>
      <input
        name={name}
        className={fieldClass}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export default function PersonalInformationPanel() {
  const { data: session, status, update } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>(emptyFormData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const syncedProfileImageRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (status === "loading") return;

      if (!session?.accessToken) {
        setIsLoading(false);
        toast.error("Please login to view your profile.");
        return;
      }

      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        if (!apiBaseUrl) {
          throw new Error("API base URL is not configured.");
        }

        const response = await fetch(
          `${apiBaseUrl.replace(/\/+$/, "")}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data: ProfileResponse | null = await response.json().catch(() => null);

        if (!response.ok || data?.success === false || !data?.data) {
          throw new Error(data?.message || "Failed to fetch profile.");
        }

        setProfile(data.data);
        setFormData(createFormData(data.data));
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to fetch profile."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [session?.accessToken, status]);

  useEffect(() => {
    const profilePicture = profile?.profilePicture;
    const sessionImage = session?.user?.profileImage || session?.user?.image;

    if (
      !profilePicture ||
      previewImage ||
      sessionImage === profilePicture ||
      syncedProfileImageRef.current === profilePicture
    ) {
      return;
    }

    syncedProfileImageRef.current = profilePicture;
    update({
      user: {
        profileImage: profilePicture,
        image: profilePicture,
      },
    });
  }, [
    previewImage,
    profile?.profilePicture,
    session?.user?.image,
    session?.user?.profileImage,
    update,
  ]);

  useEffect(() => {
    return () => {
      if (previewImage?.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const profileImage = previewImage || profile?.profilePicture || "";
  const fullName = formData.firstName.trim();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      gender: event.target.value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewImage?.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    setProfileImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session?.accessToken) {
      toast.error("Please login to update your profile.");
      return;
    }

    setIsSaving(true);
    const toastId = toast.loading("Saving profile...");

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      if (!apiBaseUrl) {
        throw new Error("API base URL is not configured.");
      }

      const payload = new FormData();
      payload.append("fullName", fullName);
      payload.append("firstName", formData.firstName);
      payload.append("email", formData.email);
      payload.append("gender", formData.gender);
      payload.append("phoneNumber", formData.phoneNumber);
      payload.append("country", formData.country);
      payload.append("city", formData.city);
      payload.append("address", formData.address);
      payload.append("postcode", formData.postcode);

      if (profileImageFile) {
        payload.append("profilePicture", profileImageFile);
      }

      const response = await fetch(
        `${apiBaseUrl.replace(/\/+$/, "")}/user/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: payload,
        }
      );
      const data: ProfileResponse | null = await response.json().catch(() => null);

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "Failed to update profile.");
      }

      const updatedProfile: UserProfile = {
        ...(profile || { _id: "" }),
        ...(data?.data || {}),
        fullName,
        email: formData.email,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        country: formData.country,
        city: formData.city,
        address: formData.address,
        postcode: formData.postcode,
      };

      setProfile(updatedProfile);
      setFormData(createFormData(updatedProfile));
      setProfileImageFile(null);

      const savedImage = updatedProfile.profilePicture || previewImage;
      await update({
        user: {
          fullName: updatedProfile.fullName,
          name: updatedProfile.fullName,
          profileImage: savedImage,
          image: savedImage,
        },
      });

      toast.success(data?.message || "Profile updated successfully.", {
        id: toastId,
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile.",
        { id: toastId }
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <PersonalInformationSkeleton />;
  }

  return (
    <section className="rounded-lg bg-[#333333] p-4 text-white sm:p-6">
      <div>
        <h2 className="text-[22px] font-semibold leading-tight sm:text-[28px]">
          Personal Information
        </h2>
        <p className="mt-1 text-sm font-light text-[#BDBDBD]">
          Manage your personal information and profile details.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#C88719] bg-[#202020]">
          {profileImage ? (
            <Image
              src={profileImage}
              alt={fullName || "Profile picture"}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <span className="text-2xl font-semibold text-[#C88719]">
              {getInitials(formData.firstName, undefined, formData.email)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold">
            {fullName || "User"}
          </p>
          <p className="truncate text-sm text-[#BDBDBD]">
            {formData.email || "No email found"}
          </p>
          <label className="mt-3 inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-[#C88719] px-4 text-sm font-medium text-[#C88719] transition hover:bg-[#C88719] hover:text-white">
            <Camera className="h-4 w-4" />
            Edit Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      <form onSubmit={handleSave} className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5">
        <div className="flex flex-wrap items-center gap-5 text-sm text-white sm:col-span-2">
          <label className="flex cursor-pointer items-center gap-2">
            <span>Male</span>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender.toLowerCase() === "male"}
              onChange={handleGenderChange}
              className="h-4 w-4 accent-[#C88719]"
            />
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <span>Female</span>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender.toLowerCase() === "female"}
              onChange={handleGenderChange}
              className="h-4 w-4 accent-[#C88719]"
            />
          </label>
        </div>

        <ProfileField
          label="Full Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <ProfileField
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <ProfileField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <ProfileField
          label="Street Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <ProfileField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <ProfileField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <ProfileField
          label="Postal Code"
          name="postcode"
          value={formData.postcode}
          onChange={handleChange}
        />

        <div className="flex justify-end sm:col-span-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-full bg-[#C88719] px-7 text-sm font-semibold text-white transition hover:bg-[#B47714] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
