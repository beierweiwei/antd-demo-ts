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
  catesTree: any[]
}
class CatePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props)
    this.state = {
      catesTree: [],
      // 下拉刷新参数
      refreshing: false,
      down: false,
      height: (document.documentElement as HTMLElement).clientHeight,
      imgHeight: 'auto'
    }
  }
  createCateTree (cateList:any) {
    const res:any  = []
    cateList.forEach((cate:any) => {
      findParent(cate, cateList)  
    })
    return res 

    function findParent (cate:any, allCate:any) {
      const pCate = allCate.find((item:any) => item._id === cate.pid)
      if (!pCate) {
        if (!res.find((item:any) => item._id === cate._id)) {
          res.push(cate)
        }
      } else {
        const pCateRes = findParent(pCate, allCate)
        pCateRes.children = pCateRes.pCateRes || []
        if (!pCateRes.children.some((child:any) => child._id === cate._id )) {
          pCateRes.children.push(cate)
        }
      }
      return cate 
    }
  }
  componentDidMount() {
    this.props.fetchProductCates().then((res:any) => {
      const tree:any = this.createCateTree(res.data.data)
      this.setState({ ...this.state, catesTree: tree})
    })
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
export default CatePage