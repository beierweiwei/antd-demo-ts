import { Flex } from 'antd-mobile'
import * as React from 'react'
import BottomNav from '../../../components/loayout/bottomNav'
import { createCateTree } from '../../../utils'

import './index.less'
interface CatePageProps {
  [index: string]: any
}
interface CatePageState {
  catesTree: any[]
  curtCate: string 
}
class CatePage extends React.Component<CatePageProps, CatePageState> {
  constructor(props: CatePageProps) {
    super(props)
    this.state = {
      curtCate: '',
      catesTree: [],
    }
  }

  componentDidMount() {
    this.props.fetchProductCates().then((res:any) => {
      const tree = createCateTree(res.data.data)
      this.setState({ ...this.state, catesTree: tree})
    })
    // this.props.fetchAds()
  }
  handleTopCateClick (id: string) {
    this.setState({
      ...this.state,
      curtCate: id
    })
  }
  render() {
    const prefix = 'product-cate'
    return (
      <div className="page-with-nav page">
        <div className={prefix} >
          <Flex style={{ height: '100%'}}> 
            <div className={`${prefix}-left`}>
              {this.state.catesTree.map((topCate) => (
                <div 
                  className={(this.state.curtCate === topCate._id ? 'active ' : '') + `${prefix}-top-level`}
                  onClick={(e) => this.handleTopCateClick(topCate._id)}
                  key={topCate._id}
                >
                  {topCate.name}
                </div>
              ))}
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