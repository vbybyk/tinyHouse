import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { USER } from "../../lib/graphql/queries"
import { User as UserData, UserVariables } from "../../lib/graphql/queries/User/__generated__/User"
import { Viewer } from "../../lib/types"
import { Content } from "antd/lib/layout/layout"
import { Row, Col } from "antd"
import { ErrorBanner, PageSkeleton } from "../../lib/components"
import { UserProfile } from './components/UserProfile'

interface Props {
  viewer: Viewer
}

type MatchParams = {
  id: string;
}

export const User = ({viewer} : Props) => {
  const { id }  = useParams<MatchParams>() as MatchParams;

  const {data, loading, error} = useQuery<UserData, UserVariables>(USER, {
     variables: {
       id
     }
  });

  if (loading) {
    return (
      <Content className="user">
        <PageSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Content>
    );
  }

  const user = data? data.user : null;
  const userProfileElement = user? <UserProfile user={user} viewer={viewer}/> : null;

  return(
    <Content className="user">
      <Row gutter={12} justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
      </Row>
    </Content>
  )
}