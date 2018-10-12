import * as React from 'react';
import {TextAlignProperty} from '../../../node_modules/csstype';

function renderComponentLabel(comp, params?: ILabelParams) {
    if(!params) {
        return comp;
    }

    const componentLabel = <div className={params.params.classL} style={{textAlign: (params.params.align as TextAlignProperty)}}>{params.text}</div>;
    const component = <div className={params.params.classC}>{comp}</div>;

    return (
        <>
            {params.params.orient === 'left' ?
                <div>
                    {componentLabel}
                    {component}
                </div> : ''}

            {params.params.orient === 'right' ?
                <div>
                    {component}
                    {componentLabel}
                </div> : ''}

            {params.params.orient === 'top' ?
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {componentLabel}
                    {component}
                </div> : ''}

            {params.params.orient === 'bottom' ?
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {component}
                    {componentLabel}
                </div> : ''}
        </>
    );
}

export interface ILabelParams {
    text: string,
    params: {
        orient: 'left' | 'right'| 'top' | 'bottom',
        align: 'left' | 'right',
        classC: string,
        classL: string
    };
}

export default renderComponentLabel;
