import { Skeleton, Divider, Alert} from "antd";
import './styles/listingSkeleton.css'

type Props = {
  title: string,
  error?: boolean
}

export const ListingsSkeleton = ({title, error = false} : Props) => {
  const errorMessage = error? 
    <Alert type="error" message="Ooops.. something went wrong"/>: null

  return(
    <div className="listings-skeleton">
      {errorMessage}
      <h1>{title}</h1>
      <Skeleton active paragraph={{rows: 1}}/>
      <Divider/>
      <Skeleton active paragraph={{rows: 1}}/>
      <Divider/>
      <Skeleton active paragraph={{rows: 1}}/>
    </div>
  )
}