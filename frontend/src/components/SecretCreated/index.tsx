import { useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useHotkeys } from 'react-hotkeys-hook'

const copyButtonDefaultText = 'Copy to clipboard'

export const SecretCreated = () => {
    const secretUrlRef: React.Ref<HTMLInputElement> = useRef(null)
    const copyButtonRef: React.Ref<HTMLButtonElement> = useRef(null)
    const [copyButtonText, setCopyButtonText] = useState(copyButtonDefaultText)
    useHotkeys('ctrl+c', () => copyButtonRef.current?.click())
    let isCopied = false

    const location = useLocation()
    const { keyName }: { keyName: string } = useParams()

    const handleCopy = () => {
        secretUrlRef.current?.select()
        const result = document.execCommand('copy')
        isCopied = result
        setCopyButtonText(isCopied ? 'COPIED!' : copyButtonDefaultText)
        if (!result) {
            window.alert('Could not copy to clipboard. You will need to copy it manually.')
            return
        }
        secretUrlRef.current?.blur()
        setTimeout(() => {
            isCopied = false
            setCopyButtonText(isCopied ? 'COPIED!' : copyButtonDefaultText)
        }, 3000)
    }

    return (
        <div className="container m--max-width-600  text-center">
            <div className="secret-info fs-5">
                <div className="secret-info__notifications">
                    <div className="text-success fs-5 text-center">The secret is saved successfully</div>
                    <div className="secret-info__notifications-text">
                        <span>
                            This secret can be accessed once, <br />
                            and will then be destroyed.
                        </span>
                    </div>
                </div>

                <div className="secret-info__title mt-5">Secret url:</div>

                <pre className="secret-info__text">
                    https://flasha.re/secret/{keyName}
                    {location.hash}
                </pre>

                <div className="secret-info__buttons">
                    <div className="secret-info__buttons-left">
                        <Link
                            to={`/secret/owner/destroy/${keyName}${location.hash}`}
                            className="fs-5 btn text-danger btn-link secret-info__btn-secret-del"
                        >
                            Destroy secret
                        </Link>
                    </div>
                    <div className="secret-info__buttons-right">
                        <div className="copyText">
                            <kbd>CTRL+C</kbd>&nbsp;
                            <button
                                ref={copyButtonRef}
                                type="button"
                                className="btn fs-5 btn-success"
                                title="Copied!"
                                onClick={handleCopy}
                            >
                                {copyButtonText}
                            </button>
                            <input
                                style={{ position: 'absolute', left: -10000, top: -10000 }}
                                name="secretUrl"
                                type="text"
                                ref={secretUrlRef}
                                defaultValue={`https://flasha.re/secret/${keyName}${location.hash}`}
                                className="copyText__input"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
