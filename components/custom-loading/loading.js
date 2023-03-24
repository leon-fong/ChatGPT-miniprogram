const defaultOptions = {
  selector: '#custom-loading',
};

function getContext() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

var Loading = (options = {}) => {
  options = Object.assign(Object.assign({}, defaultOptions), options);

  return new Promise(() => {
    const content = getContext();
    if (content) {
      const loading = content.selectComponent(options.selector);
      delete options.selector;
      if (loading) {
        loading.setData(options);
      } else {
        console.warn('未找到 custom-loading 节点，请确认 selector 及 context 是否正确');
      }
    } else {
      console.warn('未找到 custom-loading 节点所在的页面栈信息');
    }
  });
};

Loading.show = function () {
  return Loading({
    loading: true,
  });
};

Loading.clear = function () {
  return Loading({
    loading: false,
  });
};

export { Loading };
