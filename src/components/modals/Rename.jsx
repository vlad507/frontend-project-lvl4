import React, { useRef, useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import * as yup from 'yup';
import i18next from 'i18next';
import { asyncActions, actions } from '../../redux';

const Rename = (props) => {
  const { id, name } = props;
  const { renameChannel } = asyncActions;
  const dispatch = useDispatch();

  const {
    channels: { channelsList },
  } = useSelector((state) => state);
  const channelsNames = channelsList.filter((channel) => channel.name);

  const channelSchema = yup.object().shape({
    channel: yup.string().trim().required(i18next.t('required')).notOneOf(channelsNames),
  });

  const hideModal = () => dispatch(actions.hideModal());

  const onSubmit = async (values) => {
    await dispatch(renameChannel({ id, name: values.channel }));
    hideModal();
  };


  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [null]);

  return (
    <>
      <div className="modal fade show" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {i18next.t('renameChannelTitle')}
              </h5>
              <button onClick={hideModal} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <Formik
              initialValues={{ channel: name }}
              onSubmit={onSubmit}
              validationSchema={channelSchema}
            >
              {({
                values,
                handleSubmit,
                handleChange,
                isSubmitting,
                errors,
              }) => {
                const channelClassNames = cn({
                  'form-control': true,
                  'is-invalid': errors.channel,
                });
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                      <div className="form-group">
                        <input
                          ref={inputRef}
                          className={channelClassNames}
                          type="text"
                          name="channel"
                          onChange={handleChange}
                          value={values.channel}
                        />
                        <div className="invalid-feedback">
                          {errors.channel}
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-secondary" disabled={isSubmitting}>
                        {i18next.t('renameChannel')}
                      </button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
};

export default Rename;
