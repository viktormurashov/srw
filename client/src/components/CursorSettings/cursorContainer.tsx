import { connect } from 'react-redux';

import {
    updateSettings,
} from '../../store/actions';
import CursorSettings from './CursorSettings';

const mapStateToProps = (appState: any) => ({
    settings: appState.settings,
});

const mapDispatchToProps = {
    updateSettings,
};

const CursorSettingsContainer = connect(
    mapStateToProps, mapDispatchToProps,
)(CursorSettings);

export default CursorSettingsContainer;
