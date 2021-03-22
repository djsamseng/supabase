import { useState } from 'react'

import DefaultLayout from '~/components/Layouts/Default'
import SectionContainer from '~/components/Layouts/SectionContainer'
import ProductHeader from '~/components/Sections/ProductHeader'

import { Button, Tabs, Typography } from '@supabase/ui'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Controller } from 'swiper'

// Import Swiper styles
import 'swiper/swiper.min.css'
import ImageCarousel from '~/components/Carousels/ImageCarousel'
import APISection from '~/components/Sections/APISection'
import GithubExamples from '~/components/Sections/GithubExamples'
import SplitCodeBlockCarousel from '~/components/Carousels/SplitCodeBlockCarousel'
import FloatingIcons from '~/components/FloatingIcons'

// data
import ApiExamplesData from 'data/products/database/api-examples'
import ExtensionsExamplesData from 'data/products/database/extensions-examples'

import TableViewCarouselData from 'data/products/database/table-view-carousel.json'
import SqlViewCarouselData from 'data/products/database/sql-view-carousel.json'

import TweetCard from '~/components/TweetCard'
import FeatureColumn from '~/components/FeatureColumn'

// install Swiper's Controller component
// SwiperCore.use([Controller])

function Database() {
  const [dashboardSwiper, setDashboardSwiper] = useState(undefined)
  const [dashboardSwiperActiveIndex, setDashboardSwiperActiveIndex] = useState(0)

  function handleDashboardSwiperNav(e: number) {
    setDashboardSwiperActiveIndex(e)
    // @ts-ignore
    dashboardSwiper.slideTo(e)
  }

  return (
    <DefaultLayout>
      <ProductHeader
        h1={[
          <span>
            A Database ready for millions
            <br /> and the weekend project
          </span>,
        ]}
        subheader={[
          'A postgres SQL database, trusted by 100,000s of developers, with built in row level security hosted on a dedicated instance.',
          'It is the industry standard database used by AWS architecture, data scientists and backend engineers.',
        ]}
      />

      {/* <SectionContainer>÷ */}
      <div className="grid">
        <SectionContainer className="text-center pb-8">
          <div className="grid grid-cols-12">
            <div className="col-span-8 col-start-3">
              <Typography.Title level={2}>Easy to update, maintain and grow </Typography.Title>
              <Typography.Text>
                <p className="text-lg">
                  Let your international customers pay with their preferred payment method, and
                  improve conversion. Stripe supports 135+ currencies and offers a unified API for
                  cards, wallets, bank debits, and more.
                </p>
              </Typography.Text>
            </div>
          </div>
        </SectionContainer>
        <div className={'dashboard-tabs'}>
          <Tabs
            size="xlarge"
            activeId={dashboardSwiperActiveIndex.toString()}
            onChange={(e: string) => handleDashboardSwiperNav(Number(e))}
            type="underlined"
            tabBarStyle={{
              marginBottom: 0,
              // borderBottom: '1px solid #dedede',
            }}
            // block
          >
            <Tabs.Panel id="0" label="Table editor">
              <span></span>
            </Tabs.Panel>
            <Tabs.Panel id="1" label="SQL editor">
              <span></span>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>

      <Swiper
        // @ts-ignore
        onSwiper={setDashboardSwiper}
        style={{ overflow: 'hidden' }}
        initialSlide={0}
        spaceBetween={0}
        slidesPerView={1}
        speed={400}
        allowTouchMove={false}
      >
        <div className="grid grid-cols-12">
          <SwiperSlide>
            <SectionContainer className="pt-16">
              <ImageCarousel
                content={TableViewCarouselData}
                footer={[
                  <TweetCard
                    handle="@Elsolo244"
                    img_url="https://pbs.twimg.com/profile_images/2486328968/v6citnk33y2wpeyzrq05_400x400.jpeg"
                    quote="Where has
                @supabase_io
                been all my life? 😍"
                  />,
                ]}
              />
            </SectionContainer>
          </SwiperSlide>
          <SwiperSlide>
            <SectionContainer className="pt-16">
              <ImageCarousel
                content={SqlViewCarouselData}
                footer={[
                  <TweetCard
                    handle="@jim_bisenius"
                    img_url="https://pbs.twimg.com/profile_images/1372987165869760513/rLgwUZSB_400x400.jpg"
                    quote="@MongoDB or @MySQL?!?! Please, let me introduce you to @supabase_io and the wonderful world of @PostgreSQL before it's too late!!"
                  />,
                ]}
              />
            </SectionContainer>
          </SwiperSlide>
        </div>
      </Swiper>

      <SectionContainer className="-mb-48">
        <APISection
          content={ApiExamplesData}
          title="Never write an API again"
          footer={[
            <TweetCard
              handle="@eunjae_lee"
              img_url="https://pbs.twimg.com/profile_images/1188191474401320965/eGjSYbQd_400x400.jpg"
              quote="So they just help me use @PostgreSQL better. They don't try to invent a wheel and trap me
          in it. Whereas they provide a good abstraction overall, they also provide a raw access to
          the database."
            />,
          ]}
        />
      </SectionContainer>

      <div className="relative">
        <div className="section--masked">
          <div className="section--bg-masked">
            <div className="section--bg border-t border-b border-gray-100 dark:border-gray-600"></div>
          </div>
          <div className="section-container pt-12 pb-0">
            <FloatingIcons />
            <div className="overflow-x-hidden">
              <SectionContainer className="mb-0 pb-8">
                <GithubExamples />
              </SectionContainer>
            </div>
          </div>
        </div>
      </div>

      <SectionContainer>
        <div className="grid grid-cols-12 lg:gap-16">
          <div className="col-span-12 lg:col-span-5 mb-8">
            <Typography.Title level={2}>Extend your database</Typography.Title>
            <Typography.Text>
              <p className="text-lg">
                Your PostgreSQL database can be extended with any PostgreSQL extension.
              </p>
              <p>
                Install any extension you like, and even add your own as long as it's written in
                SQL.
              </p>
            </Typography.Text>
            <FeatureColumn
              title="40+ preinstalled extensions"
              text="We only show a few of the extensions supported by Supabase here, but we preinstall many more that you can use right away."
            />
            <Button size="small" className="mt-4">
              Expore documentation
            </Button>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <SplitCodeBlockCarousel content={ExtensionsExamplesData} />
          </div>
        </div>
      </SectionContainer>
    </DefaultLayout>
  )
}

export default Database
