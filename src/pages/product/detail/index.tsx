import React from 'react';
import { Http } from 'src/api';
import { Carousel, Tabs, WhiteSpace, Toast, Button} from 'antd-mobile'
import CommentItem from '../../../components/comment'
import AttrSelector from '../../../components/atrrSelector'
import { less } from './../../../constants'
import './index.less'
import BaseContainer from 'src/components/base/baseContainer';
import { withRouter, RouteComponentProps } from 'react-router-dom';
interface DetailPageProps extends RouteComponentProps {
  [index: string]: any
}

interface DetailPageState {
  [index:string]: any
}
const comments = [{
  avatar: 'http://www.xxxx.com/xxx.png',
  author: 'awang',
  time: '2018-2-1',
  content: '哈哈哈哈哈哈哈哈',
  commentNum: 5,
  aggreNum: 10,
  _id: 'sdkfjksdjf'
}]
interface SubProd {
  _id: string 
  propItems: string 
  price: number
  title: string
}
class ProductDetail extends React.Component <DetailPageProps, DetailPageState> {
  constructor (props: DetailPageProps) {
    super(props)
    this.state = {
      product: {
        thumbPic:[],
        props: [],
        subProds: []
      },
      tabs: [
        { title: '商品详情', sub: 1 },
        { title: '商品规格', sub: 2 },
        {title: '商品保障', sub: 3 }
      ],
      attrSelector: {
        attrSelectorVisiable: false,
        selectedProps: [],
        subProds2Num: {},
      },
    }
    this.showAttrSelector = this.showAttrSelector.bind(this)
    this.onCheckProp = this.onCheckProp.bind(this)
    this.onSelectedNumChange = this.onSelectedNumChange.bind(this)
    this.getCurtSubProd = this.getCurtSubProd.bind(this)
  }
  showAttrSelector (visible:boolean):void {
    let attrSelector = this.state.attrSelector
    attrSelector = { ...attrSelector}
    attrSelector.attrSelectorVisiable = visible 
    this.setState({ attrSelector })
  }
  onCheckProp (isSelected:boolean, i:number, propItems:string) {
    // const selectedProps = [...this.state.attrSelector.selectedProps]
    const attrSelector = this.state.attrSelector
    let { selectedProps, subProds2Num } = attrSelector
    selectedProps = [...selectedProps]
    subProds2Num = {...subProds2Num}
    selectedProps[i] = isSelected ? propItems : ''
    this.setState((preState, props) => ({ attrSelector: {...attrSelector, selectedProps}}))
  }
 
