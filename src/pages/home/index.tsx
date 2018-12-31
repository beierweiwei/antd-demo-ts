import { Carousel, Grid } from 'antd-mobile'
import ProductItem, {ProductProps} from '../../components/productItem'
import * as React from 'react'
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
  activities: ActivitiesProps[],
  productList: ProductProps[]
}

class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor (props:any) {
    super(props)
    this.state = {
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
      productList: [{
        title: 'xxxxxxxxxxxxxx',
        thumb: '/static/imgs/test.jpg',
        sales: 100,
        price: 200,
        unit: '件',
        _id: 'xxxxxxxxxxxxx',
      },{
        title: 'xxxxxxxxxxxxxx',
        thumb: '/static/imgs/test.jpg',
        sales: 100,
        price: 200,
        unit: '件',
        _id: 'xxxxxxxxxxxxx',
      },{
        title: 'xxxxxxxxxxxxxx',
        thumb: '/static/imgs/test.jpg',
        sales: 100,
        price: 200,
        unit: '件',
        _id: 'xxxxxxxxxxxxx',
      },{
        title: 'xxxxxxxxxxxxxx',
        thumb: '/static/imgs/test.jpg',
        sales: 100,
        price: 200,
        unit: '件',
        _id: 'xxxxxxxxxxxxx',
      },{
        title: 'xxxxxxxxxxxxxx',
        thumb: '/static/imgs/test.jpg',
        sales: 100,
        price: 200,
        unit: '件',
        _id: 'xxxxxxxxxxxxx',
      },{
        title: 'xxxxxxxxxxxxxx',
        thumb: '/static/imgs/test.jpg',
        sales: 100,
        price: 200,
        unit: '件',
        _id: 'xxxxxxxxxxxxx',
      },{
        title: 'xxxxxxxxxxxxxx',
        thumb: '/static/imgs/test.jpg',
        sales: 100,
        price: 200,
        unit: '件',
        _id: 'xxxxxxxxxxxxx',
      },{
        title: 'xxxxxxxxxxxxxx',
        thumb: '/static/imgs/test.jpg',
        sales: 100,
        price: 200,
        unit: '件',
        _id: 'xxxxxxxxxxxxx',
      }]
    }
    this.handelRenderItem = this.handelRenderItem.bind(this)
  }

  handelRenderItem (el:Element, index:number) {
    const item:ProductProps = this.state.productList[index]
    return (<ProductItem title={item.title} thumb={item.thumb} price={item.price} sales={item.sales} unit={item.unit} _id={item._id}/>)
  }
  render () {
    return (
      <div className="page-with-nav">
        <Carousel
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
        </Carousel>
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
        </div>
        <BottomNav curtPage="home"/>
      </div>
    )
  }
}
export default HomePage