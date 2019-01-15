import { Flex, Button } from 'antd-mobile'
import * as React from 'react'
import BottomNav from '../../../components/loayout/bottomNav'
import { createCateTree } from '../../../utils'
import classnames from 'classnames'
import './index.less'
interface CatePageProps {
  [index: string]: any
}
interface CatePageState {
  catesTree: any[]
  curtCateId: string 
}
class CatePage extends React.Component<CatePageProps, CatePageState> {
  static defaultProps: {

  }
  constructor(props: CatePageProps) {
    super(props)
    this.state = {
      curtCateId: '',
      catesTree: [],
    }
  }

  componentDidMount() {
    this.props.fetchProductCates().then((res:any) => {
      console.log(res)
      const tree = createCateTree(res.data.data)
      this.setState({ ...this.state, catesTree: tree, curtCateId: tree && tree[0] && tree[0]._id})
    })
    // this.props.fetchAds()
  }
  handleTopCateClick (id: string) {
    this.setState({
      ...this.state,
      curtCateId: id
    })
  }
  render() {
    const prefix = 'product-cate'
    const { catesTree, curtCateId } = this.state
    const curtCate = catesTree.find(cate => cate._id === curtCateId)
    
    return (
      <div className="page-with-nav page">
        <div className={prefix} >
          <Flex style={{ height: '100%'}}> 
            <div className={`${prefix}-left`}>
              {this.state.catesTree.map((topCate) => (
                <div 
                  // className={(this.state.curtCateId === topCate._id ? 'active ' : '') + `${prefix}-top-level`}
                  className={classnames({ active: this.state.curtCateId === topCate._id }, `${prefix}-top-level`)}
                  onClick={(e) => this.handleTopCateClick(topCate._id)}
                  key={topCate._id}
                >
                  {topCate.name}
                </div>
              ))}
            </div>
        
            <div className={`${prefix}-right`}>
                {
                curtCate && curtCate.children && curtCate.children.map(
                  (secondCate:any) => {
                    return (
                      <div
                        className={`${prefix}-second`}
                        key={secondCate._id}
                        >
                        <div className={`${prefix}-second-item`}>{secondCate.name}</div>
                        {secondCate.children && secondCate.children.map((thirdCate:any) => {
                          return (
                            <Button
                              className={`${prefix}-third`}
                              inline={true} 
                              size="small" 
                              key={thirdCate._id}
                            >
                            {thirdCate.name}
                          </Button>)
                        })}
                      </div>
                    )
                  }
                )
                }
            </div>
          </Flex>
        </div>
        <BottomNav curtPage="cate" />
      </div>
    )
  }
}
export default CatePage