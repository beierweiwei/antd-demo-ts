import React from 'react';
import classNames from 'classnames';
import './index.less';
import { Icon } from 'antd-mobile';
interface BaseContainerProps {
  className?: string 
  renderHeader?:(()=>React.ReactType) | JSX.Element | string
  renderFooter?:(() => React.ReactType) | JSX.Element | string
  children?: false | string| JSX.Element | JSX.Element[]
  title?: string 
  extra?: string | false 
  arrow?: 'right' | 'down' | 'up'
  link?: string | ((e:React.MouseEvent) => void)
}
const prefixCls = 'shop-c-container'

export default function BaseContainer(props: BaseContainerProps)  {
  // tslint:disable-next-line:no-shadowed-variable
  const {children, className, renderHeader, renderFooter, title, extra, arrow, link, ...otherProps} = props
  const wrapCls = classNames(className, prefixCls, {
    [`${prefixCls}-with-title`]: title,
    [`${prefixCls}-with-extra`]: extra,
    [`${prefixCls}-with-arrow`]: arrow,
    [`${prefixCls}-with-link`]: link,
  })
  return (
    <div 
      className={wrapCls} 
      {...otherProps}
    >
      {renderHeader ? typeof renderHeader === 'function' ? renderHeader() : renderHeader : (
        (title || extra) && <div className={`${prefixCls}-header`}>
          {title && <div className={`${prefixCls}-header-content`}>{title}</div>}
          {extra && <div className={`${prefixCls}-header-extra`}> 
            {link && typeof link === 'string' && 
              <a href={link}>{extra} {
                arrow && 
                <i className={`${prefixCls}-title-extra-icon`}/>}
              </a>
            }
            {link && typeof link === 'function' && <a onClick={(e) => link(e)}>{extra} {arrow && <i className={`${prefixCls}-title-extra-icon`} />}</a>}
            {!link && extra && 
              <span> { extra } {
                arrow && <Icon type={arrow}/>
              }</span>
            }
           </div>
          }
        </div>
      )}
      <div className={`${prefixCls}-main`}>
        {children}
      </div>
      {
        renderFooter && typeof renderFooter === 'function' ? renderFooter() : renderFooter
      }
    </div>
  )
}