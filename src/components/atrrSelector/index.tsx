import React from 'react';
import { Modal, Tag, Stepper } from 'antd-mobile';
import './index.less';
interface AttrSelectorProps  {
  // productProps: {
  //   name: string
  //   selector: string[]
  //   _id: string
  // },
  // curtSubProds: [{
  //   price: number
  //   propItem: string
  //   saleNum: number
  //   stock: number
  //   thumbPic: string 
  //   _id: string 
  // }],
  // showAttrSelector: (isShow:boolean) => void
  // attrSelectorVisiable: boolean
  [index:string]:any
}

interface AttrSelectorState {
  [index:string]:any
}
// function closest(el:any, selector:any):any {
//   const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
//   while (el) {
//     if (matchesSelector.call(el, selector)) {
//       return el;
//     }
//     el = el.parentElement;
//   }
//   return null;
// }
export default class AttrSelector extends React.Component<AttrSelectorProps, AttrSelectorState> {
  constructor (props:AttrSelectorProps) {
    super(props)
    this.state = {
      prop2subproduct: [],
    }
  }
  onWrapTouchStart (e: { target: any; preventDefault: () => void; }) {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    // const pNode = closest(e.target, '.am-modal-content');
    // if (!pNode) {
    //   e.preventDefault();
    // }
  }

  componentDidMount () {
    console.log('xxxx')
  }
  render () {
    const prefixClass = 'shop-attrselector'
    const curtSubProd = this.props.curtSubProd || {}
    const selectedNum = this.props.selectedNum
    return (
      <Modal
        popup={true}
        visible={this.props.attrSelectorVisiable}
        maskClosable={true}
        onClose={() => this.props.showAttrSelector(false)}
        animationType="slide-up"
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
        <div className={`${prefixClass} shop-container`}>
          <div>
            <div className={`${prefixClass}-intro`}>
              <div className={`${prefixClass}-intro-thumb`}>
                <img src={(this.props.curtSubProd && this.props.curtSubProd.thumb) || this.props.defaultSubProdThumb} alt=""/>
              </div> 
              <div className={`${prefixClass}-intro-body`}>
                <div className={`${prefixClass}-title`}>
                  { this.props.defaultTitle}
                </div>
                <div>
                  <span className={`${prefixClass}-price shop-price`}>
                    {curtSubProd && curtSubProd.price || this.props.defaultPrice}
                  </span>
                  <span className={`${prefixClass}-num-selector`}>
                    <Stepper
                      showNumber={true}
                      max={999}
                      min={0}
                      value={selectedNum}
                      onChange={this.props.onSubProdNumChange}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className={`${prefixClass}-props`}>
              {this.props.productProps.map((props:any, i:number) => 
               (
                  <div key={props._id}>
                    <div className={`${prefixClass}-props-type`}>
                      {props.name}
                    </div>
                    <div className={`${prefixClass}-props-list`}>
                      {props.selector.map((propItem:any) => (
                          <Tag
                            onChange={(isSelect) => this.props.onCheck(isSelect, i, propItem)}
                            key={propItem} 
                            selected={this.props.selectedProps[i] === propItem}
                          >{propItem}</Tag>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}