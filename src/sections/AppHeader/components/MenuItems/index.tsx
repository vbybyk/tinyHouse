import { Avatar, Menu, Button} from "antd";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Viewer } from "../../../../lib/types";
import { LOG_OUT } from "../../../../lib/graphql/mutations";
import { LogOut as LogOutData  } from "../../../../lib/graphql/mutations/LogOut/__generated__/LogOut";
import { displaySuccessNotification, displayErrorMessage } from "../../../../lib/utils";
import { HomeOutlined, UserOutlined, LogoutOutlined  } from "@ant-design/icons";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const MenuItems = ({viewer, setViewer} : Props) => {

  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: data => {
        if (data && data.logOut){
          setViewer(data.logOut)
          displaySuccessNotification('You were successfuly log out')
        }
    },
    onError: () => {
          displayErrorMessage("Sorry! We weren't able to log you out. Please try again later!")
    }
  });

  const handleLogOut = () => {
    logOut();
    console.log('click')
  }

  const itemsSignIn = [
  { label: <Link to='/host'>
              <HomeOutlined/> Host
            </Link>, 
    key: '/host' }, 
  { label: <Link to='/login'>
              <Button type="primary">Sign in</Button>
            </Link>, 
    key: '/login' }
  ];
  const itemsAvatar = [
  { label: <Link to='/host'>
              <HomeOutlined/> Host
            </Link>, 
    key: '/host' }, 
  {
    label: <Avatar src={viewer.avatar}/>,
    key: 'submenu',
    children: [
      { label: <Link to={`/user/${viewer.id}`}>
                  <UserOutlined/> Profile
                </Link>,
        key: '/user' },
      { label: 
                  <div onClick={handleLogOut}>
                    <LogoutOutlined/> Log out
                  </div>,
               
        key: '/logout' }
  ],
  },
  ];

  const items = viewer.avatar && viewer.id ? itemsAvatar : itemsSignIn

  return(
    <Menu 
        mode="horizontal" 
        selectable={false} 
        className="menu" 
        items={items}/>
  )

}