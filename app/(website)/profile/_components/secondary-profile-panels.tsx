import { Button } from "@/components/ui/button";

const inputClass =
  "h-[42px] w-full rounded-md border border-[#8A8A8A] bg-[#333333] px-3 text-sm font-light text-[#CFCFCF] outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25";

export function MessagesPanel() {
  return (
    <section className="rounded-lg bg-[#333333] p-4 text-white sm:p-6">
      <h2 className="text-[22px] font-semibold leading-tight sm:text-[28px]">
        Massage
      </h2>
      <p className="mt-1 text-sm font-light text-[#BDBDBD]">
        Send a quick message to our project support team.
      </p>

      <form className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-normal text-white">
            Subject
          </span>
          <input
            className={inputClass}
            placeholder="Enter your message subject"
            defaultValue="Project update request"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-normal text-white">
            Message
          </span>
          <textarea
            className="min-h-[170px] w-full resize-none rounded-md border border-[#8A8A8A] bg-[#333333] px-3 py-3 text-sm font-light leading-6 text-[#CFCFCF] outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25"
            placeholder="Write your message here..."
            defaultValue="I would like to discuss the current status of my project."
          />
        </label>

        <div className="flex justify-end">
          <Button
            type="button"
            className="h-10 rounded-full bg-[#C88719] px-8 text-sm text-white hover:bg-[#B47714]"
          >
            Send Message
          </Button>
        </div>
      </form>
    </section>
  );
}

export function ChangePasswordPanel() {
  return (
    <section className="rounded-lg bg-[#333333] p-4 text-white sm:p-6">
      <h2 className="text-[22px] font-semibold leading-tight sm:text-[28px]">
        Changes Password
      </h2>
      <p className="mt-1 text-sm font-light text-[#BDBDBD]">
        Update your account password.
      </p>

      <form className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5">
        <label>
          <span className="mb-2 block text-sm font-normal text-white">
            Current Password
          </span>
          <input className={inputClass} type="password" placeholder="********" />
        </label>
        <label>
          <span className="mb-2 block text-sm font-normal text-white">
            New Password
          </span>
          <input className={inputClass} type="password" placeholder="********" />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-normal text-white">
            Confirm Password
          </span>
          <input className={inputClass} type="password" placeholder="********" />
        </label>

        <div className="flex justify-end sm:col-span-2">
          <Button
            type="button"
            className="h-10 rounded-full bg-[#C88719] px-8 text-sm text-white hover:bg-[#B47714]"
          >
            Update Password
          </Button>
        </div>
      </form>
    </section>
  );
}
