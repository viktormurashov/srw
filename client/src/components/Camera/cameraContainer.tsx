import { connect } from 'react-redux';

import {
    updateCoordinates
} from '../../store/actions';
import Camera from './Camera';

const mapDispatchToProps = {
    updateCoordinates,
};

const CameraContainer = connect(
    null, mapDispatchToProps,
)(Camera);

export default CameraContainer;
