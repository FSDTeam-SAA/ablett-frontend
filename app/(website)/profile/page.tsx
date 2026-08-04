

import ProfileDashboard from "./_components/profile-dashboard";



export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black pb-14 pt-28 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
      <section className="container mx-auto px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          <h1 className="text-[36px] font-normal leading-tight sm:text-5xl md:text-6xl lg:text-[68px]">
            My Profile
          </h1>
          <p className="mx-auto mt-3 max-w-[660px] text-sm font-light leading-7 text-[#E6E6E6] sm:mt-4 sm:text-base md:text-lg">
            Manage your personal information, view your appointments, track
            quote requests, and stay connected with our team from one place.
          </p>
        </div>

        <ProfileDashboard />
      </section>
    </main>
  );
}
