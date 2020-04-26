
function parseArgv() {
    const argv = process.argv[2];
    if (!argv) throw new Error('缺少参数！');
    const [action, target] = argv.split(':');
    if (!action || !target) { throw new Error('参数错误！'); }
    return [action, target];
}
