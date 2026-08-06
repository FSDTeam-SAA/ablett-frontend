import Image from "next/image";

export default function LeadershipSection() {
  return (
    <section className="bg-black py-14 text-white sm:py-16 md:py-20 lg:py-[120px]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-5">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-20">
          <div className="w-full lg:col-span-7">
            <h2 className="text-[34px] font-normal leading-tight sm:text-[42px] lg:text-[44px]">
              Leadership You Can{" "}
              <span className="font-heading font-medium italic">
                Trust
              </span>
            </h2>

            <div className="mt-4 w-full space-y-3 text-sm leading-7 text-[#E6E6E6] sm:mt-5 sm:text-lg sm:leading-8 lg:w-[650px]">
              <p>
                Behind every successful project is a team that believes in
                accountability, professionalism, and doing the job right the
                first time. Our leadership is dedicated to creating a culture
                where quality workmanship, careful planning, and exceptional
                customer service are the foundation of every project we
                undertake. We believe that strong communication and honest
                relationships are just as important as the construction itself.
              </p>

              <p>
                From the initial consultation to project completion, every
                decision is guided by a commitment to excellence and a passion
                for helping clients achieve their goals with confidence. By
                leading with integrity and maintaining high standards throughout
                every stage of construction, we ensure every project receives
                the attention, expertise, and care it deserves.
              </p>
            </div>

            <div className="mt-5">
              <h3 className="text-lg font-semibold text-white">
                Shawn Ablett
              </h3>
              <p className="mt-1 text-sm text-white/70">
               Owner
              </p>
            </div>
          </div>

          <div className="relative  w-full overflow-hidden rounded-lg  lg:col-span-5 lg:min-h-[548px]">
            <Image
              src="/bitlogo.png"
              alt="Kristin Watson"
              width={1000}
              height={1000}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
