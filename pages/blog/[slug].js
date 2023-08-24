import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"

// Third Party
import parse from "html-react-parser"

// Utils
import { fetchAPI } from "@/utils/fetch-api"

// Components
import Header from "@/components/Header"
import RecentPost from "@/components/RecentPost"
import LatestUpdatesDriver from "@/components/LatestUpdatesDriver"
import Footer from "@/components/Footer"

// Utils
import { formatDate } from "@/utils/api-helpers"

// Const
const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
const options = { headers: { Authorization: `Bearer ${token}` } }

function BlogPage({ singleBlog, recentPost, latestUpdatesDriver }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <main>
      <Header />
      <section className="container pt-24 pb-16">
        <div className="flex flex-col xl:flex-row gap-24 mt-12">
          <div className="w-full xl:w-8/12">
            <div className="w-full h-72 relative">
              <Image
                src={singleBlog.image.data.attributes.url}
                fill
                className="object-cover"
                alt={singleBlog.title}
                priority
              />
            </div>
            <h1 className="mt-4 text-2xl font-medium">{singleBlog.title}</h1>

            <div className="mt-1 flex gap-2 italic text-sm">
              <span>{singleBlog.author.data.attributes.name}</span>
              <span>{formatDate(singleBlog.createdAt)}</span>
            </div>

            <article className="mt-10 blog-description">
              {parse(singleBlog.content)}
            </article>
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

export default BlogPage

export const getStaticPaths = async () => {
  const responseData = await fetchAPI("/blogs", {}, options)

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
  const singleBlog = await fetchAPI(
    "/blogs",
    {
      filters: {
        slug: {
          $eq: params.slug
        }
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
      singleBlog: singleBlog.data[0].attributes,
      latestUpdatesDriver: latestUpdatesDriver.data,
      recentPost: recentPost.data
    }
  }
}