  onSelectedNumChange(value:any) {
    const attrSelector = this.state.attrSelector 
    let { subProds2Num } = attrSelector
    const curtSubProd = this.getCurtSubProd()
    subProds2Num = { ...subProds2Num }
    if (curtSubProd) {
      // tslint:disable-next-line:curly
      if (value > curtSubProd.stock) return Toast.fail('库存不足！')
      if (value >= 0 ) { 
        subProds2Num[curtSubProd._id] = parseInt(value, 10)
        this.setState({ attrSelector: { ...attrSelector, subProds2Num } })        
      }
    }
    
  }
  onClickBuy() {
    // 判断登陆 -- 登陆页    
    // 计算已经选择商品id和数量
    // 提交结算接口校验  -- 提示失败原因
    // 进入结算页面，选择优惠券，满减券，支付方式
  }
  getCurtSubProd () {
    const subProds = this.state.product.subProds
    // tslint:disable-next-line:curly
    if (!subProds) return 
    const selectedProps = this.state.attrSelector.selectedProps 
    return subProds.find((sub:any) => sub.propItems === selectedProps.join(','))
  }
  componentDidMount () {
    console.log(this.props.history)
    const id = this.props.history.location.pathname.split('/').pop() || ''
    const attrSelector = this.state.attrSelector
    const subProds2Num = {}
    if (id) {
      Http.get('/product/' + id).then((res:any) => {
        if (res) {
          res.subProds.forEach((sub: SubProd) => (subProds2Num[sub._id] = 0))
        }
        this.setState({ product: { comments, ...res }, attrSelector: { ...attrSelector, subProds2Num}})
      })
    }
  }
  render () {
    const { product, tabs, attrSelector } = this.state
    const c = less.componentPrefix
    const prefixClass = 'productdetail'
    const carouselClass = `${prefixClass}-carousel`
    const introClass = `${prefixClass}-intro`
    const curtSubProd = this.getCurtSubProd()
    let selectedString = ''
    let selectedNum = 0
    if (!selectedString && !product.subProds.length) {
      selectedString = '默认 1件'
    } else {
      Object.keys(attrSelector.subProds2Num).map(id => {
        const subProdNumber = attrSelector.subProds2Num[id] 
        if (subProdNumber) {
          const prod = product.subProds.find((subProd: any) => subProd._id === id)
          if (prod) { selectedString += (prod.propItems + attrSelector.subProds2Num[id]) + product.unit +' ' }
        } 
      })
    }
    if (curtSubProd) {
      selectedNum = attrSelector.subProds2Num[curtSubProd._id] || 0 
    }
    return (
      <div className={prefixClass}>
        <Carousel
          autoplay={true}
          infinite={true}
          className={carouselClass}
        >
          {product.thumbPic && product.thumbPic.map((thumb:string, i:number) => {
            return (<img src={thumb} key={i} onLoad={() => window.dispatchEvent(new Event('resize'))}/>)
          })}
        </Carousel>
        <div className={`${c}-plywood ${introClass}`}>
          <div  className="shop-cell">
            <div className={`${introClass}-price`}>
              <span className={`${introClass}-price-text shop-price`}>{product.price}</span>
              <span className={`${introClass}-postage-text`}>{product.postage ? product.postage + '元' : '免邮'}</span>
            </div>
            <div className={`${introClass}-title`}>
              {product.title}
            </div>
          </div>
          
          {product.activities && product.activities.length && (
            <div className={`${introClass}-fullreduce ${c}-cell`}>
              <span>满减：</span><span className={`${introClass}-fullreduce-text`}>满{200}减{100}</span>
            </div>
          )}
          {product.activities && product.activities.length && (
            <div className={`${introClass}-fullreduce ${c}-cell`}>
              <span>领券：</span><span className={`${introClass}-fullreduce-tag`}>{200}-{100}</span>
            </div>
          )}
        </div>
        <WhiteSpace/> 
        <div className={`${prefixClass}-selector ${c}-cell`} onClick={() => this.showAttrSelector(true)}>
          已选：{selectedString}
        </div>
        <WhiteSpace size="lg" /> 
        {/* 评论区 */}
        <BaseContainer
          title="商品评论"
          extra="更多"
          arrow="right"
          renderFooter={<Button size="small" className="shop-button-submit-main">我要评论</Button>}
        >
          {
            product.comments && product.comments.length ?
              product.comments.map((comment: any) => (
                <CommentItem {...comment} key={comment._id} />
              ))
              :
              (<div>暂无评论！</div>)
          }
        </BaseContainer>
    
        <WhiteSpace /> 
        <Tabs tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div dangerouslySetInnerHTML={{ __html: product.detail}}/>
          <div>tab2</div>
          <div>tab3</div>
        </Tabs>
        <AttrSelector 
          showAttrSelector={this.showAttrSelector}
          onCheck={this.onCheckProp}
          productProps={product.props}
          curtSubProd={curtSubProd}
          subProds2Num={attrSelector.subProds2Num}
          defaultSubProdThumb={product.thumbPic[0]}
          attrSelectorVisiable={attrSelector.attrSelectorVisiable}
          selectedProps={attrSelector.selectedProps}
          defaultPrice={product.price}
          defaultTitle={product.title}
          selectedNum={selectedNum}
          onSubProdNumChange={this.onSelectedNumChange}
          
        />
        <div className={`${prefixClass}-footer`}>
            <div className={`${prefixClass}-favorite`}>
              <i className="iconfont icon-love"/>
              <span>收藏</span>
            </div>
            <div className={`${prefixClass}-cart`}>
              <i className="iconfont icon-cart"/>
              <span>购物车</span>
            </div>
            <div className={`${prefixClass}-add`}>
              加入购物车
            </div>
            <div className={`${prefixClass}-buy`}>
              立即购买
            </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ProductDetail)