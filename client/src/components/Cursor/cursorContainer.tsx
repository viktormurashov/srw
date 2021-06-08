import { connect } from 'react-redux';

import {
    updateCoordinates,
    updateSettings,
} from '../../store/actions';
import Cursor from './Cursor';

const mapStateToProps = (appState: any) => ({
    coordinates: appState.coordinates,
    settings: appState.settings,
});

const mapDispatchToProps = {
    updateCoordinates,
    updateSettings,
};

const CursorContainer = connect(
    mapStateToProps, mapDispatchToProps,
)(Cursor);

export default CursorContainer;
