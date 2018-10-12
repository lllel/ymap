import * as React from "react";
import "./App.scss";
import {InputText} from "../../../../common/components/input_text/InputText";

declare let ymaps: any;

interface IProps {
}

interface IState {
    ways: any[];
}

class App extends React.Component<IProps, IState> {
    inputRef: any;
    mapContainerRef: any;
    defaultCountWays: number;

    constructor(props) {
        super(props);

        this.defaultCountWays = 1;
        this.onDeleteWayClick = this.onDeleteWayClick.bind(this);
        this.onEvent = this.onEvent.bind(this);

        this.state = {
            ways: [
                {
                    id: 1,
                    title: 'Точка маршрута 1',
                    coordinates: [55.734470, 37.58001]
                },
                {
                    id: 2,
                    title: 'Точка маршрута 2',
                    coordinates: [55.734336, 37.51218]
                },
                {
                    id: 3,
                    title: 'Точка маршрута 3',
                    coordinates: [55.724102, 37.19912]
                }
            ]
        };
    }

    initMap(coordinates) {
        const myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 13,
            controls: []
        });

        let balloonLayout = ymaps.templateLayoutFactory.createClass(
            "<div class='my-balloon'>" +
            '<p>Здесь должен быть ваш Балун :(</p>' +
            '<a class="close" href="#">&times;</a>' +
            "</div>",
                {
                    build: function () {
                        this.constructor.superclass.build.call(this);
                        this._$element = $('.my-balloon', this.getParentElement());
                        this._$element.find('.close')
                            .on('click', $.proxy(this.onCloseClick, this));
                    },

                    onCloseClick: function (evt) {
                        evt.preventDefault();
                        this.events.fire('userclose');
                    }
                }
            );

        let multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: coordinates,

        }, {
            boundsAutoApply: true,
            balloonLayout: balloonLayout,
            balloonPanelMaxMapArea: 0
        });

        multiRoute.editor.start();
        myMap.geoObjects.add(multiRoute);
    }

    componentDidMount() {
        this.renderMap();
        this.inputRef.focus();
    }

    componentDidUpdate() {
        this.mapContainerRef.innerHTML = '';
        this.renderMap();
        this.inputRef.focus();
    }

    onDeleteWayClick(evt) {
        const itemId = evt.target.closest('li').getAttribute('data-id');
        const waysItemsCopy = JSON.parse(JSON.stringify(this.state.ways));

        waysItemsCopy.forEach((item, index) => {
            if (item.id === parseInt(itemId, 10)) {
                waysItemsCopy.splice(index, 1);
            }
        });

        this.setState({ways: waysItemsCopy});
    }

    onAddWayKeyPress() {
        const waysLength = this.state.ways.length - 1;
        const waysItemsCopy = JSON.parse(JSON.stringify(this.state.ways));
        const wayTitle = this.inputRef.getValue();

        if (this.defaultCountWays < waysLength) {
            this.defaultCountWays = waysLength;

        } else {
            this.defaultCountWays = this.defaultCountWays + 1;
        }

        waysItemsCopy.push({
            id: this.defaultCountWays + 2,
            title: wayTitle || `Точка маршрута ${this.defaultCountWays + 2}`,
            coordinates: [55.73223871, 37.37628449]
        });

        this.setState({ways: waysItemsCopy});
        this.inputRef.setValue('');
    }

    onEvent(name, type, value) {
        if (type === 'OnKeyDown' && value === 13) {
            this.onAddWayKeyPress();
        }
    }

    render() {
        return (
          <div>
              <div ref={(r) => this.mapContainerRef = r} id="map" style={{height: '400px'}}/>
              <InputText ref={(r) => this.inputRef = r} event={this.onEvent} placeholder={'Новая точка маршрута'}/>
              <ul className={'ways-container'}>
                  {this.renderWaysItems()}
              </ul>
          </div>
        );
    }

    renderMap() {
        const coordinates = this.renderWaysCoordinates();
        ymaps.ready(this.initMap.bind(this, coordinates));
    }

    renderWaysItems() {
        return this.state.ways.map((item, index) => {
            return <li key={index} className={'way-item'} data-id={item.id}>{item.title}<span onClick={this.onDeleteWayClick}>удалить</span></li>
        });
    }

    renderWaysCoordinates() {
        return this.state.ways.map((item) => {
            return item.coordinates
        });
    }
}

export default App;
