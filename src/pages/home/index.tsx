import { Grid, PullToRefresh } from 'antd-mobile'
import ProductItem from '../../components/productItem'
import * as React from 'react'
// import * as ReactDOM from 'react-dom'
import BottomNav from '../../components/loayout/bottomNav'
import './index.less'
interface HomePageProps {
  [index:string]:any
}
interface ActivitiesProps {
  title: string,
  url: string,
  thumb: string,
  _id: string
}
interface HomePageState {
  imgHeight: string,
  activities: ActivitiesProps[]
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
      down: true,
      height: document.documentElement.clientHeight,
      imgHeight: 'auto',
      activities: [
        {
          title: 'xxxx',
          url: 'http://moco.com',
          thumb: '/static/imgs/test.jpg',
          _id: 'xxxxxxxxxxxxx'
        },
        {
          title: 'xxxx',
          url: 'http://moco.com',
          thumb: '/static/imgs/test.jpg',
          _id: 'xxxxxxxxxxxxx'
        },
        {
          title: 'xxxx',
          url: 'http://moco.com',
          thumb: '/static/imgs/test.jpg',
          _id: 'xxxxxxxxxxxxx'
        }
      ],
      productList: []
    }
    this.handelRenderItem = this.handelRenderItem.bind(this)
    this.handelOnFresh = this.handelOnFresh.bind(this)
    this.getScrollContainer = this.getScrollContainer.bind(this)
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
  }
  handelOnFresh () {
    console.log('xxxxxxxxxxxxx')
    // this.setState({ refreshing: true })
    // setTimeout(() => {
    //   this.setState({ refreshing: false })
    // }, 1000)
  }
  getScrollContainer () {
    return this.ptr 
  }
  render () {
    return (
      <div className="page-with-nav">
        {/* <Carousel
          autoplay={true}
          infinite={true}
        >
          {this.state.activities.map(activity => (
            <a
              key={activity._id}
              href={activity.url}
              style={{display: 'inline-block', width: '100%', height: this.state.imgHeight}}
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
        </Carousel> */}
        <div className="product-wrap">
            <div className="product-banner">xxxx</div>
            <div className="product-list">
             <Grid 
              data={this.state.productList}
              renderItem={this.handelRenderItem}
              square={false}
              columnNum={2}
              hasLine={false}
              className="not-square-grid"
              itemStyle={{padding: '10px'}}
            />
            </div>
            {/* <PullToRefresh
              damping={60}
              ref={el => this.ptr  = el}
              style={{
                height: this.state.height,
                overflow: 'auto',
              }}
              indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
              direction={this.state.down ? 'down' : 'up'}
              refreshing={this.state.refreshing}
              onRefresh={this.handelOnFresh}
              distanceToRefresh={25}
              getScrollContainer={this.getScrollContainer}

            > */}
     
            <div className="product-list">
              <Grid 
              data={this.props.products.list}
              renderItem={this.handelRenderItem}
              square={false}
              columnNum={2}
              hasLine={false}
              className="not-square-grid"
              itemStyle={{padding: '10px'}}
            />
            </div>
       
            {/* </PullToRefresh> */}
         
        </div>
        <BottomNav curtPage="home"/>
      </div>
    )
  }
}
export default HomePage