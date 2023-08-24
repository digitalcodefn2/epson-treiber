import Image from "next/image"
import Link from "next/link"

// Third Party
import { FiChevronRight } from "react-icons/fi"
import dynamic from "next/dynamic"

// Components
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import LatestUpdatesDriver from "@/components/LatestUpdatesDriver"
import DriverCard from "@/components/DriverCard"

const RecentPost = dynamic(() => import("@/components/RecentPost"), {
  ssr: false
})

// Utils
import { fetchAPI } from "@/utils/fetch-api"

export default function Home({
  mostPopularDriver,
  recentDriver,
  blog,
  manufacture
}) {
  return (
    <main>
      <Header />
      <section className="bg-primary-900 text-white xl:h-[calc(100vh_-_80px)] 2xl:h-fit mt-[80px]">
        <div className="container mx-auto py-20 flex flex-col-reverse xl:flex-row justify-between items-center gap-20 h-full">
          <div className="w-full xl:w-1/2">
            <h1 className="text-3xl font-bold mb-6">
              Discover Your One-Stop Destination for Printer Driver Downloads
            </h1>
            <p className="mb-11">
              Welcome to our comprehensive printer driver collection, your
              ultimate source for a wide range of printer drivers to enhance
              your printing experience.
            </p>
            <div className="flex flex-col xl:flex-row gap-6 xl:gap-8">
              <Link
                href="/category/most-populars"
                className="btn bg-white text-primary-900 hover:text-primary-600 transition-colors"
              >
                Popular Drivers
              </Link>
              <Link
                href="/category/latest-updates"
                className="btn border border-white hover:bg-white hover:text-blue-900 transition-colors"
              >
                Latest Updates
              </Link>
            </div>
          </div>
          <div className="w-full xl:w-1/2">
            <div className="relative h-[340px] w-[280px] mx-auto">
              <div className="w-[290px] h-[290px] absolute rounded-full bg-primary-500 blur-circle transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="abolute w-full h-full border border-white rounded-3xl rotate-[-20deg]"></div>
              <Image
                src="/images/printer.jpg"
                fill
                className="object-cover rounded-3xl"
                alt="Printer"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 xl:py-24 flex flex-col xl:flex-row gap-24">
        <div className="w-full xl:w-8/12">
          <div className="mb-20">
            <h2 className="text-2xl xl:text-3xl font-medium text-gray-800 mb-4">
              Manufactures
            </h2>
            <p>
              The following is a list of the most famous printer drivers in the
              world. We provide official drivers that are safe and secure.
            </p>
            <div className="grid grid-cols-4 gap-6 mt-4">
              {manufacture.map((item) => (
                <Link
                  href={`/manufacture/${item.attributes.slug}`}
                  key={item.id}
                  className="relative h-12"
                >
                  <Image
                    src={`/images/printers/${item.attributes.slug}.png`}
                    fill
                    className="object-contain"
                    alt={item.attributes.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-baseline mb-4 gap-10">
              <h2 className="flex-1 text-2xl xl:text-3xl font-medium text-gray-800 mb-4">
                Most Popular Drivers
              </h2>
              <Link
                href="/category/most-populars"
                className="flex items-center gap-2 text-primary-900 hover:text-primary-600 font-medium transition-colors"
              >
                <p>See All</p>
                <FiChevronRight size={20} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-10">
              {mostPopularDriver.map((driver) => (
                <DriverCard key={driver.id} driver={driver} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full xl:w-4/12">
          <RecentPost recentPost={blog} />
          <LatestUpdatesDriver latestUpdatesDriver={recentDriver} />
        </div>
      </section>

      <Footer />
    </main>
  )
}

export async function getServerSideProps() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
  const urlParamsObject = {
    populate: {
      author: {
        fields: ["name"]
      },
      image: { fields: ["url"] },
      ratings: { populate: "*" }
    }
  }
  const options = { headers: { Authorization: `Bearer ${token}` } }

  const mostPopularDriver = await fetchAPI(
    "/drivers",
    {
      sort: { createdAt: "desc" },
      pagination: {
        limit: 5
      },
      ...urlParamsObject
    },
    options
  )

  const recentDriver = await fetchAPI(
    "/drivers",
    {
      sort: { downloadCount: "desc" },
      pagination: {
        limit: 3
      },
      ...urlParamsObject
    },
    options
  )

  const blog = await fetchAPI(
    "/blogs",
    {
      populate: {
        author: {
          fields: ["name"]
        },
        image: { fields: ["url"] }
      }
    },
    options
  )

  const manufacture = await fetchAPI(
    "/manufactures",
    { sort: { name: "asc" } },
    options
  )

  return {
    props: {
      mostPopularDriver: mostPopularDriver.data,
      recentDriver: recentDriver.data,
      blog: blog.data,
      manufacture: manufacture.data
    }
  }
}
