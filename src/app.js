import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import { connect, Provider } from "react-redux";
import { fetchAnnotations, switchActiveSelection } from "./actions";
import rootReducer from "./reducers";

// "http://www.e-codices.unifr.ch/loris/csg/csg-0390/csg-0390_007.jp2/1425,1005,67,76/64,/0/default.jpg"
// http://ddmal.github.io/diva.js/try/iiif-highlight-pages/#v=d&z=5&n=5&i=http%3A%2F%2Fwww.e-codices.unifr.ch%2Floris%2Fcsg%2Fcsg-0390%2Fcsg-0390_007.jp2&y=1165&x=2169

const Image = ({url}) =>
{
    var str = url.replace(/\/[\d]+,[\d]+,[\d]+,[\d]+\/64,\/0\/default.jpg/, "");
    var dims = url.match(/[\d]+,[\d]+,[\d]+,[\d]+/)[0].split(",");
    var x = dims[0];
    var y = dims[1];
    var imguri = encodeURI(str);
    var divaURL = `http://ddmal.github.io/diva.js/try/iiif-highlight-pages/#v=d&z=5&n=5&i=${imguri}&y=${y}&x=${x}`;

    return (
        <a href={ divaURL } target="_blank">
            <img src={ url } />
        </a>
    )
};


class Application extends React.Component
{
    componentWillMount() {
        this.props.fetchAnnotations();
    }

    onSelectChange (event)
    {
        console.log(event.target.value);
        this.props.switchActiveSelection(event.target.value);
    }

    render()
    {
        if (!this.props.annotations)
        {
            return (
                <div>Loading ... </div>
            )
        }

        const thisType = "Clivis mit Porrectus Simple";

        return (
            <div>
                <select onChange={ this.onSelectChange.bind(this) }>
                { this.props.annotations.map ( (annot, idx) =>
                    {
                        return (
                            <option key={ idx } value={ annot.type }>{ annot.type } ({ annot.urls.length })</option>
                        )
                    })}
                </select>

                { this.props.annotations.map( (annot, idx) =>
                    {
                        if (annot.type === this.props.activeSelection)
                        {
                            return (
                                <div key={ idx }>
                                    <h1>{ annot.type } ({ annot.urls.length })</h1>
                                    <div className="image-container">
                                        { annot.urls.map( (url, idx2) => {
                                            const pgn = url.split("/")[6];
                                            return (
                                                <div key={ idx2 } className="image-instance">
                                                    <Image url={ url } />
                                                    <p>{ pgn }</p>
                                                </div>
                                            )
                                        }) }
                                    </div>

                                </div>
                            );
                        }
                    })}
            </div>
        );
    }
}

function mapStateToProps (state)
{
    return {
        annotations: state.annotations,
        activeSelection: state.activeSelection
    }
}

var App = connect(mapStateToProps, { fetchAnnotations, switchActiveSelection })(Application);

const logger = createLogger();
var store = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk, logger)
);


ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById("content")
);
