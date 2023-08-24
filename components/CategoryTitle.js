import Image from "next/image"
import React from "react"

function CategoryTitle({ imageUrl, title, subtitle }) {
  return (
    <div className="w-full h-60 relative rounded-xl overflow-hidden">
      <Image
        src={imageUrl}
        fill
        priority
        className="object-cover"
        alt={title}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900/60"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <h1 className="text-2xl font-semibold mb-2">{title}</h1>
        <p className="hidden xl:block">{subtitle}</p>
      </div>
    </div>
  )
}

export default CategoryTitle
