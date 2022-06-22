import { useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Layout, Spin } from "antd";
import { CONNECT_STRIPE } from "../../lib/graphql/mutations";
import {
  ConnectStripe as ConnectStripeData,
  ConnectStripeVariables
} from "../../lib/graphql/mutations/ConnectStripe/__generated__/ConnectStripe";
import { displaySuccessNotification } from "../../lib/utils";
import { Viewer } from "../../lib/types";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Content } = Layout;

export const Stripe = ({ viewer, setViewer }: Props) => {

  const navigate = useNavigate();

  const [connectStripe, { data, loading, error }] = useMutation<ConnectStripeData,ConnectStripeVariables
  >(CONNECT_STRIPE, {
    onCompleted: data => {
      console.log('completed mutation ')
      console.log(data)
      console.log(data.connectStripe)
      if (data && data.connectStripe) {
        setViewer({ ...viewer, hasWallet: data.connectStripe.hasWallet });
        displaySuccessNotification(
          "You've successfully connected your Stripe Account!",
          "You can now begin to create listings in the Host page."
        );
      }
    }
  });
  console.log(data)
  console.log(error)
  
  const connectStripeRef = useRef(connectStripe);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code)
    if (code) {
      connectStripeRef.current({
        variables: {
          input: { code }
        }
      });
      console.log('code sent')
    } else {
      navigate("/login", {replace:true});
    }
  }, [navigate]);

  if (data && data.connectStripe) {
    return <Navigate to={`/user/${viewer.id}`} />;
  }

  if (loading) {
    return (
      <Content className="stripe">
        <Spin size="large" tip="Connecting your Stripe account..." />
      </Content>
    );
  }

  if (error) {
    return <Navigate to={`/user/${viewer.id}?stripe_error=true`} />;
  }

  return null;
};