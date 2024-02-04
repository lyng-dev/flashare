import { convertExpirationChoice, expirationChoices } from '../../services/time-converter'
import * as keyService from '../../services/key'
import * as encryptionService from '../../services/encryption'
import { createSecret, ICreateSecretEnvelope } from '../../services/api'
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from 'formik'
import { generatePath, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const secretSchema = Yup.object().shape({
    secret: Yup.string()
        .max(100000, 'Your secret cannot exceed 100000 characters')
        .required('You must specify the secret to share'),
})

interface Props {
    showSpinner: Function
}

interface Values {
    secret: string
    expiration: string
    password: string
    isPasswordProtected: boolean
}

export const CreateSecret = ({ showSpinner }: Props) => {
    const navigate = useNavigate()

    const initialValues: Values = {
        secret: '',
        expiration: '5m',
        password: '',
        isPasswordProtected: false,
    }

    const handleSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        showSpinner(true)
        const encryptionKey = keyService.generateKey(8, 8)
        const encrypted =
            values.isPasswordProtected && !!values.password && values.password.length > 0
                ? await encryptionService.encrypt(values.secret, encryptionKey + values.password)
                : await encryptionService.encrypt(values.secret, encryptionKey)

        //create secret envelope
        const envelope: ICreateSecretEnvelope = {
            Expiration: convertExpirationChoice(values.expiration),
            Content: {
                isPasswordProtected: values.isPasswordProtected && !!values.password && values.password.length > 0,
                secret: escape(encrypted),
            },
        }

        //send envelope
        const response = await createSecret(envelope)
        const createdSecret = await response.json()
        showSpinner(false)
        navigate(`/secret/owner/${createdSecret.keyName}#${encryptionKey}`, { replace: true })
        return <></>
    }

    return (
        <div className="container m--max-width-600">
            <div className="secret-info">
                <div className="secret-security-info">
                    <a href="/security">README: About</a>
                </div>
                <div className="secret-info__from">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={secretSchema}
                        onSubmit={(values, actions) => {
                            handleSubmit(values, actions)
                        }}
                    >
                        {({ values }) => (
                            <Form>
                                <div className="mb-4">
                                    <label htmlFor="secret" className="form-label fs-5">
                                        Enter your secret
                                    </label>
                                    <Field
                                        component="textarea"
                                        name="secret"
                                        maxLength={100000}
                                        rows={6}
                                        required
                                        className="form-control"
                                        id="secret"
                                    />
                                    <ErrorMessage name="secret" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="expiration" className="form-label fs-5">
                                        Auto-delete after
                                    </label>
                                    <Field component="select" className="form-select" name="expiration" id="expiration">
                                        {expirationChoices.map((c) => (
                                            <option key={c.Value} value={c.Value}>
                                                {c.Title}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div className="mb-4">
                                    <div className="form-check mb-2">
                                        <Field
                                            className="form-check-input"
                                            type="checkbox"
                                            name="isPasswordProtected"
                                            id="isPasswordProtected"
                                        />
                                        <label className="form-check-label fs-5 noselect" htmlFor="isPasswordProtected">
                                            Password protect
                                        </label>
                                    </div>
                                    <Field
                                        name="password"
                                        className="form-control"
                                        type="password"
                                        placeholder="Enter password to open secret"
                                        disabled={!values.isPasswordProtected}
                                        hidden={!values.isPasswordProtected}
                                    />
                                </div>
                                <div className="mt-5 text-end">
                                    <button type="submit" className="btn fs-5 btn-primary">
                                        Create Secret
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="secret-info__notifications mt-5">
                    <div className="mt-4 secret-info__notifications-text">
                        <ul>
                            <li>Encrypted before leaving your browser</li>
                            <li>
                                <span>&bull;</span>Further encrypted via TLS while being transported
                            </li>
                            <li>
                                <span>&bull;</span>Encrypted while stored
                            </li>
                            <li>
                                <span>&bull;</span>Only you have the key for your secret
                            </li>
                            <li>
                                <span>&bull;</span>Automatically deleted when opened, or if it expires
                            </li>
                            <li>
                                <span>&bull;</span>Password protect for ultimate security
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
