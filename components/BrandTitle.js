import Image from "next/image"
import React from "react"

function BrandTitle({ title, subtitle }) {
  return (
    <div className="w-full h-fit xl:h-40 py-10 px-6 grid place-content-center rounded-xl bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="text-white text-center">
        <h1 className="text-2xl font-semibold mb-2">{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

export default BrandTitle
