import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import { Card } from 'antd';
import { message } from './util';
import {
    DragSource,
    DropTarget,
} from 'react-dnd'

const Types = {
    CARD: 'CARD'
};
const CardTarget = {
    canDrop(props,monitor){ //组件可以被放置时触发的事件
        // console.log('组件可以被放置到画布区域了', monitor.getClientOffset())
    },
    drop(props,monitor) {
        console.log('已经放置', props, monitor)
    },
    hover(props,monitor,component){ //组件在target上方时触发的事件
        // console.log('触发了画布上方事件', props, monitor, component)
        const dragIndex = monitor.getItem().index;//拖拽目标的Index
        const hoverIndex = props.index; //目标Index
        const hoverBoundingRect = (findDOMNode(component)).getBoundingClientRect();//获取卡片的边框矩形
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;//获取X轴中点
        const clientOffset = monitor.getClientOffset();//获取拖拽目标偏移量
        const hoverClientX = (clientOffset).x - hoverBoundingRect.left;
        // console.log('当前位置信息', clientOffset);
        message.emit('comPosition', clientOffset);
        props.onDND(dragIndex,hoverIndex);
        monitor.getItem().index = hoverIndex;
    },
};
function collect(connect,monitor) {
    // console.log('出现在画布上方', connect, monitor);
    return{
        connectDropTarget:connect.dropTarget(),
        isOver:monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType(),
    }
}



class Test extends Component{
    
    render(){
        // console.log('画布组件', this.props)
        const { isDragging, connectDropTarget} = this.props;

        return connectDropTarget( <div>
                <div style={{ position: 'absolute', top: 350, left: 0, width: 500, height: 500, backgroundColor: '#f60' }}>
                </div>
            </div> 
        )
    }
}
// let flow = require('lodash.flow');
export default DropTarget(Types.CARD,CardTarget, collect)(Test)