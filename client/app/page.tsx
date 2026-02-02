import AboutUs from '@/src/components/AboutUs'
import Blog from '@/src/components/Blog'
import CategoriesSection from '@/src/components/Categories'
import ChooseYourCareer from '@/src/components/ChooseYourCareer'
import Course from '@/src/components/Course' 
import Home from '@/src/components/Home'
import Instructor from '@/src/components/Instructor'
import Layout from '@/src/components/Layout'
import Newsletter from '@/src/components/Newsletter'
import Testimonial from '@/src/components/Testimonial'
import WhyChooseUs from '@/src/components/WhyChooseUs' 

const Page = () => {
  return (
    <Layout>
      <Home />
      <CategoriesSection />
      <Course />
      <AboutUs />
      {/* <EnrollNow /> */}
      <WhyChooseUs />
      <Testimonial />
      <Instructor />
      <ChooseYourCareer />
      <Blog />
      <Newsletter />
    </Layout>
  )
}

export default Page
