import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

// Third Party
import parse from "html-react-parser"
import { FiChevronRight, FiDownload, FiEdit } from "react-icons/fi"
import { AiFillStar } from "react-icons/ai"
import platform from "platform"
import { v4 as uuidv4 } from "uuid"

// Utils
import { fetchAPI } from "@/utils/fetch-api"
import { getStrapiURL } from "@/utils/api-helpers"

// Components
import Header from "@/components/Header"
import LatestUpdatesDriver from "@/components/LatestUpdatesDriver"
import Footer from "@/components/Footer"
import Loader from "@/components/Loader"
import RatingStar from "@/components/RatingStar"
import ReviewModal from "@/components/ReviewModal"

const RecentPost = dynamic(() => import("@/components/RecentPost"), {
  ssr: false
})

const ReviewCard = dynamic(() => import("@/components/ReviewCard"), {
  ssr: false
})

// Helpers
import { getAverageOfNumberArray } from "@/helpers/array"

// Const
const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
const options = { headers: { Authorization: `Bearer ${token}` } }

const joinOperatingSystem = (array) => {
  let newArray = []

  array.forEach((element) => newArray.push(element.attributes.name))

  const sortedArray = newArray.sort().join(" / ")

  return sortedArray
}

const ButtonDownloadComponent = ({
  buttonLoading,
  deviceDownloadUrl,
  deviceOS,
  handleDownloadDriver
}) => {
  if (buttonLoading) {
    return (
      <div className="mt-6 mx-auto grid place-content-center">
        <Loader size={40} />
      </div>
    )
  }

  if (deviceDownloadUrl.length > 0) {
    return (
      <button
        onClick={() =>
          handleDownloadDriver(
            deviceDownloadUrl[0].attributes.file.data.attributes.url
          )
        }
        className="flex w-fit items-center gap-4 bg-secondary-500 py-2 px-5 rounded-xl text-white mt-6 mx-auto hover:bg-green-700 transition-colors"
      >
        <div className="text-left">
          <p className="font-semibold text-xl">Free Download</p>
          <p className="font-medium text-sm">for {deviceOS}</p>
        </div>
        <FiDownload size={26} />
      </button>
    )
  }

  return (
    <div className="mt-6 mx-auto grid place-content-center text-red-500">
      Sorry. The driver is not available for your operating system.
    </div>
  )
}

