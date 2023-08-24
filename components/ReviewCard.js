import React from "react"

// Third Party
import formatDistance from "date-fns/formatDistance"

// Component
import RatingStar from "./RatingStar"

function ReviewCard({ rating }) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-10 aspect-square rounded-full bg-green-500 text-white grid place-content-center text-xl font-medium">
        {rating.attributes.name.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className="font-semibold mb-1">{rating.attributes.name}</p>

        <div className="flex items-end gap-2 mb-2">
          <RatingStar ratingValue={rating.attributes.ratingValue} />
          <p className="text-sm text-gray-700">
            {formatDistance(new Date(rating.attributes.createdAt), new Date(), {
              addSuffix: true
            })}
          </p>
        </div>

        <p>{rating.attributes.message}</p>
      </div>
    </div>
  )
}

export default ReviewCard
