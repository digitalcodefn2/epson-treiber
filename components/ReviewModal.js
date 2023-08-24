import { Fragment, useState } from "react"

// Third Party
import { Dialog, Transition } from "@headlessui/react"
import { useForm } from "react-hook-form"

export default function ReviewModal({
  isOpenReviewModal,
  onCloseModal,
  handleSubmitReview
}) {
  const [currentRating, setCurrentRating] = useState(5)
  const [rating, setRating] = useState(currentRating)
  const [isLoading, setIsloading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    setIsloading(true)

    const reviewData = {
      ratingValue: currentRating,
      ...data
    }

    handleSubmitReview(reviewData)

    setIsloading(false)

    reset()
  }

  return (
    <Transition appear show={isOpenReviewModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Write a Review
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-5">
                    <div className="flex items-center justify-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div
                          key={item}
                          className="relative w-8 h-8 star bg-gray-200"
                        >
                          <div
                            onMouseEnter={() => setCurrentRating(item)}
                            onMouseLeave={() => setCurrentRating(rating)}
                            onClick={() => setRating(item)}
                            className={`absolute top-0 left-0 h-full w-full cursor-pointer ${
                              item <= currentRating ? "bg-orange" : ""
                            }`}
                          ></div>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4 text-sm">
                      <div className="mb-3">
                        <label
                          className="block text-gray-500 font-medium mb-1"
                          htmlFor="name"
                        >
                          Name
                        </label>
                        <input
                          {...register("name", { required: true })}
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-primary-600"
                          id="name"
                          type="text"
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <span className="text-red-500 mt-1">
                            This field is required
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          className="block text-gray-500 font-medium mb-1"
                          htmlFor="message"
                        >
                          Your Message
                        </label>
                        <textarea
                          {...register("message", { required: true })}
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-primary-600"
                          id="message"
                          rows={5}
                          placeholder="Leave a comment..."
                        />
                        {errors.message && (
                          <span className="text-red-500 mt-1">
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3 justify-end">
                    <button
                      type="button"
                      className="btn btn-primary text-sm border border-primary-600 text-primary-600 hover:text-primary-800"
                      onClick={onCloseModal}
                    >
                      Cancel
                    </button>
                    <input
                      type="submit"
                      disabled={isLoading}
                      className={`cursor-pointer btn btn-primary text-sm bg-primary-600 hover:bg-primary-700 text-white ${
                        isLoading && "cursor-not-allowed"
                      }`}
                      value={isLoading ? "Loading..." : "Submit Review"}
                    />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
