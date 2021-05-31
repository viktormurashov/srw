import { connect } from 'react-redux';

import Registration from './registration';

const mapStateToProps = (appState: any) => ({
    loading: appState.loading,
});

const RegistrationContainer = connect(
    mapStateToProps, null,
)(Registration);

export default RegistrationContainer;
