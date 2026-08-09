'use client'
import { WhyUs } from '@/components/WhyUs/WhyUs'
import { Welcome } from '@/components/Welcome/Welcome'
import { SpecialOffer } from '@/components/SpecialOffer/SpecialOffer'
import { cardInfoWhyUs } from '@/data/data'
export default function Home() {
  return (
    <>
      <Welcome />
      <WhyUs
        title={'Почему выбирают нас?'}
        texts={cardInfoWhyUs}
      />
      <SpecialOffer />
    </>
  )
}