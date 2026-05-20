import Banner from "@/components/Home/Banner/Banner";
import FeaturedFacilities from "@/components/Home/FeaturedFacilities/FeaturedFacilities";
import PopularSportsCategories from "@/components/Home/PopularSportsCategories/PopularSportsCategories";
import WhyChooseSportNest from "@/components/Home/WhyChoiceUs/WhyChoiceUs";

export default function Home() {
  return (
    <div className="flex flex-col flex-1  items-center justify-center bg-[#EBF4DD]/60  font-sans ] ">
      <Banner />
      <FeaturedFacilities />
      <WhyChooseSportNest />
      <PopularSportsCategories />
    </div>
  );
}
