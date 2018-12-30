import { Carousel } from 'antd-mobile'
import * as React from 'react'
import BottomNav from '../../components/loayout/bottomNav'
import './index.less'
class HomePage extends React.Component {
  state = {
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
    ]
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
        <BottomNav curtPage="home"/>
      </div>
    )
  }
}
export default HomePage