
import { JobCategories } from '@/components/job-categories'
import { WhyChooseUs } from '@/components/why-choose-us'
import { Header } from '@/components/header'
import { HeroBanner } from '@/components/hero-banner'
import { JobSearch } from '@/components/job-search'
import { FeaturedJobs } from '@/components/featured-jobs'
import { Testimonials } from '@/components/testimonials'
import { Cta } from '@/components/cta'
import { Footer } from '@/components/footer'


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
  <Header/>

      <main className="flex-grow">
        {/* Hero Banner */}
       <HeroBanner/>

        {/* Job Search */}
      <JobSearch/>

        {/* Featured Jobs */}
       <FeaturedJobs/>

        {/* Job Categories */}
     <JobCategories />

        {/* Why Choose Us */}
       <WhyChooseUs />

        {/* Testimonials */}
      <Testimonials />      

        {/* CTA */}
        <Cta />        
      </main>

      {/* Footer */}
   <Footer/>
    </div>
  );
}
