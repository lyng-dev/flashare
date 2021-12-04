export const Security = () => {
    return (
        <>
            <div className="container m--max-width-900">
                <h1>flasha.re</h1>
                <p>Passing sensitive information between two individuals, in a secure way is hard.</p>
                <p>
                    This site was created based on inspiration from others, like onetimesecret.com, which we have used
                    for years.
                </p>
                <p>
                    But we believed we could do it more <strong>securely, easily and fast!</strong> .
                </p>
                <h2>Open Source</h2>
                <p>
                    Want to be sure we are legit ? go verify the code:
                    <ul>
                        <li>Backend: https://github.com/lyng-dev/flashare and</li>
                        <li>Frontend: https://github.com/lyng-dev/flashare-frontend</li>
                    </ul>
                </p>
                <p>
                    We designed it so you can easily setup your own secret sharing site.
                    <i>Making the world a better place </i>
                    ;-)
                </p>
                <p>
                    Or hey, <strong>maybe you want to contribute ?</strong>{' '}
                </p>
                <h2>Why we are more secure</h2>
                <ul>
                    <li>
                        We encrypt your data before it leaves your browser. That means the risk of{' '}
                        <a href="https://en.wikipedia.org/wiki/Man-in-the-middle_attack">MITM</a>-attacks are greatly
                        reduced.
                    </li>
                    <li>
                        The randomly generated key we use to encrypt is not sent to the server, meaning we couldn't
                        decrypt your message even if we were required to do so.
                    </li>
                    <li>
                        To increase security even more, you can use an additional custom encryption-key (password). This
                        makes it possible for you to share the secret link, and the password over seperate channels,
                        like for instance Email for the link, and Instant messenger for the custom password. Thereby
                        making a <a href="https://en.wikipedia.org/wiki/Man-in-the-middle_attack">MITM</a>-attack much
                        less likely.
                    </li>
                    <li>
                        To decrease the risk of attacks, we do not store anything for more than 7 days. But our default
                        is 5 minutes. Secrets are generally shared on the spot, and don't need to live for very long.
                        And decreasing the time a secret exists in the open lowers the amount of time it can be
                        attacked.
                    </li>
                    <li>
                        Our secrets only allow a single-attempt to consume them. If you fail retrieving it, it's gone.
                        No retrys. Better safe than sorry.
                    </li>
                </ul>
                <h2>Staying safe, a few tips</h2>
                <p>
                    With the precautions above, this system is already very secure. But you can do even more to ensure
                    that even if your secret somehow gets in the wrong hands. Then the attacker will still not be able
                    to use the information they obtained.
                </p>
                <p>
                    1. <strong>Don't show them the door</strong> When you share secrets, it's important to not indicate
                    where those secrets belong. Often we send username/password which constitutes a key to a door. But
                    if you don't know what door the key is for, then that key is a waste of time. In this manner, do not
                    add in the secrets you share where they belong. This again will keep you safe on the information
                    high-seas. 🏴‍☠️ Yarrr.
                </p>
                <p>
                    2. <strong>Share the password securely</strong> If you are extra clever, you don't even share the
                    actual custom password, you just pick a commonly know thing, and describe it. Like for instance:
                    "Your daughter's name in lower case". Now a would-be attacker will need to know personal information
                    as well as the secret link, AND extract the secret BEFORE your intended target. Highly improbable.
                    And detectable, if you add "opened"-notification, which is a new feature coming.
                </p>
                <h2>More features are coming</h2>
                <p>
                    <ul>
                        <li>Notification when secret has been consumed</li>
                        <li>Sharing images or files</li>
                        <li>Browser extension</li>
                        <li>
                            CLI client, which integrates with file/image/archive sharing: `flashare -P bananaphone -F
                            ./env` output link: https://flasha.re/secret/somekey#somehash
                        </li>
                        <li>Client libraries for different programming languages</li>
                        <li>.. ideas ?</li>
                    </ul>
                </p>
            </div>
        </>
    )
}
