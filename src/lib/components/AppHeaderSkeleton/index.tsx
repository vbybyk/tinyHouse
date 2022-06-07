import { Layout } from "antd";

import HeaderLogo from './assets/tinyhouse-logo.png'

const { Header } = Layout;


export const AppHeaderSkeleton = () => {
  return(
      <Header className="app-header">
        <div className="app-header__logo-search-section">
          <div className="app-header__logo">
                <img src={HeaderLogo} alt="Tiny House logo" />
          </div>
        </div>
      </Header>  
  )
}