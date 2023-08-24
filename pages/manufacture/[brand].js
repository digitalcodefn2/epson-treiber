// Utils
import { fetchAPI } from "@/utils/fetch-api"

// Components
import DataComponent from "@/components/DataComponent"
import Header from "@/components/Header"
import BrandTitle from "@/components/BrandTitle"
import Footer from "@/components/Footer"

// Const
const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
const options = { headers: { Authorization: `Bearer ${token}` } }

function LatestUpdatesPage({ data, error }) {
  const brand = data[0].attributes.manufacture.data.attributes.name

  return (
    <main>
      <Header />
      <section className="container pt-36 pb-16">
        <BrandTitle
          title={`The List of ${brand} Printer Driver`}
          subtitle={`Find the complete ${brand} printer driver for your device.`}
        />

        <div className="mt-16">
          <DataComponent data={data} error={error} />
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default LatestUpdatesPage

export const getStaticPaths = async () => {
  const responseData = await fetchAPI("/manufactures", {}, options)

  const paths = responseData.data.map((data) => {
    return {
      params: {
        brand: data.attributes.slug
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const urlParamsObject = {
    filters: {
      manufacture: {
        slug: {
          $eq: params.brand
        }
      }
    },
    populate: {
      author: {
        populate: "*"
      },
      image: { populate: "*" },
      ratings: { populate: "*" },
      manufacture: { fields: ["name"] },
      driver_files: { populate: "*" }
    }
  }
  const responseData = await fetchAPI("/drivers", urlParamsObject, options)

  if (!responseData) {
    return {
      props: {
        error: true
      }
    }
  }

  return { props: { data: responseData.data } }
}
