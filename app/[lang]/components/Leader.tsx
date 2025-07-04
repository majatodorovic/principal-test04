'use client';

import AOS from 'aos';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { InView } from 'react-intersection-observer';
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Leader({ data, lang }: any) {
  const [loyaltyCardTitle, setLoyaltyCardTitle] = useState(
    data.leader.loyaltyCards[0].title,
  );
  const [loyaltyCardDescription, setLoyaltyCardDescription] = useState(
    data.leader.loyaltyCards[0].description,
  );
  const [startCount, setStartCount] = useState(false);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // Logovanje swiper instanci za debug
    if (swiperRef.current) {
      console.log('Swiper instance:', swiperRef.current);
    }
  }, []);

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <section className="paddingOutSection" data-aos="fade-up">
      <div className="roundedSection relative mx-auto w-full max-w-[1800px] overflow-hidden">
        <Image
          src="/images/home/leader/leader-bg.jpg"
          alt="Leader"
          width={100}
          height={100}
          className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        />

        {/* Desktop code - visible only on desktop */}
        <div className="paddingInSection relative z-10 hidden flex-col gap-6 bg-blue/80 lg:flex xl:gap-12">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex flex-1 flex-col gap-6 xl:gap-10">
              <h2 dangerouslySetInnerHTML={{ __html: data.leader.title }} />
              <p
                className="responsiveText text-white xl:pr-[100px]"
                dangerouslySetInnerHTML={{ __html: data.leader.description }}
              />
              <Link
                href={`/${lang}/about-us`} // ispravno korišćenje backticks za interpolaciju
                className="outlineButton w-[200px]"
              >
                {data.leader.aboutUsButton}
              </Link>
            </div>
            {/* Buttons Section */}
            <div className="flex w-full flex-1 flex-col gap-4">
              <div className="grid w-full grid-cols-1 overflow-hidden rounded-lg bg-white/20 sm:flex lg:rounded-2xl">
                {data?.leader?.loyaltyCards?.map(
                  (
                    card: { title: string; description: string },
                    index: number,
                  ) => (
                    <button
                      key={index}
                      className={clsx(
                        'flex-grow px-3 py-2 text-xs font-bold uppercase text-white transition duration-300 hover:bg-white hover:text-blue lg:py-3 2xl:text-base',
                        {
                          '!bg-white !text-blue':
                            loyaltyCardTitle === card.title,
                        },
                      )}
                      onClick={() => {
                        setLoyaltyCardTitle(card.title);
                        setLoyaltyCardDescription(card.description);
                      }}
                    >
                      {card.title}
                    </button>
                  ),
                )}
              </div>
              <div className="responsiveText rounded-xl bg-white/20 px-6 py-4 text-white lg:rounded-3xl lg:px-12 lg:py-8">
                {loyaltyCardDescription}
              </div>
            </div>
          </div>
          {/* Slider Section */}
          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation]} // Dodaj Navigation modul
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              ref={swiperRef}
              spaceBetween={10}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
              navigation={{
                prevEl: '.swiper-button-prev', // Strelica za prethodni
                nextEl: '.swiper-button-next', // Strelica za sledeći
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                console.log(
                  'Swiper instance onSwiper desktop: ',
                  swiperRef.current,
                );
              }}
            >
              {data.leader.numberCards.map(
                (
                  card: {
                    icon: string;
                    number: number;
                    text: string;
                    numberPreffix: string;
                    numberSuffix: string;
                  },
                  index: number,
                ) => {
                  return (
                    <SwiperSlide
                      key={index}
                      className="!h-auto rounded-xl bg-white/20 px-6 py-6 lg:rounded-3xl lg:px-8 lg:py-8"
                    >
                      <div className="flex flex-col items-center text-center">
                        <Image
                          src={card.icon}
                          alt={card.text}
                          width={60}
                          height={60}
                          className="whiteFilter mb-2 h-[60px] w-[60px] 2xl:h-[80px] 2xl:w-[80px]"
                        />
                        <div className="text-3xl font-extrabold text-white 2xl:text-5xl">
                          <InView
                            as="div"
                            onChange={(inView) => {
                              if (inView) setStartCount(true);
                            }}
                            triggerOnce={true}
                          >
                            {startCount && (
                              <CountUp
                                start={0}
                                end={card.number}
                                prefix={card.numberPreffix}
                                suffix={card.numberSuffix}
                                duration={3}
                                separator=""
                              />
                            )}
                          </InView>
                        </div>
                        <p className="mt-2 text-xs text-white lg:text-base">
                          {card.text}
                        </p>
                      </div>
                    </SwiperSlide>
                  );
                },
              )}
            </Swiper>

            {/* Strelice */}
            <button
              className="swiper-button-prev absolute left-0 top-1/2 z-10 h-full -translate-y-1/2 transform rounded-l-xl bg-white text-black lg:rounded-l-3xl"
              onClick={handlePrevClick}
            >
              <Image
                src="/images/arrow.png"
                alt="Arrow"
                width={24}
                height={24}
                className="blackFilter h-5 w-5 rotate-90 lg:h-7 lg:w-7"
              />
            </button>
            <button
              className="swiper-button-next absolute right-0 top-1/2 z-10 h-full -translate-y-1/2 transform rounded-r-xl bg-white text-black lg:rounded-r-3xl"
              onClick={handleNextClick}
            >
              <Image
                src="/images/arrow.png"
                alt="Arrow"
                width={24}
                height={24}
                className="blackFilter h-5 w-5 -rotate-90 lg:h-7 lg:w-7"
              />
            </button>
          </div>
        </div>
        {/* Mobile code - visible only on mobile */}
        <div className="paddingInSection relative z-10 flex flex-col gap-6 bg-blue/80 lg:hidden xl:gap-12">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex flex-1 flex-col gap-6 xl:gap-10">
              <h2 dangerouslySetInnerHTML={{ __html: data.leader.title }} />
              <p
                className="responsiveText text-white xl:pr-[100px]"
                dangerouslySetInnerHTML={{ __html: data.leader.description }}
              />
              <Link
                href={`/${lang}/about-us`} // ispravno korišćenje backticks za interpolaciju
                className="outlineButton w-[200px]"
              >
                {data.leader.aboutUsButton}
              </Link>
            </div>
          </div>

          {/* Slider Section */}
          <div className="relative">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 3, spaceBetween: 10 },
                1280: { slidesPerView: 4, spaceBetween: 5 },
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                console.log(
                  'Swiper instance onSwiper mobile: ',
                  swiperRef.current,
                );
              }}
            >
              {data.leader.numberCards.map((card: any, index: number) =>
                index % 4 === 0 ? (
                  <SwiperSlide
                    key={index}
                    className="!h-auto rounded-xl bg-white/20 px-6 py-6 lg:rounded-3xl lg:px-8 lg:py-8"
                  >
                    <div className="grid grid-cols-2 gap-6 md:gap-4 xl:grid-cols-1 xl:gap-[5px]">
                      {[
                        card,
                        data.leader.numberCards[index + 1],
                        data.leader.numberCards[index + 2],
                        data.leader.numberCards[index + 3],
                      ].map((item, i) =>
                        item ? (
                          <div
                            key={i}
                            className="flex flex-col items-center text-center"
                          >
                            <Image
                              src={item.icon}
                              alt={item.text}
                              width={60}
                              height={60}
                              className="whiteFilter mb-2 h-[60px] w-[60px] 2xl:h-[80px] 2xl:w-[80px]"
                            />
                            <div className="text-3xl font-extrabold text-white 2xl:text-5xl">
                              <InView
                                as="div"
                                onChange={(inView) => {
                                  if (inView) setStartCount(true);
                                }}
                                triggerOnce={true}
                              >
                                {startCount && (
                                  <CountUp
                                    start={0}
                                    end={item.number}
                                    prefix={item.numberPreffix}
                                    suffix={item.numberSuffix}
                                    duration={3}
                                    separator=""
                                  />
                                )}
                              </InView>
                            </div>
                            <p className="mt-2 text-xs text-white lg:text-base">
                              {item.text}
                            </p>
                          </div>
                        ) : null,
                      )}
                    </div>
                  </SwiperSlide>
                ) : null,
              )}
            </Swiper>
            <button
              className="absolute left-0 top-1/2 z-10 h-full -translate-y-1/2 transform rounded-l-xl bg-white text-black lg:rounded-l-3xl"
              onClick={handlePrevClick}
            >
              <Image
                src="/images/arrow.png"
                alt="Arrow"
                width={24}
                height={24}
                className="blackFilter h-5 w-5 rotate-90 lg:h-7 lg:w-7"
              />
            </button>
            <button
              className="absolute right-0 top-1/2 z-10 h-full -translate-y-1/2 transform rounded-r-xl bg-white text-black lg:rounded-r-3xl"
              onClick={handleNextClick}
            >
              <Image
                src="/images/arrow.png"
                alt="Arrow"
                width={24}
                height={24}
                className="blackFilter h-5 w-5 -rotate-90 lg:h-7 lg:w-7"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
