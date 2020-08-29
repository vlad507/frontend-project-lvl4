import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import i18next from 'i18next';
import { asyncActions, actions } from '../../redux';

const Remove = (props) => {
  const { id } = props;
  const { removeChannel } = asyncActions;
  const dispatch = useDispatch();

  const hideModal = () => dispatch(actions.hideModal());

  const onSubmit = async () => {
    await dispatch(removeChannel(id));
    hideModal();
  };

  const vdom = (
    <>
      <div className="modal fade show" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {i18next.t('removeChannelTitle')}
              </h5>
              <button onClick={hideModal} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {i18next.t('removeModalText')}
            </div>
            <div className="modal-footer">
              <button onClick={hideModal} type="button" className="btn btn-secondary">
                {i18next.t('cancel')}
              </button>
              <Formik
                initialValues={{}}
                onSubmit={onSubmit}
              >
                {({ isSubmitting, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-danger"
                    >
                      {i18next.t('removeChannel')}
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
  return vdom;
};
export default Remove;
