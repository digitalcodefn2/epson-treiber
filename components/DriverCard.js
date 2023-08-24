import { formatDate } from "@/utils/api-helpers"
import Image from "next/image"
import Link from "next/link"
import React from "react"

// Third Party
import { AiFillStar } from "react-icons/ai"

function DriverCard({ driver }) {
  const rating = driver.attributes.ratings.data.length

  return (
    <div
      key={driver.id}
      className="flex flex-col xl:flex-row justify-between items-center gap-8 border-2 rounded-xl p-4"
    >
      <div className="w-36 aspect-square xl:aspect-auto xl:h-full">
        <Link
          href={`/driver/${driver.attributes.slug}`}
          className="block h-full w-full relative"
        >
          <Image
            src={driver.attributes.image.data.attributes.url}
            fill
            className="object-contain"
            alt={driver.attributes.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>
      <div className="flex-1">
        <h2 className="font-medium text-lg mb-2 text-gray-900 hover:underline hover:underline-offset-2 hover:text-primary-900">
          <Link href={`/driver/${driver.attributes.slug}`}>
            {driver.attributes.title}
          </Link>
        </h2>
        <div className="flex gap-2 items-center mb-2 text-sm font-medium text-gray-700">
          <div className="flex gap-1 items-center">
            <AiFillStar size={24} className="text-yellow-500" />
            <p>{rating}</p>
          </div>
          <p className="italic">
            {driver.attributes.author.data.attributes.name}
          </p>
          &bull;
          <p className="italic">{formatDate(driver.attributes.createdAt)}</p>
        </div>
        <p className="text-gray-800 line-clamp-3">
          {driver.attributes.shortDescription}
        </p>
      </div>
    </div>
  )
}

export default DriverCard
