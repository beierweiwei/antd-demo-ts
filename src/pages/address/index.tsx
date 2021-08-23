import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router';
import { Http } from 'src/api';
import http from 'src/api/http';
import { List, InputItem, Picker, Button, Toast } from 'antd-mobile';
import { ADDRESS, AREA} from 'src/api/api';
import { cloneDeep, last } from 'lodash'
import { DefaultTabBar } from 'rmc-tabs';
import qs from 'qs';
interface AddressState {
  form: AddressItem,
  areaData: any 
}
interface AddressProps extends RouteComponentProps {
  [index:string]: any
}

const findChildByValue = (data: any, areaCode: string, cb:(k:any) => void):any => {
  // tslint:disable-next-line:curly
  if (!Array.isArray(data)) return 
  for (const child of data) {
    if (child.value === areaCode) {
      // tslint:disable-next-line:no-unused-expression
      cb && cb(child)
    } else {
      findChildByValue(child.children, areaCode, cb)
    }
  }
}
class Address extends React.Component<AddressProps, AddressState>{
  constructor (props:any) {
    super(props)
    this.state = {
      form: {
        tel: '',
        name: '',
        areaCode: [],
        areaName: '',
        detail: '',
        isDef: 0,
        _id: ''
      },
      areaData: []
    }
  }
  componentWillMount () {
    const { location  } = this.props 
    const state = this.state
    const { search } = location
    const id = qs.parse(search.slice(1)).id
    if (id) {
      Http.get(ADDRESS + id).then(res => {
        this.setState({ form: { ...res}})
      })
    }
    this.getAreaList().then(res => {
      if (res) { 
        const areaData = this.combineAreaDataRes(res)
        this.setState({ areaData })
      }
    })
  }
  handleChange = (k: keyof AddressItem, e:any) => {
    const state = this.state 
    this.setState({...state, form: { ...state.form, [k]: e}})
  }
  handlePick = (pickedAreasCode:any) => {
    pickedAreasCode = [...pickedAreasCode]
      if (!Array.isArray(pickedAreasCode)) { return }
      const areaData = cloneDeep(this.state.areaData)
      const pickedAreaObjArr:any[] = []
      const next = (i:number):any => {
        const areaCode = pickedAreasCode[i] || last(pickedAreaObjArr).children[0].value 
        const curtAreaParentChildren = i === 0 ? areaData : last(pickedAreaObjArr).children
        findChildByValue(curtAreaParentChildren, areaCode, (curtArea: any) => {
          if (curtArea) { pickedAreaObjArr.push(curtArea)}
          if (!(curtArea && curtArea.children && curtArea.children.length > 0)) {
            if (pickedAreaObjArr.length > 2) {
              return this.setState({ areaData, form: { ...this.state.form, areaCode: pickedAreaObjArr.map(area => ({ name: area.label, code: area.value }))}})
            }
            this.getAreaList(curtArea.value).then(areaObj => {
              // tslint:disable-next-line:no-debugger
              if (areaObj && areaObj.children) { 
                curtArea.children = this.combineAreaDataRes(areaObj)
                this.setState({ areaData, form: { ...this.state.form, areaCode: pickedAreaObjArr.map(area => ({name: area.label, code: area.value}))}})
                next(i + 1) 
              }
            })
          } else {
            this.setState({ areaData, form: { ...this.state.form, areaCode: pickedAreaObjArr.map(area => ({ name: area.label, code: area.value }))}})
            next(i + 1)
          }
        })
      }
      next(0)   
  }
  
  getAreaList = (areaCode?:string) => {
    const state = this.state 
    areaCode = areaCode || '100000'
    return Http.get(AREA + areaCode)
  }
  combineAreaDataRes= (areaObj:any) => {
    const childrenAreaMap = areaObj && areaObj.children || {}
    const areaData = Object.keys(childrenAreaMap).map((childAreaCode: string) => {
      return {
        label: childrenAreaMap[childAreaCode],
        value: childAreaCode,
        children: []
      }
    })
    return areaData
  }
  handleVisible = (isShow:boolean) => {
    const form = this.state.form
    if (isShow && !form.areaCode.length) {
      this.handlePick(['110000'])
    }
  }
  submit = () => {
    const addreId = this.state.form._id
    const api = addreId ? ADDRESS + addreId : ADDRESS
    Http.post(api, this.state.form).then(res => Toast.success(addreId ? '更新成功！' : '新增成功！'))
  }
  render () {
    const prefixCls = 'address_editor'
    const {tel, name, areaCode, areaName, detail, isDef} = this.state.form 
    const areaCodeArr = areaCode.map(area => area.code)
    return (
      <div className={`${prefixCls}`}>
        <List>
          <InputItem
            value={name}
            onChange={(v) => this.handleChange('name', v)}
          >收货人：</InputItem>
          <InputItem
            value={tel}
            onChange={(v) => this.handleChange('tel', v)}
          >电话：</InputItem>
          <Picker
            title="选择地区"
            extra="请选择(可选)"
            data={this.state.areaData}
            value={areaCodeArr}
            onPickerChange={(v) => this.handlePick(v)}
            onVisibleChange={this.handleVisible}
            // onOk={v => this.handleChange('areaCode', v)}
          >
            <List.Item arrow="horizontal">地区</List.Item>
          </Picker>
          <InputItem
            value={detail}
            onChange={(v) => this.handleChange('detail', v)}
          >详细地址：</InputItem>
        </List>
        <div className="page-footer">
          <Button onClick={this.submit}>确认</Button>
        </div>
      </div>
    )
  }
}

export default withRouter(Address)