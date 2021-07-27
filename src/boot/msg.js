const issueLoginNoticeToChild = function(accountName) {
    var iFrame = document.getElementById('content_iframe');

    iFrame.contentWindow.postMessage(JSON.stringify({
        message: MSG_TYPE_NOTIFY_LOGIN,
        data: accountName
    }), location.origin);
};

const issueLogoutNoticeToChild = function() {
    var iFrame = document.getElementById('content_iframe');

    iFrame.contentWindow.postMessage(JSON.stringify({
        message: MSG_TYPE_NOTIFY_LOGOUT,
        data: null
    }), location.origin);
};

export default ({ store }) => {
    store["$msg"] = {
        issueLoginNoticeToChild: issueLoginNoticeToChild.bind(store),
        issueLogoutNoticeToChild: issueLogoutNoticeToChild.bind(store)
    };
};
  