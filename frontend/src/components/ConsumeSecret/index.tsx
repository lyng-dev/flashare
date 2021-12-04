import { ISecretContent } from '../../models/api'
import { useRef, useState } from 'react'
import * as encryptionService from '../../services/encryption'
import { consumeSecret } from '../../services/api'
import { useLocation, useParams } from 'react-router-dom'
import { useHotkeys } from 'react-hotkeys-hook'

const copyButtonDefaultText = 'Copy to clipboard'
interface Props {
    showSpinner: Function
}

export const ConsumeSecret = ({ showSpinner }: Props) => {
    const { keyName }: { keyName: string } = useParams()
    const hash = useLocation().hash.replace('#', '')
    const copyButtonRef: React.Ref<HTMLButtonElement> = useRef(null)
    const [isConsumed, setIsConsumed] = useState(false)
    const [isPasswordProtected, setIsPasswordProtected] = useState(false)
    const [passwordProtectedSecret, setPasswordProtectedSecret] = useState('')
    const [secret, setSecret] = useState('')
    const [password, setPassword] = useState('')

    const secretContentCopyRef: React.Ref<HTMLTextAreaElement> = useRef(null)
    const [copyButtonText, setCopyButtonText] = useState(copyButtonDefaultText)
    useHotkeys('ctrl+c', () => copyButtonRef.current?.click())
    let isCopied = false
    const handleCopy = () => {
        secretContentCopyRef.current?.select()
        const result = document.execCommand('copy')
        isCopied = result
        setCopyButtonText(isCopied ? 'COPIED!' : copyButtonDefaultText)
        if (!result) {
            window.alert('Could not copy to clipboard. You will need to copy it manually.')
            return
        }
        secretContentCopyRef.current?.blur()
        setTimeout(() => {
            isCopied = false
            setCopyButtonText(isCopied ? 'COPIED!' : copyButtonDefaultText)
        }, 3000)
    }

    const handleConsumeSecret = async () => {
        showSpinner(true)
        const response = await consumeSecret(keyName)
        const consumedSecret = response.data
        const secretContent: ISecretContent = JSON.parse(consumedSecret.secret)
        if (secretContent.isPasswordProtected) {
            setPasswordProtectedSecret(secretContent.secret)
            setIsPasswordProtected(true)
        } else {
            setIsConsumed(true)
            setSecret(await encryptionService.decrypt(unescape(secretContent.secret), hash))
        }
        showSpinner(false)
    }

    const decryptConsumedSecret = async () => {
        setSecret(await encryptionService.decrypt(unescape(passwordProtectedSecret), hash + password ?? ''))
        setIsPasswordProtected(false)
        setIsConsumed(true)
    }
    return (
        <>
            <div className="container m--max-width-600 text-center">
                <div
                    className="secret-info"
                    style={{ display: !isConsumed && !isPasswordProtected ? 'block' : 'none' }}
                >
                    <div className="secret-info__notifications">
                        <span className="text-success fs-5 text-center">A secret has been shared with you!</span>
                        <div className="secret-info__notifications-text">
                            <span>You can only view this secret once.</span>
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <button className="btn fs-5 btn-primary" onClick={handleConsumeSecret}>
                            View Secret
                        </button>
                    </div>
                </div>

                <div className="secret-info" style={{ display: isPasswordProtected ? 'block' : 'none' }}>
                    <div className="secret-info__title fs-5">This secret is password-protected</div>
                    <pre className="secret-info__text mb-4">{passwordProtectedSecret}</pre>

                    <div className="mb-4">
                        <label className="form-label fs-5" htmlFor="password">
                            Enter password:
                        </label>
                        <input
                            className="form-control"
                            id="password"
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-end">
                        <button className="btn fs-5 btn-primary" onClick={decryptConsumedSecret}>
                            Open Secret
                        </button>
                    </div>
                </div>

                <div className="secret-info" style={{ display: isConsumed ? 'block' : 'none' }}>
                    <div className="secret-info__title fs-5">
                        <label>Secret text</label>
                    </div>
                    <pre className="secret-info__text">{secret}</pre>
                    <textarea
                        ref={secretContentCopyRef}
                        name="secretContentCopy"
                        cols={30}
                        rows={10}
                        defaultValue={`${secret}`}
                        style={{ position: 'absolute', left: -10000, top: -10000 }}
                    ></textarea>

                    <div className="text-end">
                        <kbd>CTRL+C</kbd>&nbsp;
                        <button ref={copyButtonRef} onClick={handleCopy} className="btn fs-5 btn-success">
                            {copyButtonText}
                        </button>
                    </div>

                    <div className="secret-info__notifications mt-5">
                        <div className="secret-info__notifications-text">
                            <span>This is the last time you can see this secret!</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
