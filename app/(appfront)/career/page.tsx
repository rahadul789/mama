import { getAllJobs, getCareerDetails } from "@/app/lib/data";
import CareerInfo from "../_components/career-info";
import Offerings from "../_components/offerings";

export const metadata = {
  title: "1Technologies | Career",
};

const Career = async () => {
  const career = await getCareerDetails();
  const jobs = await getAllJobs();

  return (
    <div className=" max-w-7xl mx-auto px-4 py-2">
      <CareerInfo career={career} />
      <Offerings career={career} jobs={jobs} />
    </div>
  );
};

export default Career;
