import ReactLoading from "react-loading"

export default function Loader({ size = 50 }) {
  return <ReactLoading type="spin" color="#1061b9" height={size} width={size} />
}
