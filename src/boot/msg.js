const issueLoginNoticeToChild = function(accountName) {
    var iFrame = document.getElementById('content_iframe');

    if (!iFrame) { return; }

    iFrame.contentWindow.postMessage(JSON.stringify({
        message: MSG_TYPE_NOTIFY_LOGIN,
        data: accountName
    }), location.origin);
};

const issueLogoutNoticeToChild = function() {
    var iFrame = document.getElementById('content_iframe');

    if (!iFrame) { return; }

    iFrame.contentWindow.postMessage(JSON.stringify({
        message: MSG_TYPE_NOTIFY_LOGOUT,
        data: null
    }), location.origin);
};

const issuePrivateKeySubmitToHFPlay = function(public_key, private_key) {
    var iFrame = document.getElementById('content_iframe_play');

    if (!iFrame) { return; }

    iFrame.contentWindow.postMessage(JSON.stringify({
        message: MSG_TYPE_PRIV_KEY_SUBMIT,
        data: {pub_key: public_key, prv_key: private_key}
    }), location.origin);
};

export default ({ store }) => {
    store["$msg"] = {
        issueLoginNoticeToChild: issueLoginNoticeToChild.bind(store),
        issueLogoutNoticeToChild: issueLogoutNoticeToChild.bind(store),
        issuePrivateKeySubmitToHFPlay: issuePrivateKeySubmitToHFPlay.bind(store)
    };
};
  