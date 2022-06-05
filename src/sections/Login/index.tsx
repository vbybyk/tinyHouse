import { useEffect, useRef } from "react";
import { Navigate} from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/client";
import { Card, Layout, Typography, Spin } from "antd";
import { ErrorBanner } from "../../lib/components";
import { LOG_IN } from "../../lib/graphql/mutations";
import { AUTH_URL } from "../../lib/graphql/queries";
import { LogIn as LogInData, LogInVariables } from "../../lib/graphql/mutations/LogIn/__generated__/LogIn";
import { AuthUrl as AuthUrlData } from "../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl";
import { displaySuccessNotification, displayErrorMessage } from "../../lib/utils";
import googleLogo from './assets/google_logo.jpg'
import { Viewer } from "../../lib/types";


const {Title, Text} = Typography;
const {Content} = Layout

interface Props {
  setViewer: (viewer: Viewer) => void;
}

export const Login = ({setViewer}: Props) => {
  const client = useApolloClient();

  const [logIn, {data: LogInData, loading: LogInLoading, error: LogInError}] = 
  useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: data => {
      if(data && data.logIn){
        // debugger;
      console.log(data.logIn)
       setViewer(data.logIn);
       displaySuccessNotification("You've successfully logged in!");
      }
    }
  });

  const logInRef = useRef(logIn);
  
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    if(code){
      logInRef.current({
        variables: {
          input: {code}
        }
      })
    }
  }, []);

  const handleAuthorize =async () => {
    try {
      const {data} = await client.query<AuthUrlData>({
        query: AUTH_URL
    })
    window.location.href = data.authUrl
    } catch {
      displayErrorMessage("Sorry! We weren't able to log you in. Please try again later!")
    }
  };
  
  if (LogInLoading){
    return(
      <Content className="log-in">
        <Spin size="large" tip="Logging you in ..."/>
      </Content>
    )
  }

  if(LogInData && LogInData.logIn) {
      const {id : viewerId} = LogInData.logIn;
      return <Navigate to={`/user/${viewerId}`}/>
  }

  const logInErrorBannerElement = LogInError? 
    <ErrorBanner description="We weren't able to log you in. Please try again soon."/>
    :null

  return(
    <Content className="log-in">
      {logInErrorBannerElement}
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title level={3} className="log-in-card__intro-title">
            <span role="img" aria-label="wave">
              👋
            </span>
          </Title>
          <Title level={3} className="log-in-card__intro-title">
            Log in to TinyHouse!
          </Title>
          <Text>Sign in with Google to start booking available rentals!</Text>
        </div>
        <button type="button" className="log-in-card__google-button" onClick={handleAuthorize}>
          <img
            src={googleLogo}
            alt="Google Logo"
            className="log-in-card__google-button-logo"
          />
          <span className="log-in-card__google-button-text">Sign in with Google</span>
        </button>
        <Text type="secondary">
          Note: By signing in, you'll be redirected to the Google consent form to sign in
          with your Google account.
        </Text>

      </Card>
    </Content>
  )
}

