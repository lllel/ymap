import * as React from 'react';
import './InputText.scss';
import * as _ from 'lodash';
import {IComponentForm} from '../../interfaces/components/IComponentForm';
import {IComponentProps} from '../../interfaces/components/IComponentProps';
import {EventTypes} from '../../interfaces/enums/EventTypes';
import {CheckStates} from '../../interfaces/enums/CheckStates';
import renderComponentLabel, {ILabelParams} from "../_common/renderComponentLabel";

interface IProps extends IComponentProps {
    required?: boolean;
    disabled?: boolean;
    label?: ILabelParams;
    buttons?: any[];
    placeholder?: string;
}

interface IState {
    value: any;
}

export class InputText extends React.Component<IProps, IState> implements IComponentForm {
    inputTextRef: any;

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value || ''
        };
    }

    focus() {
        this.inputTextRef.focus();
    }

    getValue() {
        return this.state.value;
    }

    setValue(value) {
        value === '' ? this.setState({value: ''}) : this.setState({ value: value || this.state.value});
    }

    getStatus() {
        return {
            hasValue: !!this.getValue()
        }
    }

    checkState(states: CheckStates[]) {
        let res = true;

        _.forEach(states, state => {
            if (state === CheckStates.CheckRequired) {
                res = res && (!this.props.required || !!this.getValue());
            }
        });

        if (res) {
            $(this.inputTextRef).removeClass('component-input-text-error');

        } else {
            $(this.inputTextRef).addClass('component-input-text-error');
        }

        return res;
    }

    onChange(evt) {
        if (this.props.event) {
            this.props.event(this.props.name, EventTypes.OnChange, evt.target.value)
        }

        this.setState({
            value: evt.target.value
        })
    }

    onKeyDown(evt) {
        if (this.props.event) {
            this.props.event(this.props.name, EventTypes.OnKeyDown, evt.keyCode)
        }
    }

    render() {
        return (
            <>
                {renderComponentLabel(this.renderInput(), this.props.label)}
            </>
        )
    }

    renderInput() {
        return (
            <div className='component-input-text-container'>
                <input type={'text'}
                   ref={(r) => this.inputTextRef = r}
                   className={`component-input-text ${this.props.className || ''}`}
                   value={this.state.value}
                   disabled={this.props.disabled}
                   placeholder={this.props.placeholder || ''}
                   onChange={this.onChange.bind(this)}
                   onKeyDown={this.onKeyDown.bind(this)}/>
            </div>
        );
    }
}
