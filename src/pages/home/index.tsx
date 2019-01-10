import { Grid, PullToRefresh, Carousel } from 'antd-mobile'
import ProductItem from '../../components/productItem'
import * as React from 'react'
import BottomNav from '../../components/loayout/bottomNav'
import './index.less'
interface HomePageProps {
  [index:string]:any
  ads: ActivitiesState
}
interface HomePageState {
  imgHeight: string
  productList: Product[]
  refreshing: boolean
  height: number
  down: boolean
}


class HomePage extends React.Component<HomePageProps, HomePageState> {
  ptr:PullToRefresh | null
  constructor (props:HomePageProps) {
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
    // this.getScrollContainer = this.getScrollContainer.bind(this)
  }

  handelRenderItem (el:Element, index:number) {
    const item = this.props.products.list[index]
    return (<ProductItem {...item}  />)
  }
  componentDidMount () {
    // const hei = this.state.height - (ReactDOM.findDOMNode((this.ptr as PullToRefresh)) as HTMLElement).offsetTop
    // setTimeout(() => this.setState({
    //   height: hei
    // }), 0)
    this.props.fetchProducts()
    this.props.fetchAds()
  }
  handelOnFresh () {
    this.props.requestProducts()
    setTimeout(() => this.props.fetchProducts())
  }
  render () {
    const prefix = "home"
    console.log(this.props.ads, 'ads')
    return (
      <div className="page-with-nav">
        <Carousel
          autoplay={true}
          infinite={true}
        >
          {this.props.ads.list.map(activity => (
            <a
              className={`${prefix}-activity-link`}
              key={activity._id}
              href={`/product/list?activityId=${activity._id}`}
            >
              <img
                src={activity.thumb}
                alt=""
                style={{ width: '100%', verticalAlign: 'top'}}
                // onLoad={ () => {
                //   window.dispatchEvent(new Event('resize'))
                //   this.setState({imgHeight: 'auto'})
                // }}
              />
            </a>
          ))}
        </Carousel>
        <div className="product-wrap">
            <div className="product-banner">xxxx</div>
            <PullToRefresh
              damping={60}
              ref={el => this.ptr  = el}
              style={{
              }}
              indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
              direction={this.state.down ? 'down' : 'up'}
              refreshing={this.props.products.isLoading}
              onRefresh={this.handelOnFresh}
              distanceToRefresh={25}
              
            >
            <div className="product-list">
              <Grid 
              data={this.props.products.list}
              renderItem={this.handelRenderItem}
              square={false}
              columnNum={2}
              hasLine={false}
              className="not-square-grid product-grid"
            />
            </div>
            </PullToRefresh>
        </div>
        <BottomNav curtPage="home"/>
      </div>
    )
  }
}
export default HomePage