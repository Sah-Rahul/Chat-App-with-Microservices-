import AboutUs from "./AboutUs";
import Blog from "./Blog";
import Categories from "./Categories";
import ChooseYourCareer from "./ChooseYourCareer";
import Course from "./Course";
import EnrollNow from "./EnrollNow";
import Home from "./Home";
import Instructor from "./Instructor";
import Testimonial from "./Testimonial";
import WhyChooseUs from "./WhyChooseUs";

const Hero = () => {
  return (
   <>
    <Home />
    <Categories />
    <Course />
    <AboutUs />
    {/* <EnrollNow /> */}
    <WhyChooseUs />
    <Testimonial />
    <Instructor />
    <ChooseYourCareer />
    <Blog />
   </>
  );
};

export default Hero;
