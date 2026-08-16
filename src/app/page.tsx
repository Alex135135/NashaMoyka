'use client'
import { WhyUs } from '@/components/WhyUs/WhyUs'
import { Welcome } from '@/components/Welcome/Welcome'
import { SpecialOffer } from '@/components/SpecialOffer/SpecialOffer'
import { PopularServices } from '@/components/PopularServices/PopularServices'
import { cardInfoWhyUs, popularServices } from '@/data/data'

export default function Home() {
  return (
    <>
      <Welcome />
      <PopularServices services={popularServices} />
      <WhyUs
        title={'Почему выбирают нас?'}
        texts={cardInfoWhyUs}
      />
      <SpecialOffer />
    </>
  )
}