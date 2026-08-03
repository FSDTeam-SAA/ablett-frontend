import { Button } from "@/components/ui/button";

const fieldClass =
  "h-[42px] w-full rounded-md border border-[#8A8A8A] bg-[#333333] px-3 text-sm font-light text-[#CFCFCF] outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25";

function ProfileField({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-normal text-white">{label}</span>
      <input className={fieldClass} defaultValue={value} />
    </label>
  );
}

export default function PersonalInformationPanel() {
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

      <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-white sm:mt-6">
        <label className="flex items-center gap-2">
          <span>Male</span>
          <input
            type="radio"
            name="gender"
            defaultChecked
            className="h-4 w-4 accent-[#C88719]"
          />
        </label>
        <label className="flex items-center gap-2">
          <span>Female</span>
          <input type="radio" name="gender" className="h-4 w-4 accent-[#C88719]" />
        </label>
      </div>

      <form className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5">
        <ProfileField label="First Name" value="Olivia" />
        <ProfileField label="Last Name" value="Rhya" />
        <ProfileField label="Email Address" value="bessieedwards@gmail.com" />
        <ProfileField label="Phone Number" value="+1 (555) 123-4567" />
        <ProfileField
          label="Street Address"
          value="1234 Oak Avenue, San Francisco, CA 94102A"
          className="sm:col-span-2"
        />
        <ProfileField label="Location" value="Florida, USA" />
        <ProfileField label="Postal Code" value="30301" />

        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            className="h-10 rounded-full border border-[#C88719] bg-transparent px-7 text-sm text-[#C88719] hover:bg-[#C88719] hover:text-white"
          >
            Request a Quote
          </Button>
          <Button
            type="button"
            className="h-10 rounded-full bg-[#C88719] px-7 text-sm text-white hover:bg-[#B47714]"
          >
            Request a Quote
          </Button>
        </div>
      </form>
    </section>
  );
}
