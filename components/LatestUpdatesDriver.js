import Image from "next/image"
import Link from "next/link"

function LatestUpdatesDriver({ latestUpdatesDriver }) {
  return (
    <div>
      <h3 className="mb-4 text-xl font-medium">Latest Updated Drivers</h3>

      <div className="grid grid-cols-1 gap-8">
        {latestUpdatesDriver.map((driver) => (
          <div
            key={driver.id}
            className="flex justify-between items-center gap-4"
          >
            <Link
              href={`/driver/${driver.attributes.slug}`}
              className="w-[100px] aspect-square block relative"
            >
              <Image
                src={driver.attributes.image.data.attributes.url}
                fill
                className="object-cover rounded-md"
                alt={driver.attributes.title}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>
            <div className="flex-1">
              <Link
                href={`/driver/${driver.attributes.slug}`}
                className="font-medium mb-2 text-gray-900 hover:underline hover:underline-offset-2 hover:text-primary-900"
              >
                {driver.attributes.title}
              </Link>

              <p className="text-gray-700 text-sm mb-2 line-clamp-3">
                {driver.attributes.shortDescription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestUpdatesDriver
