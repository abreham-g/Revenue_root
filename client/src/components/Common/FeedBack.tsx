import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import avatar1 from '@/assets/images/avatars/img-1.jpg'
import avatar2 from '@/assets/images/avatars/img-2.jpg'
import avatar3 from '@/assets/images/avatars/img-3.jpg'

import google from '@/assets/images/brands/google.svg'
import amazon from '@/assets/images/brands/amazon.svg'
import lenovo from '@/assets/images/brands/lenovo.svg'

interface SlideProps {
	image: string
	logo?: string
}
const CommonSlide1 = ({ image, logo }: SlideProps) => {
	return (
		<>
			<i className="fa-solid fa-quote-left text-gray-500 text-5xl"></i>
			<p className="my-4">
				I have been using Revenue Roots really intensively for a week now. Before that, I created my Amazon account and took care of everything that goes with it. Revenue Roots was a great help here too, as the courses are very well structured and provide great support. In just one week, I was able to find products that generate sales of around €2000 with an ROI of 25%. I am also in a deal group, but I have to say that Revenue roots provides me with significantly better deals.
			</p>
			<div className="border-b border-gray-200 w-full my-7"></div>

			<div className="flex flex-wrap items-center justify-between gap-10">
				<div className="flex items-center gap-2">
					<img src={image} className="h-10 w-10 rounded-full" />
					<div>
						<h1 className="text-sm mb-1">Tirhak Melka</h1>
						<p className="text-gray-500 text-xs">Amazon FBA seller</p>
					</div>
				</div>
				<div>
					<img src={logo} className="w-24" />
				</div>
			</div>
		</>
	)
}

const CommonSlide2 = ({ image, logo }: SlideProps) => {
	return (
		<>
			<i className="fa-solid fa-quote-left text-gray-500 text-5xl"></i>
			<p className="my-4">
				Revenue Roots has been a game changer for my business. The platform is intuitive, and the support team is always ready to help. Within a month, I managed to scale my sales significantly and streamline my operations. I highly recommend it to anyone looking to grow their e-commerce business.
			</p>
			<div className="border-b border-gray-200 w-full my-7"></div>

			<div className="flex flex-wrap items-center justify-between gap-10">
				<div className="flex items-center gap-2">
					<img src={image} className="h-10 w-10 rounded-full" />
					<div>
						<h1 className="text-sm mb-1">Liya Kebede</h1>
						<p className="text-gray-500 text-xs">E-commerce Entrepreneur</p>
					</div>
				</div>
				<div>
					<img src={logo} className="w-24" />
				</div>
			</div>
		</>
	)
}
const FeedBack = () => {
	return (
		<section className="py-16 sm:py-24 overflow-x-hidden">
			<div className="container" data-aos="fade-up" data-aos-duration="600">
				<div className="grid xl:grid-cols-4 grid-cols-3 gap-6">
					<div className="col-span-3 lg:col-span-1">
						<span className="text-sm font-medium py-1 px-3 rounded-full text-primary bg-primary/10">
							Feedback
						</span>
						<h1 className="text-3xl/tight font-medium mt-3 mb-4">
							What people say
						</h1>
						<p className="text-gray-500">
							Few valuables words from our customers
						</p>

						<div className="flex gap-4 mt-10">
							<div className="button-prev swiper-custom-prev cursor-pointer text-xl transition-all duration-300 hover:text-primary">
								<i className="fa-solid fa-arrow-left"></i>
							</div>
							<div className="button-next text-xl swiper-custom-next cursor-pointer transition-all duration-300 hover:text-primary">
								<i className="fa-solid fa-arrow-right"></i>
							</div>
						</div>
					</div>

					<div className="col-span-3 lg:col-span-2 xl:col-span-3">
						<div className="relative">
							<div className="hidden sm:block">
								<div className="before:w-24 before:h-24 before:absolute before:-top-8 before:-end-8 before:bg-[url('@/assets/images/pattern/dot5.svg')]"></div>
								<div className="after:w-24 after:h-24 after:absolute after:-bottom-8 after:-start-8 after:bg-[url('@/assets/images/pattern/dot2.svg')]"></div>
							</div>

							<div id="swiper_one" className="swiper relative">
								<Swiper
									modules={[Autoplay, Navigation]}
									autoplay={{
										delay: 2500,
										disableOnInteraction: false,
									}}
									navigation={{
										nextEl: '.swiper-custom-next',
										prevEl: '.swiper-custom-prev',
									}}
									loop
									spaceBetween={30}
								>
									<SwiperSlide className="p-10 border rounded-xl bg-white shadow">
										<CommonSlide1 image={avatar1} logo={amazon}></CommonSlide1>
									</SwiperSlide>
									<SwiperSlide className="p-10 border rounded-xl bg-white shadow">
										<CommonSlide2 image={avatar2} logo={amazon}></CommonSlide2>
									</SwiperSlide>
								</Swiper>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default FeedBack
