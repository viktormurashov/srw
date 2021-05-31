import { connect } from 'react-redux';

import {
    updateCoordinates,
    updateLoading,
} from '../../store/actions';
import Camera from './Camera';

const mapStateToProps = (appState: any) => ({
    loading: appState.loading
});

const mapDispatchToProps = {
    updateCoordinates,
    updateLoading,
};

const CameraContainer = connect(
    mapStateToProps, mapDispatchToProps,
)(Camera);

export default CameraContainer;