function DriverPage({ singleDriver, latestUpdatesDriver, recentPost }) {
  const router = useRouter()

  const [deviceOS, setDeviceOS] = useState()
  const [buttonLoading, setButtonLoading] = useState(false)
  const [deviceDownloadUrl, setDeviceDownloadUrl] = useState([])
  const [currentDownloadCount, setCurrentDownloadCount] = useState(0)
  const [ratings, setRatings] = useState([])
  const [isOpenReviewModal, setIsOpenReviewModal] = useState(false)

  const averageRating = getAverageOfNumberArray(ratings)

  const getDeviceDownloadUrl = async () => {
    setButtonLoading(true)

    const deviceArray = await singleDriver.driver_files.data.filter((item) => {
      const osArray = item.attributes.operating_systems.data

      const mappedOsArray = osArray.map((os) => os.attributes.name)

      return mappedOsArray.includes(deviceOS)
    })

    setButtonLoading(false)

    setDeviceDownloadUrl(deviceArray)
  }

  const handleDownloadDriver = async (url) => {
    try {
      setCurrentDownloadCount(Number(currentDownloadCount) + 1)

      await router.push(url)

      await fetch(
        `https://dashboard.driversidn.com/api/drivers/${singleDriver[0].id}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          method: "PUT",
          body: JSON.stringify({
            data: { downloadCount: Number(currentDownloadCount) + 1 }
          })
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitReview = async (value) => {
    const { name, message, ratingValue } = value

    try {
      await fetch(
        getStrapiURL(`/ratings`),

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          method: "POST",
          body: JSON.stringify({
            data: {
              name,
              message,
              ratingValue,
              driver: {
                connect: [singleDriver[0].id]
              }
            }
          })
        }
      )

      setRatings((prevState) => [
        {
          id: uuidv4(),
          attributes: {
            name,
            message,
            ratingValue,
            createdAt: new Date().toISOString()
          }
        },
        ...prevState
      ])

      setIsOpenReviewModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setDeviceOS(platform.os.toString())
    getDeviceDownloadUrl()
  }, [deviceOS])

  useEffect(() => {
    setCurrentDownloadCount(Number(singleDriver.downloadCount))
    setRatings(singleDriver.ratings.data)
  }, [])

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <main>
      <Header />
      <section className="container pt-36 pb-16">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-primary-600 hover:underline">
            Home
          </Link>{" "}
          <FiChevronRight size={20} className="text-gray-800" />{" "}
          <Link
            href={`/manufacture/${singleDriver.manufacture.data.attributes.name.toLowerCase()}`}
            className="text-primary-600 hover:underline"
          >
            {singleDriver.manufacture.data.attributes.name}
          </Link>
          <FiChevronRight size={20} className="text-gray-800" />{" "}
          <span>{singleDriver.title}</span>
        </div>

        <div className="flex flex-col xl:flex-row gap-24 mt-12">
          <div className="w-full xl:w-8/12">
            <div className="flex justify-between items-center gap-4">
              <div className="w-[130px] aspect-square relative">
                <Image
                  src={singleDriver.image.data.attributes.url}
                  fill
                  className="object-cover rounded-md"
                  alt={singleDriver.title}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-2xl mb-2 text-gray-900">
                  {singleDriver.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <span className="text-green-600 font-medium">
                    {singleDriver.isFree ? "Free" : "Paid"}
                  </span>
                  <span>{singleDriver.language}</span>
                </div>
                <div className="flex gap-4 items-center text-gray-700">
                  <div className="flex items-center gap-1">
                    <AiFillStar size={24} className="text-yellow-500" />
                    <p>4.7</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiDownload size={20} />
                    <p>{currentDownloadCount ? currentDownloadCount : 0}</p>
                  </div>
                </div>
              </div>
            </div>
            <table className="mt-6 text-gray-800">
              <tbody>
                <tr>
                  <td className="w-56 py-1 font-medium">Operating System</td>
                  <td>: {deviceOS ? deviceOS : "OS is Not Detected"}</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">Manufacture</td>
                  <td>: {singleDriver.manufacture.data.attributes.name}</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">Size</td>
                  <td>: 23.5 Mb</td>
                </tr>
              </tbody>
            </table>
            <ButtonDownloadComponent
              buttonLoading={buttonLoading}
              deviceDownloadUrl={deviceDownloadUrl}
              deviceOS={deviceOS}
              handleDownloadDriver={handleDownloadDriver}
            />
            <p className="bg-gray-100 p-4 rounded-lg mt-8 text-sm">
              <span className="text-red-600">Attention!</span> Your operating
              system may not be detected. Please use the download button at the
              bottom of this page according to your device&apos;s operating
              system.
            </p>
            <article className="mt-10 driver-description">
              {parse(singleDriver.description)}
            </article>
            <div className="relative overflow-x-auto mt-8">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-sm text-white uppercase bg-primary-500 ">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-semibold">
                      File Type
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold">
                      Operating System
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold">
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {singleDriver.driver_files.data.map((file) => (
                    <tr
                      key={file.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {file.attributes.driver_type.data.attributes.title}
                      </th>
                      <td className="px-6 py-4">
                        {joinOperatingSystem(
                          file.attributes.operating_systems.data
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {Math.round(
                          (file.attributes.file.data.attributes.size / 1024) *
                            10
                        ) / 10}{" "}
                        Mb
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            handleDownloadDriver(
                              file.attributes.file.data.attributes.url
                            )
                          }
                          className="text-primary-600 hover:underline hover:underline-offset-2"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-16">
              <h1 className="font-medium text-2xl mb-2">User Reviews</h1>
              <div className="flex flex-col xl:flex-row justify-between items-center gap-6 xl:gap-10">
                <div className="flex gap-4 items-end">
                  <p className="text-5xl text-orange">
                    {averageRating ? averageRating : 0}
                  </p>
                  <RatingStar ratingValue={averageRating} size="large" />
                  <p className="text-gray-700">{ratings.length} reviews</p>
                </div>
                <button
                  onClick={() => setIsOpenReviewModal(true)}
                  className="btn flex items-center gap-2 bg-primary-700 hover:bg-primary-800 transition-colors text-white text-sm"
                >
                  <FiEdit size={20} />
                  <p className="flex-1">Write Review</p>
                </button>
              </div>

              <ReviewModal
                isOpenReviewModal={isOpenReviewModal}
                onCloseModal={() => setIsOpenReviewModal(false)}
                handleSubmitReview={handleSubmitReview}
              />

              <hr className="my-6" />

              <div className="grid grid-cols-1 gap-6">
                {ratings.slice(0, 4).map((rating) => (
                  <ReviewCard rating={rating} key={rating.id} />
                ))}
              </div>
            </div>
          </div>
          <div className="w-full xl:w-4/12">
            <RecentPost recentPost={recentPost} />
            <LatestUpdatesDriver latestUpdatesDriver={latestUpdatesDriver} />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default DriverPage

export const getStaticPaths = async () => {
  const responseData = await fetchAPI("/drivers", {}, options)

  const paths = responseData.data.map((data) => {
    return {
      params: {
        slug: data.attributes.slug
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const urlParamsObject = {
    filters: {
      slug: {
        $eq: params.slug
      }
    },
    populate: {
      author: {
        populate: "*"
      },
      image: { populate: "*" },
      ratings: {
        populate: "*",
        sort: {
          createdAt: "desc"
        }
      },
      manufacture: { fields: ["name"] },
      driver_files: { populate: "*" }
    }
  }

  const singleDriver = await fetchAPI("/drivers", urlParamsObject, options)

  const latestUpdatesDriver = await fetchAPI(
    "/drivers",
    {
      sort: { downloadCount: "desc" },
      pagination: {
        limit: 3
      },
      populate: {
        author: {
          fields: ["name"]
        },
        image: { fields: ["url"] }
      }
    },
    options
  )

  const recentPost = await fetchAPI(
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

  return {
    props: {
      singleDriver: singleDriver.data[0].attributes,
      latestUpdatesDriver: latestUpdatesDriver.data,
      recentPost: recentPost.data
    }
  }
}
