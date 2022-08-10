const pluginName = 'hotReloadPlugin';

class hotReloadPlugin {
  apply(compiler) {
    compiler.hooks.done.tap(pluginName, (compilation) => {
    });
  }
}

module.exports = hotReloadPlugin;