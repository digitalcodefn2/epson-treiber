import React, { useCallback, useEffect, useState } from "react"

// Utils
import { fetchAPI } from "@/utils/fetch-api"

// Components
import DataComponent from "@/components/DataComponent"
import CategoryTitle from "@/components/CategoryTitle"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

function LatestUpdatesPage() {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchData = useCallback(async (start, limit) => {
    setLoading(true)

    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
      const path = `/drivers`
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          author: {
            fields: ["name"]
          },
          image: { fields: ["url"] },
          ratings: { populate: "*" }
        },
        pagination: {
          start: start,
          limit: limit
        }
      }
      const options = { headers: { Authorization: `Bearer ${token}` } }
      const responseData = await fetchAPI(path, urlParamsObject, options)

      if (start === 0) {
        setData(responseData.data)
      } else {
        setData((prevData) => [...prevData, ...responseData.data])
      }
      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData(0, 6)
  }, [fetchData])

  return (
    <main>
      <Header />
      <section className="container pt-36 pb-16">
        <CategoryTitle
          imageUrl="/images/printer-2.jpg"
          title="Latest Update Driver Around The World"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          magni officia quas necessitatibus, nam sunt nesciunt nisi! Fugiat, ut
          perferendis."
        />

        <div className="mt-16">
          <DataComponent isLoading={isLoading} error={error} data={data} />
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default LatestUpdatesPage
