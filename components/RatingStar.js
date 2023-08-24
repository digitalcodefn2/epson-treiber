import React from "react"

function RatingStar({ ratingValue, size }) {
  return (
    <div className="flex items-center gap-1 mb-1">
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className={`relative ${
            size === "large" ? "h-7 w-7" : "h-4 w-4"
          } star bg-gray-300`}
        >
          <div
            style={{
              width:
                item <= ratingValue
                  ? "100%"
                  : `${(ratingValue - (item - 1)) * 100}%`
            }}
            className={`absolute bg-orange top-0 left-0 h-full`}
          ></div>
        </div>
      ))}
    </div>
  )
}

export default RatingStar
