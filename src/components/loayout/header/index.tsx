import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
interface HeaderProps extends RouteComponentProps{
  title: string
}
  const Header = ({title, history, ...rest}:HeaderProps) => (
      <NavBar
        style={{width: '100%'}}
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >
        {title || 'demo-shop'}
      </NavBar>
)

const mapSateToProps = ({system}:StoreState) => {
  return {
    title: system.title 
  }
}

const HeaderContainer = connect(mapSateToProps)(withRouter(Header))
export default HeaderContainer
