import React, { Component } from 'react';
import { message } from './util';
import { componentDragDrop } from './ComponentDragDrop';

import { DragSource } from 'react-dnd'

let isEndDrag = 'undefined';
const Types = {
    CARD: 'CARD'
};

let nowPosition = {};
// const CardSource = {
//     beginDrag(props,monitor,component){
//         return {props: props.id}
//     },
//     endDrag(props,monitor,component) {
//         console.log('拖动结束', monitor.isDragging());
//         isEndDrag = monitor.isDragging();
      
//     }
// };

// function collect(connect,monitor) {
//     // console.log('移动区域', connect, monitor);
//     return{
//         connectDragSource:connect.dragSource(),
//         isDragging:monitor.isDragging()
//     }
// }

@componentDragDrop.drag({
	beginDrag(props, monitor, component) {
		return {...props }

	},
	endDrag(props, monitor, component) {
		monitor.getDropResult();
	},

}, (monitor)=>{
	isDragging: monitor.isDragging();
})


class Source extends Component{
    
    isUp(params){
        const x = params.screenX;
        const y = params.screenY;
        console.log('调用鼠标方法', params, x, y);
        message.emit('isUp', params, x, y);
    }

    componentDidMount() {
        message.on('comPosition', (params) => {
            // message.on('isUp', (up)=>{
            //     console.log('监听到松开了鼠标', up)
            // })
            nowPosition.left = params.x;
            nowPosition.top = params.y;
            // console.log('拖动结束 监听拖动结束事件', params, testtt)
        })
    }

    render(){
        const { isDragging, connectDragSource } = this.props;
        let opacity = isDragging ? 0 : 1;
        const mergeStyle = { position: 'absolute', top: nowPosition.top, left: nowPosition.left }
        return connectDragSource(
            <div>
                <div onMouseDown={(e)=>{this.isUp(e)}} style={{ zIndex: 999, opacity, width: 200, height: 100, backgroundColor: '#f19', ...mergeStyle }}>
                    <p>{this.props.content}</p>
                </div>
            </div>
        )
    }
}
// let flow = require('lodash.flow');
export default Source;