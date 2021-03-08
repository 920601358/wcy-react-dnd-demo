import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

let dndIndex = 0;
export function createDragDrop () {
  const name = Symbol(`drag-and-drop-${ dndIndex ++ }`);

  return {
    drag (spec, collect = () => {}) {
      const HOC = DragSource(name, spec, function (connect, monitor) {
        const customCollect = collect(monitor);

        return {
          ...customCollect,
          connectDragSource: connect.dragSource(),
        };
      });

      return function (TargetComponent) {
        return HOC(TargetComponent);
      }
    },

    drop (spec, collect = () => {}) {
      const HOC = DropTarget(name, spec, function (connect, monitor) {
        const customCollect = collect(monitor);

        return {
          ...customCollect,
          connectDropTarget: connect.dropTarget(),
        };
      });

      return function (TargetComponent) {
        class DropComponent extends Component {
          render(){
            const { connectDropTarget, ...props } = this.props;

            return connectDropTarget(
              <div>
                <TargetComponent { ...props } ref={ target => this.target = target } />
              </div>
            );
          }
        }

        return HOC(DropComponent);
      }
    },
  };
}

export const componentDragDrop = createDragDrop();