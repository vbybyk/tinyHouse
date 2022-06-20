import { useState, useEffect } from "react";
import { Layout, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuItems } from "./components/MenuItems";
import { displayErrorMessage } from "../../lib/utils";
import { Viewer } from "../../lib/types";
import HeaderLogo from './assets/logo.png';

const { Header } = Layout;
const { Search } = Input

interface Props {
  viewer: Viewer;
  setViewer: (viewer : Viewer) => void;
}

export const AppHeader = ({viewer, setViewer} : Props) => {

  const [search, setSearch] = useState("")

  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
      const { pathname } = location
      const pathnameSubStrings = pathname.split('/')

      if(!pathname.includes("/listings")){
        setSearch("");
        return
      }

      if (pathname.includes("/listings") && pathnameSubStrings.length === 3) {
        setSearch(pathnameSubStrings[2]);
        return;
      }
      
  },[location]);

  const onSearch = (value : string) => {
      const trimmedValue = value.trim()

      if(trimmedValue) {
        navigate(`/listings/${trimmedValue}`)
      } else {
        displayErrorMessage("Please enter a valid search!")
      }
  }

  return(
      <Header className="app-header">
        <div className="app-header__logo-search-section">
          <div className="app-header__logo">
              <Link to='/'>
                <img src={HeaderLogo} alt="Tiny House logo" />
              </Link>  
          </div>
          <div className="app-header__search-input">
            <Search 
              placeholder="Los Angeles" 
              value={search}
              onChange={evt => setSearch(evt.target.value)}
              onSearch={onSearch}
              enterButton />
          </div>
        </div>
        <div className="app-header__menu-section">
            <MenuItems viewer={viewer} setViewer={setViewer}/>
        </div>
      </Header>  
  )
}