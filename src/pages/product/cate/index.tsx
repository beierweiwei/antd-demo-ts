import { Flex } from 'antd-mobile'
import * as React from 'react'
import BottomNav from '../../../components/loayout/bottomNav'
import './index.less'
interface HomePageProps {
  [index: string]: any
}
interface HomePageState {
  imgHeight: string,
  refreshing: boolean
  height: number
  down: boolean
}


class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props)
    this.state = {
      // 下拉刷新参数
      refreshing: false,
      down: false,
      height: (document.documentElement as HTMLElement).clientHeight,
      imgHeight: 'auto'
    }
  }

  componentDidMount() {
    // this.props.fetchProducts()
    // this.props.fetchAds()
  }
  render() {
    const prefix = 'product-cate'
    return (
      <div className="page-with-nav page">
        <div className={prefix} >
          <Flex style={{ height: '100%'}}> 
            <div className={`${prefix}-left`}>
              left
            </div>
        
            <div className={`${prefix}-right`}>
              righ
            </div>
          </Flex>
        </div>
        <BottomNav curtPage="home" />
      </div>
    )
  }
}
export default HomePage