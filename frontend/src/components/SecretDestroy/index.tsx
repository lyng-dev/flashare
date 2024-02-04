import React, { useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { destroySecret } from '../../services/api'
import { IKeyNameParams } from '../types'
interface Props {
    showSpinner: Function
}

export const SecretDestroy = ({ showSpinner }: Props) => {
    const { keyName } = useParams<IKeyNameParams>()
    const confirmKeyRef: React.Ref<HTMLInputElement> = useRef(null)
    const [destroyed, setDestroyed] = useState(false)
    const hash = useLocation().hash
    const keyAndHash = keyName + hash

    const handleDestroyClick = async () => {
        showSpinner(true)
        if (confirmKeyRef.current?.value === keyAndHash) {
            if (keyName) await destroySecret(keyName)
            setDestroyed(true)
        }
        showSpinner(false)
    }

    return (
        <div className="container m--max-width-600">
            <div className="secret-info">
                <div className="secret-info__notifications" style={{ display: destroyed ? 'none' : 'block' }}>
                    <div className="fs-5 text-center">
                        It looks like you are trying to destroy your own secret id: <br />
                        <span className="fs-5 text-warning bg-dark p-1">{keyAndHash}</span>
                    </div>
                    <div className="secret-info__notifications-text mt-2">Remember, it cannot be undone</div>
                </div>

                <div className="secret-info__form mt-5" style={{ display: destroyed ? 'none' : 'block' }}>
                    <label className="form-label fs-5" htmlFor="keyname">
                        To confirm, write the secret id here:
                    </label>
                    <input className="form-control mb-3" id="keyname" type="text" ref={confirmKeyRef} />
                    <div className="mt-5 text-end">
                        <button className="btn fs-5 btn-danger" id="delete" onClick={handleDestroyClick}>
                            Destroy Secret
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-center" style={{ display: destroyed ? 'block' : 'none' }}>
                <p className="fs-5 mb-5">Secret destroyed! Phew!</p>
                <Link to="/" className="btn fs-5 btn-primary">
                    Create a new Secret
                </Link>
            </div>
        </div>
    )
}
