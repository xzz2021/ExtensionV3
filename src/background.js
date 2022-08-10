window.addEventListener('message', (e) => {
    if (message) {
      // 当监听到webpackHotUpdate事件时，扩展重新安装
      chrome.runtime.reload();
      window.location.reload();
    }
  });