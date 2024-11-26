import Benefits from "@/components/benefits";
import { Cta } from "@/components/cta";
import { FeaturedJobs } from "@/components/featured-jobs";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroBanner } from "@/components/hero-banner";
import { JobCategories } from "@/components/job-categories";
import { JobSearch } from "@/components/job-search";
import { Testimonials } from "@/components/testimonials";
import { WhyChooseUs } from "@/components/why-choose-us";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col">
			{/* Header */}
			<Header />

			<main className="flex-grow">
				{/* Hero Banner */}
				<HeroBanner />

				{/* Job Search */}
				<JobSearch />

				{/* Featured Jobs */}
				<FeaturedJobs />

				{/* Job Categories */}
				<JobCategories />

				{/* Why Choose Us */}
				<WhyChooseUs />

				{/* Testimonials */}
				<Testimonials />

				{/* Benefits */}
				<Benefits />

				{/* CTA */}
				<Cta />
			</main>

			{/* Footer */}
			<Footer />
		</div>
	);
}
