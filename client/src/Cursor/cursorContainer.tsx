import { connect } from 'react-redux';

import {
    updateCoordinates
} from '../store/actions';
import Cursor from './Cursor';

const mapStateToProps = (appState: any) => ({
    coordinates: appState.coordinates,
});

const mapDispatchToProps = {
    updateCoordinates,
};

const CursorContainer = connect(
    mapStateToProps, mapDispatchToProps,
)(Cursor);

export default CursorContainer;
