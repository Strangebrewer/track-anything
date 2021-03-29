// apps/new-web/views/pages/checkout/components/promotional-code/index.jsx

import PropTypes from 'prop-types';
import React from 'react';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { actionCreators } from 'apps/new-web/views/components/invalid-code-modal/actions';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import _ from 'lodash';
import BaseComponent from 'apps/new-web/views/component';
import I18n from 'apps/new-web/views/components/i18n';
import MuiButton from '@material-ui/core/Button';
import MuiPaper from '@material-ui/core/Paper';
import Confirmation from 'apps/new-web/views/components/confirmation';
import { muiBtnStyle, muiInputStyle } from 'apps/new-web/views/components/confirmation/styles';
import { renderMuiTextField } from '../../../../components/material-ui-redux-fields';
import { mapPromoErrorsFromBody } from 'apps/new-web/views/pages/onboarding/promo-helper';

export class PromotionalCodeForm extends BaseComponent {
  static get propTypes() {
    return {
      mediaType: PropTypes.string.isRequired,
      handleSubmit: PropTypes.func,
      invalid: PropTypes.bool,
      onSubmit: PropTypes.func.isRequired,
      onBack: PropTypes.func.isRequired,
      sendValidate: PropTypes.func.isRequired,
      submitting: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      confirmationOpen: false,
      directUserExceptionOpen: false
    };
  }

  handleCodeSubmit(values) {
    return this.props.sendValidate(values.code)
      .then(items => {
        this.setState({
          confirmationOpen: true,
          promotionalCodeResult: items
        })
      })
      .catch((error) => {
        const { body } = error.response;
        if (body.message === 'Direct users cannot redeem activation codes') {
          this.setState({ directUserExceptionOpen: true });
        } else {
          throw new SubmissionError({
            code: mapPromoErrorsFromBody(body)
          });
        }
      });
  }

  onClose() {
    this.setState({ confirmationOpen: false });
    this.props.onSubmit(this.state.promotionalCodeResult);
  }

  onCloseDirectUserException() {
    this.setState({ directUserExceptionOpen: false });
    window.location.href = '/dashboard';
  }

  goBack() {
    this.props.onBack();
  }

  render() {
    const { invalid, handleSubmit, mediaType, submitting } = this.props;
    const promotionalItems = this.state.promotionalCodeResult;
    const confirmationItem = _.get(_.findWhere(promotionalItems, { category: 'Account' }), 'lineItemTitle');

    return (
      <div className="promotional-code">
        <div className="promotional-code-form-wrapper">
          <form onSubmit={ handleSubmit(this.handleCodeSubmit) }>
            <h1><I18n>Redeem your activation or promo code!</I18n></h1>
            <MuiPaper elevation={ 2 } className="activation-paper">
              <form onSubmit={ handleSubmit(this.handleCodeSubmit) }>
                <Field
                  name="code"
                  id="user_input_form-code"
                  component={ renderMuiTextField }
                  placeholder={ I18n.translate('Enter Code') }
                  fullWidth={ true }
                  style={ muiInputStyle.style }
                />
                <MuiButton
                  type="submit"
                  variant="contained"
                  fullWidth={ true }
                  color="primary"
                  disabled={ invalid || submitting }
                  style={ muiBtnStyle.style }
                  disabledBackgroundColor={ muiBtnStyle.disabledBackgroundColor }
                  disabledLabelColor={ muiBtnStyle.disabledLabelColor }
                >
                  { submitting ? I18n.translate('Processing...', 'The user needs to wait while data is submitted') : I18n.translate('Redeem') }
                </MuiButton>
              </form>
            </MuiPaper>
            <div className="back">
              <MuiButton
                className="back-button"
                onClick={ this.goBack }
              >
                <I18n>Go Back</I18n>
              </MuiButton>
            </div>
          </form>

          <Confirmation
            open={ this.state.directUserExceptionOpen }
            onClose={ this.onCloseDirectUserException }
            mediaType={ mediaType }
            message={ I18n.translate('Thank you! We added this code to your iFit account already. Your membership will renew on [date].', { date: format(new Date(this.props.renewalDate), 'MMM d, yyyy') }) }
          />

          <Confirmation
            open={ this.state.confirmationOpen }
            onClose={ this.onClose }
            mediaType={ mediaType }
            message={ I18n.translate('Yay! You\'ve just redeemed your [confirmationItem].', { confirmationItem }) }
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(actionCreators.showModal())
});

export default connect(
  state => ({
    initialValues: { code: state.queryCode },
    renewalDate: state.user.expirationDate
  }),
  mapDispatchToProps
)(reduxForm({
  form: 'promotionalCode',
})(PromotionalCodeForm));
