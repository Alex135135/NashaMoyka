import { ServicesIntro } from "@/components/ServicesIntro/ServicesIntro"
import { WhyUs } from "@/components/WhyUs/WhyUs"
import { cardInfoServices, serviceTexts } from '../../data/data'
import { Service } from "@/components/Service/Service"
import { AdditionalServices } from "@/components/AdditionalServices/AdditionalServices"
import { FAQ } from "@/components/FAQ/FAQ"

export default function page() {
  return (
    <>
      <ServicesIntro />
      <WhyUs
        title={'Наши технологии'}
        texts={cardInfoServices}
      />
      {serviceTexts.map((item, index) => {
        return <Service
          key={index}
          title={item.title}
          description={item.description}
          features={item.features}
          details={item.details}
          video={item.video}
        />
      })}
      <AdditionalServices />
      <FAQ />
    </>
  )
};

