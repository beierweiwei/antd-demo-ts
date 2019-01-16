import * as React from 'react'
import 'index.less'
import ProductItem from './../productItem'
import { PullToRefresh, Grid } from 'antd-mobile';
interface ProductListProps {
  bannerData?: {
    title?: string 
    thumb?: string
    link?: string
    desc?: string
    _id?: string 
  }
  list: Product[]
  pageSize?: number
  curtPage?: number
  isLoading?: boolean
  fetchProducts: any 
  fetchAds: any
  requestProducts: any 
}

interface ProductListState {
  imgHeight: string
  productList: Product[]
  refreshing: boolean
  height: number
  down: boolean
}
class ProductList extends React.Component<ProductListProps, ProductListState> {
  ptr: PullToRefresh | null
  constructor(props: ProductListProps) {
    super(props)
    this.state = {
      // 下拉刷新参数
      refreshing: false,
      down: false,
      height: (document.documentElement as HTMLElement).clientHeight,
      imgHeight: 'auto',
      productList: []
    }
    this.handelRenderItem = this.handelRenderItem.bind(this)
    this.handelOnFresh = this.handelOnFresh.bind(this)
  }
  handelRenderItem(el: Element, index: number) {
    const item = this.props.list[index]
    return (<ProductItem {...item} />)
  }
  componentDidMount() {
    // const hei = this.state.height - (ReactDOM.findDOMNode((this.ptr as PullToRefresh)) as HTMLElement).offsetTop
    // setTimeout(() => this.setState({
    //   height: hei
    // }), 0)
    this.props.fetchProducts()
    this.props.fetchAds()
  }
  handelOnFresh() {
    this.props.requestProducts()
    setTimeout(() => this.props.fetchProducts())
  }
  render () {
    const prefix = 'product-list'
    const bannerData = this.props.bannerData 
    return (
      <div className="page-with-nav">
        {bannerData && (
          <a
            className={`${prefix}-activity-link`}
            key={bannerData._id}
            href={`/product/list?activityId=${bannerData._id}`}
          >
            <img
              src={bannerData.thumb}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
            // onLoad={ () => {
            //   window.dispatchEvent(new Event('resize'))
            //   this.setState({imgHeight: 'auto'})
            // }}
            />
          </a>
        )}
        <div className="product-wrap">
          <PullToRefresh
            damping={60}
            ref={el => this.ptr = el}
            style={{
            }}
            indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
            direction={this.state.down ? 'down' : 'up'}
            refreshing={this.props.isLoading}
            onRefresh={this.handelOnFresh}
            distanceToRefresh={25}

          >
            <div className="product-list">
              <Grid
                data={this.props.list}
                renderItem={this.handelRenderItem}
                square={false}
                columnNum={2}
                hasLine={false}
                className="not-square-grid product-grid"
              />
            </div>
          </PullToRefresh>
        </div>
      </div>
    )
  }
}

export default ProductList