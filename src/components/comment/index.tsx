import React from 'react';
import './index.less';
interface CommentProps {
  avatar: string
  author: string
  time: string 
  content: string 
  aggreNum: number
  commentNum: number
}
export default function Comment(props: CommentProps) {
  const prefixCls = 'comment-item'
  return (
    <div className={`${prefixCls} shop-cell`}>
      <div className={`${prefixCls}-avatar`}>
        <img src={props.avatar} alt=""/>
      </div>
      <div className={`${prefixCls}-main`}>
        <div className={`${prefixCls}-header`}>
          <span className={`${prefixCls}-author`}>{props.author}</span>
          <span className={`${prefixCls}-time`}>{props.time}</span>
        </div>
        <div className={`${prefixCls}-content`}>
          {props.content}
        </div>
        <div className={`${prefixCls}-footer`}>
            <span><i className="iconfont icon-love"/>{props.aggreNum}</span>
            <span> <i className="iconfont icon-message"/>{props.commentNum}</span>
        </div>
      </div>
    </div>
  )
}