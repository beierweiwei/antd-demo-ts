import { Carousel } from 'antd-mobile'
import * as React from 'react'
import BottomNav from '../../components/loayout/bottomNav'
import './index.less'
import ProductList from 'src/components/productList';
interface HomePageProps {
  [index:string]:any
  ads: ActivitiesState
}
interface HomePageState {
  imgHeight: string
}

class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor (props:HomePageProps) {
    super(props)
    this.state = {
      imgHeight: 'auto',
    }
  }
  componentDidMount () {
    console.log('mmmmmm')
    this.props.fetchAds({pageSize: 5, curtPage: 1})
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
          <ProductList products={this.props.products} fetchProducts={this.props.fetchProducts}/>
        </div>
        <BottomNav curtPage="home"/>
      </div>
    )
  }
}
export default HomePage