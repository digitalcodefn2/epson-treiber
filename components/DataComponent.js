// Components
import DriverCard from "./DriverCard"
import Loader from "./Loader"

const DataComponent = ({ isLoading, error, data }) => {
  if (isLoading) {
    return (
      <div className="w-full h-52 border rounded-xl grid place-content-center">
        <Loader />
      </div>
    )
  } else {
    if (error) {
      return (
        <div className="w-full h-52 border rounded-xl grid place-content-center bg-red-50 text-red-600">
          Failed to get the data. Please try again letter!
        </div>
      )
    } else if (data) {
      return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {data.map((driver, index) => (
            <DriverCard key={index} driver={driver} />
          ))}
        </div>
      )
    }
  }
}

export default DataComponent
