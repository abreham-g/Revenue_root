import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FormInput } from '@/components'
import { Link, useNavigate } from 'react-router-dom'
import Typist from 'react-text-typist';

//images
import sass1 from '@/assets/images/hero/dashboard1.png'
import sass2 from '@/assets/images/hero/dashboard3.png'

const checkSvg = (
	<svg
		className="w-5 h-5 text-green-500"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		{' '}
		<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>{' '}
		<polyline points="22 4 12 14.01 9 11.01"></polyline>{' '}
	</svg>
)
const Hero = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="pt-36 sm:pb-96 pb-80 relative bg-gradient-to-t from-slate-500/10">
				<div className="container">
					<div className="text-center lg:w-11/12 mx-auto">
						<div>
							<h1 className="md:text-5xl/tight text-3xl font-semibold text-gray-700 mb-7">
							 	Find Profitable Products with Ease from 
							<br /> different{' '}
								<Typist
									className="typewrite capitalize relative after:absolute after:inset-x-0 after:bottom-2 after:bg-green-400/40 after:h-5 after:w-full after:-z-10"
									sentences={[
										'A2A',
										'Retailers',
										'Brands',
										'Storefronts',
										'Niches',
									]}
									typingSpeed={1500}
									deletingSpeed={700}
									showCursor={false}
									startDelay={100}
									cursorSmooth
									pauseTime={2500}
								/>
							</h1>

							<p className="sm:text-lg text-gray-500">
								Stop wasting hours sourcing without results.<br></br>Maximize profits and save valuable time with Revenue Roots.
							</p>
							<div className="flex flex-wrap items-center justify-center gap-2 mt-12">
								<FormInput
									name="email"
									className="w-full rounded border-gray-300 focus:border-gray-400 focus:ring-0 bg-white py-2 px-4"
									containerClass="flex items-center"
									placeholder="Your Email"
								/>
								<FormInput
									name="password"
									className="w-full rounded border-gray-300 focus:border-gray-400 focus:ring-0 bg-white py-2 px-4"
									containerClass="flex items-center"
									placeholder="Your Password"
								/>
								<Link
									to="/dashboard"
									className="py-2 px-4 rounded text-white bg-primary hover:shadow-lg hover:shadow-primary/50 focus:outline focus:outline-primary/50"
									onClick={(e) => {
										e.preventDefault();
										const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
										const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;

										if (
											emailInput?.value === 'admin@revenueroots.com' &&
											passwordInput?.value === 'admin123'
										) {
											navigate('/dashboard');
										} else {
											alert('Invalid credentials');
										}
									}}
								>
									Login
								</Link>
							</div>

							<div className="flex flex-wrap justify-center items-center gap-5 mt-5">
								<div className="flex items-center gap-2">
									{checkSvg}
									<p className="text-sm text-gray-700">Free 14-day Demo</p>
								</div>
								<div className="flex items-center gap-2">
									{checkSvg}
									<p className="text-sm text-gray-700">No credit card needed</p>
								</div>
								<div className="flex items-center gap-2">
									{checkSvg}
									<p className="text-sm text-gray-700">Free 14-day Demo</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="relative sm:-mt-80 -mt-64">
					<div className="hidden sm:block">
						<div className="after:w-24 after:h-24 after:absolute after:-top-10 after:end-10 after:bg-[url('@/assets/images/pattern/dot5.svg')]"></div>
						<div className="before:w-24 before:h-24 before:absolute before:-bottom-10 before:start-10 before:bg-[url('@/assets/images/pattern/dot2.svg')]"></div>
					</div>

					<div
						id="swiper_one"
						className="swiper border-[10px] border-white bg-white shadow-lg rounded-md w-5/6"
						data-aos="fade-up"
						data-aos-duration="2000"
					>
						<Swiper
							modules={[Autoplay]}
							autoplay={{
								delay: 2500,
								disableOnInteraction: false,
							}}
							spaceBetween={30}
							loop
						>
							<SwiperSlide>
								
								<img src={sass1} alt="saas1" className="rounded-md" />
							</SwiperSlide>

							<SwiperSlide>
								
								<img src={sass2} alt="saas2" className="rounded-md" />
							</SwiperSlide>

							
						</Swiper>
					</div>
				</div>
			</div>
		</>
	)
}

export default Hero
