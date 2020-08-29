import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import i18next from 'i18next';
import cn from 'classnames';

import { sendMessage } from '../redux/messages';
import Context from '../context';

export default () => {
  const { user } = useContext(Context);
  const {
    channels: { currentChannelId },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const messageSchema = yup.object().shape({
    message: yup.string().trim().required(i18next.t('required')),
  });

  const handleSendMessage = async (values, { resetForm }) => {
    await dispatch(sendMessage({ ...values, userName: user, channelId: currentChannelId }));
    resetForm();
  };

  return (
    <Formik initialValues={{ message: '' }} onSubmit={handleSendMessage} validationSchema={messageSchema}>
      {({
        handleChange,
        values,
        errors,
      }) => {
        const messageClassNames = cn({
          'form-control': true,
          'is-invalid': errors.message,
        });

        return (
          <Form className="form-row align-self-end flex-nowrap">
            <div className="form-group col-10">
              <input
                className={messageClassNames}
                type="text"
                name="message"
                placeholder={i18next.t('messagePlaceholder')}
                onChange={handleChange}
                value={values.message}
              />
              <div className="invalid-feedback">
                {errors.message}
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                {i18next.t('send')}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
